// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../utils/const";

// const ApplicationReview = () => {
//     const [applications, setApplications] = useState([]);
//    const [loadingId, setLoadingId] = useState(null);
//     const [error, setError] = useState("");

//     const fetchApplications = async () => {
//         try {
//             const res = await axios.get(`${BASE_URL}/admin/applications`, { withCredentials: true });
//             setApplications(res.data);
//         } catch (err) {
//             console.error(err);
//             setError("Failed to load applications");
//         }
//     };

//     useEffect(() => {
//         fetchApplications();
//     }, []);

//    const handleVerify = async (id) => {

//     setLoadingId(id);

//     try {

//         await axios.patch(
//             `${BASE_URL}/admin/applications/${id}/verify`,
//             {},
//             { withCredentials: true }
//         );

//         alert("Application verified and email sent");

//         fetchApplications();

//     } catch (err) {

//         alert("Failed to verify application");

//     } finally {

//         setLoadingId(null);

//     }
// };

//     return (
//         <div className="p-6 bg-gray-800 text-gray-200 min-h-screen rounded-md">
//             <h2 className="text-2xl font-bold mb-6 text-green-400">Application Review</h2>
//             {error && <p className="text-red-500">{error}</p>}

//             <div className="overflow-x-auto">
//                 <table className="w-full text-left text-sm text-gray-400">
//                     <thead className="text-xs text-gray-300 uppercase bg-gray-700">
//                         <tr>
//                             <th className="px-6 py-3">Applicant</th>
//                             <th className="px-6 py-3">Job / Role</th>
//                             <th className="px-6 py-3">Applied At</th>
//                             <th className="px-6 py-3">Status</th>
//                             <th className="px-6 py-3">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {applications.map((app) => (
//                             <tr key={app._id} className="border-b bg-gray-900 border-gray-700 hover:bg-gray-800 transition">
//                                 <td className="px-6 py-4 flex items-center gap-3">
//                                     <img src={app.userId?.photoURL || "https://via.placeholder.com/40"} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
//                                     <div>
//                                         <div className="font-semibold text-white">{app.userId?.firstname} {app.userId?.lastname}</div>
//                                         <div className="text-xs text-gray-500">{app.userId?.email}</div>
//                                     </div>
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <div className="text-white font-medium">{app.jobId?.title}</div>
//                                     <div className="text-xs text-gray-500">{app.jobId?.company} - {app.jobId?.role}</div>
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     {new Date(app.createdAt).toLocaleDateString()}
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <span className={`px-2 py-1 rounded text-xs font-bold ${app.status === 'verified' ? 'bg-green-900/50 text-green-400' :
//                                             app.status === 'rejected' ? 'bg-red-900/50 text-red-400' :
//                                                 'bg-yellow-900/50 text-yellow-500'
//                                         }`}>
//                                         {app.status.toUpperCase()}
//                                     </span>
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     {app.status === 'applied' && (
//                                       <button
// onClick={() => handleVerify(app._id)}
// disabled={loadingId === app._id}
// className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition disabled:opacity-50"
// >
// {loadingId === app._id ? "Verifying..." : "Verify & Email"}
// </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                         {applications.length === 0 && (
//                             <tr>
//                                 <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
//                                     No applications found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ApplicationReview;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";

const styles = `
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

const ApplicationReview = () => {
    const [applications, setApplications] = useState([]);
    const [loadingId, setLoadingId] = useState(null);
    const [error, setError] = useState("");

    const fetchApplications = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/applications`, { withCredentials: true });
            setApplications(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load applications");
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleVerify = async (id) => {
        setLoadingId(id);
        try {
            await axios.patch(
                `${BASE_URL}/admin/applications/${id}/verify`,
                {},
                { withCredentials: true }
            );
            alert("Application verified and email sent");
            fetchApplications();
        } catch (err) {
            alert("Failed to verify application");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
            <style>{styles}</style>
            <AuroraBg />

            <div className="p-6 relative z-10 min-h-screen">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Application Review</h2>
                {error && <p className="text-red-400 mb-4 bg-red-900/20 p-3 rounded-lg border border-red-500/20 inline-block">{error}</p>}

                <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
                    <table className="w-full text-left text-sm text-white/70">
                        <thead className="text-xs text-white/60 uppercase bg-white/10 border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 tracking-wider">Applicant</th>
                                <th className="px-6 py-4 tracking-wider">Job / Role</th>
                                <th className="px-6 py-4 tracking-wider">Applied At</th>
                                <th className="px-6 py-4 tracking-wider">Status</th>
                                <th className="px-6 py-4 tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app._id} className="border-b border-white/10 hover:bg-white/10 transition duration-200">
                                    <td className="px-6 py-4 flex items-center gap-4">
                                        <div className="avatar">
                                            <div className="w-10 h-10 rounded-full ring ring-primary/30 ring-offset-[#030308] ring-offset-2">
                                                <img src={app.userId?.photoURL || "https://via.placeholder.com/40"} alt="Avatar" className="object-cover" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">{app.userId?.firstname} {app.userId?.lastname}</div>
                                            <div className="text-xs text-white/50 mt-0.5">{app.userId?.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-white font-medium">{app.jobId?.title}</div>
                                        <div className="text-xs text-white/50 mt-0.5">{app.jobId?.company} - {app.jobId?.role}</div>
                                    </td>
                                    <td className="px-6 py-4 text-white/80">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded text-xs font-bold border ${
                                            app.status === 'verified' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            app.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                            'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                        }`}>
                                            {app.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {app.status === 'applied' && (
                                            <button
                                                onClick={() => handleVerify(app._id)}
                                                disabled={loadingId === app._id}
                                                className="bg-blue-600/80 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/30 backdrop-blur-sm"
                                            >
                                                {loadingId === app._id ? (
                                                    <span className="flex items-center gap-2">
                                                        <span className="loading loading-spinner loading-xs"></span> Verifying...
                                                    </span>
                                                ) : "Verify & Email"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-white/50 font-medium">
                                        No applications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ApplicationReview;