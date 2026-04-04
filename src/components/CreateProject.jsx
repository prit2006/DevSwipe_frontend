// import React, { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addProject } from "../utils/projectSlice";

// function CreateProject() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     header: "",
//     description: "",
//     githubURL: "",
//     deployURL: "",
//     techStack: "",
//     isPublic: true,
//   });

//   const [images, setImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);

//     setImages(files);
//     setPreviewImages(files.map((file) => URL.createObjectURL(file)));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const formDataToSend = new FormData();

//       formDataToSend.append("header", formData.header);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("githubURL", formData.githubURL);
//       formDataToSend.append("deployURL", formData.deployURL);
//       formDataToSend.append("isPublic", formData.isPublic);

//       formData.techStack
//         .split(",")
//         .map((tech) => tech.trim())
//         .filter(Boolean)
//         .forEach((tech) => formDataToSend.append("techStack", tech));

//       images.forEach((img) => {
//         formDataToSend.append("images", img);
//       });

//       const res = await axios.post(
//         `${BASE_URL}/project/create`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       dispatch(addProject(res.data.project));
//       navigate("/projects/my");
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to create project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-blue-400 mb-8">
//         🚀 Create New Project
//       </h1>

//       {error && (
//         <div className="mb-6 p-4 bg-red-600 bg-opacity-20 border border-red-600 rounded-lg text-red-400">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">

//         {/* Header */}
//         <input
//           type="text"
//           name="header"
//           value={formData.header}
//           onChange={handleChange}
//           placeholder="Project Name"
//           required
//           className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
//         />

//         {/* Description */}
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Project Description"
//           required
//           rows="5"
//           className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
//         />

//         {/* GitHub URL */}
//         <input
//           type="url"
//           name="githubURL"
//           value={formData.githubURL}
//           onChange={handleChange}
//           placeholder="GitHub URL"
//           required
//           className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
//         />

//         {/* Deploy URL */}
//         <input
//           type="url"
//           name="deployURL"
//           value={formData.deployURL}
//           onChange={handleChange}
//           placeholder="Live Demo URL"
//           className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
//         />

//         {/* Tech Stack */}
//         <input
//           type="text"
//           name="techStack"
//           value={formData.techStack}
//           onChange={handleChange}
//           placeholder="React, Node, MongoDB"
//           className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
//         />

//         {/* Upload Images */}
//         <div>
//           <label className="text-gray-300 font-semibold">
//             Project Screenshots
//           </label>

//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="w-full mt-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
//           />
//         </div>

//         {/* Image Preview */}
//         {previewImages.length > 0 && (
//           <div className="grid grid-cols-3 gap-3">
//             {previewImages.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt="preview"
//                 className="rounded-lg h-24 object-cover"
//               />
//             ))}
//           </div>
//         )}

//         {/* Public */}
//         <div className="flex gap-3 items-center">
//           <input
//             type="checkbox"
//             name="isPublic"
//             checked={formData.isPublic}
//             onChange={handleChange}
//           />
//           <label>Make project public</label>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 bg-blue-600 rounded-lg"
//         >
//           {loading ? "Creating..." : "🚀 Create Project"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateProject;

// // import React, { useState } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { useNavigate } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { addProject } from "../utils/projectSlice";

// // function CreateProject() {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const [formData, setFormData] = useState({
// //     header: "",
// //     description: "",
// //     githubURL: "",
// //     deployURL: "",
// //     websiteImages: "",
// //     techStack: "",
// //     isPublic: true,
// //   });

// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     try {
// //       // Convert comma-separated strings to arrays
// //       const payload = {
// //         ...formData,
// //         websiteImages: formData.websiteImages
// //           ? formData.websiteImages.split(",").map((img) => img.trim())
// //           : [],
// //         techStack: formData.techStack
// //           ? formData.techStack.split(",").map((tech) => tech.trim())
// //           : [],
// //       };

// //       const res = await axios.post(`${BASE_URL}/project/create`, payload, {
// //         withCredentials: true,
// //       });

// //       dispatch(addProject(res.data.project));
// //       navigate("/projects/my");
// //     } catch (err) {
// //       setError(err.response?.data?.error || "Failed to create project");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-3xl mx-auto px-4 py-8">
// //       <h1 className="text-4xl font-bold text-blue-400 mb-8">
// //         🚀 Create New Project
// //       </h1>

// //       {error && (
// //         <div className="mb-6 p-4 bg-red-600 bg-opacity-20 border border-red-600 rounded-lg text-red-400">
// //           {error}
// //         </div>
// //       )}

// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         {/* Header */}
// //         <div>
// //           <label className="block text-gray-300 mb-2 font-semibold">
// //             Project Name *
// //           </label>
// //           <input
// //             type="text"
// //             name="header"
// //             value={formData.header}
// //             onChange={handleChange}
// //             required
// //             placeholder="E-commerce Platform"
// //             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>

// //         {/* Description */}
// //         <div>
// //           <label className="block text-gray-300 mb-2 font-semibold">
// //             Description *
// //           </label>
// //           <textarea
// //             name="description"
// //             value={formData.description}
// //             onChange={handleChange}
// //             required
// //             rows="5"
// //             placeholder="A full-stack e-commerce platform with payment integration..."
// //             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>

// //         {/* GitHub URL */}
// //         <div>
// //           <label className="block text-gray-300 mb-2 font-semibold">
// //             GitHub URL *
// //           </label>
// //           <input
// //             type="url"
// //             name="githubURL"
// //             value={formData.githubURL}
// //             onChange={handleChange}
// //             required
// //             placeholder="https://github.com/username/project"
// //             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>

// //         {/* Deploy URL */}
// //         <div>
// //           <label className="block text-gray-300 mb-2 font-semibold">
// //             Live Demo URL (Optional)
// //           </label>
// //           <input
// //             type="url"
// //             name="deployURL"
// //             value={formData.deployURL}
// //             onChange={handleChange}
// //             placeholder="https://myproject.vercel.app"
// //             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>

// //         {/* Tech Stack */}
// //         <div>
// //           <label className="block text-gray-300 mb-2 font-semibold">
// //             Tech Stack (comma-separated)
// //           </label>
// //           <input
// //             type="text"
// //             name="techStack"
// //             value={formData.techStack}
// //             onChange={handleChange}
// //             placeholder="React, Node.js, MongoDB, Express, Tailwind CSS"
// //             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //           <p className="text-sm text-gray-500 mt-1">
// //             Separate technologies with commas
// //           </p>
// //         </div>

// //         {/* Website Images */}
// //         <div>
// //           <label className="block text-gray-300 mb-2 font-semibold">
// //             Screenshot URLs (comma-separated, optional)
// //           </label>
// //           <textarea
// //             name="websiteImages"
// //             value={formData.websiteImages}
// //             onChange={handleChange}
// //             rows="3"
// //             placeholder="https://i.imgur.com/abc.png, https://i.imgur.com/xyz.png"
// //             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //           <p className="text-sm text-gray-500 mt-1">
// //             Add screenshot URLs separated by commas
// //           </p>
// //         </div>

// //         {/* Public Toggle */}
// //         <div className="flex items-center gap-3">
// //           <input
// //             type="checkbox"
// //             name="isPublic"
// //             checked={formData.isPublic}
// //             onChange={handleChange}
// //             className="w-5 h-5 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
// //           />
// //           <label className="text-gray-300 font-semibold">
// //             Make this project public (visible to connections)
// //           </label>
// //         </div>

// //         {/* Buttons */}
// //         <div className="flex gap-4">
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="flex-1 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
// //           >
// //             {loading ? "Creating..." : "🚀 Create Project"}
// //           </button>
// //           <button
// //             type="button"
// //             onClick={() => navigate("/projects")}
// //             className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
// //           >
// //             Cancel
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default CreateProject;

import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProject } from "../utils/projectSlice";

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

  .cj-card-entry { animation: cardEntry 0.75s cubic-bezier(0.16,1,0.3,1) forwards; }

  .cj-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .cj-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.22);
    border-radius: 10px;
    color: rgba(255,255,255,0.85);
    padding: 12px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
    box-sizing: border-box;
  }
  .cj-input::placeholder { color: rgba(255,255,255,0.2); }
  .cj-input:focus {
    border-color: rgba(168,85,247,0.6);
    box-shadow: 0 0 16px rgba(124,58,237,0.2);
  }

  .cj-textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.22);
    border-radius: 10px;
    color: rgba(255,255,255,0.85);
    padding: 12px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    outline: none;
    resize: vertical;
    min-height: 110px;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
    box-sizing: border-box;
    line-height: 1.6;
  }
  .cj-textarea::placeholder { color: rgba(255,255,255,0.2); }
  .cj-textarea:focus {
    border-color: rgba(168,85,247,0.6);
    box-shadow: 0 0 16px rgba(124,58,237,0.2);
  }

  .cj-file-btn {
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
  .cj-file-btn:hover {
    border-color: rgba(168,85,247,0.55);
    background: rgba(124,58,237,0.1);
    color: rgba(167,139,250,1);
  }

  .cj-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(167,139,250,0.5);
    margin-bottom: 7px;
  }

  .cj-field { margin-bottom: 18px; }

  .cj-submit-btn {
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    box-shadow: 0 0 30px rgba(124,58,237,0.4);
    transition: opacity 0.2s, transform 0.15s;
  }
  .cj-submit-btn:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
  .cj-submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .cj-cancel-btn {
    padding: 14px 24px;
    border-radius: 12px;
    border: 1px solid rgba(124,58,237,0.25);
    background: rgba(124,58,237,0.06);
    color: rgba(167,139,250,0.7);
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }
  .cj-cancel-btn:hover {
    background: rgba(124,58,237,0.15);
    border-color: rgba(168,85,247,0.45);
    color: rgba(167,139,250,1);
  }

  .cj-toggle {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }
  .cj-toggle input { display: none; }
  .cj-toggle-track {
    width: 44px; height: 24px;
    border-radius: 12px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(124,58,237,0.3);
    position: relative;
    transition: all 0.2s;
  }
  .cj-toggle input:checked + .cj-toggle-track {
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    border-color: transparent;
    box-shadow: 0 0 16px rgba(124,58,237,0.4);
  }
  .cj-toggle-thumb {
    position: absolute;
    top: 2px; left: 2px;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: white;
    transition: transform 0.2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.4);
  }
  .cj-toggle input:checked ~ .cj-toggle-thumb { transform: translateX(20px); }
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

function CreateProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    header: "", description: "", githubURL: "", deployURL: "", techStack: "", isPublic: true,
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("header", formData.header);
      fd.append("description", formData.description);
      fd.append("githubURL", formData.githubURL);
      fd.append("deployURL", formData.deployURL);
      fd.append("isPublic", formData.isPublic);
      formData.techStack.split(",").map(t => t.trim()).filter(Boolean).forEach(t => fd.append("techStack", t));
      images.forEach(img => fd.append("images", img));
      const res = await axios.post(`${BASE_URL}/project/create`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      dispatch(addProject(res.data.project));
      navigate("/projects/my");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      <div style={{ position:"relative", zIndex:5, maxWidth:680, margin:"0 auto", padding:"80px 24px 48px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(167,139,250,0.45)", marginBottom:10 }}>showcase your work</p>
          <h1 className="cj-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:34, fontWeight:900, lineHeight:1.1 }}>
            🚀 Create Project
          </h1>
        </div>

        {/* Error */}
        {error && (
          <div style={{ marginBottom:24, padding:"12px 16px", borderRadius:12, background:"rgba(236,72,153,0.08)", border:"1px solid rgba(236,72,153,0.25)" }}>
            <p style={{ color:"rgba(236,72,153,0.85)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>{error}</p>
          </div>
        )}

        {/* Form card */}
        <div className="cj-card-entry" style={{
          borderRadius:24,
          border:"1px solid rgba(124,58,237,0.22)",
          background:"rgba(255,255,255,0.03)",
          backdropFilter:"blur(40px)",
          boxShadow:"0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
          overflow:"hidden", position:"relative",
        }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed)", backgroundSize:"300% 100%", animation:"shimmerBorder 3s linear infinite" }}/>

          <div style={{ padding:"32px 28px 28px" }}>
            <form onSubmit={handleSubmit}>

              {/* Project Name */}
              <div className="cj-field">
                <label className="cj-label">Project Name *</label>
                <input className="cj-input" type="text" name="header" value={formData.header} onChange={handleChange} placeholder="My Awesome Project" required/>
              </div>

              {/* Description */}
              <div className="cj-field">
                <label className="cj-label">Description *</label>
                <textarea className="cj-textarea" name="description" value={formData.description} onChange={handleChange} placeholder="What does your project do? What problem does it solve?" required/>
              </div>

              {/* GitHub + Deploy row */}
              <div style={{ display:"flex", gap:12, marginBottom:18 }}>
                <div style={{ flex:1 }}>
                  <label className="cj-label">GitHub URL *</label>
                  <input className="cj-input" type="url" name="githubURL" value={formData.githubURL} onChange={handleChange} placeholder="https://github.com/..." required/>
                </div>
                <div style={{ flex:1 }}>
                  <label className="cj-label">Live Demo URL</label>
                  <input className="cj-input" type="url" name="deployURL" value={formData.deployURL} onChange={handleChange} placeholder="https://myapp.vercel.app"/>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="cj-field">
                <label className="cj-label">Tech Stack (comma separated)</label>
                <input className="cj-input" type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB, Tailwind CSS..."/>
              </div>

              {/* Screenshots */}
              <div className="cj-field">
                <label className="cj-label">Project Screenshots</label>
                <label className="cj-file-btn">
                  📸 &nbsp;{images.length > 0 ? `${images.length} file${images.length > 1 ? "s" : ""} selected` : "Choose screenshots..."}
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display:"none" }}/>
                </label>
              </div>

              {/* Image previews */}
              {previewImages.length > 0 && (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:10, marginBottom:20 }}>
                  {previewImages.map((img, i) => (
                    <div key={i} style={{ borderRadius:10, overflow:"hidden", border:"1px solid rgba(124,58,237,0.2)", aspectRatio:"16/9" }}>
                      <img src={img} alt="preview" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div style={{ height:1, background:"linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.2), transparent)", marginBottom:20 }}/>

              {/* Public toggle */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, padding:"14px 16px", borderRadius:12, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(124,58,237,0.12)" }}>
                <div>
                  <p style={{ color:"rgba(255,255,255,0.7)", fontSize:12, fontFamily:"'DM Mono', monospace", marginBottom:2 }}>Make project public</p>
                  <p style={{ color:"rgba(255,255,255,0.25)", fontSize:10, fontFamily:"'DM Mono', monospace", letterSpacing:"0.03em" }}>Visible to your connections</p>
                </div>
                <label className="cj-toggle" style={{ cursor:"pointer" }}>
                  <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange}/>
                  <div className="cj-toggle-track">
                    <div className="cj-toggle-thumb" style={{ transform: formData.isPublic ? "translateX(20px)" : "translateX(0)" }}/>
                  </div>
                </label>
              </div>

              {/* Buttons */}
              <div style={{ display:"flex", gap:12 }}>
                <button type="submit" className="cj-submit-btn" disabled={loading}>
                  {loading
                    ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                        <span style={{ width:14, height:14, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"white", display:"inline-block", animation:"spinRing 0.8s linear infinite" }}/>
                        Creating...
                      </span>
                    : "🚀 Create Project"
                  }
                </button>
                <button type="button" className="cj-cancel-btn" onClick={() => navigate("/projects")}>
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;