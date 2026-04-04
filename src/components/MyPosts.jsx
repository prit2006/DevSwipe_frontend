// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import PostCard from "./PostCard";
// import { Link } from "react-router-dom";

// const MyPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchMyPosts = async () => {
//     try {
//       setError(null);
//       setIsLoading(true);
//       const res = await axios.get(`${BASE_URL}/post/my/posts`, {
//         withCredentials: true,
//       });
//       setPosts(res.data);
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//       setError("Failed to load your posts");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyPosts();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="max-w-xl mx-auto mt-6 flex justify-center">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-xl mx-auto mt-6">
//         <div className="alert alert-error">
//           <span>{error}</span>
//           <button onClick={fetchMyPosts} className="btn btn-sm">
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto mt-6 pb-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">My Posts</h1>
//         <Link to="/posts/create" className="btn btn-primary btn-sm">
//           ➕ Create Post
//         </Link>
//       </div>

//       {posts.length === 0 ? (
//         <div className="text-center py-12 bg-base-100 rounded-xl">
//           <p className="text-4xl mb-4">📝</p>
//           <p className="text-lg font-semibold mb-2">No posts yet</p>
//           <p className="text-base-content/60 mb-4">
//             Share your first thought with your connections
//           </p>
//           <Link to="/posts/create" className="btn btn-primary">
//             Create Your First Post
//           </Link>
//         </div>
//       ) : (
//         <>
//           <p className="text-sm text-base-content/60 mb-4">
//             {posts.length} {posts.length === 1 ? "post" : "posts"}
//           </p>
//           {posts.map((post) => (
//             <PostCard key={post._id} post={post} refreshPosts={fetchMyPosts} />
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default MyPosts;

import React, { useEffect, useState } from "react";
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

  .mpo-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .mpo-fade-up {
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  .mpo-new-btn {
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
  .mpo-new-btn:hover { opacity: 0.85; transform: translateY(-1px); }

  .mpo-retry-btn {
    display: inline-block;
    padding: 8px 16px;
    border-radius: 9px;
    border: 1px solid rgba(124,58,237,0.3);
    background: rgba(124,58,237,0.08);
    color: rgba(167,139,250,0.85);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }
  .mpo-retry-btn:hover { background: rgba(124,58,237,0.18); }

  .mpo-animated-border { position: relative; }
  .mpo-animated-border::before {
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

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyPosts = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/post/my/posts`, { withCredentials: true });
      setPosts(res.data);
    } catch (err) {
      setError("Failed to load your posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchMyPosts(); }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* Count pill */}
      {!isLoading && !error && posts.length > 0 && (
        <div style={{ position:"fixed", top:76, right:20, zIndex:10, padding:"5px 14px", borderRadius:20, background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.28)", backdropFilter:"blur(12px)" }}>
          <span style={{ fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:"0.15em", color:"rgba(167,139,250,0.85)" }}>
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div style={{ position:"relative", zIndex:5, maxWidth:640, margin:"0 auto", padding:"80px 24px 48px" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40, flexWrap:"wrap", gap:16 }}>
          <div>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(167,139,250,0.45)", marginBottom:8 }}>your voice</p>
            <h1 className="mpo-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:34, fontWeight:900, lineHeight:1.1 }}>
              My Posts
            </h1>
          </div>
          <Link to="/posts/create" className="mpo-new-btn">➕ Create Post</Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"60px 0" }}>
            <OrbLoader />
            <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:20 }}>
              {[0,1,2,3,4,5].map(i => (
                <div key={i} style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(to top, #7c3aed, #38bdf8)", animation:`dotWave 1s ease-in-out ${i*0.12}s infinite` }}/>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div style={{ padding:"20px 24px", borderRadius:14, background:"rgba(236,72,153,0.07)", border:"1px solid rgba(236,72,153,0.25)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
            <p style={{ color:"rgba(236,72,153,0.85)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>{error}</p>
            <button className="mpo-retry-btn" onClick={fetchMyPosts}>Retry</button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="mpo-animated-border" style={{ margin:"40px auto", maxWidth:400, padding:"52px 48px", borderRadius:20, textAlign:"center", background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)", boxShadow:"0 40px 100px rgba(0,0,0,0.6)", display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
            <div style={{ width:68, height:68, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(232,121,249,0.2), rgba(124,58,237,0.1))", border:"1px solid rgba(232,121,249,0.25)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 50px rgba(232,121,249,0.2)", animation:"iconFloat 4s ease-in-out infinite" }}>
              <span style={{ fontSize:26 }}>📝</span>
            </div>
            <div>
              <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:900, marginBottom:8, background:"linear-gradient(135deg,#e879f9,#a78bfa,#38bdf8)", backgroundSize:"300% 300%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"gradShift 4s ease infinite" }}>
                No Posts Yet
              </h3>
              <p style={{ color:"rgba(255,255,255,0.28)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.04em", marginBottom:24 }}>
                Share your thoughts with your connections.
              </p>
              <Link to="/posts/create" className="mpo-new-btn">Create Your First Post</Link>
            </div>
          </div>
        )}

        {/* Posts list */}
        {!isLoading && !error && posts.length > 0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {posts.map((post, i) => (
              <div key={post._id} className="mpo-fade-up" style={{ animationDelay:`${i*0.07}s` }}>
                <PostCard post={post} refreshPosts={fetchMyPosts} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;