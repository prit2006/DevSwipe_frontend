import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/const";


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Mono:wght@400;500&display=swap');

  @keyframes goldShimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

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
  @keyframes scoreReveal {
    from { stroke-dashoffset: 251; }
    to   { stroke-dashoffset: var(--dash-offset); }
  }
  @keyframes pulse {
    0%,100% { opacity:1; }
    50%     { opacity:0.5; }
  }

  .mir-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .mir-card {
    position: relative;
    border-radius: 18px;
    border: 1px solid rgba(124,58,237,0.2);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    overflow: hidden;
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .mir-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed);
    background-size: 300% 100%;
    animation: shimmerBorder 3s linear infinite;
  }
  .mir-card:hover {
    border-color: rgba(168,85,247,0.4);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(124,58,237,0.15);
  }

  .mir-new-btn {
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
  .mir-new-btn:hover { opacity: 0.85; transform: translateY(-1px); }

  .mir-view-btn {
    display: inline-block;
    text-decoration: none;
    padding: 7px 16px;
    border-radius: 9px;
    border: 1px solid rgba(124,58,237,0.3);
    background: rgba(124,58,237,0.08);
    color: rgba(167,139,250,0.9);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: all 0.18s;
  }
  .mir-view-btn:hover {
    background: rgba(124,58,237,0.22);
    border-color: rgba(168,85,247,0.5);
    box-shadow: 0 0 16px rgba(124,58,237,0.3);
  }

  .mir-animated-border { position: relative; }
  .mir-animated-border::before {
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

const ScoreRing = ({ score }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "#34d399" : score >= 40 ? "#fbbf24" : "#f87171";

  return (
    <div style={{ position:"relative", width:72, height:72, flexShrink:0 }}>
      <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform:"rotate(-90deg)" }}>
        <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4"/>
        <circle
          cx="36" cy="36" r={radius} fill="none"
          stroke={color} strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition:"stroke-dashoffset 1s ease", filter:`drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontFamily:"'DM Mono', monospace", fontSize:13, fontWeight:500, color, textAlign:"center" }}>
        {score}%
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PREMIUM GATE
───────────────────────────────────────────────────────────── */
const PremiumGate = () => {
  const features = [
    { icon:"🧠", text:"AI-powered resume analysis & scoring" },
    { icon:"📄", text:"Generate tailored AI resume PDF" },
    { icon:"🎯", text:"Job-match scoring against target roles" },
    { icon:"⚡", text:"Skill gap identification & severity ranking" },
    { icon:"📅", text:"Day-by-day personalised preparation plan" },
    { icon:"💬", text:"Technical & behavioral interview questions" },
  ];
  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
      <style>{styles}</style>
      <AuroraBg />
      <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:520, animation:"cardEntry 0.85s cubic-bezier(0.16,1,0.3,1) forwards" }}>
        <div style={{
          position:"relative", borderRadius:24,
          background:"rgba(245,158,11,0.04)", backdropFilter:"blur(40px)",
          padding:"52px 44px",
          boxShadow:"0 40px 100px rgba(0,0,0,0.65), 0 0 80px rgba(245,158,11,0.08), inset 0 1px 0 rgba(252,211,77,0.1)",
          overflow:"hidden",
        }}>
          {/* animated gold border */}
          <div style={{ position:"absolute", inset:-1, borderRadius:25, padding:1,
            background:"linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b, #d97706, #fcd34d, #f59e0b)",
            backgroundSize:"300% 100%", pointerEvents:"none",
            WebkitMask:"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite:"xor", maskComposite:"exclude",
            animation:"shimmerBorder 2.5s ease infinite"
          }}/>
          {/* Top badge */}
          <div style={{ position:"absolute", top:-16, left:"50%", transform:"translateX(-50%)", padding:"5px 20px", borderRadius:20, background:"linear-gradient(135deg, #f59e0b, #d97706)", boxShadow:"0 0 24px rgba(245,158,11,0.6)", zIndex:2, whiteSpace:"nowrap" }}>
            <span style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.2em", color:"#1a0a00", textTransform:"uppercase", fontWeight:700 }}>Premium Feature Only</span>
          </div>
          {/* Crown icon */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
            <div style={{ width:72, height:72, borderRadius:"50%",
              background:"radial-gradient(circle at 35% 35%, rgba(252,211,77,0.25), rgba(245,158,11,0.1))",
              border:"1px solid rgba(252,211,77,0.3)", display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 50px rgba(245,158,11,0.2)", animation:"iconFloat 4s ease-in-out infinite",
            }}>
              <span style={{ fontSize:30 }}>👑</span>
            </div>
          </div>
          {/* Heading */}
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(245,158,11,0.5)", marginBottom:10 }}>unlock premium</p>
            <h1 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:28, fontWeight:900, lineHeight:1.15, marginBottom:12,
              background:"linear-gradient(135deg, #f59e0b 0%, #fcd34d 30%, #f59e0b 50%, #d97706 70%, #fcd34d 100%)",
              backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", animation:"goldShimmer 3s linear infinite",
            }}>AI Resumes & Reports</h1>
            <p style={{ color:"rgba(255,255,255,0.25)", fontSize:11, fontFamily:"'DM Mono', monospace", letterSpacing:"0.03em", lineHeight:1.75 }}>
              This feature is exclusive to Premium members. Upgrade to unlock AI-powered resume analysis, job matching, and personalised interview coaching.
            </p>
          </div>
          {/* Features */}
          <div style={{ marginBottom:28 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 0",
                borderBottom:"1px solid rgba(245,158,11,0.08)", fontFamily:"'DM Mono', monospace",
                fontSize:11, color:"rgba(255,255,255,0.55)", letterSpacing:"0.02em",
                ...(i === features.length-1 ? { borderBottom:"none" } : {})
              }}>
                <span style={{ fontSize:15, width:22, textAlign:"center", flexShrink:0 }}>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
          {/* CTA */}
          <Link to="/premium" style={{ display:"block", textDecoration:"none", width:"100%", padding:"16px", borderRadius:13, border:"none",
            fontFamily:"'DM Mono', monospace", fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase",
            background:"linear-gradient(135deg, #f59e0b, #d97706)", color:"#1a0a00", fontWeight:700,
            boxShadow:"0 0 35px rgba(245,158,11,0.5), 0 8px 24px rgba(0,0,0,0.4)",
            textAlign:"center", transition:"all 0.2s",
          }}>👑 Upgrade to Premium →</Link>
          <p style={{ textAlign:"center", marginTop:16, fontFamily:"'DM Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.18)", letterSpacing:"0.05em" }}>
            Choose Silver or Gold — both include full AI Resume access
          </p>
        </div>
      </div>
    </div>
  );
};

const MyInterviewReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Premium gate
  const [premiumChecking, setPremiumChecking] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Check premium first, then fetch reports
    const init = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/premium/verify`, { withCredentials: true });
        const premium = res.data.isPremium === true;
        setIsPremium(premium);
        if (!premium) { setPremiumChecking(false); return; }
      } catch (err) {
        console.error("Premium check failed:", err);
        setIsPremium(false);
        setPremiumChecking(false);
        return;
      }
      setPremiumChecking(false);
      // Fetch reports only for premium users
      try {
        const response = await axios.get(`${BASE_URL}/interview`, { withCredentials: true });
        setReports(response.data.interviewReports);
      } catch (err) {
        console.error(err);
        setError("Failed to load interview reports.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Checking premium membership
  if (premiumChecking) return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{styles}</style>
      <AuroraBg />
      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
        <OrbLoader />
        <p style={{ fontFamily:"'DM Mono', monospace", letterSpacing:"0.25em", fontSize:10, textTransform:"uppercase", color:"rgba(245,158,11,0.6)" }}>Verifying membership</p>
        <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:20 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(to top, #f59e0b, #7c3aed)", animation:`dotWave 1s ease-in-out ${i*0.12}s infinite` }}/>
          ))}
        </div>
      </div>
    </div>
  );

  if (!isPremium) return <PremiumGate />;

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* Count pill */}
      {!loading && reports.length > 0 && (
        <div style={{ position:"fixed", top:76, right:20, zIndex:10, padding:"5px 14px", borderRadius:20, background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.28)", backdropFilter:"blur(12px)" }}>
          <span style={{ fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:"0.15em", color:"rgba(167,139,250,0.85)" }}>
            {reports.length} report{reports.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div style={{ position:"relative", zIndex:5, maxWidth:1100, margin:"0 auto", padding:"80px 24px 48px" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40, flexWrap:"wrap", gap:16 }}>
          <div>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(167,139,250,0.45)", marginBottom:8 }}>ai-powered</p>
            <h1 className="mir-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:34, fontWeight:900, lineHeight:1.1 }}>
              🧠 My AI Resumes &amp; Reports
            </h1>
          </div>
          <Link to="/resume-analyzer" className="mir-new-btn">+ Analyze New Resume</Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"80px 0" }}>
            <OrbLoader />
            <p style={{ fontFamily:"'DM Mono', monospace", letterSpacing:"0.2em", fontSize:10, textTransform:"uppercase", color:"rgba(167,139,250,0.6)" }}>
              Loading your reports
            </p>
            <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:20 }}>
              {[0,1,2,3,4,5].map(i => (
                <div key={i} style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(to top, #7c3aed, #38bdf8)", animation:`dotWave 1s ease-in-out ${i*0.12}s infinite` }}/>
              ))}
            </div>
          </div>

        ) : error ? (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <div style={{ fontFamily:"'DM Mono', monospace", fontSize:11, color:"rgba(248,113,113,0.8)", letterSpacing:"0.05em", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:12, padding:"16px 24px", display:"inline-block" }}>
              ⚠ {error}
            </div>
          </div>

        ) : reports.length === 0 ? (
          /* Empty state */
          <div className="mir-animated-border" style={{
            margin:"40px auto", maxWidth:420, padding:"52px 48px",
            borderRadius:20, textAlign:"center",
            background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)",
            boxShadow:"0 40px 100px rgba(0,0,0,0.6)",
            display:"flex", flexDirection:"column", alignItems:"center", gap:20,
          }}>
            <div style={{ width:68, height:68, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(232,121,249,0.2), rgba(124,58,237,0.1))", border:"1px solid rgba(232,121,249,0.25)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 50px rgba(232,121,249,0.2)", animation:"iconFloat 4s ease-in-out infinite" }}>
              <span style={{ fontSize:26 }}>🧠</span>
            </div>
            <div>
              <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:900, marginBottom:8, background:"linear-gradient(135deg,#e879f9,#a78bfa,#38bdf8)", backgroundSize:"300% 300%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"gradShift 4s ease infinite" }}>
                No Reports Yet
              </h3>
              <p style={{ color:"rgba(255,255,255,0.28)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.04em", marginBottom:24 }}>
                Upload your resume to get AI-powered analysis and feedback.
              </p>
              <Link to="/resume-analyzer" className="mir-new-btn">Get Started →</Link>
            </div>
          </div>

        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(440px, 1fr))", gap:20 }}>
            {reports.map((report, i) => (
              <div key={report._id} className="mir-card" style={{ animationDelay:`${i*0.07}s` }}>
                <div style={{ padding:"22px 24px" }}>

                  {/* Top row: title + score ring */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, marginBottom:12 }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:18, fontWeight:700, color:"white", lineHeight:1.25, marginBottom:6, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {report.title}
                      </h2>
                      <p style={{ fontFamily:"'DM Mono', monospace", fontSize:10, color:"rgba(167,139,250,0.6)", letterSpacing:"0.05em" }}>
                        {report.recommendedJobId?.company
                          ? `🎯 Target: ${report.recommendedJobId.company}`
                          : "📋 General Analysis"}
                      </p>
                    </div>
                    <ScoreRing score={report.matchScore || 0} />
                  </div>

                  {/* Divider */}
                  <div style={{ height:1, background:"linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)", marginBottom:14 }}/>

                  {/* Footer row */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontFamily:"'DM Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.2)", letterSpacing:"0.08em" }}>
                      Generated {new Date(report.createdAt).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" })}
                    </span>
                    <Link to={`/interview-reports/${report._id}`} className="mir-view-btn">
                      View Full Report →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInterviewReports;
