// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../utils/const";

// const MyApplications = () => {
//     const [apps, setApps] = useState([]);

//     useEffect(() => {
//         axios.get(`${BASE_URL}/job/applications/me`, { withCredentials: true })
//             .then(res => setApps(res.data))
//             .catch(err => console.error(err));
//     }, []);

//     return (
//         <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold text-green-400">My Applications</h1>
//                 <Link to="/jobs" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition font-medium">Find More Jobs</Link>
//             </div>

//             <div className="grid gap-6">
//                 {apps.map(app => (
//                     <div key={app._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg hover:border-gray-500 transition">
//                         <div className="mb-4 md:mb-0">
//                             <h2 className="text-xl font-bold text-white hover:text-green-300 transition cursor-pointer">
//                                 {app.jobId ? (
//                                    <Link to={`/jobs/${app.jobId?._id}`}>{app.jobId.title}</Link>
//                                 ) : (
//                                     <span className="text-red-400">Deleted Job</span>
//                                 )}
//                             </h2>
//                             <p className="text-gray-400 mb-2">{app.jobId?.company || "Unknown Company"} • {app.jobId?.role || "Unknown Role"}</p>
//                             <p className="text-sm text-gray-500 font-medium">Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
//                         </div>
//                         <div className="flex items-center gap-4 border-t md:border-t-0 border-gray-700 pt-4 md:pt-0 w-full md:w-auto">
//                             <span className={`px-5 py-2 rounded-full font-bold text-sm tracking-wide text-center w-full md:w-auto ${app.status === 'verified' ? 'bg-green-900/60 text-green-400 border border-green-800' :
//                                     app.status === 'rejected' ? 'bg-red-900/60 text-red-400 border border-red-800' :
//                                         'bg-yellow-900/60 text-yellow-400 border border-yellow-800'
//                                 }`}>
//                                 {app.status.toUpperCase()}
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//                 {apps.length === 0 && (
//                     <div className="text-center mt-12 bg-gray-800 border border-gray-700 p-12 rounded-xl shadow-lg">
//                         <div className="text-5xl mb-4">📄</div>
//                         <p className="text-gray-300 text-xl font-medium mb-6">You haven't applied to any jobs yet.</p>
//                         <Link to="/jobs" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg inline-block">Explore Opportunities</Link>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyApplications;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/const";

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
  @keyframes iconFloat {
    0%,100% { transform:translateY(0) rotate(0deg); }
    50%     { transform:translateY(-10px) rotate(4deg); }
  }

  .ma-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .ma-app-card {
    position: relative;
    border-radius: 16px;
    border: 1px solid rgba(124,58,237,0.2);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    padding: 22px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    overflow: hidden;
  }
  .ma-app-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed);
    background-size: 300% 100%;
    animation: shimmerBorder 3s linear infinite;
  }
  .ma-app-card:hover {
    border-color: rgba(168,85,247,0.4);
    transform: translateY(-3px);
    box-shadow: 0 16px 50px rgba(124,58,237,0.15);
  }

  .ma-job-link {
    text-decoration: none;
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(135deg, #e879f9, #a78bfa, #38bdf8);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
    transition: opacity 0.2s;
  }
  .ma-job-link:hover { opacity: 0.75; }

  .ma-find-btn {
    display: inline-block;
    text-decoration: none;
    padding: 9px 18px;
    border-radius: 10px;
    border: 1px solid rgba(124,58,237,0.3);
    background: rgba(124,58,237,0.08);
    color: rgba(167,139,250,0.85);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: all 0.2s;
  }
  .ma-find-btn:hover {
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    border-color: transparent;
    color: white;
    box-shadow: 0 0 20px rgba(124,58,237,0.4);
  }

  .ma-explore-btn {
    display: inline-block;
    text-decoration: none;
    padding: 12px 28px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    box-shadow: 0 0 30px rgba(124,58,237,0.4);
    transition: opacity 0.2s, transform 0.15s;
  }
  .ma-explore-btn:hover { opacity: 0.85; transform: translateY(-1px); }

  .ma-animated-border { position: relative; }
  .ma-animated-border::before {
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

const statusConfig = {
  verified:  { color:"rgba(52,211,153,0.9)",  bg:"rgba(5,150,105,0.1)",  border:"rgba(16,185,129,0.3)",  dot:"#34d399" },
  rejected:  { color:"rgba(236,72,153,0.9)",  bg:"rgba(236,72,153,0.08)", border:"rgba(236,72,153,0.3)", dot:"#ec4899" },
  pending:   { color:"rgba(251,191,36,0.9)",  bg:"rgba(251,191,36,0.08)", border:"rgba(251,191,36,0.3)", dot:"#fbbf24" },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.pending;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 16px", borderRadius:20, background:cfg.bg, border:`1px solid ${cfg.border}`, whiteSpace:"nowrap" }}>
      <div style={{ width:7, height:7, borderRadius:"50%", background:cfg.dot, boxShadow:`0 0 8px ${cfg.dot}` }}/>
      <span style={{ fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", color:cfg.color, fontWeight:500 }}>
        {status}
      </span>
    </div>
  );
};

const MyApplications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/job/applications/me`, { withCredentials: true })
      .then(res => setApps(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* Count pill */}
      {apps.length > 0 && (
        <div style={{ position:"fixed", top:76, right:20, zIndex:10, padding:"5px 14px", borderRadius:20, background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.28)", backdropFilter:"blur(12px)" }}>
          <span style={{ fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:"0.15em", color:"rgba(167,139,250,0.85)" }}>
            {apps.length} application{apps.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div style={{ position:"relative", zIndex:5, maxWidth:860, margin:"0 auto", padding:"80px 24px 48px" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40, flexWrap:"wrap", gap:16 }}>
          <div>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(167,139,250,0.45)", marginBottom:8 }}>your journey</p>
            <h1 className="ma-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:34, fontWeight:900, lineHeight:1.1 }}>
              My Applications
            </h1>
          </div>
          <Link to="/jobs" className="ma-find-btn">Find More Jobs →</Link>
        </div>

        {/* Applications list */}
        {apps.length > 0 ? (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {apps.map((app, i) => (
              <div key={app._id} className="ma-app-card" style={{ animationDelay:`${i * 0.07}s`, flexWrap:"wrap" }}>

                {/* Left: info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ marginBottom:6 }}>
                    {app.jobId ? (
                      <Link to={`/jobs/${app.jobId._id}`} className="ma-job-link">{app.jobId.title}</Link>
                    ) : (
                      <span style={{ fontFamily:"'Playfair Display', serif", fontSize:18, fontWeight:700, color:"rgba(236,72,153,0.6)" }}>Deleted Job</span>
                    )}
                  </div>
                  <p style={{ color:"rgba(167,139,250,0.6)", fontSize:11, fontFamily:"'DM Mono', monospace", letterSpacing:"0.04em", marginBottom:6 }}>
                    {app.jobId?.company || "Unknown Company"} &nbsp;·&nbsp; {app.jobId?.role || "Unknown Role"}
                  </p>
                  <p style={{ color:"rgba(255,255,255,0.2)", fontSize:10, fontFamily:"'DM Mono', monospace", letterSpacing:"0.06em" }}>
                    Applied {new Date(app.createdAt).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" })}
                  </p>
                </div>

                {/* Right: status */}
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="ma-animated-border" style={{
            margin:"40px auto", maxWidth:420, padding:"52px 48px",
            borderRadius:20, textAlign:"center",
            background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)",
            boxShadow:"0 40px 100px rgba(0,0,0,0.6)",
            display:"flex", flexDirection:"column", alignItems:"center", gap:20,
          }}>
            <div style={{ width:68, height:68, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(232,121,249,0.2), rgba(124,58,237,0.1))", border:"1px solid rgba(232,121,249,0.25)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 50px rgba(232,121,249,0.2)", animation:"iconFloat 4s ease-in-out infinite" }}>
              <span style={{ fontSize:26 }}>📄</span>
            </div>
            <div>
              <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:900, marginBottom:8, background:"linear-gradient(135deg,#e879f9,#a78bfa,#38bdf8)", backgroundSize:"300% 300%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"gradShift 4s ease infinite" }}>
                No Applications Yet
              </h3>
              <p style={{ color:"rgba(255,255,255,0.28)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.04em", marginBottom:24 }}>
                Start applying to jobs and track your progress here.
              </p>
              <Link to="/jobs" className="ma-explore-btn">Explore Opportunities →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;