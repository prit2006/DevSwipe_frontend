import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import PostCard from "./PostCard";

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/post/${postId}`, {
        withCredentials: true,
      });
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
      setError(err.response?.data?.message || "Failed to load post");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

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
          <div className="flex gap-2">
            <button onClick={fetchPost} className="btn btn-sm">
              Retry
            </button>
            <button onClick={() => navigate("/posts")} className="btn btn-sm btn-ghost">
              Back to Feed
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-6 pb-6">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost btn-sm mb-4"
      >
        ← Back
      </button>
      {post && <PostCard post={post} refreshPosts={fetchPost} />}
    </div>
  );
};

export default SinglePost;