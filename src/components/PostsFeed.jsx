// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "../utils/postSlice";
// import PostCard from "./PostCard";

// const PostsFeed = () => {
//   const dispatch = useDispatch();
//   const posts = useSelector((store) => store.post);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchPosts = async () => {
//     try {
//       setError(null);
//       const res = await axios.get(`${BASE_URL}/post/feed`, {
//         withCredentials: true,
//       });
//       dispatch(setPosts(res.data));
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//       setError("Failed to load posts. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
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
//           <button onClick={fetchPosts} className="btn btn-sm">
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto mt-6 pb-6">
//       {posts.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-2xl mb-2">📭</p>
//           <p className="text-base-content/60">No posts yet. Be the first to post!</p>
//         </div>
//       ) : (
//         posts.map((post) => (
//           <PostCard key={post._id} post={post} refreshPosts={fetchPosts} />
//         ))
//       )}
//     </div>
//   );
// };

// export default PostsFeed;


// // import React, { useEffect } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setPosts } from "../utils/postSlice";
// // import PostCard from "./PostCard";

// // const PostsFeed = () => {
// //   const dispatch = useDispatch();
// //   const posts = useSelector((store) => store.post);

// //   const fetchPosts = async () => {
// //     const res = await axios.get(BASE_URL + "/post/feed", {
// //       withCredentials: true,
// //     });
// //     dispatch(setPosts(res.data));
// //   };

// //   useEffect(() => {
// //     fetchPosts();
// //   }, []);

// //   return (
// //     <div className="max-w-xl mx-auto mt-6">
// //       {posts.map((post) => (
// //         <PostCard key={post._id} post={post} refreshPosts={fetchPosts} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default PostsFeed;


// // import React, { useEffect } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setPosts } from "../utils/postSlice";
// // import PostCard from "./PostCard";
// // import CreatePost from "./CreatePost";

// // const PostsFeed = () => {
// //   const dispatch = useDispatch();
// //   const posts = useSelector((store) => store.post);

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       const res = await axios.get(BASE_URL + "/post/feed", {
// //         withCredentials: true,
// //       });
// //       dispatch(setPosts(res.data));
// //     };
// //     fetchPosts();
// //   }, []);

// //   return (
// //     <div className="max-w-xl mx-auto mt-6">
// //       <CreatePost />
// //       {posts.map((post) => (
// //         <PostCard key={post._id} post={post} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default PostsFeed;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../utils/postSlice";
import PostCard from "./PostCard";

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
  @keyframes glowPulse {
    0%,100% { box-shadow: 0 0 40px rgba(124,58,237,0.25), 0 40px 80px rgba(0,0,0,0.7); }
    50%     { box-shadow: 0 0 80px rgba(168,85,247,0.45), 0 40px 80px rgba(0,0,0,0.7), 0 0 120px rgba(6,182,212,0.15); }
  }
  @keyframes iconFloat {
    0%,100% { transform:translateY(0) rotate(0deg); }
    50%     { transform:translateY(-12px) rotate(5deg); }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .pf-card-entry { animation: cardEntry 0.85s cubic-bezier(0.16,1,0.3,1) forwards; }
  .pf-fade-up    { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
  .pf-fade-up-delay-1 { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .pf-fade-up-delay-2 { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
  .pf-fade-up-delay-3 { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both; }

  .pf-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .pf-animated-border {
    position: relative;
  }
  .pf-animated-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 25px;
    padding: 1px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed);
    background-size: 300% 300%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: shimmerBorder 4s ease infinite;
    pointer-events: none;
  }

  .pf-post-item {
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
  }
`;

/* ── Aurora Background (same as Feed.jsx) ───────────────────────── */
const AuroraBg = () => (
  <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
    <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, #0d0520 0%, #050510 50%, #030308 100%)" }}/>
    <div style={{
      position:"absolute", top:"-20%", left:"-10%",
      width:"70%", height:"70%",
      background:"radial-gradient(ellipse, rgba(124,58,237,0.45) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)",
      filter:"blur(60px)", animation:"aurora1 18s ease-in-out infinite",
    }}/>
    <div style={{
      position:"absolute", top:"10%", right:"-15%",
      width:"60%", height:"60%",
      background:"radial-gradient(ellipse, rgba(6,182,212,0.35) 0%, rgba(56,189,248,0.15) 40%, transparent 70%)",
      filter:"blur(80px)", animation:"aurora2 22s ease-in-out infinite",
    }}/>
    <div style={{
      position:"absolute", bottom:"-10%", left:"20%",
      width:"50%", height:"50%",
      background:"radial-gradient(ellipse, rgba(236,72,153,0.3) 0%, rgba(167,139,250,0.15) 50%, transparent 70%)",
      filter:"blur(70px)", animation:"aurora3 14s ease-in-out infinite",
    }}/>
    <div style={{
      position:"absolute", bottom:"20%", right:"5%",
      width:"40%", height:"40%",
      background:"radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, transparent 70%)",
      filter:"blur(50px)", animation:"aurora4 26s ease-in-out infinite",
    }}/>
    {[...Array(40)].map((_, i) => (
      <div key={i} style={{
        position:"absolute",
        left:`${Math.random()*100}%`,
        top:`${Math.random()*100}%`,
        width: i%5===0 ? 3 : i%3===0 ? 2 : 1,
        height: i%5===0 ? 3 : i%3===0 ? 2 : 1,
        borderRadius:"50%", background:"white",
        animation:`twinkle ${2+Math.random()*4}s ease-in-out ${Math.random()*4}s infinite`,
      }}/>
    ))}
    {[...Array(14)].map((_, i) => (
      <div key={i} style={{
        position:"absolute", left:`${5+i*7}%`, bottom:0,
        width: i%3===0 ? 3 : 2, height: i%3===0 ? 3 : 2,
        borderRadius:"50%",
        background: i%2===0 ? `rgba(168,85,247,0.5)` : `rgba(6,182,212,0.5)`,
        "--dx":`${-40+Math.random()*80}px`,
        animation:`particle ${6+Math.random()*10}s ease-in ${Math.random()*8}s infinite`,
      }}/>
    ))}
  </div>
);

/* ── Orb Loader (same as Feed.jsx) ──────────────────────────────── */
const OrbLoader = () => (
  <div style={{ position:"relative", width:100, height:100 }}>
    {[0,1,2].map(i => (
      <div key={i} style={{
        position:"absolute", inset: i*14, borderRadius:"50%",
        border:`${1.5-i*0.3}px solid transparent`,
        borderTopColor: ["#a78bfa","#38bdf8","#ec4899"][i],
        borderRightColor: `rgba(${["167,139,250","56,189,248","236,72,153"][i]},0.2)`,
        animation:`spinRing ${0.9+i*0.5}s linear infinite ${i%2===0?"":" reverse"}`,
      }}/>
    ))}
    <div style={{
      position:"absolute", top:"50%", left:"50%",
      transform:"translate(-50%,-50%)",
      width:18, height:18, borderRadius:"50%",
      background:"radial-gradient(circle, #e879f9 0%, #7c3aed 100%)",
      boxShadow:"0 0 30px rgba(232,121,249,0.8), 0 0 60px rgba(124,58,237,0.4)",
    }}/>
  </div>
);

/* ════════════════════════════════════════════════════════════════════ */
const PostsFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.post);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setError(null);
      const res = await axios.get(`${BASE_URL}/post/feed`, { withCredentials: true });
      dispatch(setPosts(res.data));
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  /* ── LOADING ──────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", background:"#030308" }}>
        <style>{styles}</style>
        <AuroraBg />
        <div className="pf-card-entry" style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:28 }}>
          <OrbLoader />
          <p style={{ fontFamily:"'DM Mono', monospace", letterSpacing:"0.3em", fontSize:11, textTransform:"uppercase", color:"rgba(167,139,250,0.75)" }}>
            Loading posts
          </p>
          <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:24 }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{
                width:4, height:18, borderRadius:2,
                background:"linear-gradient(to top, #7c3aed, #38bdf8)",
                animation:`dotWave 1s ease-in-out ${i*0.12}s infinite`,
              }}/>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── ERROR ────────────────────────────────────────────────────── */
  if (error) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", background:"#030308" }}>
        <style>{styles}</style>
        <AuroraBg />
        <div className="pf-card-entry pf-animated-border" style={{
          position:"relative", zIndex:10,
          padding:"48px 52px", borderRadius:24, textAlign:"center",
          background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)",
          boxShadow:"0 40px 100px rgba(0,0,0,0.7)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:20,
        }}>
          <div style={{
            width:64, height:64, borderRadius:"50%",
            border:"1px solid rgba(236,72,153,0.3)",
            background:"rgba(236,72,153,0.08)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 0 40px rgba(236,72,153,0.15)",
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#errGrad)" strokeWidth="1.5">
              <defs>
                <linearGradient id="errGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899"/><stop offset="100%" stopColor="#a78bfa"/>
                </linearGradient>
              </defs>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
            </svg>
          </div>
          <div>
            <p className="pf-grad-title" style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:900, marginBottom:8 }}>
              Something went wrong
            </p>
            <p style={{ color:"rgba(255,255,255,0.3)", fontSize:13, fontFamily:"'DM Mono', monospace" }}>{error}</p>
          </div>
          <button
            onClick={fetchPosts}
            style={{
              padding:"10px 28px", borderRadius:12, cursor:"pointer", border:"none",
              background:"linear-gradient(135deg, #7c3aed, #06b6d4)",
              color:"white", fontFamily:"'DM Mono', monospace",
              fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase",
              boxShadow:"0 0 24px rgba(124,58,237,0.4)",
              transition:"opacity 0.2s",
            }}
            onMouseOver={e => e.target.style.opacity=0.85}
            onMouseOut={e => e.target.style.opacity=1}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ── EMPTY ────────────────────────────────────────────────────── */
  if (posts.length === 0) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", background:"#030308" }}>
        <style>{styles}</style>
        <AuroraBg />
        <div className="pf-card-entry pf-animated-border" style={{
          position:"relative", zIndex:10,
          padding:"56px 60px", borderRadius:24, textAlign:"center",
          background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)",
          boxShadow:"0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)",
          maxWidth:400, display:"flex", flexDirection:"column", alignItems:"center", gap:28,
        }}>
          <div style={{
            width:80, height:80, borderRadius:"50%",
            background:"radial-gradient(circle at 35% 35%, rgba(232,121,249,0.2), rgba(124,58,237,0.1))",
            border:"1px solid rgba(232,121,249,0.25)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 0 60px rgba(232,121,249,0.2)",
            animation:"iconFloat 4s ease-in-out infinite",
          }}>
            <span style={{ fontSize:32 }}>📭</span>
          </div>
          <div>
            <h2 className="pf-grad-title" style={{
              fontFamily:"'Playfair Display', Georgia, serif",
              fontSize:30, fontWeight:900, lineHeight:1.1, marginBottom:12,
            }}>
              No posts yet.
            </h2>
            <p style={{ color:"rgba(255,255,255,0.32)", fontSize:13, letterSpacing:"0.04em", fontFamily:"'DM Mono', monospace" }}>
              Be the first to post!
            </p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14, width:"100%" }}>
            <div style={{ flex:1, height:1, background:"linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(6,182,212,0.3))" }}/>
            <span style={{ fontSize:8, letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(167,139,250,0.45)", fontFamily:"'DM Mono', monospace" }}>
              devswipe
            </span>
            <div style={{ flex:1, height:1, background:"linear-gradient(90deg, rgba(6,182,212,0.3), rgba(124,58,237,0.5), transparent)" }}/>
          </div>
        </div>
      </div>
    );
  }

  /* ── POSTS LIST ───────────────────────────────────────────────── */
  return (
    <div style={{ minHeight:"100vh", background:"#030308", display:"flex", flexDirection:"column", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* top-left live badge */}
      <div style={{
        position:"fixed", top:72, left:28, zIndex:10,
        display:"flex", alignItems:"center", gap:8,
        padding:"6px 12px", borderRadius:20,
        background:"rgba(124,58,237,0.12)",
        border:"1px solid rgba(124,58,237,0.25)",
        backdropFilter:"blur(10px)",
      }}>
        <div style={{
          width:6, height:6, borderRadius:"50%", background:"#a78bfa",
          boxShadow:"0 0 10px rgba(167,139,250,1)",
          animation:"dotWave 1.5s ease-in-out infinite",
        }}/>
        <span style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(167,139,250,0.8)", fontFamily:"'DM Mono', monospace" }}>
          live posts
        </span>
      </div>

      {/* post count badge */}
      <div style={{
        position:"fixed", top:72, right:28, zIndex:10,
        padding:"6px 14px", borderRadius:20,
        background:"rgba(6,182,212,0.08)",
        border:"1px solid rgba(6,182,212,0.2)",
        backdropFilter:"blur(10px)",
      }}>
        <span style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(6,182,212,0.7)", fontFamily:"'DM Mono', monospace" }}>
          {posts.length} posts
        </span>
      </div>

      {/* posts list */}
      <div style={{ position:"relative", zIndex:5, display:"flex", flexDirection:"column", flex:1 }}>
        <div style={{ maxWidth:560, width:"100%", margin:"0 auto", padding:"80px 16px 32px", flex:1 }}>
          {posts.map((post, i) => (
            <div
              key={post._id}
              className="pf-post-item"
              style={{ animationDelay:`${i * 0.08}s`, marginBottom:16 }}
            >
              <PostCard post={post} refreshPosts={fetchPosts} />
            </div>
          ))}
        </div>
    </div>
    </div>
  );
};

export default PostsFeed;