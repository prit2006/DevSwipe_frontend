// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import PostCard from "./PostCard";
// import { Link } from "react-router-dom";

// function SavedItems() {
//     const [activeTab, setActiveTab] = useState("posts");
//     const [savedPosts, setSavedPosts] = useState([]);
//     const [savedProjects, setSavedProjects] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchSavedData = async () => {
//         try {
//             setLoading(true);
//             const [postsRes, projectsRes] = await Promise.all([
//                 axios.get(`${BASE_URL}/bookmark/posts`, { withCredentials: true }),
//                 axios.get(`${BASE_URL}/bookmark/projects`, { withCredentials: true }),
//             ]);
//             setSavedPosts(postsRes.data);
//             setSavedProjects(projectsRes.data);
//         } catch (err) {
//             console.error("Error fetching bookmarks:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchSavedData();
//     }, []);

//     return (
//         <div className="max-w-4xl mx-auto px-4 py-8">
//             <div className="flex items-center gap-4 mb-8">
//                 <h1 className="text-3xl font-bold text-white">🔖 Saved Items</h1>
//             </div>

//             {/* TABS */}
//             <div className="flex border-b border-gray-700 mb-6">
//                 <button
//                     onClick={() => setActiveTab("posts")}
//                     className={`px-6 py-3 font-semibold text-lg transition ${activeTab === "posts"
//                             ? "text-blue-400 border-b-2 border-blue-400"
//                             : "text-gray-400 hover:text-gray-300"
//                         }`}
//                 >
//                     Posts ({savedPosts.length})
//                 </button>
//                 <button
//                     onClick={() => setActiveTab("projects")}
//                     className={`px-6 py-3 font-semibold text-lg transition ${activeTab === "projects"
//                             ? "text-blue-400 border-b-2 border-blue-400"
//                             : "text-gray-400 hover:text-gray-300"
//                         }`}
//                 >
//                     Projects ({savedProjects.length})
//                 </button>
//             </div>

//             {/* CONTENT */}
//             {loading ? (
//                 <div className="flex justify-center py-20">
//                     <span className="loading loading-spinner text-info loading-lg"></span>
//                 </div>
//             ) : (
//                 <div className="animate-fadeIn">
//                     {/* POSTS TAB */}
//                     {activeTab === "posts" && (
//                         <div className="space-y-6">
//                             {savedPosts.length === 0 ? (
//                                 <div className="text-center py-20 text-gray-500 bg-gray-800/50 rounded-xl border border-gray-700">
//                                     <div className="text-6xl mb-4">📑</div>
//                                     <h3 className="text-xl font-semibold text-gray-300 mb-2">No Saved Posts</h3>
//                                     <p>When you save a post on the feed, it will show up here.</p>
//                                 </div>
//                             ) : (
//                                 savedPosts.map((post) => (
//                                     <PostCard key={post._id} post={post} refreshPosts={fetchSavedData} />
//                                 ))
//                             )}
//                         </div>
//                     )}

//                     {/* PROJECTS TAB */}
//                     {activeTab === "projects" && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {savedProjects.length === 0 ? (
//                                 <div className="col-span-1 md:col-span-2 text-center py-20 text-gray-500 bg-gray-800/50 rounded-xl border border-gray-700">
//                                     <div className="text-6xl mb-4">💼</div>
//                                     <h3 className="text-xl font-semibold text-gray-300 mb-2">No Saved Projects</h3>
//                                     <p>When you save an interesting project, you can find it here later.</p>
//                                 </div>
//                             ) : (
//                                 savedProjects.map((project) => (
//                                     <div
//                                         key={project._id}
//                                         className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:border-blue-500 transition duration-300 flex flex-col h-full"
//                                     >
//                                         {/* Project Image */}
//                                         <div className="h-48 bg-gray-900 border-b border-gray-700 overflow-hidden relative">
//                                             {project.websiteImages && project.websiteImages.length > 0 ? (
//                                                 <img
//                                                     src={project.websiteImages[0]}
//                                                     alt={project.header}
//                                                     className="w-full h-full object-cover"
//                                                 />
//                                             ) : (
//                                                 <div className="flex items-center justify-center h-full text-gray-600">
//                                                     <span className="text-4xl">📸</span>
//                                                 </div>
//                                             )}

//                                             <div className="absolute top-3 right-3">
//                                                 <span className={`px-2 py-1 text-xs font-bold rounded shadow bg-gray-900/80 backdrop-blur ${project.isPublic ? "text-green-400" : "text-gray-400"}`}>
//                                                     {project.isPublic ? "Public" : "Private"}
//                                                 </span>
//                                             </div>
//                                         </div>

//                                         <div className="p-5 flex flex-col flex-grow">
//                                             <div className="flex items-center gap-3 mb-3">
//                                                 <img
//                                                     src={project.ownerId?.photoURL}
//                                                     className="w-8 h-8 rounded-full border border-gray-600"
//                                                     alt="owner"
//                                                 />
//                                                 <span className="text-sm text-gray-400">
//                                                     {project.ownerId?.firstname} {project.ownerId?.lastname}
//                                                 </span>
//                                             </div>

//                                             <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition">
//                                                 {project.header}
//                                             </h3>
//                                             <p className="text-gray-400 text-sm mb-4 line-clamp-2">
//                                                 {project.description}
//                                             </p>

//                                             <div className="mt-auto pt-4 border-t border-gray-700 flex justify-end">
//                                                 <Link
//                                                     to={`/projects/${project._id}`}
//                                                     className="px-4 py-2 bg-blue-600/20 text-blue-400 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition"
//                                                 >
//                                                     View Details →
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SavedItems;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import PostCard from "./PostCard";
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
    from { opacity:0; transform:translateY(18px); }
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
    50%     { transform:translateY(-12px) rotate(5deg); }
  }

  .si-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .si-animated-border { position: relative; }
  .si-animated-border::before {
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

  .si-tab {
    padding: 12px 24px;
    border: none;
    background: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    transition: color 0.2s;
    position: relative;
  }
  .si-tab::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #7c3aed, #06b6d4);
    transform: scaleX(0);
    transition: transform 0.2s;
    border-radius: 2px;
  }
  .si-tab.active {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 50%, #38bdf8 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }
  .si-tab.active::after { transform: scaleX(1); }
  .si-tab:hover:not(.active) { color: rgba(255,255,255,0.6); }

  .si-fade-up {
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  .si-project-card {
    position: relative;
    border-radius: 16px;
    border: 1px solid rgba(124,58,237,0.2);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .si-project-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed);
    background-size: 300% 100%;
    animation: shimmerBorder 3s linear infinite;
    z-index: 2;
  }
  .si-project-card:hover {
    border-color: rgba(168,85,247,0.45);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(124,58,237,0.18);
  }

  .si-view-btn {
    display: inline-block;
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid rgba(124,58,237,0.3);
    background: rgba(124,58,237,0.08);
    color: rgba(167,139,250,0.9);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.2s;
  }
  .si-view-btn:hover {
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    border-color: transparent;
    color: white;
    box-shadow: 0 0 20px rgba(124,58,237,0.4);
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
  <div style={{ position:"relative", width:80, height:80 }}>
    {[0,1,2].map(i => (
      <div key={i} style={{ position:"absolute", inset:i*11, borderRadius:"50%", border:`${1.5-i*0.3}px solid transparent`, borderTopColor:["#a78bfa","#38bdf8","#ec4899"][i], borderRightColor:`rgba(${["167,139,250","56,189,248","236,72,153"][i]},0.2)`, animation:`spinRing ${0.9+i*0.5}s linear infinite ${i%2===0?"":" reverse"}` }}/>
    ))}
    <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:14, height:14, borderRadius:"50%", background:"radial-gradient(circle, #e879f9 0%, #7c3aed 100%)", boxShadow:"0 0 20px rgba(232,121,249,0.8)" }}/>
  </div>
);

const EmptyState = ({ icon, title, subtitle }) => (
  <div className="si-animated-border" style={{
    margin:"20px auto", maxWidth:400,
    padding:"52px 48px", borderRadius:20, textAlign:"center",
    background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)",
    boxShadow:"0 40px 100px rgba(0,0,0,0.6)",
    display:"flex", flexDirection:"column", alignItems:"center", gap:20,
  }}>
    <div style={{ width:68, height:68, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(232,121,249,0.2), rgba(124,58,237,0.1))", border:"1px solid rgba(232,121,249,0.25)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 50px rgba(232,121,249,0.2)", animation:"iconFloat 4s ease-in-out infinite" }}>
      <span style={{ fontSize:26 }}>{icon}</span>
    </div>
    <div>
      <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:900, marginBottom:8, background:"linear-gradient(135deg,#e879f9,#a78bfa,#38bdf8)", backgroundSize:"300% 300%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"gradShift 4s ease infinite" }}>
        {title}
      </h3>
      <p style={{ color:"rgba(255,255,255,0.28)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.04em" }}>{subtitle}</p>
    </div>
  </div>
);

function SavedItems() {
  const [activeTab, setActiveTab] = useState("posts");
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedData = async () => {
    try {
      setLoading(true);
      const [postsRes, projectsRes] = await Promise.all([
        axios.get(`${BASE_URL}/bookmark/posts`, { withCredentials: true }),
        axios.get(`${BASE_URL}/bookmark/projects`, { withCredentials: true }),
      ]);
      setSavedPosts(postsRes.data);
      setSavedProjects(projectsRes.data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSavedData(); }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      <div style={{ position:"relative", zIndex:5, maxWidth:860, margin:"0 auto", padding:"80px 24px 48px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(167,139,250,0.5)", marginBottom:10 }}>your collection</p>
          <h1 className="si-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:36, fontWeight:900, lineHeight:1.1 }}>
            🔖 Saved Items
          </h1>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:"1px solid rgba(124,58,237,0.18)", marginBottom:36, gap:4 }}>
          <button
            className={`si-tab${activeTab === "posts" ? " active" : ""}`}
            onClick={() => setActiveTab("posts")}
          >
            Posts ({savedPosts.length})
          </button>
          <button
            className={`si-tab${activeTab === "projects" ? " active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            Projects ({savedProjects.length})
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:24, padding:"60px 0" }}>
            <OrbLoader />
            <p style={{ fontFamily:"'DM Mono', monospace", letterSpacing:"0.3em", fontSize:11, textTransform:"uppercase", color:"rgba(167,139,250,0.75)" }}>Loading saved items</p>
            <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:20 }}>
              {[0,1,2,3,4,5].map(i => (
                <div key={i} style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(to top, #7c3aed, #38bdf8)", animation:`dotWave 1s ease-in-out ${i*0.12}s infinite` }}/>
              ))}
            </div>
          </div>
        ) : (
          <div>

            {/* POSTS TAB */}
            {activeTab === "posts" && (
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {savedPosts.length === 0
                  ? <EmptyState icon="📑" title="No Saved Posts" subtitle="When you save a post on the feed, it will appear here." />
                  : savedPosts.map((post, i) => (
                      <div key={post._id} className="si-fade-up" style={{ animationDelay:`${i*0.07}s` }}>
                        <PostCard post={post} refreshPosts={fetchSavedData} />
                      </div>
                    ))
                }
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(380px, 1fr))", gap:20 }}>
                {savedProjects.length === 0
                  ? <div style={{ gridColumn:"1 / -1" }}>
                      <EmptyState icon="💼" title="No Saved Projects" subtitle="When you save an interesting project, you can find it here." />
                    </div>
                  : savedProjects.map((project, i) => (
                      <div key={project._id} className="si-project-card" style={{ animationDelay:`${i*0.07}s` }}>

                        {/* Image */}
                        <div style={{ position:"relative", height:180, background:"rgba(0,0,0,0.3)", overflow:"hidden" }}>
                          {project.websiteImages?.length > 0 ? (
                            <img src={project.websiteImages[0]} alt={project.header} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                          ) : (
                            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", fontSize:36, color:"rgba(255,255,255,0.1)" }}>📸</div>
                          )}
                          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 40%, rgba(3,3,8,0.85) 100%)" }}/>
                          {/* public/private badge */}
                          <div style={{ position:"absolute", top:10, right:10, padding:"3px 10px", borderRadius:20, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(10px)", border:`1px solid ${project.isPublic ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.15)"}` }}>
                            <span style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.12em", textTransform:"uppercase", color: project.isPublic ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.35)" }}>
                              {project.isPublic ? "Public" : "Private"}
                            </span>
                          </div>
                        </div>

                        <div style={{ padding:"16px 18px 18px", display:"flex", flexDirection:"column", flex:1 }}>
                          {/* Owner */}
                          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                            <div style={{ width:28, height:28, borderRadius:"50%", padding:1.5, background:"linear-gradient(135deg, #7c3aed, #06b6d4)", flexShrink:0 }}>
                              <img src={project.ownerId?.photoURL} alt="owner" style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", display:"block" }}/>
                            </div>
                            <span style={{ fontSize:11, color:"rgba(167,139,250,0.7)", fontFamily:"'DM Mono', monospace" }}>
                              {project.ownerId?.firstname} {project.ownerId?.lastname}
                            </span>
                          </div>

                          {/* Title + desc */}
                          <h3 style={{ color:"white", fontSize:16, fontWeight:700, fontFamily:"'Playfair Display', serif", marginBottom:6, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {project.header}
                          </h3>
                          <p style={{ color:"rgba(255,255,255,0.3)", fontSize:12, fontFamily:"'DM Mono', monospace", lineHeight:1.6, marginBottom:16, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                            {project.description}
                          </p>

                          {/* Footer */}
                          <div style={{ marginTop:"auto", paddingTop:12, borderTop:"1px solid rgba(124,58,237,0.12)", display:"flex", justifyContent:"flex-end" }}>
                            <Link to={`/projects/${project._id}`} className="si-view-btn">
                              View Details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                }
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedItems;