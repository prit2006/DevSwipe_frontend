import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch } from "react-redux";
import { updatePost } from "../utils/postSlice";

const EditPostModal = ({ post, onClose, onUpdate }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content || "");
  const [imgURL, setImgURL] = useState(post.imgURL || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(post.imgURL || "");
  const dispatch = useDispatch();

  const handleImageURLChange = (e) => {
    const url = e.target.value;
    setImgURL(url);
    setImagePreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/post/edit/${post._id}`,
        { title, content, imgURL },
        { withCredentials: true }
      );

      dispatch(updatePost(res.data.post));

      // Success notification
      const notification = document.createElement("div");
      notification.className = "toast toast-top toast-end";
      notification.innerHTML = `
        <div class="alert alert-success">
          <span>✅ Post updated successfully!</span>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);

      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating post:", error);
      alert(error.response?.data?.message || "Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Edit Post</h2>
            <button
              onClick={onClose}
              className="btn btn-circle btn-ghost btn-sm"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Title *</span>
              </label>
              <input
                className="input input-bordered w-full"
                placeholder="What's on your mind?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-32"
                placeholder="Share your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Image URL</span>
              </label>
              <input
                className="input input-bordered w-full"
                placeholder="https://example.com/image.jpg"
                value={imgURL}
                onChange={handleImageURLChange}
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg"
                  onError={() => setImagePreview("")}
                />
                <button
                  type="button"
                  onClick={() => {
                    setImgURL("");
                    setImagePreview("");
                  }}
                  className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={isSubmitting || !title.trim()}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Updating...
                  </>
                ) : (
                  "Update Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;