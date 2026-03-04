import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import { Link } from "react-router-dom";

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
            <div className="flex justify-center items-center h-full">
                <span className="loading loading-ring loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Total Users Card */}
                <div className="card bg-base-100 shadow-xl border border-base-content/5 hover:scale-[1.02] transition-transform">
                    <div className="card-body p-6 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60 uppercase tracking-widest">Total Users</p>
                            <h2 className="text-4xl font-black mt-2 text-primary">{stats?.totalUsers || 0}</h2>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl">
                            👥
                        </div>
                    </div>
                </div>

                {/* Total Posts Card */}
                <div className="card bg-base-100 shadow-xl border border-base-content/5 hover:scale-[1.02] transition-transform">
                    <div className="card-body p-6 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60 uppercase tracking-widest">Total Posts</p>
                            <h2 className="text-4xl font-black mt-2 text-secondary">{stats?.totalPosts || 0}</h2>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-3xl">
                            📝
                        </div>
                    </div>
                </div>

                {/* Total Projects Card */}
                <div className="card bg-base-100 shadow-xl border border-base-content/5 hover:scale-[1.02] transition-transform">
                    <div className="card-body p-6 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60 uppercase tracking-widest">Total Projects</p>
                            <h2 className="text-4xl font-black mt-2 text-accent">{stats?.totalProjects || 0}</h2>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-3xl">
                            🚀
                        </div>
                    </div>
                </div>

                {/* System Health Card */}
                <div className="card bg-base-100 shadow-xl border border-base-content/5 hover:scale-[1.02] transition-transform">
                    <div className="card-body p-6 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60 uppercase tracking-widest">System Status</p>
                            <h2 className="text-2xl font-bold mt-2 text-success flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-success animate-pulse"></span>
                                Healthy
                            </h2>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center text-3xl">
                            ⚙️
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* Recent Users */}
                <div className="card bg-base-100/60 backdrop-blur border border-base-content/10 shadow-xl w-full">
                    <div className="card-body p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-primary">✨</span> Newest Members
                        </h3>

                        <div className="space-y-4">
                            {stats?.recentUsers?.map((u) => (
                                <div key={u._id} className="flex items-center gap-4 p-3 hover:bg-base-200/50 rounded-xl transition-colors">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={u.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + u.firstname} alt="avatar" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <Link to={`/admin/users/${u._id}`} className="font-semibold hover:text-primary transition-colors">
                                            {u.firstname} {u.lastname}
                                        </Link>
                                        <p className="text-xs text-base-content/60">{u.email}</p>
                                    </div>
                                </div>
                            ))}
                            {!stats?.recentUsers?.length && (
                                <p className="text-base-content/50 italic py-4">No recent users found.</p>
                            )}
                        </div>
                        <div className="mt-4 text-center">
                            <Link to="/admin/users" className="btn btn-sm btn-ghost w-full">View All Users →</Link>
                        </div>
                    </div>
                </div>

                {/* Recent Posts */}
                <div className="card bg-base-100/60 backdrop-blur border border-base-content/10 shadow-xl w-full">
                    <div className="card-body p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-secondary">🔥</span> Latest Posts Activity
                        </h3>

                        <div className="space-y-4">
                            {stats?.recentPosts?.map((p) => (
                                <div key={p._id} className="flex items-start gap-4 p-3 hover:bg-base-200/50 rounded-xl transition-colors">
                                    <div className="avatar mt-1">
                                        <div className="w-10 rounded-lg">
                                            <img src={p.userId?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + p.userId?.firstname} alt="avatar" />
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-semibold truncate">{p.title}</p>
                                        <p className="text-xs text-base-content/60 truncate">By {p.userId?.firstname} {p.userId?.lastname}</p>
                                    </div>
                                    <div className={`badge ${p.status === 'approved' ? 'badge-success' : p.status === 'pending' ? 'badge-warning' : 'badge-error'} badge-sm`}>
                                        {p.status}
                                    </div>
                                </div>
                            ))}
                            {!stats?.recentPosts?.length && (
                                <p className="text-base-content/50 italic py-4">No recent posts found.</p>
                            )}
                        </div>
                        <div className="mt-4 text-center">
                            <Link to="/admin/posts" className="btn btn-sm btn-ghost w-full">Manage Posts →</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
