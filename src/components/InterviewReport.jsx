import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
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
    50%     { transform:translateY(-8px) rotate(3deg); }
  }
  @keyframes scoreCount {
    from { opacity:0; transform:scale(0.5); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes ringDraw {
    from { stroke-dashoffset: 251; }
    to   { stroke-dashoffset: var(--offset); }
  }
  @keyframes brainBounce {
    0%,100% { transform: translateY(0) scale(1); }
    25%     { transform: translateY(-8px) scale(1.05); }
    75%     { transform: translateY(4px) scale(0.97); }
  }
  @keyframes typingDots {
    0%,80%,100% { opacity:0; transform:scale(0.5); }
    40%         { opacity:1; transform:scale(1); }
  }
  @keyframes aiPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.4); }
    50%     { box-shadow: 0 0 0 20px rgba(124,58,237,0); }
  }
  @keyframes downloadPulse {
    0%  { transform: translateY(0); }
    50% { transform: translateY(3px); }
    100%{ transform: translateY(0); }
  }

  .ir-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .ir-section-card {
    position: relative;
    border-radius: 18px;
    border: 1px solid rgba(124,58,237,0.15);
    background: rgba(255,255,255,0.025);
    backdrop-filter: blur(20px);
    overflow: hidden;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .ir-section-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(6,182,212,0.3), transparent);
  }

  .ir-action-btn {
    display: inline-block;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    white-space: nowrap;
  }
  .ir-btn-primary {
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    box-shadow: 0 0 20px rgba(124,58,237,0.3);
  }
  .ir-btn-primary:hover {
    box-shadow: 0 0 35px rgba(124,58,237,0.5);
    transform: translateY(-1px);
    opacity: 0.9;
  }
  .ir-btn-secondary {
    background: rgba(6,182,212,0.1);
    color: rgba(34,211,238,0.9);
    border: 1px solid rgba(6,182,212,0.3);
  }
  .ir-btn-secondary:hover {
    background: rgba(6,182,212,0.2);
    border-color: rgba(34,211,238,0.5);
  }
  .ir-btn-accent {
    background: rgba(52,211,153,0.1);
    color: rgba(52,211,153,0.9);
    border: 1px solid rgba(52,211,153,0.3);
    position: relative;
  }
  .ir-btn-accent:hover {
    background: rgba(52,211,153,0.2);
    border-color: rgba(52,211,153,0.5);
  }
  .ir-btn-accent:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  .ir-collapse-item {
    border-radius: 12px;
    border: 1px solid rgba(124,58,237,0.12);
    background: rgba(255,255,255,0.02);
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .ir-collapse-item:hover { border-color: rgba(124,58,237,0.28); }

  .ir-collapse-trigger {
    width: 100%;
    background: none;
    border: none;
    color: rgba(255,255,255,0.75);
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.02em;
    text-align: left;
    padding: 14px 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: color 0.2s;
  }
  .ir-collapse-trigger:hover { color: rgba(167,139,250,0.9); }

  .ir-collapse-content {
    padding: 0 18px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    line-height: 1.75;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.02em;
    border-top: 1px solid rgba(124,58,237,0.1);
  }

  .ir-tag-high   { background: rgba(239,68,68,0.12);  color: rgba(248,113,113,0.9); border: 1px solid rgba(239,68,68,0.25); }
  .ir-tag-medium { background: rgba(251,191,36,0.1);  color: rgba(252,211,77,0.9);  border: 1px solid rgba(251,191,36,0.25); }
  .ir-tag-low    { background: rgba(6,182,212,0.1);   color: rgba(34,211,238,0.9);  border: 1px solid rgba(6,182,212,0.25); }

  .ir-download-icon { animation: downloadPulse 1.5s ease-in-out infinite; display:inline-block; }
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

const GenerateResumeLoadingScreen = ({ reportId }) => {
  const [step, setStep] = useState(0);
  const steps = [
    "Reading your AI analysis...",
    "Designing resume layout...",
    "Crafting professional content...",
    "Tailoring for target role...",
    "Generating PDF file...",
  ];

  useEffect(() => {
    const id = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"rgba(3,3,8,0.94)", backdropFilter:"blur(20px)",
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:28, maxWidth:380, padding:"0 24px", textAlign:"center" }}>
        {/* Icon */}
        <div style={{ position:"relative", width:90, height:90 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ position:"absolute", inset:i*12, borderRadius:"50%", border:`1.5px solid transparent`, borderTopColor:["#34d399","#a78bfa","#38bdf8"][i], borderRightColor:`rgba(${["52,211,153","167,139,250","56,189,248"][i]},0.2)`, animation:`spinRing ${0.9+i*0.5}s linear infinite ${i%2===0?"":" reverse"}` }}/>
          ))}
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize:26, animation:"brainBounce 1.8s ease-in-out infinite" }}>📄</div>
        </div>

        <div>
          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(52,211,153,0.45)", marginBottom:10 }}>
            building your resume
          </p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:24, fontWeight:900, background:"linear-gradient(135deg, #34d399, #a78bfa, #38bdf8)", backgroundSize:"300% 300%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"gradShift 3s ease infinite" }}>
            Generating AI Resume PDF
          </h2>
        </div>

        {/* Steps */}
        <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:8 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:12, padding:"9px 14px",
              borderRadius:9, background: i === step ? "rgba(52,211,153,0.08)" : "rgba(255,255,255,0.02)",
              border:`1px solid ${i === step ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.04)"}`,
              transition:"all 0.3s",
            }}>
              <div style={{
                width:6, height:6, borderRadius:"50%", flexShrink:0,
                background: i < step ? "#34d399" : i === step ? "#a78bfa" : "rgba(255,255,255,0.08)",
                boxShadow: i === step ? "0 0 8px rgba(167,139,250,0.8)" : "none",
                transition:"all 0.3s",
              }}/>
              <span style={{ fontFamily:"'DM Mono', monospace", fontSize:10, color: i < step ? "rgba(52,211,153,0.7)" : i === step ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.18)", letterSpacing:"0.02em", transition:"color 0.3s" }}>
                {s}
              </span>
              {i === step && (
                <div style={{ marginLeft:"auto", display:"flex", gap:3 }}>
                  {[0,1,2].map(j => (
                    <div key={j} style={{ width:3, height:3, borderRadius:"50%", background:"#a78bfa", animation:`typingDots 1.2s ease-in-out ${j*0.2}s infinite` }}/>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:20 }}>
          {[0,1,2,3,4,5,6].map(i => (
            <div key={i} style={{ width:3, height:12, borderRadius:2, background:`linear-gradient(to top, #34d399, #a78bfa)`, animation:`dotWave ${0.8+i*0.08}s ease-in-out ${i*0.1}s infinite` }}/>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScoreRing = ({ score }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "#34d399" : score >= 40 ? "#fbbf24" : "#f87171";
  const label = score >= 70 ? "Strong Match" : score >= 40 ? "Moderate" : "Needs Work";

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
      <div style={{ position:"relative", width:100, height:100 }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform:"rotate(-90deg)" }}>
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6"/>
          <circle
            cx="50" cy="50" r={radius} fill="none"
            stroke={color} strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition:"stroke-dashoffset 1.5s ease", filter:`drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
          <div style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:900, color, lineHeight:1 }}>
            {score}
          </div>
          <div style={{ fontFamily:"'DM Mono', monospace", fontSize:7, color:"rgba(255,255,255,0.3)", letterSpacing:"0.05em", marginTop:2 }}>%</div>
        </div>
      </div>
      <span style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.1em", color: color, textTransform:"uppercase" }}>{label}</span>
    </div>
  );
};

const CollapseItem = ({ question, prefix }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="ir-collapse-item">
      <button className="ir-collapse-trigger" onClick={() => setOpen(!open)}>
        <span style={{ flex:1 }}>{question.question}</span>
        <span style={{ fontSize:12, color:"rgba(167,139,250,0.5)", flexShrink:0, transition:"transform 0.2s", transform:open?"rotate(180deg)":"rotate(0deg)" }}>▾</span>
      </button>
      {open && (
        <div className="ir-collapse-content">
          <div style={{ marginBottom:8 }}>
            <span style={{ color:"rgba(56,189,248,0.8)", fontWeight:600 }}>Intention: </span>
            {question.intention}
          </div>
          <div>
            <span style={{ color:"rgba(52,211,153,0.8)", fontWeight:600 }}>How to answer: </span>
            {question.answer}
          </div>
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({ children, accent }) => (
  <div style={{ marginBottom:18 }}>
    <h2 style={{
      fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:900,
      background: accent || "linear-gradient(135deg, #e879f9, #a78bfa, #38bdf8)",
      backgroundSize:"300% 300%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
      backgroundClip:"text", animation:"gradShift 4s ease infinite",
    }}>
      {children}
    </h2>
    <div style={{ height:1, background:"linear-gradient(90deg, rgba(124,58,237,0.5), rgba(6,182,212,0.3), transparent)", marginTop:8 }}/>
  </div>
);

const InterviewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingResume, setDownloadingResume] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/interview/${id}`, {
          withCredentials: true,
        });
        setReport(response.data.interviewReport);
      } catch (err) {
        console.error(err);
        setError("Failed to load interview report.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchReport();
  }, [id]);

  const handleGenerateResume = async () => {
    try {
      setDownloadingResume(true);
      const response = await axios.get(`${BASE_URL}/interview/${id}/generate-resume`, {
        responseType: 'blob',
        withCredentials: true,
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Improved_AI_Resume_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate resume", err);
      alert("Failed to generate and download AI resume.");
    } finally {
      setDownloadingResume(false);
    }
  };

  const handleFindSimilarJobs = () => {
    const recommendedRole = report.recommendedJobId?.role || report.title;
    const query = recommendedRole ? `?role=${encodeURIComponent(recommendedRole)}` : "";
    navigate(`/jobs${query}`);
  };

  // ── LOADING ──
  if (loading) return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{styles}</style>
      <AuroraBg />
      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:24 }}>
        <OrbLoader />
        <p style={{ fontFamily:"'DM Mono', monospace", letterSpacing:"0.3em", fontSize:10, textTransform:"uppercase", color:"rgba(167,139,250,0.65)" }}>Loading report</p>
        <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:20 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(to top, #7c3aed, #38bdf8)", animation:`dotWave 1s ease-in-out ${i*0.12}s infinite` }}/>
          ))}
        </div>
      </div>
    </div>
  );

  // ── ERROR ──
  if (error || !report) return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{styles}</style>
      <AuroraBg />
      <div style={{ position:"relative", zIndex:10, textAlign:"center" }}>
        <div style={{ fontFamily:"'DM Mono', monospace", fontSize:11, color:"rgba(248,113,113,0.8)", letterSpacing:"0.05em", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:12, padding:"16px 24px", display:"inline-block" }}>
          ⚠ {error || "Report not found"}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* Generate resume overlay loading */}
      {downloadingResume && <GenerateResumeLoadingScreen reportId={id} />}

      <div style={{ position:"relative", zIndex:5, maxWidth:1100, margin:"0 auto", padding:"80px 24px 60px" }}>

        {/* ── HEADER ── */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40, flexWrap:"wrap", gap:16 }}>
          <div>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(167,139,250,0.45)", marginBottom:8 }}>ai interview analysis</p>
            <h1 className="ir-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:34, fontWeight:900, lineHeight:1.1 }}>
              🧠 AI Interview Analysis
            </h1>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {report.recommendedJobId && (
              <Link to={`/jobs/${report.recommendedJobId._id}`} className="ir-action-btn ir-btn-secondary">
                🔗 View Recommended Job
              </Link>
            )}
            <button
              onClick={handleGenerateResume}
              className="ir-action-btn ir-btn-accent"
              disabled={downloadingResume}
            >
              {downloadingResume ? (
                <>⏳ Generating...</>
              ) : (
                <><span className="ir-download-icon">⬇</span> Generate AI Resume PDF</>
              )}
            </button>
            <button onClick={handleFindSimilarJobs} className="ir-action-btn ir-btn-primary">
              🔍 Find Similar Jobs
            </button>
          </div>
        </div>

        {/* ── MATCH SCORE + OVERVIEW ── */}
        <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:20, marginBottom:28, flexWrap:"wrap" }}>

          {/* Score card */}
          <div className="ir-section-card" style={{ padding:"28px 28px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, minWidth:180 }}>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(167,139,250,0.5)" }}>match score</p>
            <ScoreRing score={report.matchScore || 0} />
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.2)", letterSpacing:"0.04em", textAlign:"center", maxWidth:120 }}>
              Based on your resume vs target role
            </p>
          </div>

          {/* Overview card */}
          <div className="ir-section-card" style={{ padding:"28px 30px" }}>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(167,139,250,0.5)", marginBottom:10 }}>target role</p>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:900, color:"white", marginBottom:14, lineHeight:1.2 }}>
              {report.title}
            </h2>
            <div style={{ height:1, background:"linear-gradient(90deg, rgba(124,58,237,0.3), transparent)", marginBottom:14 }}/>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:10, color:"rgba(255,255,255,0.35)", letterSpacing:"0.02em", lineHeight:1.75, display:"-webkit-box", WebkitLineClamp:4, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
              {report.jobDescription}
            </p>
          </div>
        </div>

        {/* ── SKILL GAPS ── */}
        {report.skillGaps && report.skillGaps.length > 0 && (
          <div className="ir-section-card" style={{ padding:"28px 30px", marginBottom:24 }}>
            <SectionTitle>⚡ Skill Gaps Identified</SectionTitle>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {report.skillGaps.map((gap, index) => (
                <div key={index} className={`ir-tag-${gap.severity}`} style={{ padding:"7px 16px", borderRadius:20, fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:"0.06em", display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"currentColor", flexShrink:0 }}/>
                  {gap.skill}
                  <span style={{ opacity:0.55, fontSize:8, textTransform:"uppercase", letterSpacing:"0.1em" }}>({gap.severity})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PREPARATION PLAN ── */}
        {report.preparationPlan && report.preparationPlan.length > 0 && (
          <div className="ir-section-card" style={{ padding:"28px 30px", marginBottom:24 }}>
            <SectionTitle>📅 Preparation Plan</SectionTitle>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:14 }}>
              {report.preparationPlan.map((plan, index) => (
                <div key={index} style={{
                  borderRadius:12, border:"1px solid rgba(124,58,237,0.15)",
                  background:"rgba(255,255,255,0.02)", padding:"16px 18px",
                  animation:`fadeUp 0.4s ease ${index*0.06}s both`,
                }}>
                  <div style={{ fontFamily:"'Playfair Display', serif", fontSize:14, fontWeight:700, color:"rgba(167,139,250,0.9)", marginBottom:10 }}>
                    Day {plan.day}: {plan.focus}
                  </div>
                  <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:6 }}>
                    {plan.tasks.map((task, idx) => (
                      <li key={idx} style={{ display:"flex", alignItems:"flex-start", gap:8, fontFamily:"'DM Mono', monospace", fontSize:10, color:"rgba(255,255,255,0.4)", letterSpacing:"0.02em", lineHeight:1.6 }}>
                        <span style={{ color:"rgba(52,211,153,0.6)", flexShrink:0, marginTop:1 }}>›</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── INTERVIEW QUESTIONS ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>

          {/* Technical */}
          <div className="ir-section-card" style={{ padding:"28px 30px" }}>
            <SectionTitle accent="linear-gradient(135deg, #38bdf8, #818cf8)">⚙ Technical Questions</SectionTitle>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {report.technicalQuestions?.map((q, index) => (
                <CollapseItem key={index} question={q} prefix="tech" />
              ))}
            </div>
          </div>

          {/* Behavioral */}
          <div className="ir-section-card" style={{ padding:"28px 30px" }}>
            <SectionTitle accent="linear-gradient(135deg, #ec4899, #a78bfa)">🤝 Behavioral Questions</SectionTitle>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {report.behavioralQuestions?.map((q, index) => (
                <CollapseItem key={index} question={q} prefix="behav" />
              ))}
            </div>
          </div>
        </div>

        {/* Back button */}
        <div style={{ textAlign:"center", marginTop:8 }}>
          <Link to="/interview-reports" className="ir-action-btn ir-btn-secondary" style={{ padding:"12px 28px", fontSize:10 }}>
            ← Back to My Reports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewReport;
