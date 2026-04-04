// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { deleteProject as deleteProjectAction } from "../utils/projectSlice";

// function MyProjects() {
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const dispatch = useDispatch();

//     const fetchMyProjects = async () => {
//         try {
//             const res = await axios.get(`${BASE_URL}/project/my`, {
//                 withCredentials: true,
//             });
//             setProjects(res.data);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchMyProjects();
//     }, []);

//     const handleDelete = async (projectId) => {
//         if (!window.confirm("Are you sure you want to delete this project?")) {
//             return;
//         }

//         try {
//             await axios.delete(`${BASE_URL}/project/${projectId}`, {
//                 withCredentials: true,
//             });
//             setProjects(projects.filter((p) => p._id !== projectId));
//             dispatch(deleteProjectAction(projectId));
//         } catch (error) {
//             console.log(error);
//             alert("Failed to delete project");
//         }
//     };

//     const toggleVisibility = async (projectId) => {
//         try {
//             const res = await axios.patch(
//                 `${BASE_URL}/project/${projectId}/toggle-visibility`,
//                 {},
//                 { withCredentials: true }
//             );

//             setProjects(
//                 projects.map((p) =>
//                     p._id === projectId ? res.data.project : p
//                 )
//             );
//         } catch (error) {
//             console.log(error);
//             alert("Failed to toggle visibility");
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="text-2xl text-blue-400">Loading your projects...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-6xl mx-auto px-4 py-8">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-4xl font-bold text-blue-400">
//                     💼 My Projects ({projects.length})
//                 </h1>
//                 <Link
//                     to="/projects/create"
//                     className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
//                 >
//                     ➕ New Project
//                 </Link>
//             </div>

//             {projects.length === 0 ? (
//                 <div className="text-center py-16">
//                     <p className="text-2xl text-gray-400 mb-6">
//                         You haven't created any projects yet
//                     </p>
//                     <Link
//                         to="/projects/create"
//                         className="inline-block px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
//                     >
//                         Create Your First Project
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {projects.map((project) => (
//                         <div
//                             key={project._id}
//                             className="bg-gray-800 border border-gray-700 rounded-lg p-6"
//                         >
//                             {/* Header */}
//                             <div className="flex justify-between items-start mb-4">
//                                 <h2 className="text-2xl font-bold text-white">
//                                     {project.header}
//                                 </h2>
//                                 <span
//                                     className={`px-3 py-1 text-xs rounded-full ${project.isPublic
//                                             ? "bg-green-600 text-white"
//                                             : "bg-gray-600 text-gray-300"
//                                         }`}
//                                 >
//                                     {project.isPublic ? "Public" : "Private"}
//                                 </span>
//                             </div>

//                             {/* Description */}
//                             <p className="text-gray-400 mb-4 line-clamp-3">
//                                 {project.description}
//                             </p>

//                             {/* Tech Stack */}
//                             <div className="flex flex-wrap gap-2 mb-4">
//                                 {project.techStack?.map((tech, index) => (
//                                     <span
//                                         key={index}
//                                         className="px-3 py-1 bg-gray-700 text-blue-300 text-sm rounded-full"
//                                     >
//                                         {tech}
//                                     </span>
//                                 ))}
//                             </div>

//                             {/* Links */}
//                             {/* Links */}
//                             <div className="flex gap-4 mb-4 text-sm">
//                                 {project.githubURL && (
//                                     <a
//                                         href={project.githubURL}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-400 hover:underline"
//                                     >
//                                         📂 GitHub
//                                     </a>
//                                 )}

//                                 {project.deployURL && (
//                                     <a
//                                         href={project.deployURL}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-green-400 hover:underline"
//                                     >
//                                         🌐 Live Demo
//                                     </a>
//                                 )}
//                             </div>


//                             {/* Actions */}
//                             <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
//                                 <Link
//                                     to={`/projects/${project._id}`}
//                                     className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm"
//                                 >
//                                     👁️ View
//                                 </Link>
//                                 <Link
//                                     to={`/projects/edit/${project._id}`}
//                                     state={{ project }}
//                                     className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition text-sm"
//                                 >
//                                     ✏️ Edit
//                                 </Link>
//                                 <button
//                                     onClick={() => toggleVisibility(project._id)}
//                                     className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition text-sm"
//                                 >
//                                     {project.isPublic ? "🔒 Make Private" : "🔓 Make Public"}
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(project._id)}
//                                     className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-sm"
//                                 >
//                                     🗑️ Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default MyProjects;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProject as deleteProjectAction } from "../utils/projectSlice";

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
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes dotWave {
    0%,100% { transform:scaleY(0.3); opacity:0.3; }
    50%     { transform:scaleY(1.4); opacity:1; }
  }
  @keyframes iconFloat {
    0%,100% { transform:translateY(0) rotate(0deg); }
    50%     { transform:translateY(-10px) rotate(4deg); }
  }

  .mp-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .mp-card {
    position: relative;
    border-radius: 18px;
    border: 1px solid rgba(124,58,237,0.2);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    overflow: hidden;
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .mp-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed);
    background-size: 300% 100%;
    animation: shimmerBorder 3s linear infinite;
  }
  .mp-card:hover {
    border-color: rgba(168,85,247,0.4);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(124,58,237,0.15);
  }

  .mp-action-btn {
    padding: 7px 14px;
    border-radius: 9px;
    border: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: all 0.18s;
  }
  .mp-btn-view   { background: rgba(124,58,237,0.12); color: rgba(167,139,250,0.9); border: 1px solid rgba(124,58,237,0.28); }
  .mp-btn-view:hover { background: rgba(124,58,237,0.25); border-color: rgba(168,85,247,0.5); }
  .mp-btn-edit   { background: rgba(16,185,129,0.1); color: rgba(52,211,153,0.9); border: 1px solid rgba(16,185,129,0.25); }
  .mp-btn-edit:hover { background: rgba(16,185,129,0.22); border-color: rgba(52,211,153,0.5); }
  .mp-btn-toggle { background: rgba(6,182,212,0.08); color: rgba(34,211,238,0.85); border: 1px solid rgba(6,182,212,0.22); }
  .mp-btn-toggle:hover { background: rgba(6,182,212,0.18); border-color: rgba(34,211,238,0.45); }
  .mp-btn-delete { background: rgba(236,72,153,0.08); color: rgba(236,72,153,0.85); border: 1px solid rgba(236,72,153,0.22); }
  .mp-btn-delete:hover { background: rgba(236,72,153,0.18); border-color: rgba(236,72,153,0.5); }

  .mp-new-btn {
    display: inline-block;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 11px;
    border: none;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    box-shadow: 0 0 24px rgba(124,58,237,0.35);
    transition: opacity 0.2s, transform 0.15s;
  }
  .mp-new-btn:hover { opacity: 0.85; transform: translateY(-1px); }

  .mp-link-btn {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-decoration: none;
    padding: 4px 10px;
    border-radius: 8px;
    transition: all 0.18s;
  }
  .mp-link-github { color: rgba(167,139,250,0.75); background: rgba(124,58,237,0.07); border: 1px solid rgba(124,58,237,0.2); }
  .mp-link-github:hover { background: rgba(124,58,237,0.16); color: rgba(167,139,250,1); }
  .mp-link-demo { color: rgba(52,211,153,0.75); background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.2); }
  .mp-link-demo:hover { background: rgba(16,185,129,0.16); color: rgba(52,211,153,1); }

  .mp-animated-border { position: relative; }
  .mp-animated-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 21px;
    padding: 1px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed);
    background-size: 300% 300%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: shimmerBorder 4s ease infinite;
    pointer-events: none;
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

const OrbLoader = () => (
  <div style={{ position:"relative", width:72, height:72 }}>
    {[0,1,2].map(i => (
      <div key={i} style={{ position:"absolute", inset:i*10, borderRadius:"50%", border:`1.5px solid transparent`, borderTopColor:["#a78bfa","#38bdf8","#ec4899"][i], borderRightColor:`rgba(${["167,139,250","56,189,248","236,72,153"][i]},0.2)`, animation:`spinRing ${0.9+i*0.5}s linear infinite ${i%2===0?"":" reverse"}` }}/>
    ))}
    <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:12, height:12, borderRadius:"50%", background:"radial-gradient(circle, #e879f9 0%, #7c3aed 100%)", boxShadow:"0 0 16px rgba(232,121,249,0.8)" }}/>
  </div>
);

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchMyProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/project/my`, { withCredentials: true });
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyProjects(); }, []);

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${BASE_URL}/project/${projectId}`, { withCredentials: true });
      setProjects(projects.filter(p => p._id !== projectId));
      dispatch(deleteProjectAction(projectId));
    } catch (error) {
      alert("Failed to delete project");
    }
  };

  const toggleVisibility = async (projectId) => {
    try {
      const res = await axios.patch(`${BASE_URL}/project/${projectId}/toggle-visibility`, {}, { withCredentials: true });
      setProjects(projects.map(p => p._id === projectId ? res.data.project : p));
    } catch (error) {
      alert("Failed to toggle visibility");
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* Count pill */}
      <div style={{ position:"fixed", top:76, right:20, zIndex:10, padding:"5px 14px", borderRadius:20, background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.28)", backdropFilter:"blur(12px)" }}>
        <span style={{ fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:"0.15em", color:"rgba(167,139,250,0.85)" }}>
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div style={{ position:"relative", zIndex:5, maxWidth:1100, margin:"0 auto", padding:"80px 24px 48px" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40, flexWrap:"wrap", gap:16 }}>
          <div>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(167,139,250,0.45)", marginBottom:8 }}>your work</p>
            <h1 className="mp-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:34, fontWeight:900, lineHeight:1.1 }}>
              💼 My Projects
            </h1>
          </div>
          <Link to="/projects/create" className="mp-new-btn">➕ New Project</Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"60px 0" }}>
            <OrbLoader />
            <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:20 }}>
              {[0,1,2,3,4,5].map(i => (
                <div key={i} style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(to top, #7c3aed, #38bdf8)", animation:`dotWave 1s ease-in-out ${i*0.12}s infinite` }}/>
              ))}
            </div>
          </div>

        ) : projects.length === 0 ? (
          /* Empty state */
          <div className="mp-animated-border" style={{ margin:"40px auto", maxWidth:420, padding:"52px 48px", borderRadius:20, textAlign:"center", background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)", boxShadow:"0 40px 100px rgba(0,0,0,0.6)", display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
            <div style={{ width:68, height:68, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(232,121,249,0.2), rgba(124,58,237,0.1))", border:"1px solid rgba(232,121,249,0.25)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 50px rgba(232,121,249,0.2)", animation:"iconFloat 4s ease-in-out infinite" }}>
              <span style={{ fontSize:26 }}>🚀</span>
            </div>
            <div>
              <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:900, marginBottom:8, background:"linear-gradient(135deg,#e879f9,#a78bfa,#38bdf8)", backgroundSize:"300% 300%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"gradShift 4s ease infinite" }}>
                No Projects Yet
              </h3>
              <p style={{ color:"rgba(255,255,255,0.28)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.04em", marginBottom:24 }}>
                Showcase your work to the dev community.
              </p>
              <Link to="/projects/create" className="mp-new-btn">Create Your First Project</Link>
            </div>
          </div>

        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(480px, 1fr))", gap:20 }}>
            {projects.map((project, i) => (
              <div key={project._id} className="mp-card" style={{ animationDelay:`${i*0.07}s` }}>
                <div style={{ padding:"22px 22px 0" }}>

                  {/* Title row */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10, gap:12 }}>
                    <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700, color:"white", lineHeight:1.2, flex:1 }}>
                      {project.header}
                    </h2>
                    <span style={{ flexShrink:0, padding:"3px 10px", borderRadius:20, fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.12em", textTransform:"uppercase", background: project.isPublic ? "rgba(5,150,105,0.12)" : "rgba(255,255,255,0.05)", border:`1px solid ${project.isPublic ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.1)"}`, color: project.isPublic ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.3)" }}>
                      {project.isPublic ? "Public" : "Private"}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ color:"rgba(255,255,255,0.35)", fontSize:12, fontFamily:"'DM Mono', monospace", lineHeight:1.65, marginBottom:14, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  {project.techStack?.length > 0 && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} style={{ padding:"3px 10px", borderRadius:20, background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.25)", color:"rgba(167,139,250,0.85)", fontSize:10, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* External links */}
                  {(project.githubURL || project.deployURL) && (
                    <div style={{ display:"flex", gap:8, marginBottom:16 }}>
                      {project.githubURL && (
                        <a href={project.githubURL} target="_blank" rel="noopener noreferrer" className="mp-link-btn mp-link-github">
                          📂 GitHub
                        </a>
                      )}
                      {project.deployURL && (
                        <a href={project.deployURL} target="_blank" rel="noopener noreferrer" className="mp-link-btn mp-link-demo">
                          🌐 Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions footer */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, padding:"14px 22px 18px", borderTop:"1px solid rgba(124,58,237,0.1)", marginTop:4 }}>
                  <Link to={`/projects/${project._id}`} className="mp-action-btn mp-btn-view">👁️ View</Link>
                  <Link to={`/projects/edit/${project._id}`} state={{ project }} className="mp-action-btn mp-btn-edit">✏️ Edit</Link>
                  <button onClick={() => toggleVisibility(project._id)} className="mp-action-btn mp-btn-toggle">
                    {project.isPublic ? "🔒 Make Private" : "🔓 Make Public"}
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="mp-action-btn mp-btn-delete">🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProjects;