// import React, { useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnection } from "../utils/connectionSlice";
// import { Link } from "react-router-dom";

// function Connections() {
//   const connections = useSelector((store) => store.connection);
//   const dispatch = useDispatch();

//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/connection", {
//         withCredentials: true,
//       });

//       dispatch(addConnection(res.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connections || connections.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <h1 className="text-3xl text-gray-400 font-semibold">
//           No Connections Yet
//         </h1>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto my-12 px-6">

//       {/* Title */}
//       <h1 className="text-4xl font-bold text-center mb-10 
//       bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
//         Your Connections ({connections.length})
//       </h1>

//       {/* Cards */}
//       <div className="grid gap-6">
//         {connections.map((connection) => {
//           const {
//             _id,
//             firstname,
//             lastname,
//             photoURL,
//             age,
//             gender,
//             about,
//           } = connection.connectionWith;

//           return (
//             <div
//               key={_id}
//               className="flex items-center justify-between p-6 rounded-2xl
//               bg-slate-800/40 backdrop-blur-md border border-slate-700
//               hover:border-blue-400 hover:scale-[1.02]
//               transition duration-300 shadow-lg"
//             >
              
//               {/* Left Section */}
//               <div className="flex items-center gap-5">

//                 {/* Avatar */}
//                 <div className="relative">
//                   <img
//                     src={photoURL}
//                     alt="profile"
//                     className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
//                   />

//                   {/* Online Indicator */}
//                   {/* <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-black rounded-full"></span> */}
//                 </div>

//                 {/* User Info */}
//                 <div>
//                   <h2 className="text-xl font-semibold text-white">
//                     {firstname} {lastname}
//                   </h2>

//                   {age && gender && (
//                     <p className="text-sm text-blue-300">
//                       {age} • {gender}
//                     </p>
//                   )}

//                   <p className="text-gray-400 text-sm max-w-md">
//                     {about}
//                   </p>
//                 </div>
//               </div>

//               {/* Chat Button */}
//               <Link to={"/chat/" + _id}>
//                 <button
//                   className="px-5 py-2 rounded-lg font-semibold text-white
//                   bg-gradient-to-r from-blue-500 to-cyan-500
//                   hover:scale-105 transition shadow-md"
//                 >
//                   💬 Chat
//                 </button>
//               </Link>

//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Connections;

// // import React, { useEffect } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addConnection } from "../utils/connectionSlice";
// // import { Link } from "react-router-dom";

// // function Connections() {
// //   const connections = useSelector((store) => store.connection);
// //   const dispatch = useDispatch();

// //   const fetchConnections = async () => {
// //     try {
// //       const res = await axios.get(
// //         BASE_URL + "/user/connection",
// //         { withCredentials: true }
// //       );

// //       dispatch(addConnection(res.data));
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchConnections();
// //   }, []);

// //   // ✅ HANDLE EMPTY OR NULL STATE PROPERLY
// //   if (!connections || connections.length === 0) {
// //     return (
// //       <h1 className="flex justify-center text-2xl my-10 text-green-300">
// //         No connections found
// //       </h1>
// //     );
// //   }

// //   return (
// //     <div className="text-center my-10">
// //       <h1 className="font-bold text-3xl text-pink-400">
// //         Connections ({connections.length})
// //       </h1>

// //       {connections.map((connection) => {
// //         const {
// //           _id,
// //           firstname,
// //           lastname,
// //           photoURL,
// //           age,
// //           gender,
// //           about,
// //         } = connection.connectionWith;

// //         return (
// //           <div
// //             key={_id}
// //             className="flex items-center m-2 p-2 rounded-lg bg-base-300 w-1/2 mx-auto"
// //           >
// //             <img
// //               alt="photo"
// //               className="w-14 h-14 rounded-full object-contain"
// //               src={photoURL}
// //             />

// //             <div className="text-left m-4 p-4">
// //               <h2 className="font-bold text-xl">
// //                 {firstname} {lastname}
// //               </h2>

// //               {age && gender && <p>{age} • {gender}</p>}
// //               <p>{about}</p>
// //             </div>
// //             <div className="border-t border-gray-700 my-1">
// //                <Link to={"/chat/" + _id}>
// //               <button className="btn btn-primary">Chat</button>
// //             </Link>
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// // export default Connections;



// // import React, { useEffect } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addConnection, removeConnection } from "../utils/connectionSlice";

// // function Connections() {
// //   const connections = useSelector((store) => store.connection);
// //   const dispatch = useDispatch();

// //   const fetchConnections = async () => {
// //     try {
// //       dispatch(removeConnection());

// //       const res = await axios.get(
// //         BASE_URL + "/user/connection",
// //         { withCredentials: true }
// //       );

// //       dispatch(addConnection(res.data));
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchConnections();
// //   }, []);

// //   if (!connections) return null;

// //   if (connections.length === 0) {
// //     return (
// //       <h1 className="flex justify-center text-2xl my-10 text-green-300">
// //         No connections found
// //       </h1>
// //     );
// //   }

// //   return (
// //     <div className="text-center my-10">
// //       <h1 className="font-bold text-3xl text-pink-400">
// //         Connections ({connections.length})
// //       </h1>

// //       {connections.map((connection) => {
// //         const {
// //           _id,
// //           firstname,
// //           lastname,
// //           photoURL,
// //           age,
// //           gender,
// //           about
// //         } = connection.connectionWith;   // ✅ IMPORTANT FIX

// //         return (
// //           <div
// //             key={_id}
// //             className="flex items-center m-2 p-2 rounded-lg bg-base-300 w-1/2 mx-auto"
// //           >
// //             <img
// //               alt="photo"
// //               className="w-14 h-14 rounded-full object-contain"
// //               src={photoURL}
// //             />

// //             <div className="text-left m-4 p-4">
// //               <h2 className="font-bold text-xl">
// //                 {firstname} {lastname}
// //               </h2>

// //               {age && gender && <p>{age} {gender}</p>}
// //               <p>{about}</p>
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// // export default Connections;


// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addConnection, removeConnection } from "../utils/connectionSlice";

// // const Connections = () => {
 
// //   const connections = useSelector((store) => store.connection);
// //   console.log(connections);
// //   const dispatch = useDispatch();
  
// //   const fetchConnections = async () => {
// //     try {
// //       dispatch(removeConnection());
// //       const connections = await axios.get(BASE_URL + "/user/connection", {
// //         withCredentials: true,
// //       });
// //       dispatch(addConnection(connections.data));
// //       console.log(connections.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchConnections();
// //   }, []);

// //   if (!connections) return;
// //   if (connections.length == 0)
// //     return (
// //       <>
// //         <h1 className="flex justify-center text-2xl my-10 text-green-300">
// //           No conections found
// //         </h1>
// //       </>
// //     );

// //   return (
// //     <div className=" text-center my-10">
// //       <h1 className="font-bold text-3xl text-pink-400">Connections ({connections.length})</h1>
// //       {connections.map((connection) => {
// //         const {_id, firstname, lastname, photoURL, age, gender, about } =
// //           connection;

// //         return (
// //           <div key={_id} className="flex items-center m-2 p-2  rounded-lg bg-base-300 w-1/2 mx-auto">
// //             <div>
// //               <img
// //                 alt="photo"
// //                 className="w-14 h-14 rounded-full object-contain"
// //                 src={photoURL}
// //               />
// //             </div>
// //             <div className="text-left m-4 p-4 ">
// //               <h2 className="font-bold text-xl">
// //                 {firstname + " " + lastname}
// //               </h2>
// //               {age && gender && <p>{age + " " + gender}</p>}
// //               <p>{about}</p>
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default Connections;

import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
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
  @keyframes dotWave {
    0%,100% { transform:scaleY(0.3) scaleX(0.8); opacity:0.3; }
    50%     { transform:scaleY(1.4) scaleX(1); opacity:1; }
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

  .cn-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .cn-animated-border { position: relative; }
  .cn-animated-border::before {
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

  .cn-card {
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-radius: 18px;
    border: 1px solid rgba(124,58,237,0.2);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    overflow: hidden;
  }
  .cn-card:hover {
    border-color: rgba(168,85,247,0.5);
    transform: translateY(-3px) scale(1.005);
    box-shadow: 0 20px 60px rgba(124,58,237,0.2);
  }
  .cn-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(167,139,250,0.4), rgba(6,182,212,0.3), transparent);
  }

  .cn-chat-btn {
    padding: 10px 20px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    box-shadow: 0 0 20px rgba(124,58,237,0.3);
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    white-space: nowrap;
  }
  .cn-chat-btn:hover {
    opacity: 0.85;
    transform: translateY(-2px);
    box-shadow: 0 0 32px rgba(124,58,237,0.5);
  }
  .cn-chat-btn:active { transform: scale(0.97); }
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

function Connections() {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", { withCredentials: true });
      dispatch(addConnection(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchConnections(); }, []);

  /* ── EMPTY ────────────────────────────────────────────────────── */
  if (!connections || connections.length === 0) {
    return (
      <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <style>{styles}</style>
        <AuroraBg />
        <div className="cn-animated-border" style={{
          position:"relative", zIndex:10,
          padding:"56px 64px", borderRadius:24, textAlign:"center",
          background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)",
          boxShadow:"0 40px 100px rgba(0,0,0,0.7)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:24,
        }}>
          <div style={{ width:72, height:72, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(232,121,249,0.2), rgba(124,58,237,0.1))", border:"1px solid rgba(232,121,249,0.25)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 60px rgba(232,121,249,0.2)", animation:"iconFloat 4s ease-in-out infinite" }}>
            <span style={{ fontSize:30 }}>🤝</span>
          </div>
          <div>
            <h2 className="cn-grad-title" style={{ fontFamily:"'Playfair Display', serif", fontSize:28, fontWeight:900, marginBottom:10 }}>No Connections Yet</h2>
            <p style={{ color:"rgba(255,255,255,0.3)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>Start swiping to build your network!</p>
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

      {/* count badge */}
      <div style={{ position:"fixed", top:72, right:28, zIndex:10, padding:"6px 14px", borderRadius:20, background:"rgba(6,182,212,0.08)", border:"1px solid rgba(6,182,212,0.2)", backdropFilter:"blur(10px)" }}>
        <span style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(6,182,212,0.7)", fontFamily:"'DM Mono', monospace" }}>
          {connections.length} connections
        </span>
      </div>

      <div style={{ position:"relative", zIndex:5, maxWidth:800, margin:"0 auto", padding:"80px 24px 48px" }}>

        {/* Title */}
        <h1 className="cn-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:36, fontWeight:900, textAlign:"center", marginBottom:40, lineHeight:1.1 }}>
          Your Connections
        </h1>

        {/* Cards */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {connections.map((connection, i) => {
            const { _id, firstname, lastname, photoURL, age, gender, about } = connection.connectionWith;

            return (
              <div key={_id} className="cn-card" style={{ animationDelay:`${i * 0.07}s` }}>

                {/* Left: avatar + info */}
                <div style={{ display:"flex", alignItems:"center", gap:18, flex:1, minWidth:0 }}>

                  {/* Avatar */}
                  <div style={{ position:"relative", flexShrink:0 }}>
                    <div style={{ width:56, height:56, borderRadius:"50%", padding:2, background:"linear-gradient(135deg, #7c3aed, #06b6d4, #ec4899)" }}>
                      <img
                        src={photoURL}
                        alt="profile"
                        style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", display:"block", background:"#0a0a0f" }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ minWidth:0 }}>
                    <h2 style={{ color:"white", fontSize:16, fontWeight:700, fontFamily:"'Playfair Display', serif", marginBottom:2 }}>
                      {firstname} {lastname}
                    </h2>
                    {age && gender && (
                      <p style={{ fontSize:10, color:"rgba(167,139,250,0.7)", fontFamily:"'DM Mono', monospace", letterSpacing:"0.08em", marginBottom:4 }}>
                        {age} • {gender}
                      </p>
                    )}
                    <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", fontFamily:"'DM Mono', monospace", lineHeight:1.5, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                      {about}
                    </p>
                  </div>
                </div>

                {/* Chat button */}
                <Link to={"/chat/" + _id} style={{ marginLeft:20, flexShrink:0 }}>
                  <button className="cn-chat-btn">💬 Chat</button>
                </Link>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Connections;