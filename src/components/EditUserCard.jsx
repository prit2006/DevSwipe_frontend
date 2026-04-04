// import axios from "axios";
// import React from "react";
// import { useDispatch } from "react-redux";
// import { BASE_URL } from "../utils/const";
// import { removeUserFromFeed } from "../utils/feedSlice";

// const EditUserCard = ({ user }) => {
//   const dispatch = useDispatch();

//   if (!user) return null;

//   const {
//     _id,
//     firstname,
//     lastname,
//     age,
//     gender,
//     about,
//     photoURL,
//     skills = [],
//   } = user;

//   return (
//     <div className="card bg-base-300 w-96 shadow-xl p-4">
//       <figure>
//         <img
//           src={photoURL || "https://via.placeholder.com/300"}
//           alt="User"
//           className="rounded-xl"
//         />
//       </figure>

//       <div className="card-body">
//         <h2 className="card-title">
//           {firstname} {lastname}
//         </h2>

//         {age && gender && (
//           <p className="text-sm text-gray-500">
//             {age}, {gender}
//           </p>
//         )}

//         {about && <p>{about}</p>}

//         {skills.length > 0 && (
//           <div className="mt-2">
//             <h3 className="font-semibold mb-1">Skills</h3>
//             <div className="flex flex-wrap gap-2">
//               {skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="bg-blue-200 text-blue-700 px-2 py-1 rounded-lg text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

      
//       </div>
//     </div>
//   );
// };

// export default EditUserCard;


import React from "react";

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
  @keyframes cardEntry {
    0%   { opacity:0; transform:perspective(800px) rotateX(8deg) translateY(40px) scale(0.95); }
    100% { opacity:1; transform:perspective(800px) rotateX(0deg) translateY(0) scale(1); }
  }
  @keyframes glowPulse {
    0%,100% { box-shadow: 0 0 40px rgba(124,58,237,0.2), 0 30px 60px rgba(0,0,0,0.6); }
    50%     { box-shadow: 0 0 70px rgba(168,85,247,0.4), 0 30px 60px rgba(0,0,0,0.6), 0 0 100px rgba(6,182,212,0.12); }
  }

  .euc-card-entry { animation: cardEntry 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
  .euc-glow       { animation: glowPulse 3s ease-in-out infinite; }

  .euc-grad-name {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 40%, #38bdf8 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }
`;

const EditUserCard = ({ user }) => {
  if (!user) return null;
  const { firstname, lastname, age, gender, about, photoURL, skills = [] } = user;

  return (
    <>
      <style>{styles}</style>
      <div
        className="euc-card-entry euc-glow"
        style={{
          position: "relative",
          width: 300,
          borderRadius: 24,
          border: "1px solid rgba(124,58,237,0.25)",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(40px)",
          overflow: "hidden",
        }}
      >
        {/* shimmer top bar */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed)", backgroundSize:"300% 100%", animation:"shimmerBorder 3s linear infinite", zIndex:2 }}/>

        {/* Photo */}
        <div style={{ position:"relative", height:240, overflow:"hidden" }}>
          <img
            src={photoURL || "https://via.placeholder.com/300x240"}
            alt="preview"
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 45%, rgba(3,3,8,0.92) 100%)" }}/>
          {/* name over photo */}
          <div style={{ position:"absolute", bottom:14, left:16, right:16 }}>
            <h2 className="euc-grad-name" style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:900, marginBottom:2 }}>
              {firstname || "First"} {lastname || "Last"}
            </h2>
            {age && gender && (
              <p style={{ color:"rgba(167,139,250,0.8)", fontSize:10, fontFamily:"'DM Mono', monospace", letterSpacing:"0.08em" }}>
                {age} · {gender}
              </p>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding:"14px 18px 18px" }}>
          {about && (
            <p style={{ color:"rgba(255,255,255,0.4)", fontSize:11, fontFamily:"'DM Mono', monospace", lineHeight:1.6, marginBottom:14, letterSpacing:"0.02em" }}>
              {about}
            </p>
          )}

          {skills.length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {skills.map((skill, i) => (
                <span key={i} style={{ padding:"3px 10px", borderRadius:20, background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.28)", color:"rgba(167,139,250,0.85)", fontSize:10, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* bottom label */}
          <div style={{ marginTop:14, paddingTop:12, borderTop:"1px solid rgba(124,58,237,0.1)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <div style={{ width:3, height:3, borderRadius:"50%", background:"rgba(124,58,237,0.5)" }}/>
            <span style={{ fontSize:9, color:"rgba(255,255,255,0.12)", fontFamily:"'DM Mono', monospace", letterSpacing:"0.12em" }}>live preview</span>
            <div style={{ width:3, height:3, borderRadius:"50%", background:"rgba(6,182,212,0.5)" }}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserCard;