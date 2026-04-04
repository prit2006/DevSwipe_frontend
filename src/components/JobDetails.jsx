// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/const";

// const JobDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [job, setJob] = useState(null);
//     const [applying, setApplying] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     useEffect(() => {
//         axios.get(`${BASE_URL}/job/${id}`, { withCredentials: true })
//             .then(res => setJob(res.data))
//             .catch(err => setError("Job not found."));
//     }, [id]);

//     const handleApply = async () => {
//         setApplying(true);
//         setError("");
//         setSuccess("");
//         try {
//             await axios.post(`${BASE_URL}/job/apply/${id}`, {}, { withCredentials: true });
//             setSuccess("Successfully applied!");
//             setTimeout(() => navigate('/'), 2000);
//         } catch (err) {
//             setError(err.response?.data || "Application failed");
//             setApplying(false);
//         }
//     };

//     if (error && !job) return <div className="text-center text-red-500 mt-20 font-bold">{error}</div>;
//     if (!job) return <div className="text-center text-gray-400 mt-20 text-xl animate-pulse">Loading Job Details...</div>;

//     return (
//         <div className="max-w-4xl mx-auto p-6 md:p-10 mt-10 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
//             <button onClick={() => navigate(-1)} className="text-green-400 hover:underline mb-6 inline-block font-semibold">
//                 &larr; Back to Jobs
//             </button>
//             <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
//             <p className="text-xl text-green-400 mb-6 font-medium">{job.company} • {job.role}</p>

//             <div className="flex flex-wrap gap-2 mb-6">
//                 {job.skills?.map((s, i) => (
//                     <span key={i} className="bg-gray-700/50 text-green-300 border border-green-800 px-3 py-1 rounded-full text-sm">{s}</span>
//                 ))}
//             </div>

//             <div className="mb-6 bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-inner">
//                 <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Description</h2>
//                 <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{job.description}</p>
//             </div>

//             <div className="mb-6 bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-inner">
//                 <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Eligibility Criteria</h2>
//                 <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{job.eligibility}</p>
//             </div>

//             <div className="mb-8">
//                 <h2 className="text-lg font-bold text-gray-400 mb-1">Application Deadline</h2>
//                 <p className="text-blue-400 font-semibold">{new Date(job.deadline).toLocaleString()}</p>
//             </div>

//             {error && <p className="text-red-400 mb-4 bg-red-900/20 border border-red-800 p-3 rounded">{error}</p>}
//             {success && <p className="text-green-400 mb-4 bg-green-900/20 border border-green-800 p-3 rounded">{success}</p>}

//             <button
//                 onClick={handleApply}
//                 disabled={applying || success}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-lg text-lg"
//             >
//                 {success ? "Applied ✔️" : applying ? "Applying..." : "Apply Now"}
//             </button>
//         </div>
//     );
// };

// export default JobDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
    0%   { opacity:0; transform:perspective(800px) rotateX(8deg) translateY(60px) scale(0.95); }
    100% { opacity:1; transform:perspective(800px) rotateX(0deg) translateY(0) scale(1); }
  }
  @keyframes successPop {
    0%   { transform: scale(0.8); opacity:0; }
    60%  { transform: scale(1.05); }
    100% { transform: scale(1); opacity:1; }
  }

  .jd-card-entry { animation: cardEntry 0.85s cubic-bezier(0.16,1,0.3,1) forwards; }

  .jd-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .jd-animated-border { position: relative; }
  .jd-animated-border::before {
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

  .jd-section {
    border-radius: 16px;
    border: 1px solid rgba(124,58,237,0.15);
    background: rgba(255,255,255,0.02);
    backdrop-filter: blur(10px);
    padding: 24px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }
  .jd-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(167,139,250,0.3), rgba(6,182,212,0.2), transparent);
  }

  .jd-apply-btn {
    width: 100%;
    padding: 16px;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    box-shadow: 0 0 40px rgba(124,58,237,0.4), 0 8px 32px rgba(0,0,0,0.4);
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .jd-apply-btn:hover:not(:disabled) {
    opacity: 0.88;
    transform: translateY(-2px);
    box-shadow: 0 0 60px rgba(124,58,237,0.55), 0 12px 40px rgba(0,0,0,0.5);
  }
  .jd-apply-btn:active:not(:disabled) { transform: scale(0.98); }
  .jd-apply-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .jd-apply-btn.success {
    background: linear-gradient(135deg, #059669, #0891b2);
    box-shadow: 0 0 40px rgba(5,150,105,0.4);
    animation: successPop 0.4s ease forwards;
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

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/job/${id}`, { withCredentials: true })
      .then(res => setJob(res.data))
      .catch(() => setError("Job not found."));
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(`${BASE_URL}/job/apply/${id}`, {}, { withCredentials: true });
      setSuccess("Successfully applied!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data || "Application failed");
      setApplying(false);
    }
  };

  if (error && !job) return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{styles}</style>
      <AuroraBg />
      <div className="jd-animated-border" style={{ position:"relative", zIndex:10, padding:"48px 52px", borderRadius:24, background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)", textAlign:"center" }}>
        <p style={{ fontFamily:"'DM Mono', monospace", color:"rgba(236,72,153,0.8)", fontSize:13, letterSpacing:"0.1em" }}>{error}</p>
      </div>
    </div>
  );

  if (!job) return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{styles}</style>
      <AuroraBg />
      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:24 }}>
        <OrbLoader />
        <p style={{ fontFamily:"'DM Mono', monospace", letterSpacing:"0.3em", fontSize:11, textTransform:"uppercase", color:"rgba(167,139,250,0.75)" }}>Loading job details</p>
        <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:20 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(to top, #7c3aed, #38bdf8)", animation:`dotWave 1s ease-in-out ${i*0.12}s infinite` }}/>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      <div style={{ position:"relative", zIndex:5, maxWidth:760, margin:"0 auto", padding:"80px 24px 48px" }}>

        <button
          onClick={() => navigate(-1)}
          style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:32, background:"none", border:"none", cursor:"pointer", color:"rgba(167,139,250,0.7)", fontFamily:"'DM Mono', monospace", fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", transition:"color 0.2s" }}
          onMouseOver={e => e.currentTarget.style.color="rgba(167,139,250,1)"}
          onMouseOut={e => e.currentTarget.style.color="rgba(167,139,250,0.7)"}
        >
          ← Back to Jobs
        </button>

        <div className="jd-card-entry jd-animated-border" style={{
          borderRadius:24, background:"rgba(255,255,255,0.03)",
          backdropFilter:"blur(40px)", padding:"36px 40px",
          boxShadow:"0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed)", backgroundSize:"300% 100%", animation:"shimmerBorder 3s linear infinite", borderRadius:"24px 24px 0 0" }}/>

          <h1 className="jd-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:32, fontWeight:900, lineHeight:1.15, marginBottom:10 }}>
            {job.title}
          </h1>

          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:13, marginBottom:20, letterSpacing:"0.05em" }}>
            <span style={{ color:"rgba(167,139,250,0.85)" }}>{job.company}</span>
            <span style={{ color:"rgba(255,255,255,0.2)", margin:"0 8px" }}>•</span>
            <span style={{ color:"rgba(255,255,255,0.45)" }}>{job.role}</span>
          </p>

          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:28 }}>
            {job.skills?.map((s, i) => (
              <span key={i} style={{ padding:"5px 12px", borderRadius:20, background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.3)", color:"rgba(167,139,250,0.85)", fontSize:10, fontFamily:"'DM Mono', monospace", letterSpacing:"0.08em" }}>
                {s}
              </span>
            ))}
          </div>

          <div className="jd-section">
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:17, fontWeight:700, color:"rgba(255,255,255,0.85)", marginBottom:14, paddingBottom:12, borderBottom:"1px solid rgba(124,58,237,0.15)" }}>
              Description
            </h2>
            <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, fontFamily:"'DM Mono', monospace", lineHeight:1.8, whiteSpace:"pre-wrap", letterSpacing:"0.02em" }}>
              {job.description}
            </p>
          </div>

          <div className="jd-section">
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:17, fontWeight:700, color:"rgba(255,255,255,0.85)", marginBottom:14, paddingBottom:12, borderBottom:"1px solid rgba(124,58,237,0.15)" }}>
              Eligibility Criteria
            </h2>
            <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, fontFamily:"'DM Mono', monospace", lineHeight:1.8, whiteSpace:"pre-wrap", letterSpacing:"0.02em" }}>
              {job.eligibility}
            </p>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28, padding:"14px 18px", borderRadius:12, background:"rgba(6,182,212,0.05)", border:"1px solid rgba(6,182,212,0.15)" }}>
            <span style={{ fontSize:16 }}>⏰</span>
            <div>
              <p style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", fontFamily:"'DM Mono', monospace", marginBottom:2 }}>Application Deadline</p>
              <p style={{ color:"rgba(6,182,212,0.85)", fontSize:13, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>
                {new Date(job.deadline).toLocaleString()}
              </p>
            </div>
          </div>

          {error && (
            <div style={{ marginBottom:16, padding:"12px 16px", borderRadius:12, background:"rgba(236,72,153,0.08)", border:"1px solid rgba(236,72,153,0.25)" }}>
              <p style={{ color:"rgba(236,72,153,0.85)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>{error}</p>
            </div>
          )}
          {success && (
            <div style={{ marginBottom:16, padding:"12px 16px", borderRadius:12, background:"rgba(5,150,105,0.08)", border:"1px solid rgba(5,150,105,0.3)" }}>
              <p style={{ color:"rgba(52,211,153,0.9)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>✔ {success}</p>
            </div>
          )}

          <button
            onClick={handleApply}
            disabled={applying || !!success}
            className={`jd-apply-btn${success ? " success" : ""}`}
          >
            {success ? "✔ Applied" : applying ? "Applying..." : "Apply Now →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;