import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyPosts = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/post/my/posts`, {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load your posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
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
          <button onClick={fetchMyPosts} className="btn btn-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-6 pb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <Link to="/posts/create" className="btn btn-primary btn-sm">
          ➕ Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-base-100 rounded-xl">
          <p className="text-4xl mb-4">📝</p>
          <p className="text-lg font-semibold mb-2">No posts yet</p>
          <p className="text-base-content/60 mb-4">
            Share your first thought with your connections
          </p>
          <Link to="/posts/create" className="btn btn-primary">
            Create Your First Post
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-base-content/60 mb-4">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} refreshPosts={fetchMyPosts} />
          ))}
        </>
      )}
    </div>
  );
};

export default MyPosts;