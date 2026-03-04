import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";

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
        <div className="animate-fade-in space-y-6">

            {/* Header & Search */}
            <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-content/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span>📝</span> Posts Content Moderation
                </h2>
                <div className="relative w-full sm:w-96">
                    <input
                        type="text"
                        placeholder="Search posts by title..."
                        className="input input-bordered w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="w-5 h-5 absolute left-3 top-3.5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            {/* Table */}
            <div className="bg-base-100 rounded-2xl shadow-sm border border-base-content/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200/50">
                            <tr>
                                <th>Post</th>
                                <th>Author</th>
                                <th>Status</th>
                                <th>Likes/Comments</th>
                                <th>Date</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8">
                                        <span className="loading loading-spinner text-primary"></span>
                                    </td>
                                </tr>
                            ) : filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-base-content/50">No posts found.</td>
                                </tr>
                            ) : (
                                filteredPosts.map((post) => (
                                    <tr key={post._id} className="hover:bg-base-200/30">
                                        <td>
                                            <div className="flex items-center gap-4">
                                                {post.imgURL && (
                                                    <div className="w-12 h-12 rounded bg-base-300 flex-shrink-0 cursor-pointer overflow-hidden border border-base-content/10">
                                                        <img src={post.imgURL} alt={post.title} className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-semibold line-clamp-1 max-w-[200px]" title={post.title}>{post.title}</p>
                                                    <p className="text-xs text-base-content/50 line-clamp-1 max-w-[200px]" title={post.content}>{post.content}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <div className="avatar">
                                                    <div className="w-8 rounded-full">
                                                        <img src={post.userId?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId?.firstname}`} alt="author" />
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium">{post.userId?.firstname} {post.userId?.lastname}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge badge-sm font-medium ${post.status === 'approved' ? 'badge-success' : post.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex gap-3 text-sm font-medium">
                                                <span title="Likes" className="flex items-center gap-1">❤️ {post.likes?.length || 0}</span>
                                                <span title="Comments" className="flex items-center gap-1">💬 {post.comments?.length || 0}</span>
                                            </div>
                                        </td>
                                        <td className="text-sm text-base-content/70">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="text-right space-x-1">
                                            <button onClick={() => handleDelete(post._id)} className="btn btn-xs btn-ghost text-error">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PostsManagement;
