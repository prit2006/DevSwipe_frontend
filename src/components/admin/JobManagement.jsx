// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../utils/const";

// const JobManagement = () => {
//     const [jobs, setJobs] = useState([]);
//     const [formData, setFormData] = useState({
//         title: "",
//         company: "",
//         role: "",
//         skills: "",
//         description: "",
//         eligibility: "",
//         deadline: ""
//     });
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     const fetchJobs = async () => {
//         try {
//             const res = await axios.get(`${BASE_URL}/admin/jobs`, { withCredentials: true });
//             setJobs(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchJobs();
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handlePostJob = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");
//         try {
//             const payload = {
//                 ...formData,
//                 skills: formData.skills.split(",").map(s => s.trim()).filter(s => s)
//             };
//             await axios.post(`${BASE_URL}/admin/jobs`, payload, { withCredentials: true });
//             setSuccess("Job posted successfully!");
//             setFormData({ title: "", company: "", role: "", skills: "", description: "", eligibility: "", deadline: "" });
//             fetchJobs();
//         } catch (err) {
//             setError(err.response?.data || "Failed to post job");
//         }
//     };

//     const handleDeleteJob = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this job?")) return;
//         try {
//             await axios.delete(`${BASE_URL}/admin/jobs/${id}`, { withCredentials: true });
//             fetchJobs();
//         } catch (err) {
//             alert("Failed to delete job");
//         }
//     };

//     return (
//         <div className="p-6 bg-gray-800 text-gray-200 min-h-screen rounded-md">
//             <h2 className="text-2xl font-bold mb-6 text-green-400">Manage Jobs & Internships</h2>

//             {/* POST JOB FORM */}
//             <div className="bg-gray-900 p-6 rounded-lg mb-8 shadow-lg">
//                 <h3 className="text-xl font-semibold mb-4">Post a New Job</h3>
//                 {error && <p className="text-red-500 mb-2">{error}</p>}
//                 {success && <p className="text-green-500 mb-2">{success}</p>}
//                 <form onSubmit={handlePostJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white" />
//                     <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white" />
//                     <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role (e.g., Software Engineer)" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white" />
//                     <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white" />
//                     <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white md:col-span-2" rows="3"></textarea>
//                     <textarea name="eligibility" value={formData.eligibility} onChange={handleChange} placeholder="Eligibility Criteria" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white md:col-span-2" rows="2"></textarea>
//                     <div className="md:col-span-2">
//                         <label className="block text-gray-400 mb-1">Application Deadline</label>
//                         <input type="datetime-local" name="deadline" value={formData.deadline} onChange={handleChange} required className="p-3 bg-gray-800 border border-gray-700 rounded text-white w-full" />
//                     </div>
//                     <div className="md:col-span-2 flex justify-end">
//                         <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition">Post Job</button>
//                     </div>
//                 </form>
//             </div>

//             {/* JOB LIST */}
//             <div>
//                 <h3 className="text-xl font-semibold mb-4">Posted Jobs</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {jobs.map(job => (
//                         <div key={job._id} className="bg-gray-900 p-5 rounded-lg border border-gray-700 relative flex flex-col justify-between">
//                             <div>
//                                 <h4 className="text-lg font-bold text-white">{job.title}</h4>
//                                 <p className="text-sm text-gray-400 mb-2">{job.company} • {job.role}</p>
//                                 <p className="text-xs font-semibold text-blue-400 bg-blue-900/30 inline-block px-2 py-1 rounded mb-4">
//                                     Deadline: {new Date(job.deadline).toLocaleDateString()}
//                                 </p>
//                                 <div className="flex flex-wrap gap-2 mb-4">
//                                     {job.skills?.slice(0, 3).map((s, i) => (
//                                         <span key={i} className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">{s}</span>
//                                     ))}
//                                     {job.skills?.length > 3 && <span className="text-xs text-gray-500">+{job.skills.length - 3}</span>}
//                                 </div>
//                             </div>
//                             <button onClick={() => handleDeleteJob(job._id)} className="w-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white py-2 rounded transition mt-2">
//                                 Delete Job
//                             </button>
//                         </div>
//                     ))}
//                     {jobs.length === 0 && <p className="text-gray-400 col-span-full">No jobs posted yet.</p>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JobManagement;

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

const JobManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        role: "",
        skills: "",
        description: "",
        eligibility: "",
        deadline: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchJobs = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/jobs`, { withCredentials: true });
            setJobs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePostJob = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const payload = {
                ...formData,
                skills: formData.skills.split(",").map(s => s.trim()).filter(s => s)
            };
            await axios.post(`${BASE_URL}/admin/jobs`, payload, { withCredentials: true });
            setSuccess("Job posted successfully!");
            setFormData({ title: "", company: "", role: "", skills: "", description: "", eligibility: "", deadline: "" });
            fetchJobs();
        } catch (err) {
            setError(err.response?.data || "Failed to post job");
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await axios.delete(`${BASE_URL}/admin/jobs/${id}`, { withCredentials: true });
            fetchJobs();
        } catch (err) {
            alert("Failed to delete job");
        }
    };

    // Shared input styling for the glassmorphism form
    const inputClasses = "p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all";

    return (
        <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
            <style>{styles}</style>
            <AuroraBg />

            <div className="p-6 relative z-10 min-h-screen">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Manage Jobs & Internships</h2>

                {/* POST JOB FORM */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl mb-10 shadow-2xl">
                    <h3 className="text-xl font-semibold mb-6 text-white">Post a New Job</h3>
                    
                    {error && <p className="text-red-400 mb-4 bg-red-900/20 p-3 rounded-lg border border-red-500/20 inline-block">{error}</p>}
                    {success && <p className="text-green-400 mb-4 bg-green-900/20 p-3 rounded-lg border border-green-500/20 inline-block">{success}</p>}
                    
                    <form onSubmit={handlePostJob} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required className={inputClasses} />
                        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required className={inputClasses} />
                        <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role (e.g., Software Engineer)" required className={inputClasses} />
                        <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" required className={inputClasses} />
                        
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required className={`${inputClasses} md:col-span-2`} rows="3"></textarea>
                        <textarea name="eligibility" value={formData.eligibility} onChange={handleChange} placeholder="Eligibility Criteria" required className={`${inputClasses} md:col-span-2`} rows="2"></textarea>
                        
                        <div className="md:col-span-2">
                            <label className="block text-white/60 text-sm font-medium mb-2 ml-1">Application Deadline</label>
                            <input type="datetime-local" name="deadline" value={formData.deadline} onChange={handleChange} required className={`${inputClasses} w-full [color-scheme:dark]`} />
                        </div>
                        
                        <div className="md:col-span-2 flex justify-end mt-2">
                            <button type="submit" className="bg-green-600/80 hover:bg-green-500 border border-green-400/30 text-white font-bold py-2.5 px-8 rounded-lg transition-all shadow-lg backdrop-blur-sm">
                                Post Job
                            </button>
                        </div>
                    </form>
                </div>

                {/* JOB LIST */}
                <div>
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                        <span className="text-secondary">📋</span> Posted Jobs
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map(job => (
                            <div key={job._id} className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all relative flex flex-col justify-between group shadow-xl">
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{job.title}</h4>
                                    <p className="text-sm text-white/60 mb-4">{job.company} • {job.role}</p>
                                    
                                    <div className="mb-4">
                                        <p className="text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 inline-block px-2.5 py-1.5 rounded-md">
                                            ⏳ Deadline: {new Date(job.deadline).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {job.skills?.slice(0, 3).map((s, i) => (
                                            <span key={i} className="text-xs bg-black/30 border border-white/5 px-2.5 py-1 rounded-md text-white/80">{s}</span>
                                        ))}
                                        {job.skills?.length > 3 && <span className="text-xs text-white/40 flex items-center px-1">+{job.skills.length - 3}</span>}
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => handleDeleteJob(job._id)} 
                                    className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 py-2 rounded-lg transition-all mt-2 font-medium"
                                >
                                    Delete Job
                                </button>
                            </div>
                        ))}
                        
                        {jobs.length === 0 && (
                            <div className="col-span-full text-center py-12 border border-dashed border-white/20 rounded-xl bg-white/5">
                                <p className="text-white/50 font-medium">No jobs posted yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobManagement;