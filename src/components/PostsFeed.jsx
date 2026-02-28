import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../utils/postSlice";
import PostCard from "./PostCard";

const PostsFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.post);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setError(null);
      const res = await axios.get(`${BASE_URL}/post/feed`, {
        withCredentials: true,
      });
      dispatch(setPosts(res.data));
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto mt-6 flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-6">
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={fetchPosts} className="btn btn-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-6 pb-6">
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl mb-2">📭</p>
          <p className="text-base-content/60">No posts yet. Be the first to post!</p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} refreshPosts={fetchPosts} />
        ))
      )}
    </div>
  );
};

export default PostsFeed;


// import React, { useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "../utils/postSlice";
// import PostCard from "./PostCard";

// const PostsFeed = () => {
//   const dispatch = useDispatch();
//   const posts = useSelector((store) => store.post);

//   const fetchPosts = async () => {
//     const res = await axios.get(BASE_URL + "/post/feed", {
//       withCredentials: true,
//     });
//     dispatch(setPosts(res.data));
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div className="max-w-xl mx-auto mt-6">
//       {posts.map((post) => (
//         <PostCard key={post._id} post={post} refreshPosts={fetchPosts} />
//       ))}
//     </div>
//   );
// };

// export default PostsFeed;


// import React, { useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "../utils/postSlice";
// import PostCard from "./PostCard";
// import CreatePost from "./CreatePost";

// const PostsFeed = () => {
//   const dispatch = useDispatch();
//   const posts = useSelector((store) => store.post);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const res = await axios.get(BASE_URL + "/post/feed", {
//         withCredentials: true,
//       });
//       dispatch(setPosts(res.data));
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <div className="max-w-xl mx-auto mt-6">
//       <CreatePost />
//       {posts.map((post) => (
//         <PostCard key={post._id} post={post} />
//       ))}
//     </div>
//   );
// };

// export default PostsFeed;
