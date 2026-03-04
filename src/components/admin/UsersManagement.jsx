import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import { Link } from "react-router-dom";

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
            // Optional: Add toast success here
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
        <div className="animate-fade-in space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-content/5">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="w-5 h-5 absolute left-3 top-3 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <select
                        className="select select-bordered bg-base-200/50 w-full md:w-auto"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="user">Users Only</option>
                        <option value="admin">Admins Only</option>
                    </select>
                    {/* We do not implement Add User directly here since signups are handled via standard register process, but admin could insert via similar modal if required. */}
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-base-100 rounded-2xl shadow-sm border border-base-content/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-base-200/50 text-base-content/70">
                            <tr>
                                <th>User Details</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10">
                                        <span className="loading loading-spinner text-primary"></span>
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-base-content/50">
                                        No users found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-base-200/30 transition-colors">
                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div className="avatar">
                                                    <div className="w-12 h-12 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                                                        <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstname}`} alt="avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Link to={`/admin/users/${user._id}`} className="font-bold hover:text-primary transition-colors cursor-pointer">
                                                        {user.firstname} {user.lastname}
                                                    </Link>
                                                    <div className="text-xs opacity-60 flex items-center gap-1 mt-0.5">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge badge-sm font-medium ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => toggleStatus(user)}
                                                className={`badge badge-sm cursor-pointer hover:opacity-80 transition-opacity ${user.status === 'inactive' ? 'badge-error' : 'badge-success'}`}
                                                title="Click to toggle status"
                                            >
                                                {user.status || 'active'}
                                            </button>
                                        </td>
                                        <td className="text-right space-x-2">
                                            <button
                                                onClick={() => handleEditClick(user)}
                                                className="btn btn-sm btn-ghost btn-circle text-info hover:bg-info/10"
                                                title="Edit User"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="btn btn-sm btn-ghost btn-circle text-error hover:bg-error/10"
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
                <div className="modal-box bg-base-100">
                    <h3 className="font-bold text-lg mb-4">Edit User</h3>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="label text-xs font-semibold uppercase text-base-content/70">First Name</label>
                                <input type="text" className="input input-bordered w-full" value={editForm.firstname} onChange={e => setEditForm({ ...editForm, firstname: e.target.value })} required />
                            </div>
                            <div className="w-1/2">
                                <label className="label text-xs font-semibold uppercase text-base-content/70">Last Name</label>
                                <input type="text" className="input input-bordered w-full" value={editForm.lastname} onChange={e => setEditForm({ ...editForm, lastname: e.target.value })} required />
                            </div>
                        </div>

                        <div>
                            <label className="label text-xs font-semibold uppercase text-base-content/70">Email</label>
                            <input type="email" className="input input-bordered w-full" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} required />
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="label text-xs font-semibold uppercase text-base-content/70">Role</label>
                                <select className="select select-bordered w-full" value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="label text-xs font-semibold uppercase text-base-content/70">Status</label>
                                <select className="select select-bordered w-full" value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-action mt-6">
                            <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('edit_user_modal').close()}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default UsersManagement;
