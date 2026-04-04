// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../utils/const";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//     const [stats, setStats] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchStats();
//     }, []);

//     const fetchStats = async () => {
//         try {
//             const res = await axios.get(`${BASE_URL}/admin/stats`, { withCredentials: true });
//             setStats(res.data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-full">
//                 <span className="loading loading-ring loading-lg text-primary"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-8 animate-fade-in">
//             {/* Stats Overview Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//                 {/* Total Users Card */}
//                 <div className="card bg-base-100 shadow-xl border border-base-content/5 hover:scale-[1.02] transition-transform">
//                     <div className="card-body p-6 flex flex-row items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-base-content/60 uppercase tracking-widest">Total Users</p>
//                             <h2 className="text-4xl font-black mt-2 text-primary">{stats?.totalUsers || 0}</h2>
//                         </div>
//                         <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl">
//                             👥
//                         </div>
//                     </div>
//                 </div>

//                 {/* Total Posts Card */}
//                 <div className="card bg-base-100 shadow-xl border border-base-content/5 hover:scale-[1.02] transition-transform">
//                     <div className="card-body p-6 flex flex-row items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-base-content/60 uppercase tracking-widest">Total Posts</p>
//                             <h2 className="text-4xl font-black mt-2 text-secondary">{stats?.totalPosts || 0}</h2>
//                         </div>
//                         <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-3xl">
//                             📝
//                         </div>
//                     </div>
//                 </div>

//                 {/* Total Projects Card */}
//                 <div className="card bg-base-100 shadow-xl border border-base-content/5 hover:scale-[1.02] transition-transform">
//                     <div className="card-body p-6 flex flex-row items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-base-content/60 uppercase tracking-widest">Total Projects</p>
//                             <h2 className="text-4xl font-black mt-2 text-accent">{stats?.totalProjects || 0}</h2>
//                         </div>
//                         <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-3xl">
//                             🚀
//                         </div>
//                     </div>
//                 </div>

//                 {/* System Health Card */}
//                 <div className="card bg-base-100 shadow-xl border border-base-content/5 hover:scale-[1.02] transition-transform">
//                     <div className="card-body p-6 flex flex-row items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-base-content/60 uppercase tracking-widest">System Status</p>
//                             <h2 className="text-2xl font-bold mt-2 text-success flex items-center gap-2">
//                                 <span className="w-3 h-3 rounded-full bg-success animate-pulse"></span>
//                                 Healthy
//                             </h2>
//                         </div>
//                         <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center text-3xl">
//                             ⚙️
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
//                 {/* Recent Users */}
//                 <div className="card bg-base-100/60 backdrop-blur border border-base-content/10 shadow-xl w-full">
//                     <div className="card-body p-6">
//                         <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                             <span className="text-primary">✨</span> Newest Members
//                         </h3>

//                         <div className="space-y-4">
//                             {stats?.recentUsers?.map((u) => (
//                                 <div key={u._id} className="flex items-center gap-4 p-3 hover:bg-base-200/50 rounded-xl transition-colors">
//                                     <div className="avatar">
//                                         <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                                             <img src={u.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + u.firstname} alt="avatar" />
//                                         </div>
//                                     </div>
//                                     <div className="flex-1">
//                                         <Link to={`/admin/users/${u._id}`} className="font-semibold hover:text-primary transition-colors">
//                                             {u.firstname} {u.lastname}
//                                         </Link>
//                                         <p className="text-xs text-base-content/60">{u.email}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                             {!stats?.recentUsers?.length && (
//                                 <p className="text-base-content/50 italic py-4">No recent users found.</p>
//                             )}
//                         </div>
//                         <div className="mt-4 text-center">
//                             <Link to="/admin/users" className="btn btn-sm btn-ghost w-full">View All Users →</Link>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Recent Posts */}
//                 <div className="card bg-base-100/60 backdrop-blur border border-base-content/10 shadow-xl w-full">
//                     <div className="card-body p-6">
//                         <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                             <span className="text-secondary">🔥</span> Latest Posts Activity
//                         </h3>

//                         <div className="space-y-4">
//                             {stats?.recentPosts?.map((p) => (
//                                 <div key={p._id} className="flex items-start gap-4 p-3 hover:bg-base-200/50 rounded-xl transition-colors">
//                                     <div className="avatar mt-1">
//                                         <div className="w-10 rounded-lg">
//                                             <img src={p.userId?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + p.userId?.firstname} alt="avatar" />
//                                         </div>
//                                     </div>
//                                     <div className="flex-1 overflow-hidden">
//                                         <p className="font-semibold truncate">{p.title}</p>
//                                         <p className="text-xs text-base-content/60 truncate">By {p.userId?.firstname} {p.userId?.lastname}</p>
//                                     </div>
//                                     <div className={`badge ${p.status === 'approved' ? 'badge-success' : p.status === 'pending' ? 'badge-warning' : 'badge-error'} badge-sm`}>
//                                         {p.status}
//                                     </div>
//                                 </div>
//                             ))}
//                             {!stats?.recentPosts?.length && (
//                                 <p className="text-base-content/50 italic py-4">No recent posts found.</p>
//                             )}
//                         </div>
//                         <div className="mt-4 text-center">
//                             <Link to="/admin/posts" className="btn btn-sm btn-ghost w-full">Manage Posts →</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import { Link } from "react-router-dom";

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

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/stats`, { withCredentials: true });
            setStats(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
                <style>{styles}</style>
                <AuroraBg />
                <div className="flex justify-center items-center h-full min-h-screen relative z-10">
                    <span className="loading loading-ring loading-lg text-primary"></span>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
            <style>{styles}</style>
            <AuroraBg />
            
            <div style={{ position:"relative", zIndex:5, padding:"24px" }}>
                <div className="space-y-8 animate-fade-in">
                    
                    {/* Stats Overview Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Total Users Card */}
                        <div className="card bg-white/5 backdrop-blur-md shadow-xl border border-white/10 hover:scale-[1.02] hover:bg-white/10 transition-all duration-300">
                            <div className="card-body p-6 flex flex-row items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-white/60 uppercase tracking-widest">Total Users</p>
                                    <h2 className="text-4xl font-black mt-2 text-primary">{stats?.totalUsers || 0}</h2>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-3xl border border-primary/20 shadow-[inset_0_0_15px_rgba(124,58,237,0.1)]">
                                    👥
                                </div>
                            </div>
                        </div>

                        {/* Total Posts Card */}
                        <div className="card bg-white/5 backdrop-blur-md shadow-xl border border-white/10 hover:scale-[1.02] hover:bg-white/10 transition-all duration-300">
                            <div className="card-body p-6 flex flex-row items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-white/60 uppercase tracking-widest">Total Posts</p>
                                    <h2 className="text-4xl font-black mt-2 text-secondary">{stats?.totalPosts || 0}</h2>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary text-3xl border border-secondary/20 shadow-[inset_0_0_15px_rgba(236,72,153,0.1)]">
                                    📝
                                </div>
                            </div>
                        </div>

                        {/* Total Projects Card */}
                        <div className="card bg-white/5 backdrop-blur-md shadow-xl border border-white/10 hover:scale-[1.02] hover:bg-white/10 transition-all duration-300">
                            <div className="card-body p-6 flex flex-row items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-white/60 uppercase tracking-widest">Total Projects</p>
                                    <h2 className="text-4xl font-black mt-2 text-accent">{stats?.totalProjects || 0}</h2>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent text-3xl border border-accent/20 shadow-[inset_0_0_15px_rgba(6,182,212,0.1)]">
                                    🚀
                                </div>
                            </div>
                        </div>

                        {/* System Health Card */}
                        <div className="card bg-white/5 backdrop-blur-md shadow-xl border border-white/10 hover:scale-[1.02] hover:bg-white/10 transition-all duration-300">
                            <div className="card-body p-6 flex flex-row items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-white/60 uppercase tracking-widest">System Status</p>
                                    <h2 className="text-2xl font-bold mt-2 text-success flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-success animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]"></span>
                                        Healthy
                                    </h2>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl border border-white/10">
                                    ⚙️
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                        
                        {/* Recent Users */}
                        <div className="card bg-white/5 backdrop-blur-md shadow-2xl border border-white/10 w-full">
                            <div className="card-body p-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                                    <span className="text-primary">✨</span> Newest Members
                                </h3>

                                <div className="space-y-4">
                                    {stats?.recentUsers?.map((u) => (
                                        <div key={u._id} className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/10">
                                            <div className="avatar">
                                                <div className="w-12 rounded-full ring ring-primary/30 ring-offset-[#030308] ring-offset-2">
                                                    <img src={u.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + u.firstname} alt="avatar" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <Link to={`/admin/users/${u._id}`} className="font-semibold text-white hover:text-primary transition-colors">
                                                    {u.firstname} {u.lastname}
                                                </Link>
                                                <p className="text-xs text-white/60">{u.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {!stats?.recentUsers?.length && (
                                        <p className="text-white/50 italic py-4">No recent users found.</p>
                                    )}
                                </div>
                                <div className="mt-4 text-center border-t border-white/10 pt-4">
                                    <Link to="/admin/users" className="btn btn-sm btn-ghost w-full text-white/70 hover:text-white hover:bg-white/10 transition-colors">View All Users →</Link>
                                </div>
                            </div>
                        </div>

                        {/* Recent Posts */}
                        <div className="card bg-white/5 backdrop-blur-md shadow-2xl border border-white/10 w-full">
                            <div className="card-body p-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                                    <span className="text-secondary">🔥</span> Latest Posts Activity
                                </h3>

                                <div className="space-y-4">
                                    {stats?.recentPosts?.map((p) => (
                                        <div key={p._id} className="flex items-start gap-4 p-3 hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/10">
                                            <div className="avatar mt-1">
                                                <div className="w-10 rounded-lg ring ring-secondary/30 ring-offset-[#030308] ring-offset-1">
                                                    <img src={p.userId?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + p.userId?.firstname} alt="avatar" />
                                                </div>
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="font-semibold truncate text-white">{p.title}</p>
                                                <p className="text-xs text-white/60 truncate">By {p.userId?.firstname} {p.userId?.lastname}</p>
                                            </div>
                                            <div className={`badge badge-sm border-none shadow-sm ${
                                                p.status === 'approved' ? 'bg-green-500/20 text-green-400' : 
                                                p.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                                {p.status}
                                            </div>
                                        </div>
                                    ))}
                                    {!stats?.recentPosts?.length && (
                                        <p className="text-white/50 italic py-4">No recent posts found.</p>
                                    )}
                                </div>
                                <div className="mt-4 text-center border-t border-white/10 pt-4">
                                    <Link to="/admin/posts" className="btn btn-sm btn-ghost w-full text-white/70 hover:text-white hover:bg-white/10 transition-colors">Manage Posts →</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;