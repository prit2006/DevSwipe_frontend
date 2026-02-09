import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useSelector } from "react-redux";
import CommentItem from "./CommentItem";

const CommentSection = ({ post, onCommentAdded, onCommentDeleted }) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useSelector((store) => store.user);

  const addComment = async (e) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await axios.post(
        `${BASE_URL}/post/comment/${post._id}`,
        { text },
        { withCredentials: true }
      );

      setText("");
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await axios.delete(
        `${BASE_URL}/post/comment/${post._id}/${commentId}`,
        { withCredentials: true }
      );
      onCommentDeleted();
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    }
  };

  const editComment = async (commentId, newText) => {
    try {
      await axios.patch(
        `${BASE_URL}/post/comment/${post._id}/${commentId}`,
        { text: newText },
        { withCredentials: true }
      );
      onCommentAdded();
    } catch (error) {
      console.error("Error editing comment:", error);
      alert("Failed to edit comment");
    }
  };

  return (
    <div className="mt-3 space-y-2">
      {/* Comments List */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {post.comments.length > 0 ? (
          post.comments.map((c) => (
            <CommentItem
              key={c._id}
              comment={c}
              isOwner={currentUser?._id === c.userId._id}
              onDelete={() => deleteComment(c._id)}
              onEdit={editComment}
            />
          ))
        ) : (
          <p className="text-sm text-base-content/50 italic">
            No comments yet. Be the first!
          </p>
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={addComment} className="flex gap-2 pt-2 border-t">
        <input
          className="input input-sm input-bordered w-full focus:outline-primary"
          placeholder="Add comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          disabled={!text.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;

// // CommentSection.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useSelector } from "react-redux";
// import CommentItem from "./CommentItem";

// const CommentSection = ({ post, onCommentAdded, onCommentDeleted }) => {
//   const [text, setText] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const currentUser = useSelector((store) => store.user);

//   const addComment = async (e) => {
//     e.preventDefault();
//     if (!text.trim() || isSubmitting) return;

//     setIsSubmitting(true);
//     try {
//       await axios.post(
//         `${BASE_URL}/post/comment/${post._id}`,
//         { text },
//         { withCredentials: true }
//       );

//       setText("");
//       onCommentAdded(); // Trigger refresh
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       alert("Failed to add comment");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const deleteComment = async (commentId) => {
//     try {
//       await axios.delete(
//         `${BASE_URL}/post/comment/${post._id}/${commentId}`,
//         { withCredentials: true }
//       );
//       onCommentDeleted();
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };

//   return (
//     <div className="mt-3 space-y-2">
//       {/* Comments List */}
//       <div className="space-y-2 max-h-60 overflow-y-auto">
//         {post.comments.length > 0 ? (
//           post.comments.map((c) => (
//             <CommentItem
//               key={c._id}
//               comment={c}
//               isOwner={currentUser?._id === c.userId._id}
//               onDelete={() => deleteComment(c._id)}
//             />
//           ))
//         ) : (
//           <p className="text-sm text-base-content/50 italic">
//             No comments yet. Be the first!
//           </p>
//         )}
//       </div>

//       {/* Add Comment Form */}
//       <form onSubmit={addComment} className="flex gap-2 pt-2 border-t">
//         <input
//           className="input input-sm input-bordered w-full focus:outline-primary"
//           placeholder="Add comment..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           disabled={isSubmitting}
//         />
//         <button
//           type="submit"
//           className="btn btn-sm btn-primary"
//           disabled={!text.trim() || isSubmitting}
//         >
//           {isSubmitting ? (
//             <span className="loading loading-spinner loading-xs"></span>
//           ) : (
//             "Send"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CommentSection;


// import React, { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import CommentItem from "./CommentItem";

// const CommentSection = ({ post }) => {
//   const [text, setText] = useState("");

 
//   const addComment = async () => {
//     if (!text.trim()) return;

//     await axios.post(
//       BASE_URL + `/post/comment/${post._id}`,
//       { text },
//       { withCredentials: true }
//     );

//     setText("");
//     refreshPosts(); // 🔥 AUTO UPDATE
//   };

//   return (
//     <div className="mt-2 space-y-2">
//       {post.comments.map((c) => (
//         <CommentItem key={c._id} comment={c} />
//       ))}

//       <div className="flex gap-2">
//         <input
//           className="input input-sm input-bordered w-full"
//           placeholder="Add comment..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <button onClick={addComment} className="btn btn-sm">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CommentSection;
