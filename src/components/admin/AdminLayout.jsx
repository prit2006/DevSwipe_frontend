import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import { removeUser } from "../../utils/userSlice";

const AdminLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleLogout = async () => {
        try {
            await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
            dispatch(removeUser());
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const navItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
        { name: "Users", path: "/admin/users", icon: "👥" },
        { name: "Posts", path: "/admin/posts", icon: "📝" },
        { name: "Projects", path: "/admin/projects", icon: "🚀" },
        { name: "Jobs", path: "/admin/jobs", icon: "🏢" },
        { name: "Applications", path: "/admin/applications", icon: "📄" },
    ];

    return (
        <div className="flex h-screen bg-base-300 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-base-200 border-r border-base-content/10 shadow-xl flex flex-col">
                <div className="p-6 pb-2 border-b border-base-content/10">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2">
                        <span>⚡</span> Admin Portal
                    </h1>
                    <p className="text-xs mt-1 text-base-content/60">Manage DevSwipe</p>
                </div>

                <div className="flex-1 px-4 py-6 overflow-y-auto space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-primary text-primary-content font-medium shadow-md shadow-primary/30"
                                    : "hover:bg-base-300 text-base-content/80 hover:text-base-content"
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-base-content/10 space-y-2">
                    <div className="flex items-center gap-3 px-4 py-2 mb-4">
                        <div className="avatar">
                            <div className="w-10 rounded-full border border-primary/30">
                                <img src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} alt="Admin" />
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">{user?.firstname} {user?.lastname}</p>
                            <p className="text-xs text-base-content/60 truncate -mt-1">{user?.email}</p>
                        </div>
                    </div>

                    <Link
                        to="/"
                        className="btn btn-sm btn-ghost w-full justify-start text-base-content/70 hover:text-primary"
                    >
                        ← Back to App
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="btn btn-sm btn-error btn-outline w-full justify-start"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-base-100/50 backdrop-blur-lg border-b border-base-content/10 flex items-center justify-between px-8 z-10">
                    <h2 className="text-xl font-semibold opacity-80 capitalize">
                        {location.pathname.split("/").pop() || "Dashboard"}
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm opacity-60 bg-base-200 px-3 py-1 rounded-full border border-base-content/5">
                            Admin Access Active
                        </span>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 relative">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
