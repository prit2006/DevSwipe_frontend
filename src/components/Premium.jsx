// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useEffect, useState } from "react";

// const Premium = () => {
//   const [isUserPremium, setIsUserPremium] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     verifyPremiumUser();
//   }, []);

//   const verifyPremiumUser = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/premium/verify", {
//         withCredentials: true,
//       });

//       if (res.data.isPremium) {
//         setIsUserPremium(true);
//       }
//     } catch (err) {
//       console.error("Error verifying premium:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBuyClick = async (type) => {
//     try {
//       const order = await axios.post(
//         BASE_URL + "/payment/create",
//         { membershipType: type },
//         { withCredentials: true }
//       );

//       const { amount, keyId, currency, notes, orderId } = order.data;

//       const options = {
//         key: keyId,
//         amount: amount,
//         currency: currency,
//         name: "DevSwipe",
//         description: "Developer Premium Membership",
//         order_id: orderId,

//         handler: async function (response) {
//           console.log("Payment success:", response);
//           await verifyPremiumUser();
//         },

//         prefill: {
//           name: notes.firstname + " " + notes.lastname,
//           email: notes.email,
//           contact: "9999999999",
//         },

//         theme: {
//           color: "#6366F1",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment failed. Try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center mt-20">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (isUserPremium) {
//     return (
//       <div className="text-center mt-20 text-3xl font-bold text-green-500">
//         🎉 You are already a Premium User
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center gap-10 mt-20">

//       {/* Silver Card */}
//       <div className="card w-80 bg-base-200 shadow-xl p-6">
//         <h2 className="text-2xl font-bold text-center">Silver Membership</h2>

//         <ul className="mt-4 space-y-2">
//           <li>✔ Chat with developers</li>
//           <li>✔ 100 connection requests / day</li>
//           <li>✔ Blue Tick</li>
//           <li>✔ 3 Months</li>
//         </ul>

//         <button
//           className="btn btn-secondary mt-6"
//           onClick={() => handleBuyClick("silver")}
//         >
//           Buy Silver
//         </button>
//       </div>

//       {/* Gold Card */}
//       <div className="card w-80 bg-base-200 shadow-xl p-6">
//         <h2 className="text-2xl font-bold text-center">Gold Membership</h2>

//         <ul className="mt-4 space-y-2">
//           <li>✔ Chat with developers</li>
//           <li>✔ Unlimited connection requests</li>
//           <li>✔ Blue Tick</li>
//           <li>✔ 6 Months</li>
//         </ul>

//         <button
//           className="btn btn-primary mt-6"
//           onClick={() => handleBuyClick("gold")}
//         >
//           Buy Gold
//         </button>
//       </div>

//     </div>
//   );
// };

// export default Premium;

// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { useEffect, useState } from "react";

// // const Premium = () => {
// //   const [isUserPremium, setIsUserPremium] = useState(false);
// //   useEffect(() => {
// //     verifyPremiumUser();
// //   }, []);

// //   const verifyPremiumUser = async () => {
// //     const res = await axios.get(BASE_URL + "/premium/verify", {
// //       withCredentials: true,
// //     });

// //     if (res.data.isPremium) {
// //       setIsUserPremium(true);
// //     }
// //   };

// //   const handleBuyClick = async (type) => {
// //     const order = await axios.post(
// //       BASE_URL + "/payment/create",
// //       {
// //         membershipType: type,
// //       },
// //       { withCredentials: true }
// //     );

// //     const { amount, keyId, currency, notes, orderId } = order.data;

// //     const options = {
// //       key: keyId,
// //       amount,
// //       currency,
// //       name: "DevSwipe",
// //       description: "Connect to other developers",
// //       order_id: orderId,
// //       prefill: {
// //         name: notes.firstname + " " + notes.lastname,
// //         email: notes.email,
// //         contact: "7405228322",
// //       },
// //       theme: {
// //         color: "#F37254",
// //       },
// //       handler: verifyPremiumUser,
// //     };

// //     const rzp = new window.Razorpay(options);
// //     rzp.open();
// //   };
// //   return isUserPremium ? (
// //     "You're are already a premium user"
// //   ) : (
// //     <div className="m-10">
// //       <div className="flex w-full">
// //         <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
// //           <h1 className="font-bold text-3xl">Silver Membership</h1>
// //           <ul>
// //             <li> - Chat with other people</li>
// //             <li> - 100 connection Requests per day</li>
// //             <li> - Blue Tick</li>
// //             <li> - 3 months</li>
// //           </ul>
// //           <button
// //             onClick={() => handleBuyClick("silver")}
// //             className="btn btn-secondary"
// //           >
// //             Buy Silver
// //           </button>
// //         </div>
// //         <div className="divider divider-horizontal">OR</div>
// //         <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
// //           <h1 className="font-bold text-3xl">Gold Membership</h1>
// //           <ul>
// //             <li> - Chat with other people</li>
// //             <li> - Inifiniye connection Requests per day</li>
// //             <li> - Blue Tick</li>
// //             <li> - 6 months</li>
// //           </ul>
// //           <button
// //             onClick={() => handleBuyClick("gold")}
// //             className="btn btn-primary"
// //           >
// //             Buy Gold
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default Premium;
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useEffect, useState } from "react";

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
  @keyframes cardEntry {
    0%   { opacity:0; transform:perspective(800px) rotateX(8deg) translateY(60px) scale(0.92); }
    100% { opacity:1; transform:perspective(800px) rotateX(0deg) translateY(0) scale(1); }
  }
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes iconFloat {
    0%,100% { transform:translateY(0) rotate(0deg); }
    50%     { transform:translateY(-10px) rotate(3deg); }
  }
  @keyframes goldShimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes dotWave {
    0%,100% { transform:scaleY(0.3); opacity:0.3; }
    50%     { transform:scaleY(1.4); opacity:1; }
  }

  .pm-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .pm-card-entry { animation: cardEntry 0.85s cubic-bezier(0.16,1,0.3,1) forwards; }
  .pm-card-entry-delay { animation: cardEntry 0.85s cubic-bezier(0.16,1,0.3,1) 0.15s both; }

  .pm-silver-border { position: relative; }
  .pm-silver-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 25px;
    padding: 1px;
    background: linear-gradient(90deg, #94a3b8, #cbd5e1, #e2e8f0, #94a3b8);
    background-size: 300% 300%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: shimmerBorder 3s ease infinite;
    pointer-events: none;
  }

  .pm-gold-border { position: relative; }
  .pm-gold-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 25px;
    padding: 1px;
    background: linear-gradient(90deg, #f59e0b, #fcd34d, #fbbf24, #f59e0b, #d97706, #fcd34d, #f59e0b);
    background-size: 300% 300%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: shimmerBorder 2.5s ease infinite;
    pointer-events: none;
  }

  .pm-gold-title {
    background: linear-gradient(135deg, #f59e0b 0%, #fcd34d 30%, #f59e0b 50%, #d97706 70%, #fcd34d 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: goldShimmer 3s linear infinite;
  }

  .pm-silver-title {
    background: linear-gradient(135deg, #94a3b8 0%, #e2e8f0 40%, #94a3b8 60%, #cbd5e1 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: goldShimmer 3s linear infinite;
  }

  .pm-silver-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid rgba(148,163,184,0.4);
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: linear-gradient(135deg, rgba(148,163,184,0.15), rgba(226,232,240,0.1));
    color: #e2e8f0;
    box-shadow: 0 0 24px rgba(148,163,184,0.2);
    transition: all 0.2s;
  }
  .pm-silver-btn:hover {
    background: linear-gradient(135deg, rgba(148,163,184,0.3), rgba(226,232,240,0.2));
    box-shadow: 0 0 40px rgba(148,163,184,0.4);
    transform: translateY(-2px);
  }

  .pm-gold-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: #1a0a00;
    font-weight: 700;
    box-shadow: 0 0 30px rgba(245,158,11,0.5), 0 8px 24px rgba(0,0,0,0.4);
    transition: all 0.2s;
  }
  .pm-gold-btn:hover {
    box-shadow: 0 0 50px rgba(245,158,11,0.7), 0 12px 32px rgba(0,0,0,0.5);
    transform: translateY(-2px) scale(1.02);
  }

  .pm-feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    letter-spacing: 0.03em;
  }
  .pm-feature-item:last-child { border-bottom: none; }
`;

const AuroraBg = () => (
  <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
    <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, #0d0520 0%, #050510 50%, #030308 100%)" }}/>
    <div style={{ position:"absolute", top:"-20%", left:"-10%", width:"70%", height:"70%", background:"radial-gradient(ellipse, rgba(124,58,237,0.45) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)", filter:"blur(60px)", animation:"aurora1 18s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", top:"10%", right:"-15%", width:"60%", height:"60%", background:"radial-gradient(ellipse, rgba(6,182,212,0.35) 0%, rgba(56,189,248,0.15) 40%, transparent 70%)", filter:"blur(80px)", animation:"aurora2 22s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", bottom:"-10%", left:"20%", width:"50%", height:"50%", background:"radial-gradient(ellipse, rgba(236,72,153,0.3) 0%, rgba(167,139,250,0.15) 50%, transparent 70%)", filter:"blur(70px)", animation:"aurora3 14s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", bottom:"20%", right:"5%", width:"40%", height:"40%", background:"radial-gradient(ellipse, rgba(245,158,11,0.2) 0%, transparent 70%)", filter:"blur(50px)", animation:"aurora4 26s ease-in-out infinite" }}/>
    {[...Array(40)].map((_, i) => (
      <div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, width:i%5===0?3:i%3===0?2:1, height:i%5===0?3:i%3===0?2:1, borderRadius:"50%", background:"white", animation:`twinkle ${2+Math.random()*4}s ease-in-out ${Math.random()*4}s infinite` }}/>
    ))}
    {[...Array(14)].map((_, i) => (
      <div key={i} style={{ position:"absolute", left:`${5+i*7}%`, bottom:0, width:i%3===0?3:2, height:i%3===0?3:2, borderRadius:"50%", background:i%2===0?`rgba(168,85,247,0.5)`:`rgba(245,158,11,0.4)`, "--dx":`${-40+Math.random()*80}px`, animation:`particle ${6+Math.random()*10}s ease-in ${Math.random()*8}s infinite` }}/>
    ))}
  </div>
);

const OrbLoader = () => (
  <div style={{ position:"relative", width:80, height:80 }}>
    {[0,1,2].map(i => (
      <div key={i} style={{ position:"absolute", inset:i*11, borderRadius:"50%", border:`${1.5-i*0.3}px solid transparent`, borderTopColor:["#a78bfa","#38bdf8","#f59e0b"][i], borderRightColor:`rgba(${["167,139,250","56,189,248","245,158,11"][i]},0.2)`, animation:`spinRing ${0.9+i*0.5}s linear infinite ${i%2===0?"":" reverse"}` }}/>
    ))}
    <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:14, height:14, borderRadius:"50%", background:"radial-gradient(circle, #fcd34d 0%, #f59e0b 100%)", boxShadow:"0 0 20px rgba(252,211,77,0.8)" }}/>
  </div>
);

const silverFeatures = [
  { icon:"🔗", text:"100 connection requests / day" },
  { icon:"🤖", text:"AI Resume Analyzer" },
  { icon:"⭐", text:"Priority support" },
  { icon:"📅", text:"Valid for 3 months" },
];

const goldFeatures = [
  { icon:"♾️", text:"Unlimited connection requests" },
  { icon:"🤖", text:"AI Resume Analyzer" },
  { icon:"⭐", text:"Priority support" },
  { icon:"📅", text:"Valid for 6 months" },
];

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { verifyPremiumUser(); }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", { withCredentials: true });
      if (res.data.isPremium) setIsUserPremium(true);
    } catch (err) {
      console.error("Error verifying premium:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(BASE_URL + "/payment/create", { membershipType: type }, { withCredentials: true });
      const { amount, keyId, currency, notes, orderId } = order.data;
      const options = {
        key: keyId, amount, currency,
        name: "DevSwipe",
        description: "Developer Premium Membership",
        order_id: orderId,
        handler: async function (response) {
          console.log("Payment success:", response);
          await verifyPremiumUser();
        },
        prefill: { name: notes.firstname + " " + notes.lastname, email: notes.email, contact: "9999999999" },
        theme: { color: "#7c3aed" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Try again.");
    }
  };

  /* ── LOADING ──────────────────────────────────────────────────── */
  if (loading) return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{styles}</style>
      <AuroraBg />
      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:24 }}>
        <OrbLoader />
        <p style={{ fontFamily:"'DM Mono', monospace", letterSpacing:"0.3em", fontSize:11, textTransform:"uppercase", color:"rgba(167,139,250,0.75)" }}>Checking membership</p>
        <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:20 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(to top, #f59e0b, #7c3aed)", animation:`dotWave 1s ease-in-out ${i*0.12}s infinite` }}/>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── ALREADY PREMIUM ──────────────────────────────────────────── */
  if (isUserPremium) return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{styles}</style>
      <AuroraBg />
      <div className="pm-card-entry pm-gold-border" style={{
        position:"relative", zIndex:10,
        padding:"56px 64px", borderRadius:24, textAlign:"center",
        background:"rgba(245,158,11,0.04)", backdropFilter:"blur(40px)",
        boxShadow:"0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(245,158,11,0.1)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:24, maxWidth:420,
      }}>
        <div style={{ width:80, height:80, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(252,211,77,0.3), rgba(245,158,11,0.1))", border:"1px solid rgba(252,211,77,0.35)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 60px rgba(252,211,77,0.25)", animation:"iconFloat 4s ease-in-out infinite" }}>
          <span style={{ fontSize:32 }}>👑</span>
        </div>
        <div>
          <h2 className="pm-gold-title" style={{ fontFamily:"'Playfair Display', serif", fontSize:28, fontWeight:900, marginBottom:10 }}>Premium Member</h2>
          <p style={{ color:"rgba(255,255,255,0.35)", fontSize:12, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>You already have an active premium membership.</p>
        </div>
      </div>
    </div>
  );

  /* ── PLANS ────────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      <div style={{ position:"relative", zIndex:5, maxWidth:900, margin:"0 auto", padding:"80px 24px 48px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(167,139,250,0.6)", marginBottom:12 }}>Unlock the full experience</p>
          <h1 className="pm-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:40, fontWeight:900, lineHeight:1.1 }}>
            Go Premium
          </h1>
        </div>

        {/* Cards */}
        <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }}>

          {/* Silver */}
          <div className="pm-card-entry pm-silver-border" style={{
            flex:"1 1 320px", maxWidth:380, borderRadius:24,
            background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)",
            padding:"36px 32px",
            boxShadow:"0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}>
            <div style={{ position:"absolute", top:1, left:1, right:1, height:1, background:"linear-gradient(90deg, transparent, #94a3b8, #e2e8f0, #94a3b8, transparent)", backgroundSize:"300% 100%", animation:"shimmerBorder 3s linear infinite", borderRadius:"24px 24px 0 0", opacity:0.5 }}/>

            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
              <div style={{ width:52, height:52, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(226,232,240,0.25), rgba(148,163,184,0.1))", border:"1px solid rgba(226,232,240,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:22 }}>🥈</span>
              </div>
              <div>
                <h2 className="pm-silver-title" style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:900 }}>Silver</h2>
                <p style={{ fontFamily:"'DM Mono', monospace", fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em" }}>MEMBERSHIP</p>
              </div>
            </div>

            <div style={{ marginBottom:28 }}>
              {silverFeatures.map((f, i) => (
                <div key={i} className="pm-feature-item">
                  <span style={{ fontSize:14, width:20, textAlign:"center" }}>{f.icon}</span>
                  {f.text}
                </div>
              ))}
            </div>

            <button className="pm-silver-btn" onClick={() => handleBuyClick("silver")}>
              Buy Silver →
            </button>
          </div>

          {/* Gold */}
          <div className="pm-card-entry-delay pm-gold-border" style={{
            flex:"1 1 320px", maxWidth:380, borderRadius:24,
            background:"rgba(245,158,11,0.04)", backdropFilter:"blur(40px)",
            padding:"52px 32px 36px",
            boxShadow:"0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(245,158,11,0.08), inset 0 1px 0 rgba(252,211,77,0.12)",
          }}>
            {/* most popular badge */}
            <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", padding:"4px 16px", borderRadius:20, background:"linear-gradient(135deg, #f59e0b, #d97706)", boxShadow:"0 0 20px rgba(245,158,11,0.5)", zIndex:2 }}>
              <span style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.2em", color:"#1a0a00", textTransform:"uppercase", fontWeight:700 }}>Most Popular</span>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
              <div style={{ width:52, height:52, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(252,211,77,0.3), rgba(245,158,11,0.1))", border:"1px solid rgba(252,211,77,0.3)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 30px rgba(252,211,77,0.2)" }}>
                <span style={{ fontSize:22 }}>🥇</span>
              </div>
              <div>
                <h2 className="pm-gold-title" style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:900 }}>Gold</h2>
                <p style={{ fontFamily:"'DM Mono', monospace", fontSize:10, color:"rgba(245,158,11,0.5)", letterSpacing:"0.1em" }}>MEMBERSHIP</p>
              </div>
            </div>

            <div style={{ marginBottom:28 }}>
              {goldFeatures.map((f, i) => (
                <div key={i} className="pm-feature-item" style={{ color:"rgba(255,255,255,0.65)" }}>
                  <span style={{ fontSize:14, width:20, textAlign:"center" }}>{f.icon}</span>
                  {f.text}
                </div>
              ))}
            </div>

            <button className="pm-gold-btn" onClick={() => handleBuyClick("gold")}>
              👑 Buy Gold →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Premium;