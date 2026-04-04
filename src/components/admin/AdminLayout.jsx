// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "../../utils/const";
// import { removeUser } from "../../utils/userSlice";

// const AdminLayout = () => {
//     const location = useLocation();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const user = useSelector((store) => store.user);

//     const handleLogout = async () => {
//         try {
//             await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
//             dispatch(removeUser());
//             navigate("/login");
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const navItems = [
//         { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
//         { name: "Users", path: "/admin/users", icon: "👥" },
//         { name: "Posts", path: "/admin/posts", icon: "📝" },
//         { name: "Projects", path: "/admin/projects", icon: "🚀" },
//         { name: "Jobs", path: "/admin/jobs", icon: "🏢" },
//         { name: "Applications", path: "/admin/applications", icon: "📄" },
//     ];

//     return (
//         <div className="flex h-screen bg-base-300 font-sans">
//             {/* Sidebar */}
//             <aside className="w-64 bg-base-200 border-r border-base-content/10 shadow-xl flex flex-col">
//                 <div className="p-6 pb-2 border-b border-base-content/10">
//                     <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2">
//                         <span>⚡</span> Admin Portal
//                     </h1>
//                     <p className="text-xs mt-1 text-base-content/60">Manage DevSwipe</p>
//                 </div>

//                 <div className="flex-1 px-4 py-6 overflow-y-auto space-y-2">
//                     {navItems.map((item) => {
//                         const isActive = location.pathname.startsWith(item.path);
//                         return (
//                             <Link
//                                 key={item.name}
//                                 to={item.path}
//                                 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
//                                     ? "bg-primary text-primary-content font-medium shadow-md shadow-primary/30"
//                                     : "hover:bg-base-300 text-base-content/80 hover:text-base-content"
//                                     }`}
//                             >
//                                 <span className="text-xl">{item.icon}</span>
//                                 {item.name}
//                             </Link>
//                         );
//                     })}
//                 </div>

//                 {/* Bottom Actions */}
//                 <div className="p-4 border-t border-base-content/10 space-y-2">
//                     <div className="flex items-center gap-3 px-4 py-2 mb-4">
//                         <div className="avatar">
//                             <div className="w-10 rounded-full border border-primary/30">
//                                 <img src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} alt="Admin" />
//                             </div>
//                         </div>
//                         <div className="overflow-hidden">
//                             <p className="text-sm font-bold truncate">{user?.firstname} {user?.lastname}</p>
//                             <p className="text-xs text-base-content/60 truncate -mt-1">{user?.email}</p>
//                         </div>
//                     </div>

//                     <Link
//                         to="/"
//                         className="btn btn-sm btn-ghost w-full justify-start text-base-content/70 hover:text-primary"
//                     >
//                         ← Back to App
//                     </Link>
//                     <button
//                         onClick={handleLogout}
//                         className="btn btn-sm btn-error btn-outline w-full justify-start"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </aside>

//             {/* Main Content Area */}
//             <main className="flex-1 flex flex-col overflow-hidden">
//                 {/* Top Header */}
//                 <header className="h-16 bg-base-100/50 backdrop-blur-lg border-b border-base-content/10 flex items-center justify-between px-8 z-10">
//                     <h2 className="text-xl font-semibold opacity-80 capitalize">
//                         {location.pathname.split("/").pop() || "Dashboard"}
//                     </h2>
//                     <div className="flex items-center gap-4">
//                         <span className="text-sm opacity-60 bg-base-200 px-3 py-1 rounded-full border border-base-content/5">
//                             Admin Access Active
//                         </span>
//                     </div>
//                 </header>

//                 {/* Scrollable Content */}
//                 <div className="flex-1 overflow-y-auto p-8 relative">
//                     <Outlet />
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default AdminLayout;

import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import { removeUser } from "../../utils/userSlice";

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
        { name: "Payments", path: "/admin/payments", icon: "💳" },
    ];

    return (
        <div style={{ background: "#030308", position: "relative", overflow: "hidden" }} className="flex h-screen font-sans">
            <style>{styles}</style>
            <AuroraBg />

            {/* Sidebar */}
            <aside className="w-64 bg-base-200/40 backdrop-blur-xl border-r border-base-content/10 shadow-xl flex flex-col relative z-10">
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
                                    : "hover:bg-base-300/50 text-base-content/80 hover:text-base-content"
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
                            <p className="text-sm font-bold truncate text-white">{user?.firstname} {user?.lastname}</p>
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
            <main className="flex-1 flex flex-col overflow-hidden relative z-10">
                {/* Top Header */}
                <header className="h-16 bg-base-100/30 backdrop-blur-lg border-b border-base-content/10 flex items-center justify-between px-8 z-10">
                    <h2 className="text-xl font-semibold opacity-80 capitalize text-white">
                        {location.pathname.split("/").pop() || "Dashboard"}
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm opacity-80 bg-base-200/50 backdrop-blur-md px-3 py-1 rounded-full border border-base-content/10 text-white">
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