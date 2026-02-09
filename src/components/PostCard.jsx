import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../utils/postSlice";
import CommentSection from "./CommentSection";
import EditPostModal from "./EditPostModal";

const PostCard = ({ post, refreshPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiking, setIsLiking] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentUser = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const isOwner = currentUser?._id === post.userId._id;

  useEffect(() => {
    if (currentUser) {
      setIsLiked(post.likes.includes(currentUser._id));
    }
  }, [post.likes, currentUser]);

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    
    // Optimistic update
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount(newIsLiked ? likeCount + 1 : likeCount - 1);

    try {
      await axios.patch(
        `${BASE_URL}/post/like/${post._id}`,
        {},
        { withCredentials: true }
      );
      refreshPosts();
    } catch (error) {
      // Revert on error
      setIsLiked(!newIsLiked);
      setLikeCount(newIsLiked ? likeCount - 1 : likeCount + 1);
      console.error("Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    try {
      await axios.delete(`${BASE_URL}/post/delete/${post._id}`, {
        withCredentials: true,
      });
      
      dispatch(deletePost(post._id));
      
      // Success notification
      const notification = document.createElement("div");
      notification.className = "toast toast-top toast-end";
      notification.innerHTML = `
        <div class="alert alert-success">
          <span>🗑️ Post deleted successfully!</span>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
      
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow mb-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={post.userId.photoURL} alt={post.userId.firstname} />
              </div>
            </div>
            <div>
              <p className="font-semibold">
                {post.userId.firstname} {post.userId.lastname}
              </p>
              <p className="text-xs text-base-content/60">
                {formatTimeAgo(post.createdAt)}
              </p>
            </div>
          </div>
          
          {/* Options Menu - Only for post owner */}
          {isOwner && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
                ⋮
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-40"
              >
                <li>
                  <button onClick={() => setShowEditModal(true)}>
                    ✏️ Edit
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleDelete} 
                    className="text-error"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "🗑️ Delete"}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-4 pb-3">
          <h3 className="font-bold text-lg mb-1">{post.title}</h3>
          {post.content && <p className="text-base-content/80">{post.content}</p>}
        </div>

        {/* Image */}
        {post.imgURL && (
          <img
            src={post.imgURL}
            alt={post.title}
            className="w-full max-h-96 object-cover cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => window.open(post.imgURL, "_blank")}
          />
        )}

        {/* Actions */}
        <div className="p-4 space-y-3">
          {/* Like & Comment Counts */}
          <div className="flex justify-between text-sm text-base-content/60">
            <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
            <span>{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 border-t border-b py-2">
            <button
              onClick={handleLike}
              className={`btn btn-ghost flex-1 gap-2 ${
                isLiked ? "text-error" : ""
              }`}
              disabled={isLiking}
            >
              {isLiked ? "❤️" : "🤍"} Like
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="btn btn-ghost flex-1 gap-2"
            >
              💬 Comment
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <CommentSection
              post={post}
              onCommentAdded={refreshPosts}
              onCommentDeleted={refreshPosts}
            />
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditPostModal
          post={post}
          onClose={() => setShowEditModal(false)}
          onUpdate={refreshPosts}
        />
      )}
    </>
  );
};

export default PostCard;


// // PostCard.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useSelector } from "react-redux";
// import CommentSection from "./CommentSection";

// const PostCard = ({ post, refreshPosts }) => {
//   const [showComments, setShowComments] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(post.likes.length);
//   const [isLiking, setIsLiking] = useState(false);
//   const currentUser = useSelector((store) => store.user);

//   useEffect(() => {
//     if (currentUser) {
//       setIsLiked(post.likes.includes(currentUser._id));
//     }
//   }, [post.likes, currentUser]);

//   const handleLike = async () => {
//     if (isLiking) return;

//     setIsLiking(true);
    
//     // Optimistic update
//     const newIsLiked = !isLiked;
//     setIsLiked(newIsLiked);
//     setLikeCount(newIsLiked ? likeCount + 1 : likeCount - 1);

//     try {
//       await axios.patch(
//         `${BASE_URL}/post/like/${post._id}`,
//         {},
//         { withCredentials: true }
//       );
//       refreshPosts(); // Sync with server
//     } catch (error) {
//       // Revert on error
//       setIsLiked(!newIsLiked);
//       setLikeCount(newIsLiked ? likeCount - 1 : likeCount + 1);
//       console.error("Error liking post:", error);
//     } finally {
//       setIsLiking(false);
//     }
//   };

//   const formatTimeAgo = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const seconds = Math.floor((now - date) / 1000);

//     if (seconds < 60) return "just now";
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className="bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow mb-4">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4">
//         <div className="flex items-center gap-3">
//           <div className="avatar">
//             <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//               <img src={post.userId.photoURL} alt={post.userId.firstname} />
//             </div>
//           </div>
//           <div>
//             <p className="font-semibold">
//               {post.userId.firstname} {post.userId.lastname}
//             </p>
//             <p className="text-xs text-base-content/60">
//               {formatTimeAgo(post.createdAt)}
//             </p>
//           </div>
//         </div>
        
//         {/* Options Menu */}
       
//       </div>

//       {/* Content */}
//       <div className="px-4 pb-3">
//         <h3 className="font-bold text-lg mb-1">{post.title}</h3>
//         {post.content && <p className="text-base-content/80">{post.content}</p>}
//       </div>

//       {/* Image */}
//       {post.imgURL && (
//         <img
//           src={post.imgURL}
//           alt={post.title}
//           className="w-full max-h-96 object-cover cursor-pointer hover:opacity-95 transition-opacity"
//           onClick={() => window.open(post.imgURL, "_blank")}
//         />
//       )}

//       {/* Actions */}
//       <div className="p-4 space-y-3">
//         {/* Like & Comment Counts */}
//         <div className="flex justify-between text-sm text-base-content/60">
//           <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
//           <span>{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</span>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-2 border-t border-b py-2">
//           <button
//             onClick={handleLike}
//             className={`btn btn-ghost flex-1 gap-2 ${
//               isLiked ? "text-error" : ""
//             }`}
//             disabled={isLiking}
//           >
//             {isLiked ? "❤️" : "🤍"} Like
//           </button>
//           <button
//             onClick={() => setShowComments(!showComments)}
//             className="btn btn-ghost flex-1 gap-2"
//           >
//             💬 Comment
//           </button>
//         </div>

//         {/* Comments Section */}
//         {showComments && (
//           <CommentSection
//             post={post}
//             onCommentAdded={refreshPosts}
//             onCommentDeleted={refreshPosts}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostCard;

// import React, { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import CommentSection from "./CommentSection";


// const PostCard = ({ post }) => {
//   const [showComments, setShowComments] = useState(false);

//     const handleLike = async () => {
//     await axios.patch(
//       BASE_URL + `/post/like/${post._id}`,
//       {},
//       { withCredentials: true }
//     );
//     refreshPosts(); // 🔥 AUTO UPDATE
//   };

//   return (
//     <div className="bg-base-100 rounded-xl shadow mb-4">
//       {/* Header */}
//       <div className="flex items-center gap-3 p-3">
//         <img
//           src={post.userId.photoURL}
//           className="w-10 h-10 rounded-full"
//         />
//         <p className="font-semibold">
//           {post.userId.firstname} {post.userId.lastname}
//         </p>
//       </div>

//       {/* Image */}
//       {post.imgURL && (
//         <img src={post.imgURL} className="w-full max-h-96 object-cover" />
//       )}

//       {/* Actions */}
//       <div className="p-3 space-y-2">
//         <h3 className="font-bold">{post.title}</h3>
//         <p>{post.content}</p>

//         <div className="flex gap-4 text-xl">
//            <button onClick={handleLike}>
//       ❤️ {post.likes.length}
//     </button>
//           <button onClick={() => setShowComments(!showComments)}>
//             💬 {post.comments.length}
//           </button>
//         </div>

//         {showComments && <CommentSection post={post} />}
//       </div>
//     </div>
//   );
// };

// export default PostCard;
