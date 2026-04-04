// import React, { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useNavigate } from "react-router-dom";

// const CreatePost = () => {

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const navigate = useNavigate();

//   const handleImageChange = (e) => {

//     const file = e.target.files[0];

//     if (!file) return;

  

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     if (!title.trim() || isSubmitting) return;

//     setIsSubmitting(true);

//     try {

//       const formData = new FormData();

//       formData.append("title", title);
//       formData.append("content", content);

//       if (image) {
//         formData.append("image", image);
//       }

//       await axios.post(
//         `${BASE_URL}/post/create`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       navigate("/posts");

//     } catch (error) {

//       console.error("Error creating post:", error);
//       alert("Failed to create post");

//     } finally {

//       setIsSubmitting(false);

//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-base-200 p-6 rounded-xl shadow-lg">

//       <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Title */}

//         <input
//           className="input input-bordered w-full"
//           placeholder="Post title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         {/* Content */}

//         <textarea
//           className="textarea textarea-bordered w-full h-32"
//           placeholder="Write something..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />

//         {/* Image Upload */}

//         <input
//           type="file"
//           accept="image/*"
//           className="file-input file-input-bordered w-full"
//           onChange={handleImageChange}
//         />

//         {/* Preview */}

//         {preview && (

//           <div className="relative">

//             <img
//               src={preview}
//               alt="preview"
//               className="w-full max-h-64 object-cover rounded-lg"
//             />

//             <button
//               type="button"
//               onClick={() => {
//                 setImage(null);
//                 setPreview("");
//               }}
//               className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
//             >
//               ✕
//             </button>

//           </div>
//         )}

//         <button
//           type="submit"
//           className="btn btn-primary w-full"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <>
//               <span className="loading loading-spinner"></span>
//               Posting...
//             </>
//           ) : (
//             "Create Post"
//           )}
//         </button>

//       </form>

//     </div>
//   );
// };

// export default CreatePost;

// // import React, { useState } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { useNavigate } from "react-router-dom";

// // const CreatePost = () => {
// //   const [title, setTitle] = useState("");
// //   const [content, setContent] = useState("");
// //   const [imgURL, setImgURL] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [imagePreview, setImagePreview] = useState("");
// //   const navigate = useNavigate();

// //   const handleImageURLChange = (e) => {
// //     const url = e.target.value;
// //     setImgURL(url);
// //     setImagePreview(url);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!title.trim() || isSubmitting) return;

// //     setIsSubmitting(true);
// //     try {
// //       await axios.post(
// //         `${BASE_URL}/post/create`,
// //         { title, content, imgURL },
// //         { withCredentials: true }
// //       );

// //       // Success notification
// //       const notification = document.createElement("div");
// //       notification.className = "toast toast-top toast-end";
// //       notification.innerHTML = `
// //         <div class="alert alert-success">
// //           <span>✅ Post created successfully!</span>
// //         </div>
// //       `;
// //       document.body.appendChild(notification);
// //       setTimeout(() => notification.remove(), 3000);

// //       // Redirect
// //       navigate("/posts");
// //     } catch (error) {
// //       console.error("Error creating post:", error);
// //       alert("Failed to create post. Please try again.");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-xl mx-auto mt-10 bg-base-200 p-6 rounded-xl shadow-lg">
// //       <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <div>
// //           <label className="label">
// //             <span className="label-text font-semibold">Title *</span>
// //           </label>
// //           <input
// //             className="input input-bordered w-full"
// //             placeholder="What's on your mind?"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="label">
// //             <span className="label-text font-semibold">Content</span>
// //           </label>
// //           <textarea
// //             className="textarea textarea-bordered w-full h-32"
// //             placeholder="Share your thoughts..."
// //             value={content}
// //             onChange={(e) => setContent(e.target.value)}
// //           />
// //         </div>

// //         <div>
// //           <label className="label">
// //             <span className="label-text font-semibold">Image URL</span>
// //           </label>
// //           <input
// //             className="input input-bordered w-full"
// //             placeholder="https://example.com/image.jpg"
// //             value={imgURL}
// //             onChange={handleImageURLChange}
// //           />
// //         </div>

// //         {/* Image Preview */}
// //         {imagePreview && (
// //           <div className="relative">
// //             <img
// //               src={imagePreview}
// //               alt="Preview"
// //               className="w-full max-h-64 object-cover rounded-lg"
// //               onError={() => setImagePreview("")}
// //             />
// //             <button
// //               type="button"
// //               onClick={() => {
// //                 setImgURL("");
// //                 setImagePreview("");
// //               }}
// //               className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
// //             >
// //               ×
// //             </button>
// //           </div>
// //         )}

// //         <button
// //           type="submit"
// //           className="btn btn-primary w-full"
// //           disabled={isSubmitting || !title.trim()}
// //         >
// //           {isSubmitting ? (
// //             <>
// //               <span className="loading loading-spinner"></span>
// //               Posting...
// //             </>
// //           ) : (
// //             "Create Post"
// //           )}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreatePost;


// // import React, { useState } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { useNavigate } from "react-router-dom";

// // const CreatePost = () => {
// //   const [title, setTitle] = useState("");
// //   const [content, setContent] = useState("");
// //   const [imgURL, setImgURL] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!title.trim()) return;

// //     await axios.post(
// //       BASE_URL + "/post/create",
// //       { title, content, imgURL },
// //       { withCredentials: true }
// //     );

// //     // ✅ Popup
// //     alert("✅ Post created successfully!");

// //     // ✅ Redirect
// //     navigate("/posts");
// //   };

// //   return (
// //     <div className="max-w-xl mx-auto mt-10 bg-base-200 p-4 rounded-xl">
// //       <h2 className="text-xl font-bold mb-3">Create New Post</h2>

// //       <form onSubmit={handleSubmit} className="space-y-3">
// //         <input
// //           className="input input-bordered w-full"
// //           placeholder="Post title"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //         />

// //         <textarea
// //           className="textarea textarea-bordered w-full"
// //           placeholder="Write something..."
// //           value={content}
// //           onChange={(e) => setContent(e.target.value)}
// //         />

// //         <input
// //           className="input input-bordered w-full"
// //           placeholder="Image URL (optional)"
// //           value={imgURL}
// //           onChange={(e) => setImgURL(e.target.value)}
// //         />

// //         <button className="btn btn-primary w-full">Post</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreatePost;


// // import React, { useState } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { useDispatch } from "react-redux";
// // import { addPost } from "../utils/postSlice";

// // const CreatePost = () => {
// //   const [title, setTitle] = useState("");
// //   const [content, setContent] = useState("");
// //   const [imgURL, setImgURL] = useState("");
// //   const dispatch = useDispatch();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!title.trim()) return;

// //     const res = await axios.post(
// //       BASE_URL + "/post/create",
// //       { title, content, imgURL },
// //       { withCredentials: true }
// //     );

// //     dispatch(addPost(res.data.post));
// //     setTitle("");
// //     setContent("");
// //     setImgURL("");
// //   };

// //   return (
// //     <div className="bg-base-200 p-4 rounded-xl shadow mb-4">
// //       <form onSubmit={handleSubmit} className="space-y-2">
// //         <input
// //           className="input input-bordered w-full"
// //           placeholder="Post title"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //         />
// //         <textarea
// //           className="textarea textarea-bordered w-full"
// //           placeholder="Write something..."
// //           value={content}
// //           onChange={(e) => setContent(e.target.value)}
// //         />
// //         <input
// //           className="input input-bordered w-full"
// //           placeholder="Image URL (optional)"
// //           value={imgURL}
// //           onChange={(e) => setImgURL(e.target.value)}
// //         />
// //         <button className="btn btn-primary w-full">Post</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreatePost;

import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Mono:wght@400;500&display=swap');

  @keyframes aurora1 {
    0%   { transform: translate(0%,0%) scale(1) rotate(0deg); }
    25%  { transform: translate(8%,-12%) scale(1.15) rotate(15deg); }
    50%  { transform: translate(-6%,8%) scale(0.9) rotate(-10deg); }
    75%  { transform: translate(10%,5%) scale(1.1) rotate(20deg); }
    100% { transform: translate(0%,0%) scale(1) rotate(0deg); }
  }
  @keyframes aurora2 {
    0%   { transform: translate(0%,0%) scale(1) rotate(0deg); }
    30%  { transform: translate(-10%,10%) scale(1.2) rotate(-20deg); }
    60%  { transform: translate(12%,-8%) scale(0.85) rotate(15deg); }
    100% { transform: translate(0%,0%) scale(1) rotate(0deg); }
  }
  @keyframes aurora3 {
    0%   { transform: translate(0%,0%) scale(1); opacity:0.5; }
    50%  { transform: translate(-15%,15%) scale(1.3); opacity:0.8; }
    100% { transform: translate(0%,0%) scale(1); opacity:0.5; }
  }
  @keyframes aurora4 {
    0%   { transform: translate(0%,0%) scale(1); }
    40%  { transform: translate(18%,-10%) scale(1.25); }
    80%  { transform: translate(-8%,12%) scale(0.9); }
    100% { transform: translate(0%,0%) scale(1); }
  }
  @keyframes twinkle {
    0%,100% { opacity:0.1; transform:scale(0.8); }
    50%     { opacity:1; transform:scale(1.4); }
  }
  @keyframes particle {
    0%   { transform: translateY(100vh) translateX(0) scale(0); opacity:0; }
    10%  { opacity:1; } 90% { opacity:0.6; }
    100% { transform: translateY(-10vh) translateX(var(--dx)) scale(1.5); opacity:0; }
  }
  @keyframes shimmerBorder {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes gradShift {
    0%,100% { background-position:0% 50%; }
    50%     { background-position:100% 50%; }
  }
  @keyframes cardEntry {
    0%   { opacity:0; transform:perspective(800px) rotateX(8deg) translateY(50px) scale(0.95); }
    100% { opacity:1; transform:perspective(800px) rotateX(0deg) translateY(0) scale(1); }
  }
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .cp-card-entry { animation: cardEntry 0.75s cubic-bezier(0.16,1,0.3,1) forwards; }

  .cp-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .cp-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.22);
    border-radius: 10px;
    color: rgba(255,255,255,0.85);
    padding: 12px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
    box-sizing: border-box;
  }
  .cp-input::placeholder { color: rgba(255,255,255,0.2); }
  .cp-input:focus {
    border-color: rgba(168,85,247,0.6);
    box-shadow: 0 0 16px rgba(124,58,237,0.2);
  }

  .cp-textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.22);
    border-radius: 10px;
    color: rgba(255,255,255,0.85);
    padding: 12px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    outline: none;
    resize: vertical;
    min-height: 120px;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
    box-sizing: border-box;
    line-height: 1.6;
  }
  .cp-textarea::placeholder { color: rgba(255,255,255,0.2); }
  .cp-textarea:focus {
    border-color: rgba(168,85,247,0.6);
    box-shadow: 0 0 16px rgba(124,58,237,0.2);
  }

  .cp-file-btn {
    width: 100%;
    padding: 14px;
    border-radius: 10px;
    border: 1px dashed rgba(124,58,237,0.35);
    background: rgba(124,58,237,0.04);
    color: rgba(167,139,250,0.65);
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    box-sizing: border-box;
    display: block;
  }
  .cp-file-btn:hover {
    border-color: rgba(168,85,247,0.55);
    background: rgba(124,58,237,0.1);
    color: rgba(167,139,250,1);
  }

  .cp-submit-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    box-shadow: 0 0 30px rgba(124,58,237,0.4);
    transition: opacity 0.2s, transform 0.15s;
  }
  .cp-submit-btn:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
  .cp-submit-btn:active:not(:disabled) { transform: scale(0.98); }
  .cp-submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .cp-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(167,139,250,0.5);
    margin-bottom: 7px;
  }

  .cp-remove-btn {
    position: absolute;
    top: 10px; right: 10px;
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(236,72,153,0.4);
    background: rgba(236,72,153,0.15);
    color: rgba(236,72,153,0.9);
    cursor: pointer;
    font-size: 12px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
  }
  .cp-remove-btn:hover {
    background: rgba(236,72,153,0.3);
    border-color: rgba(236,72,153,0.7);
  }
`;

const AuroraBg = () => (
  <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
    <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, #0d0520 0%, #050510 50%, #030308 100%)" }}/>
    <div style={{ position:"absolute", top:"-20%", left:"-10%", width:"70%", height:"70%", background:"radial-gradient(ellipse, rgba(124,58,237,0.45) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)", filter:"blur(60px)", animation:"aurora1 18s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", top:"10%", right:"-15%", width:"60%", height:"60%", background:"radial-gradient(ellipse, rgba(6,182,212,0.35) 0%, rgba(56,189,248,0.15) 40%, transparent 70%)", filter:"blur(80px)", animation:"aurora2 22s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", bottom:"-10%", left:"20%", width:"50%", height:"50%", background:"radial-gradient(ellipse, rgba(236,72,153,0.3) 0%, rgba(167,139,250,0.15) 50%, transparent 70%)", filter:"blur(70px)", animation:"aurora3 14s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", bottom:"20%", right:"5%", width:"40%", height:"40%", background:"radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, transparent 70%)", filter:"blur(50px)", animation:"aurora4 26s ease-in-out infinite" }}/>
    {[...Array(40)].map((_, i) => (
      <div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, width:i%5===0?3:i%3===0?2:1, height:i%5===0?3:i%3===0?2:1, borderRadius:"50%", background:"white", animation:`twinkle ${2+Math.random()*4}s ease-in-out ${Math.random()*4}s infinite` }}/>
    ))}
    {[...Array(14)].map((_, i) => (
      <div key={i} style={{ position:"absolute", left:`${5+i*7}%`, bottom:0, width:i%3===0?3:2, height:i%3===0?3:2, borderRadius:"50%", background:i%2===0?`rgba(168,85,247,0.5)`:`rgba(6,182,212,0.5)`, "--dx":`${-40+Math.random()*80}px`, animation:`particle ${6+Math.random()*10}s ease-in ${Math.random()*8}s infinite` }}/>
    ))}
  </div>
);

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);
      await axios.post(`${BASE_URL}/post/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      navigate("/posts");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 24px 48px" }}>
      <style>{styles}</style>
      <AuroraBg />

      <div className="cp-card-entry" style={{
        position:"relative", zIndex:5,
        width:"100%", maxWidth:540,
        borderRadius:24,
        border:"1px solid rgba(124,58,237,0.22)",
        background:"rgba(255,255,255,0.03)",
        backdropFilter:"blur(40px)",
        boxShadow:"0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        overflow:"hidden",
      }}>
        {/* shimmer top bar */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed)", backgroundSize:"300% 100%", animation:"shimmerBorder 3s linear infinite" }}/>

        <div style={{ padding:"36px 32px 32px" }}>

          {/* Header */}
          <div style={{ marginBottom:28, textAlign:"center" }}>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(167,139,250,0.45)", marginBottom:8 }}>share with the community</p>
            <h2 className="cp-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:28, fontWeight:900, lineHeight:1.1 }}>
              Create Post
            </h2>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div style={{ marginBottom:16 }}>
              <label className="cp-label">Title *</label>
              <input
                className="cp-input"
                placeholder="What's on your mind?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content */}
            <div style={{ marginBottom:16 }}>
              <label className="cp-label">Content</label>
              <textarea
                className="cp-textarea"
                placeholder="Share your thoughts, ideas, or a project update..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom:20 }}>
              <label className="cp-label">Image (optional)</label>
              <label className="cp-file-btn">
                📷 &nbsp;{image ? image.name : "Choose an image to attach..."}
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display:"none" }}/>
              </label>
            </div>

            {/* Preview */}
            {preview && (
              <div style={{ position:"relative", marginBottom:20, borderRadius:12, overflow:"hidden", border:"1px solid rgba(124,58,237,0.2)" }}>
                <img src={preview} alt="preview" style={{ width:"100%", maxHeight:240, objectFit:"cover", display:"block" }}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 60%, rgba(3,3,8,0.5) 100%)", pointerEvents:"none" }}/>
                <button
                  type="button"
                  className="cp-remove-btn"
                  onClick={() => { setImage(null); setPreview(""); }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Divider */}
            <div style={{ height:1, background:"linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.2), transparent)", marginBottom:20 }}/>

            {/* Submit */}
            <button type="submit" className="cp-submit-btn" disabled={isSubmitting || !title.trim()}>
              {isSubmitting
                ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                    <span style={{ width:14, height:14, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"white", display:"inline-block", animation:"spinRing 0.8s linear infinite" }}/>
                    Posting...
                  </span>
                : "Publish Post →"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;