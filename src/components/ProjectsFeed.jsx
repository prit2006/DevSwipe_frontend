// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { addProjects } from "../utils/projectSlice";
// import { Link } from "react-router-dom";

// function ProjectsFeed() {
//   const projects = useSelector((store) => store.project);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [searchTech, setSearchTech] = useState("");
//   const [page, setPage] = useState(1);
//   const [pagination, setPagination] = useState(null);

//   const fetchProjects = async (pageNum = 1, tech = "") => {
//     try {
//       setLoading(true);
//       let url = `${BASE_URL}/project/feed/all?page=${pageNum}&limit=10`;

//       if (tech) {
//         url = `${BASE_URL}/project/search/tech?tech=${tech}`;
//       }

//       const res = await axios.get(url, { withCredentials: true });

//       if (tech) {
//         dispatch(addProjects(res.data));
//         setPagination(null);
//       } else {
//         dispatch(addProjects(res.data.projects));
//         setPagination(res.data.pagination);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects(page, searchTech);
//   }, [page]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//     fetchProjects(1, searchTech);
//   };

//   if (loading && !projects) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-2xl text-green-400">Loading projects...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold text-blue-400">🚀 Projects Feed</h1>
//         <Link
//           to="/projects/create"
//           className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
//         >
//           ➕ New Project
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="mb-8">
//         <div className="flex gap-4">
//           <input
//             type="text"
//             value={searchTech}
//             onChange={(e) => setSearchTech(e.target.value)}
//             placeholder="Search by tech stack (React, Node, MongoDB...)"
//             className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
//           />
//           <button className="px-6 py-3 bg-green-600 rounded-lg">
//             🔍 Search
//           </button>
//         </div>
//       </form>

//       {!projects || projects.length === 0 ? (
//         <div className="text-center text-2xl text-gray-400 my-10">
//           No projects found. Connect with developers to see their projects!
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {projects.map((project) => (
//               <Link
//                 key={project._id}
//                 to={`/projects/${project._id}`}
//                 className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition"
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-start mb-3">
//                   <h2 className="text-2xl font-bold text-white">
//                     {project.header}
//                   </h2>
//                   <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">
//                     Public
//                   </span>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-400 mb-3 line-clamp-2">
//                   {project.description}
//                 </p>

//                 {/* Tech Stack */}
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {project.techStack?.map((tech, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 bg-gray-700 text-blue-300 text-sm rounded-full"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Owner */}
//                 <div className="text-sm text-gray-400">
//                  By{" "}
//                 <span className="text-white font-semibold">
//                       {project.ownerId?.firstname} {project.ownerId?.lastname}
//                 </span>
//                 </div>

               

//                 {/* Links */}
//                 <div className="flex gap-4 mt-3 text-sm text-gray-500">
//                   {project.githubURL && <span>📂 GitHub</span>}
//                   {project.deployURL && <span>🌐 Live Demo</span>}
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {pagination && (
//             <div className="flex justify-center gap-4 mt-8">
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//                 className="px-4 py-2 bg-gray-700 rounded-lg"
//               >
//                 ← Previous
//               </button>

//               <span className="text-gray-400">
//                 Page {pagination.currentPage} of {pagination.totalPages}
//               </span>

//               <button
//                 disabled={page === pagination.totalPages}
//                 onClick={() => setPage(page + 1)}
//                 className="px-4 py-2 bg-gray-700 rounded-lg"
//               >
//                 Next →
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default ProjectsFeed;


// // // components/ProjectsFeed.js
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addProjects } from "../utils/projectSlice";
// // import { Link } from "react-router-dom";

// // function ProjectsFeed() {
// //   const projects = useSelector((store) => store.project);
// //   const dispatch = useDispatch();
// //   const [loading, setLoading] = useState(false);
// //   const [searchTech, setSearchTech] = useState("");
// //   const [page, setPage] = useState(1);
// //   const [pagination, setPagination] = useState(null);

// //   const fetchProjects = async (pageNum = 1, tech = "") => {
// //     try {
// //       setLoading(true);
// //       let url = `${BASE_URL}/project/feed/all?page=${pageNum}&limit=10`;
      
// //       if (tech) {
// //         url = `${BASE_URL}/project/search/tech?tech=${tech}`;
// //       }

// //       const res = await axios.get(url, { withCredentials: true });

// //       if (tech) {
// //         dispatch(addProjects(res.data));
// //       } else {
// //         dispatch(addProjects(res.data.projects));
// //         setPagination(res.data.pagination);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProjects(page, searchTech);
// //   }, [page]);

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     setPage(1);
// //     fetchProjects(1, searchTech);
// //   };

// //   if (loading && !projects) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="text-2xl text-green-400">Loading projects...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-6xl mx-auto px-4 py-8">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-4xl font-bold text-blue-400">🚀 Projects Feed</h1>
// //         <Link
// //           to="/projects/create"
// //           className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
// //         >
// //           ➕ New Project
// //         </Link>
// //       </div>

// //       {/* Search Bar */}
// //       <form onSubmit={handleSearch} className="mb-8">
// //         <div className="flex gap-4">
// //           <input
// //             type="text"
// //             value={searchTech}
// //             onChange={(e) => setSearchTech(e.target.value)}
// //             placeholder="Search by tech stack (React, Node, MongoDB...)"
// //             className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //           <button
// //             type="submit"
// //             className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition font-semibold"
// //           >
// //             🔍 Search
// //           </button>
// //           {searchTech && (
// //             <button
// //               type="button"
// //               onClick={() => {
// //                 setSearchTech("");
// //                 setPage(1);
// //                 fetchProjects(1, "");
// //               }}
// //               className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
// //             >
// //               Clear
// //             </button>
// //           )}
// //         </div>
// //       </form>

// //       {/* Projects Grid */}
// //       {!projects || projects.length === 0 ? (
// //         <div className="text-center text-2xl text-gray-400 my-10">
// //           No projects found. Connect with developers to see their projects!
// //         </div>
// //       ) : (
// //         <>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {projects.map((project) => (
// //               <Link
// //                 key={project._id}
// //                 to={`/projects/${project._id}`}
// //                 className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition group"
// //               >
// //                 {/* Header */}
// //                 <div className="flex justify-between items-start mb-4">
// //                   <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition">
// //                     {project.header}
// //                   </h2>
// //                   {project.isPublic && (
// //                     <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">
// //                       Public
// //                     </span>
// //                   )}
// //                 </div>

// //                 {/* Description */}
// //                 <p className="text-gray-400 mb-4 line-clamp-2">
// //                   {project.description}
// //                 </p>

// //                 {/* Tech Stack */}
// //                 <div className="flex flex-wrap gap-2 mb-4">
// //                   {project.techStack?.slice(0, 5).map((tech, index) => (
// //                     <span
// //                       key={index}
// //                       className="px-3 py-1 bg-gray-700 text-blue-300 text-sm rounded-full"
// //                     >
// //                       {tech}
// //                     </span>
// //                   ))}
// //                   {project.techStack?.length > 5 && (
// //                     <span className="px-3 py-1 bg-gray-700 text-gray-400 text-sm rounded-full">
// //                       +{project.techStack.length - 5} more
// //                     </span>
// //                   )}
// //                 </div>

// //                 {/* Owner */}
// //                 <div className="flex items-center gap-2 text-sm text-gray-400">
// //                   <span>By:</span>
// //                   <span className="text-white font-semibold">
// //                     {project.ownerId?.firstName} {project.ownerId?.lastName}
// //                   </span>
// //                 </div>

// //                 {/* Links Preview */}
// //                 <div className="flex gap-4 mt-4 text-sm">
// //                   {project.githubURL && (
// //                     <span className="text-gray-500">📂 GitHub</span>
// //                   )}
// //                   {project.deployURL && (
// //                     <span className="text-gray-500">🌐 Live Demo</span>
// //                   )}
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>

// //           {/* Pagination */}
// //           {pagination && !searchTech && (
// //             <div className="flex justify-center items-center gap-4 mt-8">
// //               <button
// //                 onClick={() => setPage(page - 1)}
// //                 disabled={page === 1}
// //                 className={`px-6 py-2 rounded-lg font-semibold ${
// //                   page === 1
// //                     ? "bg-gray-700 text-gray-500 cursor-not-allowed"
// //                     : "bg-blue-600 hover:bg-blue-700"
// //                 }`}
// //               >
// //                 ← Previous
// //               </button>

// //               <span className="text-gray-400">
// //                 Page {pagination.currentPage} of {pagination.totalPages}
// //               </span>

// //               <button
// //                 onClick={() => setPage(page + 1)}
// //                 disabled={page === pagination.totalPages}
// //                 className={`px-6 py-2 rounded-lg font-semibold ${
// //                   page === pagination.totalPages
// //                     ? "bg-gray-700 text-gray-500 cursor-not-allowed"
// //                     : "bg-blue-600 hover:bg-blue-700"
// //                 }`}
// //               >
// //                 Next →
// //               </button>
// //             </div>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // export default ProjectsFeed;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addProjects } from "../utils/projectSlice";
import { Link } from "react-router-dom";

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
    10%  { opacity:1; }
    90%  { opacity:0.6; }
    100% { transform: translateY(-10vh) translateX(var(--dx)) scale(1.5); opacity:0; }
  }
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes dotWave {
    0%,100% { transform:scaleY(0.3) scaleX(0.8); opacity:0.3; }
    50%     { transform:scaleY(1.4) scaleX(1); opacity:1; }
  }
  @keyframes cardEntry {
    0%   { opacity:0; transform:perspective(800px) rotateX(8deg) translateY(60px) scale(0.92); }
    100% { opacity:1; transform:perspective(800px) rotateX(0deg) translateY(0) scale(1); }
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
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes iconFloat {
    0%,100% { transform:translateY(0) rotate(0deg); }
    50%     { transform:translateY(-12px) rotate(5deg); }
  }

  .pj-card-entry { animation: cardEntry 0.85s cubic-bezier(0.16,1,0.3,1) forwards; }

  .pj-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .pj-animated-border {
    position: relative;
  }
  .pj-animated-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 17px;
    padding: 1px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed);
    background-size: 300% 300%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: shimmerBorder 4s ease infinite;
    pointer-events: none;
  }

  .pj-project-card {
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    position: relative;
    border-radius: 16px;
    border: 1px solid rgba(124,58,237,0.2);
    background: rgba(255,255,255,0.03);
    backdropFilter: blur(20px);
    padding: 24px;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    text-decoration: none;
    display: block;
  }
  .pj-project-card:hover {
    border-color: rgba(168,85,247,0.5);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(124,58,237,0.2), 0 0 0 1px rgba(124,58,237,0.15);
  }
  .pj-project-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(167,139,250,0.4), rgba(6,182,212,0.3), transparent);
    border-radius: 16px 16px 0 0;
  }

  .pj-input {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.25);
    border-radius: 12px;
    color: rgba(255,255,255,0.8);
    padding: 12px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
  }
  .pj-input::placeholder { color: rgba(255,255,255,0.25); }
  .pj-input:focus {
    border-color: rgba(168,85,247,0.6);
    box-shadow: 0 0 20px rgba(124,58,237,0.2);
  }

  .pj-btn-search {
    padding: 12px 20px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(124,58,237,0.3);
    transition: opacity 0.2s, transform 0.2s;
  }
  .pj-btn-search:hover { opacity: 0.85; transform: translateY(-1px); }

  .pj-btn-page {
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid rgba(124,58,237,0.3);
    background: rgba(124,58,237,0.1);
    color: rgba(167,139,250,0.8);
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
  }
  .pj-btn-page:hover:not(:disabled) {
    background: rgba(124,58,237,0.25);
    border-color: rgba(168,85,247,0.6);
    box-shadow: 0 0 20px rgba(124,58,237,0.2);
  }
  .pj-btn-page:disabled { opacity: 0.3; cursor: not-allowed; }
`;

/* ── Aurora Background ───────────────────────────────────────────── */
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

/* ── Orb Loader ──────────────────────────────────────────────────── */
const OrbLoader = () => (
  <div style={{ position:"relative", width:100, height:100 }}>
    {[0,1,2].map(i => (
      <div key={i} style={{ position:"absolute", inset:i*14, borderRadius:"50%", border:`${1.5-i*0.3}px solid transparent`, borderTopColor:["#a78bfa","#38bdf8","#ec4899"][i], borderRightColor:`rgba(${["167,139,250","56,189,248","236,72,153"][i]},0.2)`, animation:`spinRing ${0.9+i*0.5}s linear infinite ${i%2===0?"":" reverse"}` }}/>
    ))}
    <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:18, height:18, borderRadius:"50%", background:"radial-gradient(circle, #e879f9 0%, #7c3aed 100%)", boxShadow:"0 0 30px rgba(232,121,249,0.8), 0 0 60px rgba(124,58,237,0.4)" }}/>
  </div>
);

/* ════════════════════════════════════════════════════════════════════ */
function ProjectsFeed() {
  const projects = useSelector((store) => store.project);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchTech, setSearchTech] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchProjects = async (pageNum = 1, tech = "") => {
    try {
      setLoading(true);
      let url = `${BASE_URL}/project/feed/all?page=${pageNum}&limit=10`;
      if (tech) url = `${BASE_URL}/project/search/tech?tech=${tech}`;
      const res = await axios.get(url, { withCredentials: true });
      if (tech) {
        dispatch(addProjects(res.data));
        setPagination(null);
      } else {
        dispatch(addProjects(res.data.projects));
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(page, searchTech); }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProjects(1, searchTech);
  };

  /* ── LOADING ──────────────────────────────────────────────────── */
  if (loading && !projects) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", background:"#030308" }}>
        <style>{styles}</style>
        <AuroraBg />
        <div className="pj-card-entry" style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:28 }}>
          <OrbLoader />
          <p style={{ fontFamily:"'DM Mono', monospace", letterSpacing:"0.3em", fontSize:11, textTransform:"uppercase", color:"rgba(167,139,250,0.75)" }}>
            Loading projects
          </p>
          <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:24 }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{ width:4, height:18, borderRadius:2, background:"linear-gradient(to top, #7c3aed, #38bdf8)", animation:`dotWave 1s ease-in-out ${i*0.12}s infinite` }}/>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── MAIN ─────────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* live badge */}
      <div style={{ position:"fixed", top:72, left:28, zIndex:10, display:"flex", alignItems:"center", gap:8, padding:"6px 12px", borderRadius:20, background:"rgba(124,58,237,0.12)", border:"1px solid rgba(124,58,237,0.25)", backdropFilter:"blur(10px)" }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:"#a78bfa", boxShadow:"0 0 10px rgba(167,139,250,1)", animation:"dotWave 1.5s ease-in-out infinite" }}/>
        <span style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(167,139,250,0.8)", fontFamily:"'DM Mono', monospace" }}>live projects</span>
      </div>

      {/* count badge */}
      <div style={{ position:"fixed", top:72, right:28, zIndex:10, padding:"6px 14px", borderRadius:20, background:"rgba(6,182,212,0.08)", border:"1px solid rgba(6,182,212,0.2)", backdropFilter:"blur(10px)" }}>
        <span style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(6,182,212,0.7)", fontFamily:"'DM Mono', monospace" }}>
          {projects?.length || 0} projects
        </span>
      </div>

      <div style={{ position:"relative", zIndex:5, maxWidth:1100, margin:"0 auto", padding:"80px 24px 48px" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:40 }}>
          <h1 className="pj-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:36, fontWeight:900, lineHeight:1.1 }}>
            🚀 Projects Feed
          </h1>
          <Link
            to="/projects/create"
            style={{
              padding:"10px 22px", borderRadius:12, textDecoration:"none",
              background:"linear-gradient(135deg, #7c3aed, #06b6d4)",
              color:"white", fontFamily:"'DM Mono', monospace",
              fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase",
              boxShadow:"0 0 24px rgba(124,58,237,0.35)",
              transition:"opacity 0.2s, transform 0.2s",
              display:"inline-block",
            }}
            onMouseOver={e => e.currentTarget.style.opacity=0.85}
            onMouseOut={e => e.currentTarget.style.opacity=1}
          >
            ➕ New Project
          </Link>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ marginBottom:40, display:"flex", gap:12 }}>
          <input
            type="text"
            value={searchTech}
            onChange={(e) => setSearchTech(e.target.value)}
            placeholder="Search by tech stack (React, Node, MongoDB...)"
            className="pj-input"
            style={{ flex:1 }}
          />
          <button type="submit" className="pj-btn-search">🔍 Search</button>
        </form>

        {/* Empty */}
        {(!projects || projects.length === 0) ? (
          <div className="pj-card-entry pj-animated-border" style={{
            margin:"40px auto", maxWidth:420, padding:"56px 52px", borderRadius:24,
            background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)",
            boxShadow:"0 40px 100px rgba(0,0,0,0.7)", textAlign:"center",
            display:"flex", flexDirection:"column", alignItems:"center", gap:24,
          }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(232,121,249,0.2), rgba(124,58,237,0.1))", border:"1px solid rgba(232,121,249,0.25)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 60px rgba(232,121,249,0.2)", animation:"iconFloat 4s ease-in-out infinite" }}>
              <span style={{ fontSize:30 }}>🚀</span>
            </div>
            <div>
              <h2 className="pj-grad-title" style={{ fontFamily:"'Playfair Display', serif", fontSize:26, fontWeight:900, marginBottom:10 }}>No projects found.</h2>
              <p style={{ color:"rgba(255,255,255,0.3)", fontSize:13, fontFamily:"'DM Mono', monospace" }}>Connect with developers to see their projects!</p>
            </div>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(480px, 1fr))", gap:20 }}>
              {projects.map((project, i) => (
                <Link
                  key={project._id}
                  to={`/projects/${project._id}`}
                  className="pj-project-card"
                  style={{ animationDelay:`${i * 0.07}s`, backdropFilter:"blur(20px)" }}
                >
                  {/* top shimmer bar */}
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed)", backgroundSize:"300% 100%", animation:"shimmerBorder 3s linear infinite", borderRadius:"16px 16px 0 0" }}/>

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                    <h2 style={{ color:"white", fontSize:18, fontWeight:700, fontFamily:"'Playfair Display', serif" }}>{project.header}</h2>
                    <span style={{ padding:"3px 10px", borderRadius:20, background:"rgba(124,58,237,0.2)", border:"1px solid rgba(124,58,237,0.3)", color:"rgba(167,139,250,0.9)", fontSize:9, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"'DM Mono', monospace", whiteSpace:"nowrap" }}>
                      Public
                    </span>
                  </div>

                  <p style={{ color:"rgba(255,255,255,0.35)", fontSize:13, marginBottom:14, lineHeight:1.6, fontFamily:"'DM Mono', monospace", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                    {project.description}
                  </p>

                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                    {project.techStack?.map((tech, idx) => (
                      <span key={idx} style={{ padding:"4px 10px", borderRadius:20, background:"rgba(6,182,212,0.08)", border:"1px solid rgba(6,182,212,0.2)", color:"rgba(6,182,212,0.8)", fontSize:10, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:12, color:"rgba(255,255,255,0.3)", fontFamily:"'DM Mono', monospace" }}>
                      By <span style={{ color:"rgba(167,139,250,0.8)" }}>{project.ownerId?.firstname} {project.ownerId?.lastname}</span>
                    </span>
                    <div style={{ display:"flex", gap:12 }}>
                      {project.githubURL && <span style={{ fontSize:11, color:"rgba(255,255,255,0.25)", fontFamily:"'DM Mono', monospace" }}>📂 GitHub</span>}
                      {project.deployURL && <span style={{ fontSize:11, color:"rgba(255,255,255,0.25)", fontFamily:"'DM Mono', monospace" }}>🌐 Live</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination && (
              <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:16, marginTop:40 }}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="pj-btn-page">← Previous</button>
                <span style={{ fontSize:11, letterSpacing:"0.15em", color:"rgba(167,139,250,0.5)", fontFamily:"'DM Mono', monospace" }}>
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)} className="pj-btn-page">Next →</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectsFeed;