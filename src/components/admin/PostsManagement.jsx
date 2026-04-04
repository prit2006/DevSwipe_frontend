// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../utils/const";

// const PostsManagement = () => {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         fetchPosts();
//     }, []);

//     const fetchPosts = async () => {
//         try {
//             const res = await axios.get(`${BASE_URL}/admin/posts`, {
//                 withCredentials: true,
//             });
//             setPosts(res.data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const updateStatus = async (id, status) => {
//         try {
//             await axios.put(`${BASE_URL}/admin/posts/${id}/status`, { status }, { withCredentials: true });
//             fetchPosts(); // refresh
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Delete this post? This cannot be undone.")) {
//             try {
//                 await axios.delete(`${BASE_URL}/admin/posts/${id}`, { withCredentials: true });
//                 fetchPosts();
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     };

//     const filteredPosts = posts.filter((p) =>
//         p.title?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="animate-fade-in space-y-6">

//             {/* Header & Search */}
//             <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-content/5 flex flex-col sm:flex-row justify-between items-center gap-4">
//                 <h2 className="text-xl font-bold flex items-center gap-2">
//                     <span>📝</span> Posts Content Moderation
//                 </h2>
//                 <div className="relative w-full sm:w-96">
//                     <input
//                         type="text"
//                         placeholder="Search posts by title..."
//                         className="input input-bordered w-full pl-10"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <svg className="w-5 h-5 absolute left-3 top-3.5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="bg-base-100 rounded-2xl shadow-sm border border-base-content/5 overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="table w-full">
//                         <thead className="bg-base-200/50">
//                             <tr>
//                                 <th>Post</th>
//                                 <th>Author</th>
//                                 <th>Status</th>
//                                 <th>Likes/Comments</th>
//                                 <th>Date</th>
//                                 <th className="text-right">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="6" className="text-center py-8">
//                                         <span className="loading loading-spinner text-primary"></span>
//                                     </td>
//                                 </tr>
//                             ) : filteredPosts.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="6" className="text-center py-8 text-base-content/50">No posts found.</td>
//                                 </tr>
//                             ) : (
//                                 filteredPosts.map((post) => (
//                                     <tr key={post._id} className="hover:bg-base-200/30">
//                                         <td>
//                                             <div className="flex items-center gap-4">
//                                                 {post.imgURL && (
//                                                     <div className="w-12 h-12 rounded bg-base-300 flex-shrink-0 cursor-pointer overflow-hidden border border-base-content/10">
//                                                         <img src={post.imgURL} alt={post.title} className="w-full h-full object-cover" />
//                                                     </div>
//                                                 )}
//                                                 <div>
//                                                     <p className="font-semibold line-clamp-1 max-w-[200px]" title={post.title}>{post.title}</p>
//                                                     <p className="text-xs text-base-content/50 line-clamp-1 max-w-[200px]" title={post.content}>{post.content}</p>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td>
//                                             <div className="flex items-center gap-2">
//                                                 <div className="avatar">
//                                                     <div className="w-8 rounded-full">
//                                                         <img src={post.userId?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId?.firstname}`} alt="author" />
//                                                     </div>
//                                                 </div>
//                                                 <span className="text-sm font-medium">{post.userId?.firstname} {post.userId?.lastname}</span>
//                                             </div>
//                                         </td>
//                                         <td>
//                                             <span className={`badge badge-sm font-medium ${post.status === 'approved' ? 'badge-success' : post.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
//                                                 {post.status}
//                                             </span>
//                                         </td>
//                                         <td>
//                                             <div className="flex gap-3 text-sm font-medium">
//                                                 <span title="Likes" className="flex items-center gap-1">❤️ {post.likes?.length || 0}</span>
//                                                 <span title="Comments" className="flex items-center gap-1">💬 {post.comments?.length || 0}</span>
//                                             </div>
//                                         </td>
//                                         <td className="text-sm text-base-content/70">
//                                             {new Date(post.createdAt).toLocaleDateString()}
//                                         </td>
//                                         <td className="text-right space-x-1">
//                                             <button onClick={() => handleDelete(post._id)} className="btn btn-xs btn-ghost text-error">Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PostsManagement;

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

const PostsManagement = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/posts`, {
                withCredentials: true,
            });
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`${BASE_URL}/admin/posts/${id}/status`, { status }, { withCredentials: true });
            fetchPosts(); // refresh
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this post? This cannot be undone.")) {
            try {
                await axios.delete(`${BASE_URL}/admin/posts/${id}`, { withCredentials: true });
                fetchPosts();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const filteredPosts = posts.filter((p) =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
            <style>{styles}</style>
            <AuroraBg />

            <div className="animate-fade-in space-y-6 relative z-10 p-6 min-h-screen">

                {/* Header & Search */}
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                        <span>📝</span> Posts Content Moderation
                    </h2>
                    <div className="relative w-full sm:w-96">
                        <input
                            type="text"
                            placeholder="Search posts by title..."
                            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="w-5 h-5 absolute left-3 top-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full text-white/80">
                            <thead className="bg-white/10 text-white/60 border-b border-white/10">
                                <tr>
                                    <th className="font-semibold tracking-wide">Post</th>
                                    <th className="font-semibold tracking-wide">Author</th>
                                    <th className="font-semibold tracking-wide">Status</th>
                                    <th className="font-semibold tracking-wide">Likes/Comments</th>
                                    <th className="font-semibold tracking-wide">Date</th>
                                    <th className="font-semibold tracking-wide text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-12">
                                            <span className="loading loading-spinner loading-lg text-primary"></span>
                                        </td>
                                    </tr>
                                ) : filteredPosts.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-12 text-white/50 font-medium">No posts found.</td>
                                    </tr>
                                ) : (
                                    filteredPosts.map((post) => (
                                        <tr key={post._id} className="hover:bg-white/10 border-b border-white/5 transition-colors duration-200">
                                            <td>
                                                <div className="flex items-center gap-4 py-2">
                                                    {post.imgURL ? (
                                                        <div className="w-12 h-12 rounded-lg bg-black/30 flex-shrink-0 cursor-pointer overflow-hidden border border-white/10 shadow-sm">
                                                            <img src={post.imgURL} alt={post.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-white/5 flex-shrink-0 border border-white/10 flex items-center justify-center">
                                                            <span className="text-xl opacity-50">📄</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-white line-clamp-1 max-w-[200px]" title={post.title}>{post.title}</p>
                                                        <p className="text-xs text-white/50 line-clamp-1 max-w-[200px] mt-0.5" title={post.content}>{post.content}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="w-8 h-8 rounded-full ring ring-primary/30 ring-offset-[#030308] ring-offset-1">
                                                            <img src={post.userId?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId?.firstname}`} alt="author" className="object-cover" />
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-medium text-white">{post.userId?.firstname} {post.userId?.lastname}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge badge-sm font-semibold border-none shadow-sm ${
                                                    post.status === 'approved' ? 'bg-green-500/20 text-green-400' : 
                                                    post.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 
                                                    'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex gap-4 text-sm font-medium text-white/80">
                                                    <span title="Likes" className="flex items-center gap-1.5"><span className="text-red-400">❤️</span> {post.likes?.length || 0}</span>
                                                    <span title="Comments" className="flex items-center gap-1.5"><span className="text-blue-400">💬</span> {post.comments?.length || 0}</span>
                                                </div>
                                            </td>
                                            <td className="text-sm text-white/60">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="text-right space-x-1">
                                                <button 
                                                    onClick={() => handleDelete(post._id)} 
                                                    className="btn btn-sm bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border-transparent hover:border-transparent transition-all"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostsManagement;