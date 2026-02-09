// CreatePost.jsx
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

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
      await axios.post(
        `${BASE_URL}/post/create`,
        { title, content, imgURL },
        { withCredentials: true }
      );

      // Success notification
      const notification = document.createElement("div");
      notification.className = "toast toast-top toast-end";
      notification.innerHTML = `
        <div class="alert alert-success">
          <span>✅ Post created successfully!</span>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);

      // Redirect
      navigate("/posts");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-base-200 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

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
              ×
            </button>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting || !title.trim()}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner"></span>
              Posting...
            </>
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;


// import React, { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useNavigate } from "react-router-dom";

// const CreatePost = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imgURL, setImgURL] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;

//     await axios.post(
//       BASE_URL + "/post/create",
//       { title, content, imgURL },
//       { withCredentials: true }
//     );

//     // ✅ Popup
//     alert("✅ Post created successfully!");

//     // ✅ Redirect
//     navigate("/posts");
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-base-200 p-4 rounded-xl">
//       <h2 className="text-xl font-bold mb-3">Create New Post</h2>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           className="input input-bordered w-full"
//           placeholder="Post title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           className="textarea textarea-bordered w-full"
//           placeholder="Write something..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />

//         <input
//           className="input input-bordered w-full"
//           placeholder="Image URL (optional)"
//           value={imgURL}
//           onChange={(e) => setImgURL(e.target.value)}
//         />

//         <button className="btn btn-primary w-full">Post</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;


// import React, { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useDispatch } from "react-redux";
// import { addPost } from "../utils/postSlice";

// const CreatePost = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imgURL, setImgURL] = useState("");
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;

//     const res = await axios.post(
//       BASE_URL + "/post/create",
//       { title, content, imgURL },
//       { withCredentials: true }
//     );

//     dispatch(addPost(res.data.post));
//     setTitle("");
//     setContent("");
//     setImgURL("");
//   };

//   return (
//     <div className="bg-base-200 p-4 rounded-xl shadow mb-4">
//       <form onSubmit={handleSubmit} className="space-y-2">
//         <input
//           className="input input-bordered w-full"
//           placeholder="Post title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           className="textarea textarea-bordered w-full"
//           placeholder="Write something..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <input
//           className="input input-bordered w-full"
//           placeholder="Image URL (optional)"
//           value={imgURL}
//           onChange={(e) => setImgURL(e.target.value)}
//         />
//         <button className="btn btn-primary w-full">Post</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;
