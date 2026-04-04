// import axios from "axios";
// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { addRequests, removeRequest } from "../utils/requestSlice";

// const Requests = () => {
//   const dispatch = useDispatch();
//   const requests = useSelector(store => store.request);

//   const reviewRequest = async (status, requestId, senderUserId) => {
//     try {
//       await axios.post(
//         `${BASE_URL}/request/review/${status}/${senderUserId}`,
//         {},
//         { withCredentials: true }
//       );

//       // ✅ REMOVE FROM UI
//       dispatch(removeRequest(requestId));
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/user/requests/received`,
//         { withCredentials: true }
//       );
//       dispatch(addRequests(res.data));
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   if (!requests || requests.length === 0) {
//     return (
//       <h1 className="flex justify-center text-2xl my-10 text-green-300">
//         No Requests found
//       </h1>
//     );
//   }

//   return (
//     <div className="text-center my-10">
//       <h1 className="font-bold text-3xl text-pink-400 p-4">
//         Requests ({requests.length})
//       </h1>

//       {requests.map(request => {
//         const { _id: requestId, senderId } = request;
//         const { _id: senderUserId, firstname, lastname, photoURL, age, gender, about } = senderId;

//         return (
//           <div
//             key={requestId}
//             className="flex justify-between items-center m-2 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
//           >
//             <img
//               src={photoURL}
//               alt="profile"
//               className="w-14 h-14 rounded-full object-cover"
//             />

//             <div className="text-left flex-1 mx-4">
//               <h2 className="font-bold text-xl">
//                 {firstname} {lastname}
//               </h2>
//               {age && gender && <p>{age} • {gender}</p>}
//               <p>{about}</p>
//             </div>

//             <div>
//               <button
//                 type="button"
//                 className="btn btn-secondary mx-2"
//                 onClick={() =>
//                   reviewRequest("accepted", requestId, senderUserId)
//                 }
//               >
//                 Accept
//               </button>

//               <button
//                 type="button"
//                 className="btn btn-primary mx-2"
//                 onClick={() =>
//                   reviewRequest("rejected", requestId, senderUserId)
//                 }
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Requests;

// // import axios from "axios";
// // import React, { useEffect } from "react";
// // import { BASE_URL } from "../utils/const";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addRequests, removeRequest } from "../utils/requestSlice";

// // const Requests = () => {
// //   const dispatch = useDispatch();
// //   const requests = useSelector((store) => store.request);

// //   const reviewRequest = async (status, senderId) => {
// //     try {
// //       await axios.post(
// //         `${BASE_URL}/request/review/${status}/${senderId}`,
// //         {},
// //         { withCredentials: true }
// //       );

// //       dispatch(removeRequest(senderId));
// //     } catch (error) {
// //       console.log(error.response?.data || error.message);
// //     }
// //   };

// //   const fetchRequests = async () => {
// //     try {
// //       const res = await axios.get(
// //         `${BASE_URL}/user/requests/received`,
// //         { withCredentials: true }
// //       );

// //       dispatch(addRequests(res.data));
// //     } catch (error) {
// //       console.log(error.response?.data || error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRequests();
// //   }, []);

// //   if (!requests) return null;

// //   if (requests.length === 0) {
// //     return (
// //       <h1 className="flex justify-center text-2xl my-10 text-green-300">
// //         No Requests found
// //       </h1>
// //     );
// //   }

// //   return (
// //     <div className="text-center my-10">
// //       <h1 className="font-bold text-3xl text-pink-400 p-4">
// //         Requests ({requests.length})
// //       </h1>

// //       {requests.map((request) => {
// //         const { senderId } = request;

// //         const {
// //           _id: senderUserId,
// //           firstname,
// //           lastname,
// //           photoURL,
// //           age,
// //           gender,
// //           about
// //         } = senderId;

// //         return (
// //           <div
// //             key={senderUserId}
// //             className="flex justify-between items-center m-2 p-2 rounded-lg bg-base-300 w-2/3 mx-auto"
// //           >
// //             <img
// //               alt="photo"
// //               className="w-14 h-14 rounded-full object-cover"
// //               src={photoURL}
// //             />

// //             <div className="text-left m-4 p-4">
// //               <h2 className="font-bold text-xl">
// //                 {firstname} {lastname}
// //               </h2>
// //               {age && gender && <p>{age} {gender}</p>}
// //               <p>{about}</p>
// //             </div>

// //             <div>
// //               <button
// //                 className="btn btn-secondary mx-2"
// //                 onClick={() => reviewRequest("accepted", senderUserId)}
// //               >
// //                 Accept
// //               </button>

// //               <button
// //                 className="btn btn-primary mx-2"
// //                 onClick={() => reviewRequest("rejected", senderUserId)}
// //               >
// //                 Reject
// //               </button>
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default Requests;



// // import axios from "axios";
// // import React, { useState } from "react";
// // import { BASE_URL } from "../utils/const";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addRequests, removeRequest } from "../utils/requestSlice";

// // const Requests = () => {
// //   const dispatch = useDispatch();
// //   const requests = useSelector((store) => store.request);
// //   console.log(requests);

// //   const reviewRequest = async (status, _id) => {
// //     try {
// //       const res = await axios.post(
// //         BASE_URL + "/request/review" + "/" + status + "/" + _id,
// //         {},
// //         { withCredentials: true }
// //       );
// //       dispatch(removeRequest(_id));
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const fetchRequests = async () => {
// //     try {
// //       const requests = await axios.get(BASE_URL + "/user/requests/recieved", {
// //         withCredentials: true,
// //       });
// //       dispatch(addRequests(requests.data.connectionRequests));
// //       //   console.log(requests.data.connectionRequests);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useState(() => {
// //     fetchRequests();
// //   }, []);
// //   if (!requests) return;
// //   if (requests.length == 0)
// //     return (
// //       <>
// //         <h1 className="flex justify-center text-2xl my-10 text-green-300">
// //           No Requests found
// //         </h1>
// //       </>
// //     );

// //   return (
// //     <div className=" text-center my-10">
// //       <h1 className="font-bold text-3xl text-pink-400 p-4">
// //         Requests ({requests.length})
// //       </h1>
// //       {requests.map((request) => {
// //         const { _id, firstname, lastname, photoURL, age, gender, about } =
// //           request.fromUserId;

// //         return (
// //           <div
// //             key={_id}
// //             className="flex justify-between items-center m-2 p-2  rounded-lg bg-base-300 w-2/3 mx-auto"
// //           >
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
// //             <div className="">
// //               <button
// //                 className="btn btn-secondary mx-2"
// //                 onClick={() => reviewRequest("accepted", request._id)}
// //               >
// //                 Accept
// //               </button>
// //               <button
// //                 className="btn btn-primary mx-2"
// //                 onClick={() => reviewRequest("rejected", request._id)}
// //               >
// //                 Reject
// //               </button>
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default Requests;

import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

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
  @keyframes slideOut {
    to { opacity:0; transform:translateX(60px) scale(0.95); }
  }

  .rq-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .rq-animated-border { position: relative; }
  .rq-animated-border::before {
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

  .rq-card {
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    border-radius: 18px;
    border: 1px solid rgba(124,58,237,0.2);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    transition: border-color 0.2s, box-shadow 0.2s;
    overflow: hidden;
  }
  .rq-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(167,139,250,0.35), rgba(6,182,212,0.25), transparent);
  }
  .rq-card:hover {
    border-color: rgba(168,85,247,0.35);
    box-shadow: 0 12px 40px rgba(124,58,237,0.12);
  }

  .rq-accept-btn {
    padding: 9px 18px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #059669, #0891b2);
    color: white;
    box-shadow: 0 0 16px rgba(5,150,105,0.35);
    transition: opacity 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .rq-accept-btn:hover { opacity: 0.85; transform: translateY(-1px) scale(1.04); }

  .rq-reject-btn {
    padding: 9px 18px;
    border-radius: 10px;
    border: 1px solid rgba(236,72,153,0.3);
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: rgba(236,72,153,0.08);
    color: rgba(236,72,153,0.8);
    transition: all 0.2s;
    white-space: nowrap;
  }
  .rq-reject-btn:hover {
    background: rgba(236,72,153,0.18);
    border-color: rgba(236,72,153,0.55);
    transform: translateY(-1px);
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

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.request);

  const reviewRequest = async (status, requestId, senderUserId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${senderUserId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
      dispatch(addRequests(res.data));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  /* ── EMPTY ────────────────────────────────────────────────────── */
  if (!requests || requests.length === 0) {
    return (
      <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <style>{styles}</style>
        <AuroraBg />
        <div className="rq-animated-border" style={{
          position:"relative", zIndex:10,
          padding:"56px 60px", borderRadius:24, textAlign:"center",
          background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)",
          boxShadow:"0 40px 100px rgba(0,0,0,0.7)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:24, maxWidth:380,
        }}>
          <div style={{ width:72, height:72, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(232,121,249,0.2), rgba(124,58,237,0.1))", border:"1px solid rgba(232,121,249,0.25)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 60px rgba(232,121,249,0.2)", animation:"iconFloat 4s ease-in-out infinite" }}>
            <span style={{ fontSize:28 }}>📬</span>
          </div>
          <div>
            <h2 className="rq-grad-title" style={{ fontFamily:"'Playfair Display', serif", fontSize:26, fontWeight:900, marginBottom:8 }}>No Requests</h2>
            <p style={{ color:"rgba(255,255,255,0.3)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>No pending connection requests.</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── LIST ─────────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* count badge */}
      <div style={{ position:"fixed", top:72, right:28, zIndex:10, padding:"6px 14px", borderRadius:20, background:"rgba(236,72,153,0.08)", border:"1px solid rgba(236,72,153,0.2)", backdropFilter:"blur(10px)" }}>
        <span style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(236,72,153,0.7)", fontFamily:"'DM Mono', monospace" }}>
          {requests.length} pending
        </span>
      </div>

      <div style={{ position:"relative", zIndex:5, maxWidth:800, margin:"0 auto", padding:"80px 24px 48px" }}>

        <h1 className="rq-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:34, fontWeight:900, textAlign:"center", marginBottom:40, lineHeight:1.1 }}>
          Connection Requests
        </h1>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {requests.map((request, i) => {
            const { _id: requestId, senderId } = request;
            const { _id: senderUserId, firstname, lastname, photoURL, age, gender, about } = senderId;

            return (
              <div key={requestId} className="rq-card" style={{ animationDelay:`${i * 0.07}s` }}>

                {/* Avatar */}
                <div style={{ position:"relative", flexShrink:0 }}>
                  <div style={{ width:56, height:56, borderRadius:"50%", padding:2, background:"linear-gradient(135deg, #ec4899, #7c3aed)" }}>
                    <img
                      src={photoURL}
                      alt="profile"
                      style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", display:"block" }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <h2 style={{ color:"white", fontSize:16, fontWeight:700, fontFamily:"'Playfair Display', serif", marginBottom:3 }}>
                    {firstname} {lastname}
                  </h2>
                  {age && gender && (
                    <p style={{ fontSize:10, color:"rgba(167,139,250,0.7)", fontFamily:"'DM Mono', monospace", letterSpacing:"0.08em", marginBottom:4 }}>
                      {age} · {gender}
                    </p>
                  )}
                  <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", fontFamily:"'DM Mono', monospace", lineHeight:1.5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:360 }}>
                    {about}
                  </p>
                </div>

                {/* Action buttons */}
                <div style={{ display:"flex", gap:10, flexShrink:0 }}>
                  <button
                    type="button"
                    className="rq-accept-btn"
                    onClick={() => reviewRequest("accepted", requestId, senderUserId)}
                  >
                    ✓ Accept
                  </button>
                  <button
                    type="button"
                    className="rq-reject-btn"
                    onClick={() => reviewRequest("rejected", requestId, senderUserId)}
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;