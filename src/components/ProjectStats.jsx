// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { Link } from "react-router-dom";

// // function ProjectStats() {
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const fetchStats = async () => {
// //     try {
// //       const res = await axios.get(`${BASE_URL}/project/stats/my`, {
// //         withCredentials: true,
// //       });
// //       setStats(res.data);
// //     } catch (error) {
// //       console.log(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchStats();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="text-2xl text-blue-400">Loading stats...</div>
// //       </div>
// //     );
// //   }

// //   if (!stats) {
// //     return (
// //       <div className="max-w-4xl mx-auto px-4 py-8 text-center">
// //         <p className="text-2xl text-gray-400">No statistics available</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-5xl mx-auto px-4 py-8">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-4xl font-bold text-blue-400">📊 Project Statistics</h1>
// //         <Link
// //           to="/projects/my"
// //           className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
// //         >
// //           View My Projects
// //         </Link>
// //       </div>

// //       {/* Overview Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //         <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-white">
// //           <div className="text-5xl mb-2">📂</div>
// //           <div className="text-4xl font-bold mb-2">{stats.totalProjects}</div>
// //           <div className="text-blue-100">Total Projects</div>
// //         </div>

// //         <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 text-white">
// //           <div className="text-5xl mb-2">🌍</div>
// //           <div className="text-4xl font-bold mb-2">{stats.publicProjects}</div>
// //           <div className="text-green-100">Public Projects</div>
// //         </div>

// //         <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg p-6 text-white">
// //           <div className="text-5xl mb-2">🔒</div>
// //           <div className="text-4xl font-bold mb-2">{stats.privateProjects}</div>
// //           <div className="text-gray-100">Private Projects</div>
// //         </div>
// //       </div>

// //       {/* Tech Stack Statistics */}
// //       <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
// //         <h2 className="text-2xl font-bold text-blue-400 mb-6">
// //           🛠️ Most Used Technologies
// //         </h2>

// //         {stats.techStackStats && stats.techStackStats.length > 0 ? (
// //           <div className="space-y-4">
// //             {stats.techStackStats.map((tech, index) => (
// //               <div key={index} className="flex items-center gap-4">
// //                 <div className="w-8 text-center font-bold text-blue-400">
// //                   #{index + 1}
// //                 </div>
// //                 <div className="flex-1">
// //                   <div className="flex justify-between items-center mb-2">
// //                     <span className="text-white font-semibold text-lg">
// //                       {tech._id}
// //                     </span>
// //                     <span className="text-gray-400">
// //                       {tech.count} {tech.count === 1 ? "project" : "projects"}
// //                     </span>
// //                   </div>
// //                   <div className="w-full bg-gray-700 rounded-full h-3">
// //                     <div
// //                       className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
// //                       style={{
// //                         width: `${
// //                           (tech.count / stats.techStackStats[0].count) * 100
// //                         }%`,
// //                       }}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p className="text-gray-400 text-center py-8">
// //             No technology data available. Add tech stacks to your projects!
// //           </p>
// //         )}
// //       </div>

// //       {/* Quick Actions */}
// //       <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
// //         <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
// //         <div className="flex flex-wrap gap-4">
// //           <Link
// //             to="/projects/create"
// //             className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
// //           >
// //             ➕ Create New Project
// //           </Link>
// //           <Link
// //             to="/projects/my"
// //             className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition font-semibold"
// //           >
// //             📂 View All Projects
// //           </Link>
// //           <Link
// //             to="/projects"
// //             className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition font-semibold"
// //           >
// //             🌍 Browse Projects Feed
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProjectStats;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { Link } from "react-router-dom";

// /* ---------- Aurora Styles ---------- */
// const styles = `
// @keyframes aurora1 {
// 0%{transform:translate(0,0)}50%{transform:translate(10%,-10%)}100%{transform:translate(0,0)}
// }
// @keyframes aurora2 {
// 0%{transform:translate(0,0)}50%{transform:translate(-12%,10%)}100%{transform:translate(0,0)}
// }
// @keyframes twinkle {
// 0%,100%{opacity:0.2}50%{opacity:1}
// }
// .cn-grad-title{
// background:linear-gradient(135deg,#e879f9,#a78bfa,#38bdf8,#818cf8,#f0abfc);
// background-size:300% 300%;
// -webkit-background-clip:text;
// -webkit-text-fill-color:transparent;
// animation:aurora1 6s ease infinite;
// }
// `;

// /* ---------- Aurora Background ---------- */
// const AuroraBg = () => (
// <div style={{position:"absolute",inset:0,overflow:"hidden",zIndex:0}}>
// <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at top,#0d0520,#030308)"}}/>

// <div style={{
// position:"absolute",
// top:"-20%",
// left:"-10%",
// width:"70%",
// height:"70%",
// background:"radial-gradient(circle,rgba(124,58,237,0.45),transparent 70%)",
// filter:"blur(80px)",
// animation:"aurora1 18s ease-in-out infinite"
// }}/>

// <div style={{
// position:"absolute",
// top:"10%",
// right:"-10%",
// width:"60%",
// height:"60%",
// background:"radial-gradient(circle,rgba(6,182,212,0.35),transparent 70%)",
// filter:"blur(80px)",
// animation:"aurora2 22s ease-in-out infinite"
// }}/>

// {[...Array(40)].map((_,i)=>(
// <div key={i}
// style={{
// position:"absolute",
// left:`${Math.random()*100}%`,
// top:`${Math.random()*100}%`,
// width:2,
// height:2,
// borderRadius:"50%",
// background:"white",
// animation:`twinkle ${2+Math.random()*3}s infinite`
// }}
// />
// ))}
// </div>
// );

// /* ---------- Component ---------- */
// function ProjectStats() {

// const [stats, setStats] = useState(null);
// const [loading, setLoading] = useState(true);

// const fetchStats = async () => {
// try {
// const res = await axios.get(`${BASE_URL}/project/stats/my`, {
// withCredentials: true,
// });
// setStats(res.data);
// } catch (error) {
// console.log(error);
// } finally {
// setLoading(false);
// }
// };

// useEffect(() => {
// fetchStats();
// }, []);

// if (loading) {
// return (
// <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#030308"}}>
// <style>{styles}</style>
// <AuroraBg/>
// <div className="text-2xl text-blue-400 z-10">Loading stats...</div>
// </div>
// );
// }

// if (!stats) {
// return (
// <div style={{minHeight:"100vh",background:"#030308",position:"relative"}}>
// <style>{styles}</style>
// <AuroraBg/>
// <div className="max-w-4xl mx-auto px-4 py-8 text-center relative z-10">
// <p className="text-2xl text-gray-400">No statistics available</p>
// </div>
// </div>
// );
// }

// return (
// <div style={{minHeight:"100vh",background:"#030308",position:"relative"}}>
// <style>{styles}</style>
// <AuroraBg/>

// <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">

// <div className="flex justify-between items-center mb-8">
// <h1 className="text-4xl font-bold cn-grad-title">📊 Project Statistics</h1>

// <Link
// to="/projects/my"
// className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
// >
// View My Projects
// </Link>
// </div>

// {/* Overview Cards */}
// <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

// <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-white">
// <div className="text-5xl mb-2">📂</div>
// <div className="text-4xl font-bold mb-2">{stats.totalProjects}</div>
// <div className="text-blue-100">Total Projects</div>
// </div>

// <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 text-white">
// <div className="text-5xl mb-2">🌍</div>
// <div className="text-4xl font-bold mb-2">{stats.publicProjects}</div>
// <div className="text-green-100">Public Projects</div>
// </div>

// <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg p-6 text-white">
// <div className="text-5xl mb-2">🔒</div>
// <div className="text-4xl font-bold mb-2">{stats.privateProjects}</div>
// <div className="text-gray-100">Private Projects</div>
// </div>

// </div>

// {/* Tech Stack Stats */}
// <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">

// <h2 className="text-2xl font-bold text-blue-400 mb-6">
// 🛠️ Most Used Technologies
// </h2>

// {stats.techStackStats && stats.techStackStats.length > 0 ? (

// <div className="space-y-4">

// {stats.techStackStats.map((tech,index)=>(

// <div key={index} className="flex items-center gap-4">

// <div className="w-8 text-center font-bold text-blue-400">
// #{index+1}
// </div>

// <div className="flex-1">

// <div className="flex justify-between items-center mb-2">
// <span className="text-white font-semibold text-lg">
// {tech._id}
// </span>

// <span className="text-gray-400">
// {tech.count} {tech.count===1?"project":"projects"}
// </span>
// </div>

// <div className="w-full bg-gray-700 rounded-full h-3">
// <div
// className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
// style={{
// width:`${(tech.count / stats.techStackStats[0].count) * 100}%`}}/>
// </div>
// </div>
// </div>
// ))}
// </div>
// ) : (
// <p className="text-gray-400 text-center py-8">No technology data available. Add tech stacks to your projects!</p>)}
// </div>
// {/* Quick Actions */}
// <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
// <h3 className="text-xl font-bold text-white mb-4">
// Quick Actions
// </h3>
// <div className="flex flex-wrap gap-4">
// <Link to="/projects/create" className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold">
// ➕ Create New Project
// </Link>
// <Link to="/projects/my" className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition font-semibold">
// 📂 View All Projects
// </Link>
// <Link to="/projects" className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition font-semibold">
// 🌍 Browse Projects Feed
// </Link>

// </div>
// </div>

// </div>
// </div>
// );
// }

// export default ProjectStats;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { Link } from "react-router-dom";

/* ---------- Fonts + Styles ---------- */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono:wght@400;500&display=swap');

.cn-title{
font-family:'Playfair Display',serif;
font-weight:900;
letter-spacing:0.02em;
}

.cn-label{
font-family:'DM Mono',monospace;
font-size:11px;
letter-spacing:0.15em;
text-transform:uppercase;
opacity:0.7;
}

.cn-card{
background:rgba(255,255,255,0.04);
backdrop-filter:blur(20px);
border:1px solid rgba(124,58,237,0.25);
border-radius:18px;
box-shadow:0 20px 60px rgba(124,58,237,0.2);
padding:28px;
}

.cn-glow{
background:linear-gradient(135deg,#7c3aed,#06b6d4);
color:white;
}

.cn-btn-gradient{
padding:12px 26px;
border-radius:12px;
font-family:'DM Mono',monospace;
font-size:12px;
letter-spacing:0.12em;
text-transform:uppercase;
background:linear-gradient(135deg,#7c3aed,#06b6d4);
color:white;
border:none;
cursor:pointer;
box-shadow:0 0 20px rgba(124,58,237,0.35);
transition:all 0.2s ease;
}

.cn-btn-gradient:hover{
transform:translateY(-2px);
box-shadow:0 0 35px rgba(124,58,237,0.55);
}

.cn-btn-gradient:active{
transform:scale(0.97);
}

@keyframes aurora1 {
0%{transform:translate(0,0)}50%{transform:translate(10%,-10%)}100%{transform:translate(0,0)}
}
@keyframes aurora2 {
0%{transform:translate(0,0)}50%{transform:translate(-12%,10%)}100%{transform:translate(0,0)}
}
@keyframes twinkle {
0%,100%{opacity:0.2}50%{opacity:1}
}
`;

/* ---------- Aurora Background ---------- */
const AuroraBg = () => (
<div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>

<div style={{
position:"absolute",
inset:0,
background:"radial-gradient(ellipse at top,#0d0520,#030308)"
}}/>

<div style={{
position:"absolute",
top:"-20%",
left:"-10%",
width:"70%",
height:"70%",
background:"radial-gradient(circle,rgba(124,58,237,0.45),transparent 70%)",
filter:"blur(80px)",
animation:"aurora1 18s ease-in-out infinite"
}}/>

<div style={{
position:"absolute",
top:"10%",
right:"-10%",
width:"60%",
height:"60%",
background:"radial-gradient(circle,rgba(6,182,212,0.35),transparent 70%)",
filter:"blur(80px)",
animation:"aurora2 22s ease-in-out infinite"
}}/>

{[...Array(40)].map((_,i)=>(
<div
key={i}
style={{
position:"absolute",
left:`${Math.random()*100}%`,
top:`${Math.random()*100}%`,
width:2,
height:2,
borderRadius:"50%",
background:"white",
animation:`twinkle ${2+Math.random()*3}s infinite`
}}
/>
))}

</div>
);

/* ---------- Component ---------- */

function ProjectStats() {

const [stats, setStats] = useState(null);
const [loading, setLoading] = useState(true);

const fetchStats = async () => {
try {

const res = await axios.get(`${BASE_URL}/project/stats/my`, {
withCredentials:true
});

setStats(res.data);

}
catch(error){
console.log(error);
}
finally{
setLoading(false);
}
};

useEffect(()=>{
fetchStats();
},[]);

if(loading){
return(
<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#030308"}}>
<style>{styles}</style>
<AuroraBg/>
<div className="text-blue-400 text-xl">Loading stats...</div>
</div>
);
}

return(
<div style={{minHeight:"100vh",background:"#030308",position:"relative"}}>
<style>{styles}</style>
<AuroraBg/>

<div className="max-w-5xl mx-auto px-4 py-10 relative z-10">

{/* Header */}
<div className="flex justify-between items-center mb-10">

<h1 className="cn-title text-4xl text-purple-300">
📊 Project Statistics
</h1>

<Link
to="/projects/my"
className="px-6 py-3 rounded-lg font-semibold text-white"
style={{background:"linear-gradient(135deg,#7c3aed,#06b6d4)"}}
>
View My Projects
</Link>

</div>

{/* Stat Cards */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

<div className="cn-card">

<div className="text-4xl mb-3">📂</div>

<div className="text-4xl font-bold text-white">
{stats?.totalProjects || 0}
</div>

<div className="cn-label text-purple-300 mt-2">
Total Projects
</div>

</div>

<div className="cn-card">

<div className="text-4xl mb-3">🌍</div>

<div className="text-4xl font-bold text-white">
{stats?.publicProjects || 0}
</div>

<div className="cn-label text-green-300 mt-2">
Public Projects
</div>

</div>

<div className="cn-card">

<div className="text-4xl mb-3">🔒</div>

<div className="text-4xl font-bold text-white">
{stats?.privateProjects || 0}
</div>

<div className="cn-label text-gray-300 mt-2">
Private Projects
</div>

</div>

</div>

{/* Tech Stack */}

<div className="cn-card mb-10">

<h2 className="cn-title text-2xl text-blue-300 mb-6">
🛠️ Most Used Technologies
</h2>

{stats?.techStackStats?.length>0?

<div className="space-y-4">

{stats.techStackStats.map((tech,index)=>(

<div key={index}>

<div className="flex justify-between mb-2">

<span className="text-white font-semibold">
{tech._id}
</span>

<span className="text-gray-400">
{tech.count}
</span>

</div>

<div className="w-full bg-gray-700 rounded-full h-3">

<div
className="h-3 rounded-full cn-glow"
style={{
width:`${(tech.count/stats.techStackStats[0].count)*100}%`
}}
/>

</div>

</div>

))}

</div>

:

<p className="text-gray-400 text-center py-8">
No technology data available. Add tech stacks to your projects!
</p>

}

</div>

{/* Quick Actions */}

<div className="cn-card">

<h3 className="cn-title text-xl text-white mb-4">
Quick Actions
</h3>

<div className="flex flex-wrap gap-4">
  
<Link to="/projects/create">
<button className="cn-btn-gradient">
➕ Create New Project
</button>
</Link>

<Link to="/projects/my">
<button className="cn-btn-gradient">
📂 View All Projects
</button>
</Link>

<Link to="/projects">
<button className="cn-btn-gradient">
🌍 Browse Projects Feed
</button>
</Link>

</div>

</div>

</div>
</div>
);
}

export default ProjectStats;