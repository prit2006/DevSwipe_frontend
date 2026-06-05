import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/const";

/* ─────────────────────────────────────────────────────────────
   SHARED STYLES
───────────────────────────────────────────────────────────── */
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
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes dotWave {
    0%,100% { transform:scaleY(0.3); opacity:0.3; }
    50%     { transform:scaleY(1.4); opacity:1; }
  }
  @keyframes cardEntry {
    0%   { opacity:0; transform:perspective(800px) rotateX(8deg) translateY(40px) scale(0.95); }
    100% { opacity:1; transform:perspective(800px) rotateX(0deg) translateY(0) scale(1); }
  }
  @keyframes iconFloat {
    0%,100% { transform:translateY(0) rotate(0deg); }
    50%     { transform:translateY(-10px) rotate(3deg); }
  }
  @keyframes goldShimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes lockShake {
    0%,100% { transform: rotate(0deg); }
    20%     { transform: rotate(-8deg); }
    40%     { transform: rotate(8deg); }
    60%     { transform: rotate(-4deg); }
    80%     { transform: rotate(4deg); }
  }
  @keyframes typingDots {
    0%,80%,100% { opacity:0; transform:scale(0.5); }
    40%         { opacity:1; transform:scale(1); }
  }
  @keyframes brainBounce {
    0%,100% { transform: translateY(0) scale(1); }
    25%     { transform: translateY(-8px) scale(1.05); }
    75%     { transform: translateY(4px) scale(0.97); }
  }
  @keyframes aiPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.4); }
    50%     { box-shadow: 0 0 0 20px rgba(124,58,237,0); }
  }

  .ra-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }
  .ra-gold-title {
    background: linear-gradient(135deg, #f59e0b 0%, #fcd34d 30%, #f59e0b 50%, #d97706 70%, #fcd34d 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: goldShimmer 3s linear infinite;
  }
  .ra-card-entry { animation: cardEntry 0.85s cubic-bezier(0.16,1,0.3,1) forwards; }

  .ra-card {
    position: relative;
    border-radius: 22px;
    border: 1px solid rgba(124,58,237,0.25);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(30px);
    padding: 36px 32px;
    box-shadow: 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
    overflow: hidden;
  }
  .ra-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed);
    background-size: 300% 100%;
    animation: shimmerBorder 3s linear infinite;
  }

  /* ── PREMIUM GATE CARD ── */
  .ra-premium-card {
    position: relative;
    border-radius: 24px;
    background: rgba(245,158,11,0.04);
    backdrop-filter: blur(40px);
    padding: 52px 44px;
    box-shadow: 0 40px 100px rgba(0,0,0,0.65), 0 0 80px rgba(245,158,11,0.08), inset 0 1px 0 rgba(252,211,77,0.1);
    overflow: hidden;
  }
  .ra-premium-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 25px;
    padding: 1px;
    background: linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b, #d97706, #fcd34d, #f59e0b);
    background-size: 300% 100%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: shimmerBorder 2.5s ease infinite;
    pointer-events: none;
  }

  .ra-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(167,139,250,0.6);
    margin-bottom: 8px;
  }
  .ra-file-input-wrapper {
    position: relative;
    border: 1.5px dashed rgba(124,58,237,0.35);
    border-radius: 14px;
    background: rgba(124,58,237,0.04);
    padding: 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  .ra-file-input-wrapper:hover {
    border-color: rgba(168,85,247,0.6);
    background: rgba(124,58,237,0.08);
  }
  .ra-file-input-wrapper input[type="file"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  .ra-textarea {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(124,58,237,0.2);
    border-radius: 12px;
    color: rgba(255,255,255,0.75);
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    line-height: 1.7;
    padding: 12px 14px;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .ra-textarea:focus {
    border-color: rgba(168,85,247,0.5);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
  }
  .ra-textarea::placeholder { color: rgba(255,255,255,0.2); }
  .ra-submit-btn {
    width: 100%;
    padding: 16px;
    border-radius: 13px;
    border: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    font-weight: 600;
    box-shadow: 0 0 30px rgba(124,58,237,0.4), 0 8px 24px rgba(0,0,0,0.4);
    transition: all 0.2s;
  }
  .ra-submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .ra-submit-btn:not(:disabled):hover {
    box-shadow: 0 0 50px rgba(124,58,237,0.6), 0 12px 32px rgba(0,0,0,0.5);
    transform: translateY(-2px) scale(1.01);
  }
  .ra-upgrade-btn {
    display: inline-block;
    text-decoration: none;
    width: 100%;
    padding: 16px;
    border-radius: 13px;
    border: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: #1a0a00;
    font-weight: 700;
    box-shadow: 0 0 35px rgba(245,158,11,0.5), 0 8px 24px rgba(0,0,0,0.4);
    transition: all 0.2s;
    text-align: center;
  }
  .ra-upgrade-btn:hover {
    box-shadow: 0 0 55px rgba(245,158,11,0.7), 0 12px 32px rgba(0,0,0,0.5);
    transform: translateY(-2px) scale(1.01);
  }
  .ra-feature-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 0;
    border-bottom: 1px solid rgba(245,158,11,0.08);
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.55);
    letter-spacing: 0.02em;
  }
  .ra-feature-item:last-child { border-bottom: none; }
`;

/* ─────────────────────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────────────────────── */
const AuroraBg = () => (
  <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
    <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, #0d0520 0%, #050510 50%, #030308 100%)" }}/>
    <div style={{ position:"absolute", top:"-20%", left:"-10%", width:"70%", height:"70%", background:"radial-gradient(ellipse, rgba(124,58,237,0.45) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)", filter:"blur(60px)", animation:"aurora1 18s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", top:"10%", right:"-15%", width:"60%", height:"60%", background:"radial-gradient(ellipse, rgba(6,182,212,0.35) 0%, rgba(56,189,248,0.15) 40%, transparent 70%)", filter:"blur(80px)", animation:"aurora2 22s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", bottom:"-10%", left:"20%", width:"50%", height:"50%", background:"radial-gradient(ellipse, rgba(236,72,153,0.3) 0%, rgba(167,139,250,0.15) 50%, transparent 70%)", filter:"blur(70px)", animation:"aurora3 14s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", bottom:"20%", right:"5%", width:"40%", height:"40%", background:"radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, transparent 70%)", filter:"blur(50px)", animation:"aurora4 26s ease-in-out infinite" }}/>
    {[...Array(40)].map((_, i) => (
      <div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, width:i%5===0?3:i%3===0?2:1, height:i%5===0?3:i%3===0?2:1, borderRadius:"50%", background:"white", animation:`twinkle ${2+Math.random()*4}s ease-in-out ${Math.random()*4}s infinite` }}/>
    ))}
    {[...Array(14)].map((_, i) => (
      <div key={i} style={{ position:"absolute", left:`${5+i*7}%`, bottom:0, width:i%3===0?3:2, height:i%3===0?3:2, borderRadius:"50%", background:i%2===0?`rgba(168,85,247,0.5)`:`rgba(6,182,212,0.5)`, "--dx":`${-40+Math.random()*80}px`, animation:`particle ${6+Math.random()*10}s ease-in ${Math.random()*8}s infinite` }}/>
    ))}
  </div>
);

const OrbLoader = ({ gold = false }) => (
  <div style={{ position:"relative", width:80, height:80 }}>
    {[0,1,2].map(i => (
      <div key={i} style={{
        position:"absolute", inset:i*11, borderRadius:"50%",
        border:`${1.5-i*0.3}px solid transparent`,
        borderTopColor: gold ? ["#f59e0b","#fcd34d","#d97706"][i] : ["#a78bfa","#38bdf8","#ec4899"][i],
        borderRightColor: gold
          ? `rgba(${["245,158,11","252,211,77","217,119,6"][i]},0.2)`
          : `rgba(${["167,139,250","56,189,248","236,72,153"][i]},0.2)`,
        animation:`spinRing ${0.9+i*0.5}s linear infinite ${i%2===0?"":" reverse"}`
      }}/>
    ))}
    <div style={{
      position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
      width:14, height:14, borderRadius:"50%",
      background: gold ? "radial-gradient(circle, #fcd34d 0%, #f59e0b 100%)" : "radial-gradient(circle, #e879f9 0%, #7c3aed 100%)",
      boxShadow: gold ? "0 0 20px rgba(252,211,77,0.8)" : "0 0 20px rgba(232,121,249,0.8)",
      animation:"aiPulse 2s ease-in-out infinite"
    }}/>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   PREMIUM GATE — shown when user is NOT premium
───────────────────────────────────────────────────────────── */
const PremiumGate = () => {
  const features = [
    { icon:"🧠", text:"AI-powered resume analysis & scoring" },
    { icon:"📄", text:"Generate tailored AI resume PDF" },
    { icon:"🎯", text:"Job-match scoring against target roles" },
    { icon:"⚡", text:"Skill gap identification & severity ranking" },
    { icon:"📅", text:"Personalized day-by-day preparation plan" },
    { icon:"💬", text:"Technical & behavioral interview questions" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
      <style>{styles}</style>
      <AuroraBg />

      <div className="ra-card-entry" style={{ position:"relative", zIndex:10, width:"100%", maxWidth:520 }}>
        <div className="ra-premium-card">

          {/* Most popular badge */}
          <div style={{ position:"absolute", top:-16, left:"50%", transform:"translateX(-50%)", padding:"5px 20px", borderRadius:20, background:"linear-gradient(135deg, #f59e0b, #d97706)", boxShadow:"0 0 24px rgba(245,158,11,0.6)", zIndex:2, whiteSpace:"nowrap" }}>
            <span style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.2em", color:"#1a0a00", textTransform:"uppercase", fontWeight:700 }}>Premium Feature Only</span>
          </div>

          {/* Lock icon */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
            <div style={{
              width:72, height:72, borderRadius:"50%",
              background:"radial-gradient(circle at 35% 35%, rgba(252,211,77,0.25), rgba(245,158,11,0.1))",
              border:"1px solid rgba(252,211,77,0.3)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 50px rgba(245,158,11,0.2)",
              animation:"iconFloat 4s ease-in-out infinite",
            }}>
              <span style={{ fontSize:30 }}>👑</span>
            </div>
          </div>

          {/* Heading */}
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(245,158,11,0.5)", marginBottom:10 }}>
              unlock premium
            </p>
            <h1 className="ra-gold-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:28, fontWeight:900, lineHeight:1.15, marginBottom:12 }}>
              AI Resume Analyzer
            </h1>
            <p style={{ color:"rgba(255,255,255,0.25)", fontSize:11, fontFamily:"'DM Mono', monospace", letterSpacing:"0.03em", lineHeight:1.75 }}>
              This feature is exclusive to Premium members. Upgrade to unlock AI-powered resume analysis, job matching, and personalised interview coaching.
            </p>
          </div>

          {/* Feature list */}
          <div style={{ marginBottom:28 }}>
            {features.map((f, i) => (
              <div key={i} className="ra-feature-item">
                <span style={{ fontSize:15, width:22, textAlign:"center", flexShrink:0 }}>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>

          {/* Upgrade CTA */}
          <Link to="/premium" className="ra-upgrade-btn">
            👑 Upgrade to Premium →
          </Link>

          {/* Subtext */}
          <p style={{ textAlign:"center", marginTop:16, fontFamily:"'DM Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.18)", letterSpacing:"0.05em" }}>
            Choose Silver or Gold — both include full AI Resume access
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   AI LOADING SCREEN — shown during API call
───────────────────────────────────────────────────────────── */
const AILoadingScreen = () => {
  const steps = [
    "Parsing resume content...",
    "Analyzing skill patterns...",
    "Matching with job roles...",
    "Generating interview questions...",
    "Preparing personalized plan...",
  ];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep(s => (s + 1) % steps.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{styles}</style>
      <AuroraBg />
      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:32, maxWidth:400, padding:"0 24px", textAlign:"center" }}>
        <div style={{ position:"relative" }}>
          <OrbLoader />
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize:24, animation:"brainBounce 1.8s ease-in-out infinite" }}>🧠</div>
        </div>
        <div>
          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(167,139,250,0.45)", marginBottom:10 }}>ai is working</p>
          <h2 className="ra-grad-title" style={{ fontFamily:"'Playfair Display', serif", fontSize:26, fontWeight:900 }}>
            Analyzing Your Resume
          </h2>
        </div>
        <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:10 }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:12, padding:"10px 14px",
              borderRadius:10, background: i === activeStep ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.02)",
              border:`1px solid ${i === activeStep ? "rgba(168,85,247,0.35)" : "rgba(255,255,255,0.05)"}`,
              transition:"all 0.3s",
            }}>
              <div style={{ width:7, height:7, borderRadius:"50%", flexShrink:0, transition:"all 0.3s",
                background: i < activeStep ? "#34d399" : i === activeStep ? "#a78bfa" : "rgba(255,255,255,0.1)",
                boxShadow: i === activeStep ? "0 0 10px rgba(167,139,250,0.8)" : "none",
              }}/>
              <span style={{ fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:"0.03em", transition:"color 0.3s",
                color: i < activeStep ? "rgba(52,211,153,0.7)" : i === activeStep ? "rgba(167,139,250,0.9)" : "rgba(255,255,255,0.2)",
              }}>
                {step}
              </span>
              {i === activeStep && (
                <div style={{ marginLeft:"auto", display:"flex", gap:3 }}>
                  {[0,1,2].map(j => (
                    <div key={j} style={{ width:4, height:4, borderRadius:"50%", background:"#a78bfa", animation:`typingDots 1.2s ease-in-out ${j*0.2}s infinite` }}/>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:24 }}>
          {[0,1,2,3,4,5,6,7].map(i => (
            <div key={i} style={{ width:3, borderRadius:2, background:`linear-gradient(to top, ${["#7c3aed","#a855f7","#06b6d4","#ec4899"][i%4]}, rgba(255,255,255,0.3))`, animation:`dotWave ${0.8+i*0.07}s ease-in-out ${i*0.1}s infinite`, height:14 }}/>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Premium gate state
  const [premiumChecking, setPremiumChecking] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  const navigate = useNavigate();

  // ── Verify premium on mount ──
  useEffect(() => {
    const checkPremium = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/premium/verify`, { withCredentials: true });
        setIsPremium(res.data.isPremium === true);
      } catch (err) {
        console.error("Premium check failed:", err);
        setIsPremium(false);
      } finally {
        setPremiumChecking(false);
      }
    };
    checkPremium();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setFile(null);
        setError("Please upload a valid PDF resume.");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please upload a resume PDF"); return; }
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);
    if (selfDescription.trim()) formData.append("selfDescription", selfDescription.trim());
    if (jobDescription.trim()) formData.append("jobDescription", jobDescription.trim());

    try {
      const response = await axios.post(`${BASE_URL}/interview/analyze-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      const reportId = response.data.interviewReport._id;
      navigate(`/interview-reports/${reportId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to analyze resume. Please try again.");
      setLoading(false);
    }
  };

  // ── States ──
  if (premiumChecking) {
    return (
      <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <style>{styles}</style>
        <AuroraBg />
        <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
          <OrbLoader gold />
          <p style={{ fontFamily:"'DM Mono', monospace", letterSpacing:"0.25em", fontSize:10, textTransform:"uppercase", color:"rgba(245,158,11,0.6)" }}>
            Verifying membership
          </p>
          <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:20 }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(to top, #f59e0b, #7c3aed)", animation:`dotWave 1s ease-in-out ${i*0.12}s infinite` }}/>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isPremium) return <PremiumGate />;

  if (loading) return <AILoadingScreen />;

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
      <style>{styles}</style>
      <AuroraBg />

      <div className="ra-card-entry" style={{ position:"relative", zIndex:10, width:"100%", maxWidth:520 }}>
        <div className="ra-card">
          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(167,139,250,0.45)", marginBottom:10 }}>
              powered by ai · premium
            </p>
            <h1 className="ra-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:30, fontWeight:900, lineHeight:1.1, marginBottom:10 }}>
              🧠 AI Resume Analyzer
            </h1>
            <p style={{ color:"rgba(255,255,255,0.25)", fontSize:11, fontFamily:"'DM Mono', monospace", letterSpacing:"0.03em", lineHeight:1.7 }}>
              Upload your resume to get an AI-powered report, generate a tailored resume PDF, and find matching jobs.
            </p>
          </div>

          <form onSubmit={handleAnalyze} style={{ display:"flex", flexDirection:"column", gap:22 }}>

            {/* File upload */}
            <div>
              <label className="ra-label">Upload Resume (PDF)</label>
              <div className="ra-file-input-wrapper">
                <input type="file" accept="application/pdf" onChange={handleFileChange} disabled={loading} />
                <div style={{ pointerEvents:"none" }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>📄</div>
                  {file ? (
                    <p style={{ fontFamily:"'DM Mono', monospace", fontSize:11, color:"rgba(52,211,153,0.9)", letterSpacing:"0.03em" }}>
                      ✓ {file.name}
                    </p>
                  ) : (
                    <>
                      <p style={{ fontFamily:"'DM Mono', monospace", fontSize:11, color:"rgba(167,139,250,0.7)", letterSpacing:"0.03em", marginBottom:4 }}>
                        Click or drag &amp; drop your PDF
                      </p>
                      <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.2)", letterSpacing:"0.05em" }}>
                        PDF files only
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Self description */}
            <div>
              <label className="ra-label">Self Description <span style={{ color:"rgba(255,255,255,0.2)" }}>(Optional)</span></label>
              <textarea
                className="ra-textarea"
                rows={3}
                placeholder="Tell us about yourself, your goals, or specific skills you want to highlight..."
                value={selfDescription}
                onChange={e => setSelfDescription(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Job description */}
            <div>
              <label className="ra-label">Job Description <span style={{ color:"rgba(255,255,255,0.2)" }}>(Optional)</span></label>
              <textarea
                className="ra-textarea"
                rows={4}
                placeholder="Paste the job description or target role details to tailor the analysis and AI resume..."
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:10, padding:"12px 16px", fontFamily:"'DM Mono', monospace", fontSize:10, color:"rgba(248,113,113,0.9)", letterSpacing:"0.03em" }}>
                ⚠ {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="ra-submit-btn" disabled={!file}>
              ✨ Analyze Resume
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
