import axios from "axios";
import React, { useEffect, useRef } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --c1: #7c3aed;
    --c2: #a855f7;
    --c3: #06b6d4;
    --c4: #8b5cf6;
    --c5: #ec4899;
  }

  /* ── Aurora layers ── */
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

  /* ── Particles ── */
  @keyframes particle {
    0%   { transform: translateY(100vh) translateX(0) scale(0); opacity:0; }
    10%  { opacity:1; }
    90%  { opacity:0.6; }
    100% { transform: translateY(-10vh) translateX(var(--dx)) scale(1.5); opacity:0; }
  }
  @keyframes twinkle {
    0%,100% { opacity:0.1; transform:scale(0.8); }
    50%     { opacity:1; transform:scale(1.4); }
  }

  /* ── Card / UI ── */
  @keyframes cardEntry {
    0%   { opacity:0; transform:perspective(800px) rotateX(8deg) translateY(60px) scale(0.92); }
    100% { opacity:1; transform:perspective(800px) rotateX(0deg) translateY(0) scale(1); }
  }
  @keyframes glowPulse {
    0%,100% { box-shadow: 0 0 40px rgba(124,58,237,0.25), 0 40px 80px rgba(0,0,0,0.7); }
    50%     { box-shadow: 0 0 80px rgba(168,85,247,0.45), 0 40px 80px rgba(0,0,0,0.7), 0 0 120px rgba(6,182,212,0.15); }
  }
  @keyframes shimmerBorder {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes scanDown {
    0%   { top:-2px; opacity:0; }
    5%   { opacity:1; }
    95%  { opacity:0.6; }
    100% { top:100%; opacity:0; }
  }
  @keyframes titleReveal {
    from { opacity:0; letter-spacing:0.5em; filter:blur(8px); }
    to   { opacity:1; letter-spacing:-0.02em; filter:blur(0); }
  }
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes dotWave {
    0%,100% { transform:scaleY(0.3) scaleX(0.8); opacity:0.3; }
    50%     { transform:scaleY(1.4) scaleX(1); opacity:1; }
  }
  @keyframes iconFloat {
    0%,100% { transform:translateY(0) rotate(0deg); }
    50%     { transform:translateY(-12px) rotate(5deg); }
  }
  @keyframes gradShift {
    0%,100% { background-position:0% 50%; }
    50%     { background-position:100% 50%; }
  }
  @keyframes cornerGlow {
    0%,100% { opacity:0.4; }
    50%     { opacity:1; }
  }

  .card-entry  { animation: cardEntry 0.85s cubic-bezier(0.16,1,0.3,1) forwards; }
  .glow-pulse  { animation: glowPulse 3s ease-in-out infinite; }

  .grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .animated-border {
    position: relative;
  }
  .animated-border::before {
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
`;

/* ── Aurora Background ───────────────────────────────────────────── */
const AuroraBg = () => (
  <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
    {/* deep base */}
    <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, #0d0520 0%, #050510 50%, #030308 100%)" }}/>

    {/* aurora blobs */}
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

    {/* star field */}
    {[...Array(40)].map((_, i) => (
      <div key={i} style={{
        position:"absolute",
        left:`${Math.random()*100}%`,
        top:`${Math.random()*100}%`,
        width: i%5===0 ? 3 : i%3===0 ? 2 : 1,
        height: i%5===0 ? 3 : i%3===0 ? 2 : 1,
        borderRadius:"50%",
        background:"white",
        animation:`twinkle ${2+Math.random()*4}s ease-in-out ${Math.random()*4}s infinite`,
      }}/>
    ))}

    {/* rising particles */}
    {[...Array(14)].map((_, i) => (
      <div key={i} style={{
        position:"absolute",
        left:`${5+i*7}%`,
        bottom:0,
        width: i%3===0 ? 3 : 2,
        height: i%3===0 ? 3 : 2,
        borderRadius:"50%",
        background: i%2===0
          ? `rgba(168,85,247,${0.4+Math.random()*0.4})`
          : `rgba(6,182,212,${0.4+Math.random()*0.4})`,
        "--dx":`${-40+Math.random()*80}px`,
        animation:`particle ${6+Math.random()*10}s ease-in ${Math.random()*8}s infinite`,
      }}/>
    ))}


  </div>
);

/* ── Spinning rings loader ────────────────────────────────────────── */
const OrbLoader = () => (
  <div style={{ position:"relative", width:100, height:100 }}>
    {[0,1,2].map(i => (
      <div key={i} style={{
        position:"absolute",
        inset: i*14,
        borderRadius:"50%",
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
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed && feed.length > 0) return;
      const response = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true });
      dispatch(addFeed(response.data.users));
    } catch (error) {
      console.error("Feed Fetch Error:", error);
    }
  };

  useEffect(() => { getFeed(); }, []);

  /* ── LOADING ──────────────────────────────────────────────────────── */
  if (!feed) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", background:"#030308" }}>
        <style>{styles}</style>
        <AuroraBg />
        <div className="card-entry" style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:28 }}>
          <OrbLoader />
          <p style={{
            fontFamily:"'DM Mono', monospace", letterSpacing:"0.3em",
            fontSize:11, textTransform:"uppercase",
            color:"rgba(167,139,250,0.75)",
          }}>
            Scanning developers
          </p>
          <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:24 }}>
            {[0,1,2,3,4,5].map(i=>(
              <div key={i} style={{
                width:4, height:18, borderRadius:2,
                background:`linear-gradient(to top, #7c3aed, #38bdf8)`,
                animation:`dotWave 1s ease-in-out ${i*0.12}s infinite`,
              }}/>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── EMPTY ────────────────────────────────────────────────────────── */
  if (feed.length === 0) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", background:"#030308" }}>
        <style>{styles}</style>
        <AuroraBg />

        <div className="card-entry animated-border" style={{
          position:"relative", zIndex:10,
          padding:"56px 60px", borderRadius:24,
          background:"rgba(255,255,255,0.03)",
          backdropFilter:"blur(40px)",
          boxShadow:"0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)",
          maxWidth:400, textAlign:"center",
          display:"flex", flexDirection:"column", alignItems:"center", gap:28,
        }}>


          {/* corner accents */}
          {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i)=>(
            <div key={i} style={{
              position:"absolute", ...pos,
              width:16, height:16,
              borderTop: (pos.top===0) ? "2px solid rgba(167,139,250,0.6)" : "none",
              borderBottom: (pos.bottom===0) ? "2px solid rgba(167,139,250,0.6)" : "none",
              borderLeft: (pos.left===0) ? "2px solid rgba(167,139,250,0.6)" : "none",
              borderRight: (pos.right===0) ? "2px solid rgba(167,139,250,0.6)" : "none",
              animation:`cornerGlow 2s ease-in-out ${i*0.5}s infinite`,
            }}/>
          ))}

          <div style={{
            width:80, height:80, borderRadius:"50%",
            background:"radial-gradient(circle at 35% 35%, rgba(232,121,249,0.2), rgba(124,58,237,0.1))",
            border:"1px solid rgba(232,121,249,0.25)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 0 60px rgba(232,121,249,0.2), inset 0 0 40px rgba(124,58,237,0.1)",
            animation:"iconFloat 4s ease-in-out infinite",
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="url(#hg)" strokeWidth="1.4">
              <defs>
                <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e879f9"/>
                  <stop offset="50%" stopColor="#a78bfa"/>
                  <stop offset="100%" stopColor="#38bdf8"/>
                </linearGradient>
              </defs>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
          </div>

          <div>
            <h2 className="grad-title" style={{
              fontFamily:"'Playfair Display', Georgia, serif",
              fontSize:34, fontWeight:900, lineHeight:1.1,
              marginBottom:12,
              animation:"titleReveal 0.8s ease forwards, gradShift 4s ease infinite",
            }}>
              You're all caught up!
            </h2>
            <p style={{ color:"rgba(255,255,255,0.32)", fontSize:13, letterSpacing:"0.04em", fontFamily:"'DM Mono', monospace" }}>
              No more developers to discover.
            </p>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:14, width:"100%" }}>
            <div style={{ flex:1, height:1, background:"linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(6,182,212,0.3))" }}/>
            <span style={{ fontSize:8, letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(167,139,250,0.45)", fontFamily:"'DM Mono', monospace" }}>
              check back soon
            </span>
            <div style={{ flex:1, height:1, background:"linear-gradient(90deg, rgba(6,182,212,0.3), rgba(124,58,237,0.5), transparent)" }}/>
          </div>

          <p style={{ fontSize:10, color:"rgba(255,255,255,0.15)", letterSpacing:"0.1em", fontFamily:"'DM Mono', monospace" }}>
            ◈ &nbsp;End-to-end encrypted &nbsp;◈
          </p>
        </div>
      </div>
    );
  }

  /* ── FEED ─────────────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", background:"#030308" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* top-left live badge */}
      <div style={{
        position:"absolute", top:24, left:28, zIndex:10,
        display:"flex", alignItems:"center", gap:8,
        padding:"6px 12px", borderRadius:20,
        background:"rgba(124,58,237,0.12)",
        border:"1px solid rgba(124,58,237,0.25)",
        backdropFilter:"blur(10px)",
      }}>
        <div style={{
          width:6, height:6, borderRadius:"50%",
          background:"#a78bfa",
          boxShadow:"0 0 10px rgba(167,139,250,1)",
          animation:"dotWave 1.5s ease-in-out infinite",
        }}/>
        <span style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(167,139,250,0.8)", fontFamily:"'DM Mono', monospace" }}>
          live feed
        </span>
      </div>

      {/* top-right queue counter */}
      <div style={{
        position:"absolute", top:24, right:28, zIndex:10,
        padding:"6px 14px", borderRadius:20,
        background:"rgba(6,182,212,0.08)",
        border:"1px solid rgba(6,182,212,0.2)",
        backdropFilter:"blur(10px)",
      }}>
        <span style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(6,182,212,0.7)", fontFamily:"'DM Mono', monospace" }}>
          {feed.length} in queue
        </span>
      </div>

      {/* stacked ghost cards */}
      {feed.length > 2 && (
        <div style={{
          position:"absolute", zIndex:1, borderRadius:24,
          border:"1px solid rgba(124,58,237,0.08)",
          background:"rgba(124,58,237,0.02)",
          width:"calc(100% - 140px)", maxWidth:420, height:180,
          transform:"translateY(32px) scale(0.91)",
          backdropFilter:"blur(4px)",
        }}/>
      )}
      {feed.length > 1 && (
        <div style={{
          position:"absolute", zIndex:2, borderRadius:24,
          border:"1px solid rgba(124,58,237,0.14)",
          background:"rgba(124,58,237,0.03)",
          width:"calc(100% - 90px)", maxWidth:440, height:180,
          transform:"translateY(16px) scale(0.96)",
          backdropFilter:"blur(8px)",
        }}/>
      )}

      {/* main card */}
      <div className="card-entry glow-pulse animated-border" style={{
        position:"relative", zIndex:3, borderRadius:24,
        background:"rgba(255,255,255,0.03)",
        backdropFilter:"blur(40px)",
        overflow:"hidden",
      }}>
        {/* top iridescent bar */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:2,
          background:"linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed)",
          backgroundSize:"300% 100%",
          animation:"shimmerBorder 3s linear infinite",
        }}/>



        {/* corner labels */}
        <div style={{
          position:"absolute", top:14, left:16, zIndex:10,
          fontSize:8, letterSpacing:"0.2em", textTransform:"uppercase",
          color:"rgba(167,139,250,0.5)", fontFamily:"'DM Mono', monospace",
        }}>devswipe</div>
        <div style={{
          position:"absolute", top:14, right:16, zIndex:10,
          fontSize:8, letterSpacing:"0.2em", textTransform:"uppercase",
          color:"rgba(6,182,212,0.5)", fontFamily:"'DM Mono', monospace",
        }}>{`#${String(feed.length).padStart(3,"0")}`}</div>

        <UserCard user={feed[0]} />

        {/* bottom bar */}
        <div style={{
          padding:"10px 20px 14px",
          display:"flex", alignItems:"center", justifyContent:"center", gap:10,
          borderTop:"1px solid rgba(124,58,237,0.12)",
          background:"rgba(0,0,0,0.25)",
        }}>
          <div style={{ width:4, height:4, borderRadius:"50%", background:"rgba(124,58,237,0.5)", boxShadow:"0 0 6px rgba(124,58,237,0.6)" }}/>
          <p style={{ fontSize:10, color:"rgba(255,255,255,0.15)", letterSpacing:"0.1em", fontFamily:"'DM Mono', monospace" }}>
            End-to-end encrypted
          </p>
          <div style={{ width:4, height:4, borderRadius:"50%", background:"rgba(6,182,212,0.5)", boxShadow:"0 0 6px rgba(6,182,212,0.6)" }}/>
        </div>
      </div>
    </div>
  );
};

export default Feed;

// import axios from "axios";
// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import UserCard from "./UserCard";

// const Feed = () => {
//   const dispatch = useDispatch();
//   const feed = useSelector((store) => store.feed);

//   const getFeed = async () => {
//     try {
//       if (feed && feed.length > 0) return;

//       const response = await axios.get(`${BASE_URL}/user/feed`, {
//         withCredentials: true,
//       });

//       dispatch(addFeed(response.data));
//     } catch (error) {
//       console.error("Feed Fetch Error:", error);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   // Loading
//   if (!feed) {
//     return (
//       <h1 className="flex justify-center mt-52 text-2xl">
//         Loading feed...
//       </h1>
//     );
//   }

//   // No users left
//   if (feed.length === 0) {
//     return (
//       <h1 className="flex justify-center mt-52 text-3xl">
//         No more users!!!!
//       </h1>
//     );
//   }

//   // ✅ ONLY SHOW FIRST USER (TINDER STYLE)
//   return (
//     <div className="flex justify-center my-10">
//       <UserCard user={feed[0]} />
//     </div>
//   );
// };

// export default Feed;


// // import axios from "axios";
// // import React, { useEffect } from "react";
// // import { BASE_URL } from "../utils/const";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addFeed } from "../utils/feedSlice";
// // import UserCard from "./UserCard";

// // const Feed = () => {
// //   const dispatch = useDispatch();
// //   const feed = useSelector((store) => store.feed);

// //   const getFeed = async () => {
// //     try {
// //       // Prevent refetch if feed already exists
// //       if (feed && feed.length > 0) return;

// //       const response = await axios.get(`${BASE_URL}/user/feed`, {
// //         withCredentials: true,
// //       });

// //       dispatch(addFeed(response.data));
// //     } catch (error) {
// //       console.error("Feed Fetch Error:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     getFeed();
// //   }, []); // ✅ IMPORTANT: empty dependency array

// //   // Loading state
// //   if (!feed) {
// //     return (
// //       <h1 className="flex justify-center mt-52 text-2xl">
// //         Loading feed...
// //       </h1>
// //     );
// //   }

// //   // No users left
// //   if (feed.length === 0) {
// //     return (
// //       <h1 className="flex justify-center mt-52 text-3xl">
// //         No more users!!!!
// //       </h1>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col items-center gap-4 my-5">
// //       {feed.map((user) => (
// //         <UserCard key={user._id} user={user} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default Feed;