// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../../utils/const";

// const AdminUserProfile = () => {
//     const { id } = useParams();
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState("posts");

//     useEffect(() => {
//         fetchUserDetails();
//     }, [id]);

//     const fetchUserDetails = async () => {
//         try {
//             const res = await axios.get(`${BASE_URL}/admin/users/${id}`, {
//                 withCredentials: true,
//             });
//             setData(res.data);
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

//     if (!data?.user) {
//         return (
//             <div className="text-center py-20 animate-fade-in">
//                 <h2 className="text-2xl font-bold text-base-content/50">User not found</h2>
//                 <Link to="/admin/users" className="btn btn-outline mt-4">Return to Users</Link>
//             </div>
//         );
//     }

//     const { user, posts, projects } = data;

//     return (
//         <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">

//             {/* Profile Header (Instagram Style) */}
//             <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 border-b border-base-content/10 pb-8">

//                 {/* Avatar */}
//                 <div className="avatar">
//                     <div className="w-32 md:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-xl">
//                         <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstname}`} alt="avatar" />
//                     </div>
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1 text-center md:text-left space-y-4 w-full">
//                     <div className="flex flex-col md:flex-row items-center gap-4">
//                         <h1 className="text-2xl md:text-3xl font-light">{user.firstname} {user.lastname}</h1>
//                         <div className="flex gap-2">
//                             <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>{user.role}</span>
//                             <span className={`badge ${user.status === 'inactive' ? 'badge-error' : 'badge-success'}`}>{user.status}</span>
//                         </div>
//                     </div>

//                     {/* Stats Bar */}
//                     <div className="flex justify-center md:justify-start gap-8 font-medium">
//                         <div className="flex gap-1.5"><strong className="text-xl">{posts.length}</strong> <span className="text-base-content/70">posts</span></div>
//                         <div className="flex gap-1.5"><strong className="text-xl">{projects.length}</strong> <span className="text-base-content/70">projects</span></div>
//                         <div className="flex gap-1.5"><strong className="text-xl">{user.skills?.length || 0}</strong> <span className="text-base-content/70">skills</span></div>
//                     </div>

//                     <div className="space-y-1 text-sm pt-2">
//                         <p className="font-semibold text-base">{user.email}</p>
//                         {user.about && <p className="whitespace-pre-wrap">{user.about}</p>}
//                     </div>
//                 </div>
//             </div>

//             {/* Tabs Menu */}
//             <div className="flex justify-center border-t border-base-content/10 -mt-8 pt-4">
//                 <div className="flex gap-12 font-semibold text-sm tracking-widest uppercase">
//                     <button
//                         className={`flex items-center gap-2 pb-4 border-t-2 transition-colors ${activeTab === 'posts' ? 'border-primary text-primary' : 'border-transparent text-base-content/50 hover:text-base-content'}`}
//                         onClick={() => setActiveTab('posts')}
//                     >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
//                         Posts
//                     </button>
//                     <button
//                         className={`flex items-center gap-2 pb-4 border-t-2 transition-colors ${activeTab === 'projects' ? 'border-primary text-primary' : 'border-transparent text-base-content/50 hover:text-base-content'}`}
//                         onClick={() => setActiveTab('projects')}
//                     >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
//                         Projects
//                     </button>
//                 </div>
//             </div>

//             {/* Tab Content */}
//             <div className="mt-8 transition-opacity duration-300">

//                 {/* POSTS GRID */}
//                 {activeTab === 'posts' && (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
//                         {posts.length === 0 ? (
//                             <div className="col-span-full text-center py-20 text-base-content/40 font-medium">
//                                 No posts available.
//                             </div>
//                         ) : (
//                             posts.map((post) => (
//                                 <div key={post._id} className="group relative aspect-square bg-base-200 overflow-hidden cursor-pointer rounded-xl md:rounded-lg">
//                                     {post.imgURL ? (
//                                         <img src={post.imgURL} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                                     ) : (
//                                         <div className="w-full h-full flex items-center justify-center p-6 text-center bg-gradient-to-br from-base-200 to-base-300 group-hover:scale-105 transition-transform duration-500">
//                                             <p className="font-semibold text-sm md:text-md opacity-70 line-clamp-3">{post.title}</p>
//                                         </div>
//                                     )}
//                                     {/* Overlay */}
//                                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white backdrop-blur-sm">
//                                         <div className="flex items-center gap-2 font-bold text-lg">
//                                             ❤️ {post.likes?.length || 0}
//                                         </div>
//                                         <div className="flex items-center gap-2 font-bold text-lg">
//                                             💬 {post.comments?.length || 0}
//                                         </div>
//                                     </div>
//                                     {/* Status Badge */}
//                                     <div className="absolute top-2 right-2">
//                                         <span className={`badge badge-sm border-none shadow-lg ${post.status === 'approved' ? 'badge-success' : post.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
//                                             {post.status}
//                                         </span>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 )}

//                 {/* PROJECTS GRID */}
//                 {activeTab === 'projects' && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                         {projects.length === 0 ? (
//                             <div className="col-span-full text-center py-20 text-base-content/40 font-medium">
//                                 No projects available.
//                             </div>
//                         ) : (
//                             projects.map((project) => (
//                                 <Link to={`/admin/projects/${project._id}`} key={project._id} className="card bg-base-100 hover:bg-base-200/50 border border-base-content/10 shadow-sm hover:shadow-md transition-all group">
//                                     <div className="card-body p-6">
//                                         <h3 className="card-title text-primary group-hover:text-primary-focus transition-colors flex items-center gap-2">
//                                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
//                                             {project.header}
//                                         </h3>
//                                         <p className="text-sm text-base-content/70 line-clamp-2 mt-2">
//                                             {project.description}
//                                         </p>
//                                         <div className="flex flex-wrap gap-2 mt-4">
//                                             {project.techStack?.slice(0, 3).map(t => (
//                                                 <span key={t} className="badge badge-outline badge-sm border-base-content/20">{t}</span>
//                                             ))}
//                                             {project.techStack?.length > 3 && (
//                                                 <span className="badge badge-outline badge-sm border-base-content/20">+{project.techStack.length - 3}</span>
//                                             )}
//                                         </div>
//                                         <div className="card-actions justify-end mt-4 pt-4 border-t border-base-content/10">
//                                             <div className="text-xs font-mono text-base-content/50">
//                                                 Updated {new Date(project.updatedAt).toLocaleDateString()}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             ))
//                         )}
//                     </div>
//                 )}

//             </div>

//         </div>
//     );
// };

// export default AdminUserProfile;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

const AdminUserProfile = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("posts");

    useEffect(() => {
        fetchUserDetails();
    }, [id]);

    const fetchUserDetails = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/users/${id}`, {
                withCredentials: true,
            });
            setData(res.data);
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

    if (!data?.user) {
        return (
            <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
                <style>{styles}</style>
                <AuroraBg />
                <div className="text-center py-20 animate-fade-in relative z-10 h-full min-h-screen flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold text-white/50">User not found</h2>
                    <Link to="/admin/users" className="btn btn-outline text-white mt-4 hover:bg-white/10">Return to Users</Link>
                </div>
            </div>
        );
    }

    const { user, posts, projects } = data;

    return (
        <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
            <style>{styles}</style>
            <AuroraBg />
            
            <div style={{ position:"relative", zIndex:5, padding:"24px" }} className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">

                {/* Profile Header (Instagram Style) */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 border-b border-white/10 pb-8">

                    {/* Avatar */}
                    <div className="avatar">
                        <div className="w-32 md:w-40 rounded-full ring ring-primary ring-offset-[#030308] ring-offset-4 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                            <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstname}`} alt="avatar" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left space-y-4 w-full">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <h1 className="text-2xl md:text-3xl font-light text-white">{user.firstname} {user.lastname}</h1>
                            <div className="flex gap-2">
                                <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost bg-white/10 text-white border-white/20'}`}>{user.role}</span>
                                <span className={`badge ${user.status === 'inactive' ? 'badge-error' : 'badge-success'}`}>{user.status}</span>
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="flex justify-center md:justify-start gap-8 font-medium text-white">
                            <div className="flex gap-1.5"><strong className="text-xl">{posts.length}</strong> <span className="text-white/60">posts</span></div>
                            <div className="flex gap-1.5"><strong className="text-xl">{projects.length}</strong> <span className="text-white/60">projects</span></div>
                            <div className="flex gap-1.5"><strong className="text-xl">{user.skills?.length || 0}</strong> <span className="text-white/60">skills</span></div>
                        </div>

                        <div className="space-y-1 text-sm pt-2 text-white/80">
                            <p className="font-semibold text-base text-white">{user.email}</p>
                            {user.about && <p className="whitespace-pre-wrap leading-relaxed text-white/70">{user.about}</p>}
                        </div>
                    </div>
                </div>

                {/* Tabs Menu */}
                <div className="flex justify-center border-t border-white/10 -mt-8 pt-4">
                    <div className="flex gap-12 font-semibold text-sm tracking-widest uppercase">
                        <button
                            className={`flex items-center gap-2 pb-4 border-t-2 transition-colors ${activeTab === 'posts' ? 'border-primary text-primary' : 'border-transparent text-white/50 hover:text-white'}`}
                            onClick={() => setActiveTab('posts')}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                            Posts
                        </button>
                        <button
                            className={`flex items-center gap-2 pb-4 border-t-2 transition-colors ${activeTab === 'projects' ? 'border-primary text-primary' : 'border-transparent text-white/50 hover:text-white'}`}
                            onClick={() => setActiveTab('projects')}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            Projects
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="mt-8 transition-opacity duration-300">

                    {/* POSTS GRID */}
                    {activeTab === 'posts' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                            {posts.length === 0 ? (
                                <div className="col-span-full text-center py-20 text-white/40 font-medium">
                                    No posts available.
                                </div>
                            ) : (
                                posts.map((post) => (
                                    <div key={post._id} className="group relative aspect-square bg-white/5 overflow-hidden cursor-pointer rounded-xl md:rounded-lg border border-white/10">
                                        {post.imgURL ? (
                                            <img src={post.imgURL} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center p-6 text-center bg-gradient-to-br from-white/5 to-white/10 group-hover:scale-105 transition-transform duration-500">
                                                <p className="font-semibold text-sm md:text-md text-white/70 line-clamp-3">{post.title}</p>
                                            </div>
                                        )}
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white backdrop-blur-sm">
                                            <div className="flex items-center gap-2 font-bold text-lg">
                                                ❤️ {post.likes?.length || 0}
                                            </div>
                                            <div className="flex items-center gap-2 font-bold text-lg">
                                                💬 {post.comments?.length || 0}
                                            </div>
                                        </div>
                                        {/* Status Badge */}
                                        <div className="absolute top-2 right-2">
                                            <span className={`badge badge-sm border-none shadow-lg ${post.status === 'approved' ? 'badge-success' : post.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
                                                {post.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* PROJECTS GRID */}
                    {activeTab === 'projects' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {projects.length === 0 ? (
                                <div className="col-span-full text-center py-20 text-white/40 font-medium">
                                    No projects available.
                                </div>
                            ) : (
                                projects.map((project) => (
                                    <Link to={`/admin/projects/${project._id}`} key={project._id} className="card bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 shadow-sm hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)] transition-all group">
                                        <div className="card-body p-6">
                                            <h3 className="card-title text-primary group-hover:text-primary-focus transition-colors flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                                                {project.header}
                                            </h3>
                                            <p className="text-sm text-white/70 line-clamp-2 mt-2">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {project.techStack?.slice(0, 3).map(t => (
                                                    <span key={t} className="badge badge-outline badge-sm text-white/80 border-white/20">{t}</span>
                                                ))}
                                                {project.techStack?.length > 3 && (
                                                    <span className="badge badge-outline badge-sm text-white/80 border-white/20">+{project.techStack.length - 3}</span>
                                                )}
                                            </div>
                                            <div className="card-actions justify-end mt-4 pt-4 border-t border-white/10">
                                                <div className="text-xs font-mono text-white/50">
                                                    Updated {new Date(project.updatedAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default AdminUserProfile;