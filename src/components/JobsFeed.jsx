// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../utils/const";

// const JobsFeed = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [filters, setFilters] = useState({
//     role: "",
//     technology: "",
//     company: "",
//   });

//   /* ---------------- FETCH JOBS ---------------- */

//   const fetchJobs = async () => {
//     try {
//       setLoading(true);

//       const activeFilters = Object.fromEntries(
//         Object.entries(filters).filter(([_, v]) => v.trim() !== "")
//       );

//       const query = new URLSearchParams(activeFilters).toString();
//       const url = query ? `${BASE_URL}/job?${query}` : `${BASE_URL}/job`;

//       const res = await axios.get(url, { withCredentials: true });

//       setJobs(res.data);
//     } catch (err) {
//       console.error("Error fetching jobs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- FIRST LOAD ---------------- */

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   /* ---------------- DEBOUNCE FILTER ---------------- */

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       fetchJobs();
//     }, 700);

//     return () => clearTimeout(delay);
//   }, [filters]);

//   /* ---------------- HANDLE INPUT ---------------- */

//   const handleChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="p-4 md:p-8 max-w-7xl mx-auto">

//       {/* HEADER */}

//       <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
//         Open Jobs & Internships
//       </h1>

//       {/* ---------------- FILTERS ---------------- */}

//       <div className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row gap-4 mb-8 shadow-md">

//         <input
//           type="text"
//           name="role"
//           placeholder="Search by Role"
//           value={filters.role}
//           onChange={handleChange}
//           className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
//         />

//         <input
//           type="text"
//           name="technology"
//           placeholder="Search by Tech / Skill"
//           value={filters.technology}
//           onChange={handleChange}
//           className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
//         />

//         <input
//           type="text"
//           name="company"
//           placeholder="Search by Company"
//           value={filters.company}
//           onChange={handleChange}
//           className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
//         />

//       </div>

//       {/* ---------------- JOB GRID ---------------- */}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//         {/* LOADING */}

//         {loading &&
//           Array(6)
//             .fill(0)
//             .map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-800 border border-gray-700 rounded-lg p-6 animate-pulse"
//               >
//                 <div className="h-5 bg-gray-700 rounded w-3/4 mb-3"></div>
//                 <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
//                 <div className="h-3 bg-gray-700 rounded w-1/3 mb-4"></div>
//                 <div className="h-8 bg-gray-700 rounded mt-6"></div>
//               </div>
//             ))}

//         {/* JOBS */}

//         {!loading &&
//           jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-gray-800 border border-gray-700 hover:border-green-500 transition rounded-lg p-6 shadow-lg flex flex-col justify-between group"
//             >
//               <div>
//                 <h2 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">
//                   {job.title}
//                 </h2>

//                 <p className="text-gray-400 font-medium mb-3">
//                   {job.company} • {job.role}
//                 </p>

//                 <p className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded inline-block mb-4">
//                   DL: {new Date(job.deadline).toLocaleDateString()}
//                 </p>

//                 {/* SKILLS */}

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {job.skills?.slice(0, 4).map((skill, i) => (
//                     <span
//                       key={i}
//                       className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
//                     >
//                       {skill}
//                     </span>
//                   ))}

//                   {job.skills?.length > 4 && (
//                     <span className="text-xs text-gray-500">
//                       +{job.skills.length - 4}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <Link
//                 to={`/jobs/${job._id}`}
//                 className="mt-4 bg-gray-700 hover:bg-green-600 text-white text-center py-2 rounded transition font-semibold"
//               >
//                 View Details
//               </Link>
//             </div>
//           ))}

//         {/* EMPTY STATE */}

//         {!loading && jobs.length === 0 && (
//           <p className="text-center text-gray-400 col-span-full">
//             No active jobs found for these filters.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobsFeed;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";
// // import { BASE_URL } from "../utils/const";

// // const JobsFeed = () => {
// //     const [jobs, setJobs] = useState([]);
// //     const [filters, setFilters] = useState({ role: "", technology: "", company: "" });

// //    const fetchJobs = async () => {
// //     try {

// //         const activeFilters = Object.fromEntries(
// //             Object.entries(filters).filter(([_, v]) => v.trim() !== "")
// //         );

// //         const query = new URLSearchParams(activeFilters).toString();

// //         const url = query ? `${BASE_URL}/job?${query}` : `${BASE_URL}/job`;

// //         const res = await axios.get(url, { withCredentials: true });

// //         setJobs(res.data);

// //     } catch (err) {
// //         console.error(err);
// //     }
// // };

// //     useEffect(() => {
// //         // debounce fetch
// //         const delayBounceFn = setTimeout(() => {
// //             fetchJobs();
// //         }, 500);
// //         return () => clearTimeout(delayBounceFn);
// //     }, [filters]);

// //     const handleChange = (e) => {
// //         setFilters({ ...filters, [e.target.name]: e.target.value });
// //     };

// //     return (
// //         <div className="p-4 md:p-8 max-w-7xl mx-auto">
// //             <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">Open Jobs & Internships</h1>

// //             {/* Search/Filters */}
// //             <div className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row gap-4 mb-8 shadow-md">
// //                 <input
// //                     type="text" name="role" placeholder="Search by Role"
// //                     value={filters.role} onChange={handleChange}
// //                     className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
// //                 />
// //                 <input
// //                     type="text" name="technology" placeholder="Search by Tech / Skill"
// //                     value={filters.technology} onChange={handleChange}
// //                     className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
// //                 />
// //                 <input
// //                     type="text" name="company" placeholder="Search by Company"
// //                     value={filters.company} onChange={handleChange}
// //                     className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
// //                 />
// //             </div>

// //             {/* Job Grid */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {jobs.map(job => (
// //                     <div key={job._id} className="bg-gray-800 border border-gray-700 hover:border-green-500 transition-colors rounded-lg p-6 shadow-lg flex flex-col justify-between group">
// //                         <div>
// //                             <h2 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">{job.title}</h2>
// //                             <p className="text-gray-400 font-medium mb-3">{job.company} • {job.role}</p>
// //                             <p className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded inline-block mb-4">
// //                                 DL: {new Date(job.deadline).toLocaleDateString()}
// //                             </p>
// //                             <div className="flex flex-wrap gap-2 mb-4">
// //                                 {job.skills?.slice(0, 4).map((s, i) => (
// //                                     <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{s}</span>
// //                                 ))}
// //                                 {job.skills?.length > 4 && <span className="text-xs text-gray-500">+{job.skills.length - 4}</span>}
// //                             </div>
// //                         </div>
// //                         <Link to={`/jobs/${job._id}`} className="mt-4 bg-gray-700 hover:bg-green-600 text-white text-center py-2 rounded transition font-semibold">
// //                             View Details
// //                         </Link>
// //                     </div>
// //                 ))}
// //                 {jobs.length === 0 && <p className="text-center text-gray-400 col-span-full">No active jobs found for these filters.</p>}
// //             </div>
// //         </div>
// //     );
// // };

// // export default JobsFeed;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
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
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes iconFloat {
    0%,100% { transform:translateY(0) rotate(0deg); }
    50%     { transform:translateY(-12px) rotate(5deg); }
  }
  @keyframes skeletonPulse {
    0%,100% { opacity:0.15; }
    50%     { opacity:0.35; }
  }

  .jf-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .jf-animated-border {
    position: relative;
  }
  .jf-animated-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 17px;
    padding: 1px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed);
    background-size: 300% 300%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: shimmerBorder 4s ease infinite;
    pointer-events: none;
  }

  .jf-job-card {
    opacity: 0;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    position: relative;
    border-radius: 16px;
    border: 1px solid rgba(124,58,237,0.2);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .jf-job-card:hover {
    border-color: rgba(168,85,247,0.5);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(124,58,237,0.2), 0 0 0 1px rgba(124,58,237,0.15);
  }
  .jf-job-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed);
    background-size: 300% 100%;
    animation: shimmerBorder 3s linear infinite;
    border-radius: 16px 16px 0 0;
  }

  .jf-skeleton {
    border-radius: 16px;
    border: 1px solid rgba(124,58,237,0.1);
    background: rgba(255,255,255,0.02);
    backdrop-filter: blur(10px);
    padding: 24px;
    animation: fadeUp 0.5s ease forwards;
  }
  .jf-skeleton-line {
    border-radius: 6px;
    background: rgba(124,58,237,0.15);
    animation: skeletonPulse 1.5s ease-in-out infinite;
  }

  .jf-input {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.25);
    border-radius: 12px;
    color: rgba(255,255,255,0.8);
    padding: 12px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
    flex: 1;
  }
  .jf-input::placeholder { color: rgba(255,255,255,0.22); }
  .jf-input:focus {
    border-color: rgba(168,85,247,0.6);
    box-shadow: 0 0 20px rgba(124,58,237,0.2);
  }

  .jf-view-btn {
    display: block;
    text-align: center;
    text-decoration: none;
    margin-top: 16px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgba(124,58,237,0.3);
    background: rgba(124,58,237,0.1);
    color: rgba(167,139,250,0.9);
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: all 0.2s;
  }
  .jf-view-btn:hover {
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    border-color: transparent;
    color: white;
    box-shadow: 0 0 24px rgba(124,58,237,0.4);
  }
`;

/* ── Aurora Background ───────────────────────────────────────────── */
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

/* ════════════════════════════════════════════════════════════════════ */
const JobsFeed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    role: searchParams.get("role") || "",
    technology: searchParams.get("technology") || "",
    company: searchParams.get("company") || "",
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v.trim() !== "")
      );
      const query = new URLSearchParams(activeFilters).toString();
      const url = query ? `${BASE_URL}/job?${query}` : `${BASE_URL}/job`;
      const res = await axios.get(url, { withCredentials: true });
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryFilters = {
      role: searchParams.get("role") || "",
      technology: searchParams.get("technology") || "",
      company: searchParams.get("company") || "",
    };

    setFilters((currentFilters) => {
      const hasChanged = Object.keys(queryFilters).some(
        (key) => currentFilters[key] !== queryFilters[key]
      );

      return hasChanged ? queryFilters : currentFilters;
    });
  }, [searchParams]);

  useEffect(() => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v.trim() !== "")
    );
    const nextQuery = new URLSearchParams(activeFilters).toString();
    const currentQuery = searchParams.toString();

    if (nextQuery !== currentQuery) {
      setSearchParams(activeFilters, { replace: true });
    }

    const delay = setTimeout(() => { fetchJobs(); }, 700);
    return () => clearTimeout(delay);
  }, [filters, searchParams, setSearchParams]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* live badge */}
      <div style={{ position:"fixed", top:72, left:28, zIndex:10, display:"flex", alignItems:"center", gap:8, padding:"6px 12px", borderRadius:20, background:"rgba(124,58,237,0.12)", border:"1px solid rgba(124,58,237,0.25)", backdropFilter:"blur(10px)" }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:"#a78bfa", boxShadow:"0 0 10px rgba(167,139,250,1)", animation:"dotWave 1.5s ease-in-out infinite" }}/>
        <span style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(167,139,250,0.8)", fontFamily:"'DM Mono', monospace" }}>live jobs</span>
      </div>

      {/* count badge */}
      <div style={{ position:"fixed", top:72, right:28, zIndex:10, padding:"6px 14px", borderRadius:20, background:"rgba(6,182,212,0.08)", border:"1px solid rgba(6,182,212,0.2)", backdropFilter:"blur(10px)" }}>
        <span style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(6,182,212,0.7)", fontFamily:"'DM Mono', monospace" }}>
          {jobs.length} jobs
        </span>
      </div>

      <div style={{ position:"relative", zIndex:5, maxWidth:1200, margin:"0 auto", padding:"80px 24px 48px" }}>

        {/* Header */}
        <h1 className="jf-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:36, fontWeight:900, textAlign:"center", marginBottom:40, lineHeight:1.1 }}>
          🏢 Open Jobs & Internships
        </h1>

        {/* Filters */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:40, padding:"20px", borderRadius:16, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(124,58,237,0.15)", backdropFilter:"blur(20px)" }}>
          {[
            { name:"role", placeholder:"Search by Role..." },
            { name:"technology", placeholder:"Search by Tech / Skill..." },
            { name:"company", placeholder:"Search by Company..." },
          ].map(({ name, placeholder }) => (
            <input
              key={name}
              type="text"
              name={name}
              placeholder={placeholder}
              value={filters[name]}
              onChange={handleChange}
              className="jf-input"
            />
          ))}
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))", gap:20 }}>

          {/* Skeletons */}
          {loading && Array(6).fill(0).map((_, i) => (
            <div key={i} className="jf-skeleton" style={{ animationDelay:`${i*0.07}s` }}>
              <div className="jf-skeleton-line" style={{ height:18, width:"70%", marginBottom:12 }}/>
              <div className="jf-skeleton-line" style={{ height:14, width:"45%", marginBottom:16 }}/>
              <div className="jf-skeleton-line" style={{ height:10, width:"30%", marginBottom:16 }}/>
              <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                {[0,1,2].map(j => <div key={j} className="jf-skeleton-line" style={{ height:24, width:60, borderRadius:20 }}/>)}
              </div>
              <div className="jf-skeleton-line" style={{ height:38, borderRadius:10 }}/>
            </div>
          ))}

          {/* Job Cards */}
          {!loading && jobs.map((job, i) => (
            <div key={job._id} className="jf-job-card" style={{ animationDelay:`${i*0.07}s` }}>
              <div>
                {/* title + deadline */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <h2 style={{ color:"white", fontSize:17, fontWeight:700, fontFamily:"'Playfair Display', serif", lineHeight:1.3, flex:1, marginRight:10 }}>
                    {job.title}
                  </h2>
                  <span style={{ padding:"3px 10px", borderRadius:20, background:"rgba(6,182,212,0.08)", border:"1px solid rgba(6,182,212,0.2)", color:"rgba(6,182,212,0.8)", fontSize:9, letterSpacing:"0.12em", fontFamily:"'DM Mono', monospace", whiteSpace:"nowrap", textTransform:"uppercase" }}>
                    DL: {new Date(job.deadline).toLocaleDateString()}
                  </span>
                </div>

                {/* company + role */}
                <p style={{ color:"rgba(255,255,255,0.4)", fontSize:12, fontFamily:"'DM Mono', monospace", marginBottom:14, letterSpacing:"0.04em" }}>
                  <span style={{ color:"rgba(167,139,250,0.7)" }}>{job.company}</span>
                  <span style={{ color:"rgba(255,255,255,0.2)", margin:"0 6px" }}>•</span>
                  {job.role}
                </p>

                {/* skills */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8 }}>
                  {job.skills?.slice(0, 4).map((skill, idx) => (
                    <span key={idx} style={{ padding:"4px 10px", borderRadius:20, background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.25)", color:"rgba(167,139,250,0.8)", fontSize:10, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>
                      {skill}
                    </span>
                  ))}
                  {job.skills?.length > 4 && (
                    <span style={{ padding:"4px 10px", borderRadius:20, background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.25)", fontSize:10, fontFamily:"'DM Mono', monospace" }}>
                      +{job.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <Link to={`/jobs/${job._id}`} className="jf-view-btn">
                View Details →
              </Link>
            </div>
          ))}

          {/* Empty */}
          {!loading && jobs.length === 0 && (
            <div className="jf-animated-border" style={{
              gridColumn:"1 / -1", margin:"20px auto", maxWidth:400,
              padding:"52px 56px", borderRadius:24, textAlign:"center",
              background:"rgba(255,255,255,0.03)", backdropFilter:"blur(40px)",
              boxShadow:"0 40px 100px rgba(0,0,0,0.7)",
              display:"flex", flexDirection:"column", alignItems:"center", gap:20,
            }}>
              <div style={{ width:68, height:68, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, rgba(232,121,249,0.2), rgba(124,58,237,0.1))", border:"1px solid rgba(232,121,249,0.25)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 60px rgba(232,121,249,0.2)", animation:"iconFloat 4s ease-in-out infinite" }}>
                <span style={{ fontSize:28 }}>🏢</span>
              </div>
              <div>
                <h2 className="jf-grad-title" style={{ fontFamily:"'Playfair Display', serif", fontSize:24, fontWeight:900, marginBottom:8 }}>No jobs found.</h2>
                <p style={{ color:"rgba(255,255,255,0.3)", fontSize:12, fontFamily:"'DM Mono', monospace" }}>No active jobs found for these filters.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsFeed;
