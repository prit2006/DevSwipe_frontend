// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { toggleSavedProject } from "../utils/userSlice";

// function SingleProject() {
//   const { projectId } = useParams();
//   const navigate = useNavigate();

//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const fetchProject = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/project/${projectId}`, {
//         withCredentials: true,
//       });
//       setProject(res.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const currentUser = useSelector((store) => store.user);
//   const dispatch = useDispatch();

//   const isSaved = currentUser?.savedProjects?.includes(projectId);
//   const [isSaving, setIsSaving] = useState(false);

//   const handleSave = async () => {
//     if (isSaving || !currentUser) return;
//     setIsSaving(true);

//     // Optimistic toggle
//     dispatch(toggleSavedProject(projectId));

//     try {
//       await axios.patch(
//         `${BASE_URL}/bookmark/project/${projectId}`,
//         {},
//         { withCredentials: true }
//       );
//     } catch (error) {
//       // Revert on error
//       dispatch(toggleSavedProject(projectId));
//       console.error("Error saving project:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   useEffect(() => {
//     fetchProject();
//   }, [projectId]);

//   const nextImage = () => {
//     if (project?.websiteImages?.length > 0) {
//       setCurrentImageIndex((prev) =>
//         prev === project.websiteImages.length - 1 ? 0 : prev + 1
//       );
//     }
//   };

//   const prevImage = () => {
//     if (project?.websiteImages?.length > 0) {
//       setCurrentImageIndex((prev) =>
//         prev === 0 ? project.websiteImages.length - 1 : prev - 1
//       );
//     }
//   };

//   /* ---------------- LOADING ---------------- */
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-2xl text-blue-400">Loading project...</div>
//       </div>
//     );
//   }

//   /* ---------------- ERROR ---------------- */
//   if (error) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <div className="bg-red-600 bg-opacity-20 border border-red-600 rounded-lg p-6 text-red-400">
//           <h2 className="text-2xl font-bold mb-2">Error</h2>
//           <p>{error}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
//           >
//             ← Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="text-center text-gray-400 text-2xl py-20">
//         Project not found
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       {/* Back */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
//       >
//         ← Back
//       </button>

//       {/* Project Card */}
//       <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-6">
//         <div className="flex justify-between items-start mb-4">
//           <h1 className="text-4xl font-bold text-white">
//             {project.header}
//           </h1>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={handleSave}
//               disabled={isSaving}
//               className={`px-4 py-2 rounded-lg border transition ${isSaved
//                   ? "bg-blue-600/20 text-blue-400 border-blue-600 hover:bg-blue-600/30"
//                   : "bg-transparent text-gray-300 border-gray-600 hover:border-gray-400"
//                 }`}
//             >
//               {isSaved ? "🔖 Saved" : "📑 Save"}
//             </button>
//             <span
//               className={`px-4 py-2 rounded-lg ${project.isPublic
//                   ? "bg-green-600 text-white"
//                   : "bg-gray-600 text-gray-300"
//                 }`}
//             >
//               {project.isPublic ? "🌍 Public" : "🔒 Private"}
//             </span>
//           </div>
//         </div>

//         {/* Owner */}
//         <div className="text-gray-400 mb-6">
//           Created by{" "}
//           <span className="text-white font-semibold">
//             {project.ownerId?.firstname} {project.ownerId?.lastname}
//           </span>
//         </div>

//         {/* Description */}
//         <h2 className="text-xl font-semibold text-blue-400 mb-2">
//           📝 Description
//         </h2>
//         <p className="text-gray-300 mb-6">{project.description}</p>

//         {/* Tech Stack */}
//         {project.techStack?.length > 0 && (
//           <>
//             <h2 className="text-xl font-semibold text-blue-400 mb-3">
//               🛠️ Tech Stack
//             </h2>
//             <div className="flex flex-wrap gap-3 mb-6">
//               {project.techStack.map((tech, index) => (
//                 <span
//                   key={index}
//                   className="px-4 py-2 bg-gray-700 text-blue-300 rounded-lg"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </>
//         )}

//         {/* Links */}
//         <div className="flex gap-4 mb-6">
//           {project.githubURL && (
//             <a
//               href={
//                 project.githubURL.startsWith("http")
//                   ? project.githubURL
//                   : `https://${project.githubURL}`
//               }
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-600 rounded-lg hover:border-blue-500 transition"
//             >
//               <span className="text-2xl">📂</span>
//               <span className="font-semibold text-white">GitHub</span>
//             </a>
//           )}

//           {project.deployURL && (
//             <a
//               href={
//                 project.deployURL.startsWith("http")
//                   ? project.deployURL
//                   : `https://${project.deployURL}`
//               }
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
//             >
//               <span className="text-2xl">🌐</span>
//               <span className="font-semibold text-white">Live Demo</span>
//             </a>
//           )}
//         </div>

//         {/* Dates */}
//         <div className="text-sm text-gray-500 flex gap-6">
//           <span>
//             Created: {new Date(project.createdAt).toLocaleDateString()}
//           </span>
//           <span>
//             Updated: {new Date(project.updatedAt).toLocaleDateString()}
//           </span>
//         </div>
//       </div>

//       {/* Screenshots */}
//       {project.websiteImages?.length > 0 && (
//         <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
//           <h2 className="text-2xl font-bold text-blue-400 mb-6">
//             📸 Screenshots
//           </h2>

//           <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
//             <img
//               src={project.websiteImages[currentImageIndex]}
//               alt="Screenshot"
//               className="w-full h-full object-contain"
//               onError={(e) => {
//                 e.target.src =
//                   "https://via.placeholder.com/800x600?text=Image+Not+Available";
//               }}
//             />

//             {project.websiteImages.length > 1 && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full"
//                 >
//                   ←
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full"
//                 >
//                   →
//                 </button>
//               </>
//             )}

//             <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-lg text-white text-sm">
//               {currentImageIndex + 1} / {project.websiteImages.length}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SingleProject;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSavedProject } from "../utils/userSlice";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Mono:wght@400;500&display=swap');

  @keyframes shimmerBorder {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes gradShift {
    0%,100% { background-position:0% 50%; }
    50%     { background-position:100% 50%; }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .sp-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .sp-card {
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    position: relative;
    border-radius: 22px;
    border: 1px solid rgba(124,58,237,0.2);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    padding: 40px 44px;
    transition: border-color 0.3s, box-shadow 0.3s;
    overflow: hidden;
  }
  .sp-card:hover {
    border-color: rgba(168,85,247,0.4);
    box-shadow: 0 24px 80px rgba(124,58,237,0.18);
  }
  .sp-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(167,139,250,0.5), rgba(6,182,212,0.4), transparent);
  }

  .sp-animated-border { position: relative; }
  .sp-animated-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 23px;
    padding: 1px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed);
    background-size: 300% 300%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: shimmerBorder 4s ease infinite;
    pointer-events: none;
  }

  .sp-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    border-radius: 12px;
    border: 1px solid rgba(124,58,237,0.3);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.7);
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: border-color 0.2s, background 0.2s, color 0.2s;
    margin-bottom: 28px;
  }
  .sp-back-btn:hover {
    border-color: rgba(168,85,247,0.6);
    background: rgba(124,58,237,0.1);
    color: white;
  }

  .sp-save-btn {
    padding: 10px 20px;
    border-radius: 12px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }
  .sp-save-btn.saved {
    background: rgba(6,182,212,0.12);
    border: 1px solid rgba(6,182,212,0.4);
    color: rgba(6,182,212,0.9);
  }
  .sp-save-btn.saved:hover {
    background: rgba(6,182,212,0.22);
    border-color: rgba(6,182,212,0.7);
  }
  .sp-save-btn.unsaved {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.6);
  }
  .sp-save-btn.unsaved:hover {
    border-color: rgba(167,139,250,0.5);
    color: white;
  }

  .sp-visibility-badge {
    padding: 10px 20px;
    border-radius: 12px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .sp-visibility-badge.public {
    background: linear-gradient(135deg, #059669, #10b981);
    color: white;
    box-shadow: 0 0 20px rgba(16,185,129,0.3);
  }
  .sp-visibility-badge.private {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.5);
  }

  .sp-section-title {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sp-tech-tag {
    padding: 7px 16px;
    border-radius: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    background: rgba(124,58,237,0.12);
    border: 1px solid rgba(124,58,237,0.25);
    color: rgba(167,139,250,0.9);
    transition: border-color 0.2s, background 0.2s;
  }
  .sp-tech-tag:hover {
    background: rgba(124,58,237,0.22);
    border-color: rgba(167,139,250,0.5);
  }

  .sp-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    border-radius: 14px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
  }
  .sp-link-btn.github {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.15);
    color: white;
  }
  .sp-link-btn.github:hover {
    background: rgba(124,58,237,0.15);
    border-color: rgba(167,139,250,0.5);
    box-shadow: 0 0 24px rgba(124,58,237,0.2);
    transform: translateY(-2px);
  }
  .sp-link-btn.live {
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    border: none;
    color: white;
    box-shadow: 0 0 24px rgba(124,58,237,0.3);
  }
  .sp-link-btn.live:hover {
    opacity: 0.85;
    transform: translateY(-2px);
    box-shadow: 0 0 36px rgba(124,58,237,0.5);
  }

  .sp-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124,58,237,0.2), rgba(6,182,212,0.15), transparent);
    margin: 28px 0;
  }

  .sp-screenshots-card {
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.12s forwards;
    position: relative;
    border-radius: 22px;
    border: 1px solid rgba(124,58,237,0.2);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    padding: 36px 40px;
    overflow: hidden;
    margin-top: 20px;
  }
  .sp-screenshots-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(167,139,250,0.4), rgba(6,182,212,0.3), transparent);
  }

  .sp-img-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(124,58,237,0.3);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, border-color 0.2s;
    backdrop-filter: blur(10px);
  }
  .sp-img-nav-btn:hover {
    background: rgba(124,58,237,0.4);
    border-color: rgba(167,139,250,0.6);
  }
`;

function SingleProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProject = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/project/${projectId}`, {
        withCredentials: true,
      });
      setProject(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch project");
    } finally {
      setLoading(false);
    }
  };

  const currentUser = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const isSaved = currentUser?.savedProjects?.includes(projectId);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving || !currentUser) return;
    setIsSaving(true);
    dispatch(toggleSavedProject(projectId));
    try {
      await axios.patch(
        `${BASE_URL}/bookmark/project/${projectId}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      dispatch(toggleSavedProject(projectId));
      console.error("Error saving project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => { fetchProject(); }, [projectId]);

  const nextImage = () => {
    if (project?.websiteImages?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === project.websiteImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project?.websiteImages?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.websiteImages.length - 1 : prev - 1
      );
    }
  };

  /* ── LOADING ── */
  if (loading) {
    return (
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"80vh" }}>
        <style>{styles}</style>
        <p style={{ fontFamily:"'DM Mono', monospace", fontSize:13, letterSpacing:"0.15em", color:"rgba(167,139,250,0.7)", textTransform:"uppercase" }}>
          Loading project...
        </p>
      </div>
    );
  }

  /* ── ERROR ── */
  if (error) {
    return (
      <div style={{ maxWidth:860, margin:"0 auto", padding:"40px 24px" }}>
        <style>{styles}</style>
        <div style={{ borderRadius:18, border:"1px solid rgba(239,68,68,0.3)", background:"rgba(239,68,68,0.06)", padding:32, backdropFilter:"blur(20px)" }}>
          <h2 style={{ color:"#f87171", fontFamily:"'Playfair Display', serif", fontSize:22, marginBottom:10 }}>Error</h2>
          <p style={{ color:"rgba(255,255,255,0.5)", fontFamily:"'DM Mono', monospace", fontSize:12 }}>{error}</p>
          <button onClick={() => navigate(-1)} className="sp-back-btn" style={{ marginTop:20, marginBottom:0 }}>← Back</button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:18, padding:"80px 0", fontFamily:"'DM Mono', monospace" }}>
        <style>{styles}</style>
        Project not found
      </div>
    );
  }

  return (
    <div style={{ maxWidth:860, margin:"0 auto", padding:"40px 24px 64px" }}>
      <style>{styles}</style>

      {/* Back */}
      <button onClick={() => navigate(-1)} className="sp-back-btn">
        ← Back
      </button>

      {/* ── Main Project Card ── */}
      <div className="sp-card sp-animated-border">

        {/* Header row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6, flexWrap:"wrap", gap:12 }}>
          <h1 className="sp-grad-title" style={{ fontFamily:"'Playfair Display', serif", fontSize:36, fontWeight:900, lineHeight:1.1 }}>
            {project.header}
          </h1>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`sp-save-btn ${isSaved ? "saved" : "unsaved"}`}
            >
              {isSaved ? "🔖 Saved" : "📑 Save"}
            </button>
            <span className={`sp-visibility-badge ${project.isPublic ? "public" : "private"}`}>
              {project.isPublic ? "🌍 Public" : "🔒 Private"}
            </span>
          </div>
        </div>

        {/* Owner */}
        <p style={{ fontFamily:"'DM Mono', monospace", fontSize:11, letterSpacing:"0.08em", color:"rgba(255,255,255,0.35)", marginBottom:28 }}>
          Created by{" "}
          <span style={{ color:"rgba(167,139,250,0.8)", fontWeight:500 }}>
            {project.ownerId?.firstname} {project.ownerId?.lastname}
          </span>
        </p>

        <div className="sp-divider" />

        {/* Description */}
        <div style={{ marginBottom:28 }}>
          <h2 className="sp-section-title" style={{ color:"rgba(56,189,248,0.8)" }}>
            <span>📝</span> Description
          </h2>
          <p style={{ color:"rgba(255,255,255,0.6)", fontFamily:"'DM Mono', monospace", fontSize:13, lineHeight:1.75 }}>
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        {project.techStack?.length > 0 && (
          <div style={{ marginBottom:28 }}>
            <h2 className="sp-section-title" style={{ color:"rgba(56,189,248,0.8)" }}>
              <span>🛠️</span> Tech Stack
            </h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {project.techStack.map((tech, index) => (
                <span key={index} className="sp-tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(project.githubURL || project.deployURL) && (
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:28 }}>
            {project.githubURL && (
              <a
                href={project.githubURL.startsWith("http") ? project.githubURL : `https://${project.githubURL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sp-link-btn github"
              >
                <span style={{ fontSize:20 }}>📂</span> GitHub
              </a>
            )}
            {project.deployURL && (
              <a
                href={project.deployURL.startsWith("http") ? project.deployURL : `https://${project.deployURL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sp-link-btn live"
              >
                <span style={{ fontSize:20 }}>🌐</span> Live Demo
              </a>
            )}
          </div>
        )}

        <div className="sp-divider" />

        {/* Dates */}
        <div style={{ display:"flex", gap:24, fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:"0.12em", color:"rgba(255,255,255,0.2)", textTransform:"uppercase" }}>
          <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
          <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* ── Screenshots Card ── */}
      {project.websiteImages?.length > 0 && (
        <div className="sp-screenshots-card">
          <h2 className="sp-section-title" style={{ color:"rgba(56,189,248,0.8)", marginBottom:20, fontSize:13 }}>
            <span>📸</span> Screenshots
          </h2>

          <div style={{ position:"relative", borderRadius:14, overflow:"hidden", aspectRatio:"16/9", background:"rgba(0,0,0,0.4)", border:"1px solid rgba(124,58,237,0.15)" }}>
            <img
              src={project.websiteImages[currentImageIndex]}
              alt="Screenshot"
              style={{ width:"100%", height:"100%", objectFit:"contain" }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Available"; }}
            />

            {project.websiteImages.length > 1 && (
              <>
                <button onClick={prevImage} className="sp-img-nav-btn" style={{ left:12 }}>←</button>
                <button onClick={nextImage} className="sp-img-nav-btn" style={{ right:12 }}>→</button>
              </>
            )}

            <div style={{ position:"absolute", bottom:12, right:12, background:"rgba(0,0,0,0.65)", backdropFilter:"blur(8px)", border:"1px solid rgba(124,58,237,0.25)", padding:"4px 12px", borderRadius:8, fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:"0.1em", color:"rgba(255,255,255,0.7)" }}>
              {currentImageIndex + 1} / {project.websiteImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProject;