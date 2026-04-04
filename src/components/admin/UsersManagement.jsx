// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../utils/const";
// import { Link } from "react-router-dom";

// const UsersManagement = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterRole, setFilterRole] = useState("all");
//     const [editingUser, setEditingUser] = useState(null);

//     // Form states for edit
//     const [editForm, setEditForm] = useState({
//         firstname: "",
//         lastname: "",
//         email: "",
//         role: "user",
//         status: "active"
//     });

//     useEffect(() => {
//         fetchUsers();
//     }, [searchTerm]);

//     const fetchUsers = async () => {
//         try {
//             const res = await axios.get(`${BASE_URL}/admin/users?search=${searchTerm}`, {
//                 withCredentials: true,
//             });
//             setUsers(res.data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEditClick = (user) => {
//         setEditingUser(user);
//         setEditForm({
//             firstname: user.firstname,
//             lastname: user.lastname,
//             email: user.email,
//             role: user.role || "user",
//             status: user.status || "active"
//         });
//         document.getElementById("edit_user_modal").showModal();
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(
//                 `${BASE_URL}/admin/users/${editingUser._id}`,
//                 editForm,
//                 { withCredentials: true }
//             );
//             document.getElementById("edit_user_modal").close();
//             fetchUsers(); // Refresh
//             // Optional: Add toast success here
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
//             try {
//                 await axios.delete(`${BASE_URL}/admin/users/${id}`, { withCredentials: true });
//                 fetchUsers();
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     };

//     const toggleStatus = async (user) => {
//         const newStatus = user.status === "active" ? "inactive" : "active";
//         if (window.confirm(`Are you sure you want to ${newStatus === "active" ? "activate" : "deactivate"} this user?`)) {
//             try {
//                 await axios.put(
//                     `${BASE_URL}/admin/users/${user._id}`,
//                     { status: newStatus },
//                     { withCredentials: true }
//                 );
//                 fetchUsers();
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     };

//     const filteredUsers = users.filter((u) => {
//         if (filterRole !== "all" && u.role !== filterRole) return false;
//         return true;
//     });

//     return (
//         <div className="animate-fade-in space-y-6">
//             {/* Header Actions */}
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-content/5">
//                 <div className="relative w-full md:w-96">
//                     <input
//                         type="text"
//                         placeholder="Search by name or email..."
//                         className="input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100 transition-colors"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <svg className="w-5 h-5 absolute left-3 top-3 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//                 </div>

//                 <div className="flex gap-4 w-full md:w-auto">
//                     <select
//                         className="select select-bordered bg-base-200/50 w-full md:w-auto"
//                         value={filterRole}
//                         onChange={(e) => setFilterRole(e.target.value)}
//                     >
//                         <option value="all">All Roles</option>
//                         <option value="user">Users Only</option>
//                         <option value="admin">Admins Only</option>
//                     </select>
//                     {/* We do not implement Add User directly here since signups are handled via standard register process, but admin could insert via similar modal if required. */}
//                 </div>
//             </div>

//             {/* Users Table */}
//             <div className="bg-base-100 rounded-2xl shadow-sm border border-base-content/5 overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="table w-full">
//                         {/* head */}
//                         <thead className="bg-base-200/50 text-base-content/70">
//                             <tr>
//                                 <th>User Details</th>
//                                 <th>Role</th>
//                                 <th>Status</th>
//                                 <th className="text-right">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="5" className="text-center py-10">
//                                         <span className="loading loading-spinner text-primary"></span>
//                                     </td>
//                                 </tr>
//                             ) : filteredUsers.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="5" className="text-center py-10 text-base-content/50">
//                                         No users found matching your criteria.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 filteredUsers.map((user) => (
//                                     <tr key={user._id} className="hover:bg-base-200/30 transition-colors">
//                                         <td>
//                                             <div className="flex items-center gap-4">
//                                                 <div className="avatar">
//                                                     <div className="w-12 h-12 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-2">
//                                                         <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstname}`} alt="avatar" />
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <Link to={`/admin/users/${user._id}`} className="font-bold hover:text-primary transition-colors cursor-pointer">
//                                                         {user.firstname} {user.lastname}
//                                                     </Link>
//                                                     <div className="text-xs opacity-60 flex items-center gap-1 mt-0.5">
//                                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//                                                         {user.email}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td>
//                                             <span className={`badge badge-sm font-medium ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
//                                                 {user.role || 'user'}
//                                             </span>
//                                         </td>
//                                         <td>
//                                             <button
//                                                 onClick={() => toggleStatus(user)}
//                                                 className={`badge badge-sm cursor-pointer hover:opacity-80 transition-opacity ${user.status === 'inactive' ? 'badge-error' : 'badge-success'}`}
//                                                 title="Click to toggle status"
//                                             >
//                                                 {user.status || 'active'}
//                                             </button>
//                                         </td>
//                                         <td className="text-right space-x-2">
//                                             <button
//                                                 onClick={() => handleEditClick(user)}
//                                                 className="btn btn-sm btn-ghost btn-circle text-info hover:bg-info/10"
//                                                 title="Edit User"
//                                             >
//                                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDelete(user._id)}
//                                                 className="btn btn-sm btn-ghost btn-circle text-error hover:bg-error/10"
//                                                 title="Delete User"
//                                             >
//                                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Edit Modal */}
//             <dialog id="edit_user_modal" className="modal modal-bottom sm:modal-middle">
//                 <div className="modal-box bg-base-100">
//                     <h3 className="font-bold text-lg mb-4">Edit User</h3>
//                     <form onSubmit={handleUpdate} className="space-y-4">
//                         <div className="flex gap-4">
//                             <div className="w-1/2">
//                                 <label className="label text-xs font-semibold uppercase text-base-content/70">First Name</label>
//                                 <input type="text" className="input input-bordered w-full" value={editForm.firstname} onChange={e => setEditForm({ ...editForm, firstname: e.target.value })} required />
//                             </div>
//                             <div className="w-1/2">
//                                 <label className="label text-xs font-semibold uppercase text-base-content/70">Last Name</label>
//                                 <input type="text" className="input input-bordered w-full" value={editForm.lastname} onChange={e => setEditForm({ ...editForm, lastname: e.target.value })} required />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="label text-xs font-semibold uppercase text-base-content/70">Email</label>
//                             <input type="email" className="input input-bordered w-full" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} required />
//                         </div>

//                         <div className="flex gap-4">
//                             <div className="w-1/2">
//                                 <label className="label text-xs font-semibold uppercase text-base-content/70">Role</label>
//                                 <select className="select select-bordered w-full" value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })}>
//                                     <option value="user">User</option>
//                                     <option value="admin">Admin</option>
//                                 </select>
//                             </div>
//                             <div className="w-1/2">
//                                 <label className="label text-xs font-semibold uppercase text-base-content/70">Status</label>
//                                 <select className="select select-bordered w-full" value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
//                                     <option value="active">Active</option>
//                                     <option value="inactive">Inactive</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div className="modal-action mt-6">
//                             <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('edit_user_modal').close()}>Cancel</button>
//                             <button type="submit" className="btn btn-primary">Save Changes</button>
//                         </div>
//                     </form>
//                 </div>
//                 <form method="dialog" className="modal-backdrop">
//                     <button>close</button>
//                 </form>
//             </dialog>
//         </div>
//     );
// };

// export default UsersManagement;

import React, { useState, useEffect } from "react";
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

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [editingUser, setEditingUser] = useState(null);

    // Form states for edit
    const [editForm, setEditForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        role: "user",
        status: "active"
    });

    useEffect(() => {
        fetchUsers();
    }, [searchTerm]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/users?search=${searchTerm}`, {
                withCredentials: true,
            });
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditForm({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role || "user",
            status: user.status || "active"
        });
        document.getElementById("edit_user_modal").showModal();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${BASE_URL}/admin/users/${editingUser._id}`,
                editForm,
                { withCredentials: true }
            );
            document.getElementById("edit_user_modal").close();
            fetchUsers(); // Refresh
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                await axios.delete(`${BASE_URL}/admin/users/${id}`, { withCredentials: true });
                fetchUsers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const toggleStatus = async (user) => {
        const newStatus = user.status === "active" ? "inactive" : "active";
        if (window.confirm(`Are you sure you want to ${newStatus === "active" ? "activate" : "deactivate"} this user?`)) {
            try {
                await axios.put(
                    `${BASE_URL}/admin/users/${user._id}`,
                    { status: newStatus },
                    { withCredentials: true }
                );
                fetchUsers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const filteredUsers = users.filter((u) => {
        if (filterRole !== "all" && u.role !== filterRole) return false;
        return true;
    });

    return (
        <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
            <style>{styles}</style>
            <AuroraBg />

            <div className="animate-fade-in space-y-6 relative z-10 p-6 min-h-screen">
                
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white mr-auto">
                        <span>👥</span> Users Management
                    </h2>

                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="w-5 h-5 absolute left-3 top-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <select
                            className="select select-bordered bg-black/20 border-white/10 text-white focus:border-primary/50 transition-all w-full md:w-auto"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="all" className="bg-[#0d0520]">All Roles</option>
                            <option value="user" className="bg-[#0d0520]">Users Only</option>
                            <option value="admin" className="bg-[#0d0520]">Admins Only</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full text-white/80">
                            {/* head */}
                            <thead className="bg-white/10 text-white/60 border-b border-white/10">
                                <tr>
                                    <th className="font-semibold tracking-wide py-4">User Details</th>
                                    <th className="font-semibold tracking-wide py-4">Role</th>
                                    <th className="font-semibold tracking-wide py-4">Status</th>
                                    <th className="font-semibold tracking-wide py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-12">
                                            <span className="loading loading-spinner loading-lg text-primary"></span>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-12 text-white/50 font-medium">
                                            No users found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-white/10 border-b border-white/5 transition-colors duration-200">
                                            <td className="py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="avatar">
                                                        <div className="w-12 h-12 rounded-full ring ring-primary/30 ring-offset-[#030308] ring-offset-2">
                                                            <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstname}`} alt="avatar" className="object-cover" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Link to={`/admin/users/${user._id}`} className="font-bold text-white hover:text-primary transition-colors cursor-pointer">
                                                            {user.firstname} {user.lastname}
                                                        </Link>
                                                        <div className="text-xs text-white/50 flex items-center gap-1.5 mt-1">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge badge-sm font-semibold border-none shadow-sm px-2.5 py-1 ${user.role === 'admin' ? 'bg-primary/20 text-primary-content' : 'bg-white/10 text-white/80'}`}>
                                                    {user.role || 'user'}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => toggleStatus(user)}
                                                    className={`badge badge-sm font-semibold border-none shadow-sm cursor-pointer hover:opacity-80 transition-opacity px-2.5 py-1 ${user.status === 'inactive' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}
                                                    title="Click to toggle status"
                                                >
                                                    {user.status || 'active'}
                                                </button>
                                            </td>
                                            <td className="text-right space-x-1">
                                                <button
                                                    onClick={() => handleEditClick(user)}
                                                    className="btn btn-sm btn-ghost btn-circle text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
                                                    title="Edit User"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="btn btn-sm btn-ghost btn-circle text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                                                    title="Delete User"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Edit Modal */}
                <dialog id="edit_user_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box bg-[#0d0520] border border-white/10 shadow-2xl text-white">
                        <h3 className="font-bold text-xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Edit User Details</h3>
                        <form onSubmit={handleUpdate} className="space-y-5">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full sm:w-1/2">
                                    <label className="label text-xs font-bold uppercase tracking-wider text-white/50">First Name</label>
                                    <input type="text" className="input input-bordered w-full bg-black/40 border-white/10 text-white focus:border-primary/50" value={editForm.firstname} onChange={e => setEditForm({ ...editForm, firstname: e.target.value })} required />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <label className="label text-xs font-bold uppercase tracking-wider text-white/50">Last Name</label>
                                    <input type="text" className="input input-bordered w-full bg-black/40 border-white/10 text-white focus:border-primary/50" value={editForm.lastname} onChange={e => setEditForm({ ...editForm, lastname: e.target.value })} required />
                                </div>
                            </div>

                            <div>
                                <label className="label text-xs font-bold uppercase tracking-wider text-white/50">Email</label>
                                <input type="email" className="input input-bordered w-full bg-black/40 border-white/10 text-white focus:border-primary/50" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} required />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full sm:w-1/2">
                                    <label className="label text-xs font-bold uppercase tracking-wider text-white/50">Role</label>
                                    <select className="select select-bordered w-full bg-black/40 border-white/10 text-white focus:border-primary/50" value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })}>
                                        <option value="user" className="bg-[#0d0520]">User</option>
                                        <option value="admin" className="bg-[#0d0520]">Admin</option>
                                    </select>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <label className="label text-xs font-bold uppercase tracking-wider text-white/50">Status</label>
                                    <select className="select select-bordered w-full bg-black/40 border-white/10 text-white focus:border-primary/50" value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
                                        <option value="active" className="bg-[#0d0520]">Active</option>
                                        <option value="inactive" className="bg-[#0d0520]">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="modal-action mt-8 pt-4 border-t border-white/10">
                                <button type="button" className="btn btn-ghost text-white/70 hover:text-white hover:bg-white/10" onClick={() => document.getElementById('edit_user_modal').close()}>Cancel</button>
                                <button type="submit" className="btn bg-primary hover:bg-primary-focus text-white border-none shadow-[0_0_15px_rgba(124,58,237,0.4)]">Save Changes</button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop bg-black/60 backdrop-blur-sm">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default UsersManagement;