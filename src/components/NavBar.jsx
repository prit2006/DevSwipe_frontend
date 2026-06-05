import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { removeUser } from "../utils/userSlice";
import NotificationsDropdown from "./NotificationsDropdown";
import { setNotifications } from "../utils/notificationSlice";

function NavBar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = useSelector((store) => store.notification?.unreadCount || 0);

  React.useEffect(() => {
    if (user) {
      axios.get(`${BASE_URL}/notification`, { withCredentials: true })
        .then(res => dispatch(setNotifications(res.data)))
        .catch(err => console.error("Error fetching initial notifications: ", err));
    }
  }, [user, dispatch]);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/posts", label: "Posts", icon: "📸" },
    { path: "/projects", label: "Projects", icon: "💼" },
    { path: "/jobs", label: "Jobs", icon: "🏢" },
    { path: "/connections", label: "Connections", icon: "💗" },
    { path: "/requests", label: "Requests", icon: "👁️" },
    { path: "/resume-analyzer", label: "AI Resume", icon: "🤖" },
    { path: "/premium", label: "Premium", icon: "⭐" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/10"
      style={{
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* LEFT — Logo + Nav Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-2xl font-black tracking-tight transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
              style={{
                fontFamily: "'Georgia', serif",
                background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 40%, #c084fc 70%, #e879f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 12px rgba(168,85,247,0.4))",
                letterSpacing: "-0.02em",
              }}
            >
              DevSwipe
            </Link>

            {user && (
              <div className="hidden md:flex gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                      isActive(link.path)
                        ? "border-blue-500/40"
                        : "border-transparent hover:border-blue-500/20 hover:bg-blue-500/5"
                    }`}
                    style={{
                      background: isActive(link.path) ? "rgba(59,130,246,0.1)" : undefined,
                    }}
                  >
                    <span className="mr-1">{link.icon}</span>
                    <span
                      style={{
                        background: "linear-gradient(135deg, #93c5fd 0%, #3b82f6 50%, #818cf8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: isActive(link.path)
                          ? "drop-shadow(0 0 6px rgba(99,102,241,0.5))"
                          : "none",
                        opacity: isActive(link.path) ? 1 : 0.75,
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          {user && (
            <div className="flex items-center gap-3">

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotifOpen(!notifOpen);
                    if (profileOpen) setProfileOpen(false);
                  }}
                  className="relative w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-purple-400 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 px-1 bg-purple-500 text-white text-[10px] font-bold rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {notifOpen && <NotificationsDropdown onClose={() => setNotifOpen(false)} />}
              </div>

              {/* Welcome pill */}
              <div
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-sm"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span>👋</span>
                <span className="text-purple-300 font-semibold">{user.firstname}</span>
              </div>

              {/* Profile Avatar */}
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    if (notifOpen) setNotifOpen(false);
                  }}
                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-purple-500/50 hover:border-purple-400 transition-all duration-200"
                >
                  <img
                    src={user.photoURL}
                    alt={user.firstname}
                    className="w-full h-full object-cover"
                  />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />

                    <div
                      className="absolute right-0 mt-3 w-64 rounded-xl border border-white/10 shadow-2xl z-50 overflow-hidden"
                      style={{
                        background: "rgba(10,10,15,0.95)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      {/* User info header */}
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-xs text-white/30 tracking-widest uppercase mb-1">Signed in as</p>
                        <p className="text-white font-semibold truncate">{user.firstname} {user.lastname}</p>
                        <p className="text-xs text-white/30 truncate">{user.emailId}</p>
                      </div>

                      <div className="py-1.5">
                        {[
                          { to: "/profile", icon: "👤", label: "Profile" },
                          { to: "/saved", icon: "🔖", label: "Saved Items" },
                        ].map(({ to, icon, label }) => (
                          <Link key={to} to={to} onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors duration-150">
                            <span>{icon}</span><span>{label}</span>
                          </Link>
                        ))}

                        <div className="border-t border-white/10 my-1" />

                        {[
                          { to: "/premium", icon: "⭐", label: "Premium" },
                          { to: "/posts/create", icon: "➕", label: "Create Post" },
                          { to: "/projects/create", icon: "🚀", label: "Create Project" },
                          { to: "/projects/my", icon: "💼", label: "My Projects" },
                          { to: "/jobs/my-applications", icon: "📄", label: "My Applications" },
                          { to: "/my-resumes", icon: "🤖", label: "My AI Resumes" },
                          { to: "/projects/stats", icon: "📊", label: "Project Stats" },
                        ].map(({ to, icon, label }) => (
                          <Link key={to} to={to} onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors duration-150">
                            <span>{icon}</span><span>{label}</span>
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-white/10" />

                      <button
                        onClick={() => { setProfileOpen(false); handleLogout(); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-150"
                      >
                        <span>🚪</span><span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* MOBILE MENU */}
        {user && mobileOpen && (
          <div className="md:hidden border-t border-white/10 py-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-150 ${
                    isActive(link.path)
                      ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.icon}</span><span>{link.label}</span>
                </Link>
              ))}

              <div className="border-t border-white/10 my-1" />

              <Link to="/posts/create" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-purple-300 border border-purple-500/30 bg-purple-600/10 hover:bg-purple-600/20 transition-all duration-150">
                <span>➕</span><span>Create Post</span>
              </Link>

              <Link to="/projects/create" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-purple-300 border border-purple-500/30 bg-purple-600/10 hover:bg-purple-600/20 transition-all duration-150">
                <span>🚀</span><span>Create Project</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;


// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { removeUser } from "../utils/userSlice";
// import NotificationsDropdown from "./NotificationsDropdown";
// import { setNotifications } from "../utils/notificationSlice";

// function NavBar() {
//   const user = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [profileOpen, setProfileOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [notifOpen, setNotifOpen] = useState(false);

//   const unreadCount = useSelector((store) => store.notification?.unreadCount || 0);

//   // Fetch initial notifications
//   React.useEffect(() => {
//     if (user) {
//       axios.get(`${BASE_URL}/notification`, { withCredentials: true })
//         .then(res => dispatch(setNotifications(res.data)))
//         .catch(err => console.error("Error fetching initial notifications: ", err));
//     }
//   }, [user, dispatch]);

//   const handleLogout = async () => {
//     try {
//       await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
//       dispatch(removeUser());
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const isActive = (path) => location.pathname === path;

//   const navLinks = [
//     { path: "/posts", label: "📸 Posts" },
//     { path: "/projects", label: "💼 Projects" },
//     { path: "/jobs", label: "🏢 Jobs" }, // 🆕
//     { path: "/connections", label: "💗 Connections" },
//     { path: "/requests", label: "👁️ Requests" },
//     { path: "/premium", label: "⭐ Premium" },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-md">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* LEFT */}
//           <div className="flex items-center gap-6">
//             <Link
//               to="/"
//               className="text-3xl font-bold text-white hover:text-green-400 transition"
//             >
//               DevSwipe
//             </Link>

//             {user && (
//               <div className="hidden md:flex gap-2">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.path}
//                     to={link.path}
//                     className={`px-4 py-2 rounded-md transition ${
//                       isActive(link.path)
//                         ? "bg-gray-800 text-white"
//                         : "text-gray-300 hover:bg-gray-800 hover:text-white"
//                     }`}
//                   >
//                     {link.label}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* RIGHT */}
//           {user && (
//             <div className="flex items-center gap-4">
//               {/* Create Buttons
//               <div className="hidden sm:flex gap-2">
//                 <Link
//                   to="/posts/create"
//                   className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition font-semibold"
//                 >
//                   ➕ Post
//                 </Link>
//                 <Link
//                   to="/projects/create"
//                   className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
//                 >
//                   🚀 Project
//                 </Link>
//               </div> */}

//               {/* Notifications */}
//               <div className="relative">
//                 <button
//                   onClick={() => {
//                     setNotifOpen(!notifOpen);
//                     if (profileOpen) setProfileOpen(false);
//                   }}
//                   className="relative p-2 text-gray-300 hover:text-white transition focus:outline-none"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
//                   </svg>
//                   {unreadCount > 0 && (
//                     <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </button>
//                 {notifOpen && <NotificationsDropdown onClose={() => setNotifOpen(false)} />}
//               </div>

//               {/* Welcome */}
//               <div className="hidden lg:block bg-gray-800 text-green-400 px-4 py-2 rounded-lg font-semibold">
//                 👋 {user.firstname}
//               </div>

//               {/* Profile */}
//               <div className="relative">
//                 <button
//                   onClick={() => {
//                     setProfileOpen(!profileOpen);
//                     if (notifOpen) setNotifOpen(false);
//                   }}
//                   className="flex items-center gap-2"
//                 >
//                   <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-400">
//                     <img
//                       src={user.photoURL}
//                       alt={user.firstname}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </button>

//                 {profileOpen && (
//                   <>
//                     <div
//                       className="fixed inset-0 z-40"
//                       onClick={() => setProfileOpen(false)}
//                     />

//                     <div className="absolute right-0 mt-3 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
//                       <div className="px-4 py-3 border-b border-gray-700">
//                         <p className="text-sm text-gray-400">Signed in as</p>
//                         <p className="text-white font-semibold truncate">
//                           {user.firstname} {user.lastname}
//                         </p>
//                         <p className="text-xs text-gray-500 truncate">
//                           {user.emailId}
//                         </p>
//                       </div>

//                       <div className="py-2">
//                         <Link
//                           to="/profile"
//                           onClick={() => setProfileOpen(false)}
//                           className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
//                         >
//                           👤 Profile
//                         </Link>
//                         <Link
//                           to="/saved"
//                           onClick={() => setProfileOpen(false)}
//                           className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
//                         >
//                           🔖 Saved Items
//                         </Link>
//                         <div className="border-t border-gray-700 my-1"></div>
//                            <Link
//                              to="/premium"
//                            className="block px-4 py-2 text-gray-300 hover:bg-gray-800">
//                            ⭐ Premium
//                           </Link>
//                         <Link
//                           to="/posts/create"
//                           onClick={() => setProfileOpen(false)}
//                           className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
//                         >
//                           ➕ Create Post
//                         </Link>
                        

                       
                      

//                         <Link
//                           to="/projects/create"
//                           onClick={() => setProfileOpen(false)}
//                           className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
//                         >
//                           🚀 Create Project
//                         </Link>
//                         <Link
//                           to="/projects/my"
//                           onClick={() => setProfileOpen(false)}
//                           className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
//                         >
//                           💼 My Projects
//                         </Link>
//                         <Link
//                           to="/jobs/my-applications"
//                           onClick={() => setProfileOpen(false)}
//                           className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
//                         >
//                           📄 My Applications
//                         </Link>
//                         <Link
//                           to="/projects/stats"
//                           onClick={() => setProfileOpen(false)}
//                           className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
//                         >
//                           📊 Project Stats
//                         </Link>
//                       </div>

//                       <div className="border-t border-gray-700"></div>

//                       <button
//                         onClick={() => {
//                           setProfileOpen(false);
//                           handleLogout();
//                         }}
//                         className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800"
//                       >
//                         🚪 Logout
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Mobile Button */}
//               <button
//                 onClick={() => setMobileOpen(!mobileOpen)}
//                 className="md:hidden"
//               >
//                 <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* MOBILE MENU */}
//         {user && mobileOpen && (
//           <div className="md:hidden border-t border-gray-700 pt-4 pb-4">
//             <div className="flex flex-col gap-2">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   onClick={() => setMobileOpen(false)}
//                   className={`px-4 py-2 rounded-md transition ${
//                     isActive(link.path)
//                       ? "bg-gray-800 text-white"
//                       : "text-gray-300 hover:bg-gray-800"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//               <Link
//                 to="/posts/create"
//                 onClick={() => setMobileOpen(false)}
//                 className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 text-center"
//               >
//                 ➕ Create Post
//               </Link>

//               <Link
//                 to="/projects/create"
//                 onClick={() => setMobileOpen(false)}
//                 className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-center"
//               >
//                 🚀 Create Project
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default NavBar;


// // import React, { useState } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { Link, useNavigate, useLocation } from "react-router-dom";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { removeUser } from "../utils/userSlice";

// // function NavBar() {
// //   const user = useSelector((store) => store.user);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [profileOpen, setProfileOpen] = useState(false);
// //   const [mobileOpen, setMobileOpen] = useState(false);

// //   const handleLogout = async () => {
// //     try {
// //       await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
// //       dispatch(removeUser());
// //       navigate("/login");
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   const isActive = (path) => location.pathname === path;

// //   const navLinks = [
// //     { path: "/posts", label: "📸 Feed" },
// //     { path: "/posts/my", label: "📄 My Posts" },
// //     { path: "/connections", label: "💗 Connections" },
// //     { path: "/requests", label: "👁️ Requests" },
// //   ];

// //   return (
// //     <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-md">
// //       <div className="max-w-7xl mx-auto px-4">
// //         <div className="flex justify-between items-center h-16">

// //           {/* LEFT */}
// //           <div className="flex items-center gap-6">
// //             <Link
// //               to="/"
// //               className="text-3xl font-bold text-white hover:text-green-400 transition"
// //             >
// //               DevSwipe
// //             </Link>

// //             {user && (
// //               <div className="hidden md:flex gap-2">
// //                 {navLinks.map((link) => (
// //                   <Link
// //                     key={link.path}
// //                     to={link.path}
// //                     className={`px-4 py-2 rounded-md transition ${
// //                       isActive(link.path)
// //                         ? "bg-gray-800 text-white"
// //                         : "text-gray-300 hover:bg-gray-800 hover:text-white"
// //                     }`}
// //                   >
// //                     {link.label}
// //                   </Link>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* RIGHT */}
// //           {user && (
// //             <div className="flex items-center gap-4">

// //               {/* Create Post */}
// //               <Link
// //                 to="/posts/create"
// //                 className="hidden sm:flex px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition font-semibold"
// //               >
// //                 ➕ Create Post
// //               </Link>

// //               {/* Welcome */}
// //               <div className="hidden lg:block bg-gray-800 text-green-400 px-4 py-2 rounded-lg font-semibold">
// //                 👋 {user.firstname}
// //               </div>

// //               {/* Profile */}
// //               <div className="relative">
// //                 <button
// //                   onClick={() => setProfileOpen(!profileOpen)}
// //                   className="flex items-center gap-2"
// //                 >
// //                   <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-400">
// //                     <img
// //                       src={user.photoURL}
// //                       alt={user.firstname}
// //                       className="w-full h-full object-cover"
// //                     />
// //                   </div>
// //                 </button>

// //                 {profileOpen && (
// //                   <>
// //                     <div
// //                       className="fixed inset-0 z-40"
// //                       onClick={() => setProfileOpen(false)}
// //                     />

// //                     <div className="absolute right-0 mt-3 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
// //                       <div className="px-4 py-3 border-b border-gray-700">
// //                         <p className="text-sm text-gray-400">Signed in as</p>
// //                         <p className="text-white font-semibold truncate">
// //                           {user.firstname} {user.lastname}
// //                         </p>
// //                         <p className="text-xs text-gray-500 truncate">
// //                           {user.emailId}
// //                         </p>
// //                       </div>

// //                       <div className="py-2">
// //                         <Link to="/profile" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-gray-300 hover:bg-gray-800">
// //                           👤 Profile
// //                         </Link>
// //                         <Link to="/posts/create" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-gray-300 hover:bg-gray-800">
// //                           ➕ Create Post
// //                         </Link>
// //                       </div>

// //                       <div className="border-t border-gray-700"></div>

// //                       <button
// //                         onClick={() => {
// //                           setProfileOpen(false);
// //                           handleLogout();
// //                         }}
// //                         className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800"
// //                       >
// //                         🚪 Logout
// //                       </button>
// //                     </div>
// //                   </>
// //                 )}
// //               </div>

// //               {/* Mobile Button */}
// //               <button
// //                 onClick={() => setMobileOpen(!mobileOpen)}
// //                 className="md:hidden"
// //               >
// //                 <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //                 </svg>
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {/* MOBILE MENU */}
// //         {user && mobileOpen && (
// //           <div className="md:hidden border-t border-gray-700 pt-4 pb-4">
// //             <div className="flex flex-col gap-2">
// //               {navLinks.map((link) => (
// //                 <Link
// //                   key={link.path}
// //                   to={link.path}
// //                   onClick={() => setMobileOpen(false)}
// //                   className={`px-4 py-2 rounded-md transition ${
// //                     isActive(link.path)
// //                       ? "bg-gray-800 text-white"
// //                       : "text-gray-300 hover:bg-gray-800"
// //                   }`}
// //                 >
// //                   {link.label}
// //                 </Link>
// //               ))}

// //               <Link
// //                 to="/posts/create"
// //                 onClick={() => setMobileOpen(false)}
// //                 className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 text-center"
// //               >
// //                 ➕ Create Post
// //               </Link>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default NavBar;



// // import React, { useState } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/const";
// // import { removeUser } from "../utils/userSlice";

// // function NavBar() {
// //   const user = useSelector((store) => store.user);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const [open, setOpen] = useState(false);

// //   const handleLogout = async () => {
// //     try {
// //       await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
// //       dispatch(removeUser());
// //       navigate("/login");
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-md">
// //       <div className="max-w-7xl mx-auto px-4">
// //         <div className="flex justify-between items-center h-16">

// //           {/* LEFT */}
// //           <div className="flex items-center gap-6">
// //             <Link
// //               to="/"
// //               className="text-3xl font-bold text-white hover:text-green-400 transition"
// //             >
// //               DevSwipe
// //             </Link>

// //             {user && (
// //               <div className="hidden md:flex gap-2">
// //                 <Link
// //                   to="/posts"
// //                   className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
// //                 >
// //                   📸 Posts
// //                 </Link>

// //                 <Link
// //                   to="/connections"
// //                   className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
// //                 >
// //                   💗 Connections
// //                 </Link>

// //                 <Link
// //                   to="/requests"
// //                   className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
// //                 >
// //                   👁️ Requests
// //                 </Link>
// //               </div>
// //             )}
// //           </div>

// //           {/* RIGHT */}
// //           {user && (
// //             <div className="flex items-center gap-4">

// //               {/* Create Post */}
// //               <Link
// //                 to="/posts/create"
// //                 className="hidden sm:block px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
// //               >
// //                 ➕ Create Post
// //               </Link>

// //               {/* Welcome */}
// //               <div className="hidden lg:block bg-gray-800 text-green-400 px-4 py-2 rounded-lg font-semibold">
// //                 👋 Welcome, {user.firstname}
// //               </div>

// //               {/* Profile */}
// //               <div className="relative">
// //                 <button
// //                   onClick={() => setOpen(!open)}
// //                   className="flex items-center gap-2 focus:outline-none"
// //                 >
// //                   <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
// //                     <img
// //                       src={user.photoURL}
// //                       alt="user"
// //                       className="w-full h-full object-cover"
// //                     />
// //                   </div>
// //                 </button>

// //                 {open && (
// //                   <>
// //                     {/* backdrop */}
// //                     <div
// //                       className="fixed inset-0 z-40"
// //                       onClick={() => setOpen(false)}
// //                     ></div>

// //                     {/* dropdown */}
// //                     <div className="absolute right-0 mt-3 w-56 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">

// //                       <div className="px-4 py-3 border-b border-gray-700">
// //                         <p className="text-sm text-gray-400">Signed in as</p>
// //                         <p className="text-white font-semibold truncate">
// //                           {user.firstname}
// //                         </p>
// //                       </div>

// //                       <Link
// //                         to="/profile"
// //                         onClick={() => setOpen(false)}
// //                         className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
// //                       >
// //                         👤 Profile
// //                       </Link>

// //                       <Link
// //                         to="/posts"
// //                         onClick={() => setOpen(false)}
// //                         className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
// //                       >
// //                         📸 Posts
// //                       </Link>

// //                       <Link
// //                         to="/connections"
// //                         onClick={() => setOpen(false)}
// //                         className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
// //                       >
// //                         💗 Connections
// //                       </Link>

// //                       <Link
// //                         to="/requests"
// //                         onClick={() => setOpen(false)}
// //                         className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
// //                       >
// //                         👁️ Requests
// //                       </Link>

// //                       <div className="border-t border-gray-700 my-1"></div>

// //                       <button
// //                         onClick={handleLogout}
// //                         className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300"
// //                       >
// //                         🚪 Logout
// //                       </button>
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// // export default NavBar;




// // import React from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { Link, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { BASE_URL } from '../utils/const';
// // import { removeUser } from '../utils/userSlice';

// // function NavBar() {
// //   const user = useSelector((store) => store.user);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleLogout = async () => {
// //     try {
// //       await axios.post(BASE_URL + "/auth/logout", {}, { withCredentials: true });
// //       dispatch(removeUser());
// //       navigate("/login");
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <div className="navbar bg-base-300 shadow-sm">
// //       {/* LEFT */}
// //       <div className="flex-1 flex items-center gap-2">
// //         <Link to="/" className="btn btn-ghost text-3xl">
// //           DevSwipe
// //         </Link>

// //         {/* 🆕 POSTS BUTTON */}
// //         {user && (
// //           <Link to="/posts" className="btn btn-ghost text-lg">
// //             📸 Posts
// //           </Link>
// //         )}
// //       </div>

// //       {/* RIGHT */}
// //       <div className="flex gap-2">
// //         {user && (
// //           <div className="flex items-center gap-4">
// //             {/* Welcome Message */}
// //             <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-green-400 font-semibold px-4 py-2 rounded-xl shadow-md text-center">
// //               👋 Welcome, {user.firstname}!
// //             </div>

// //             {/* Profile Dropdown */}
// //             <div className="dropdown dropdown-end">
// //               <div
// //                 tabIndex={0}
// //                 role="button"
// //                 className="btn btn-ghost btn-circle avatar hover:bg-gray-700 transition"
// //               >
// //                 <div className="w-10 rounded-full border border-gray-500">
// //                   <img alt="User Photo" src={user.photoURL} />
// //                 </div>
// //               </div>

// //               <ul
// //                 tabIndex={0}
// //                 className="menu menu-sm dropdown-content bg-gray-900 text-gray-300 border border-gray-700 rounded-md shadow-lg mt-3 w-52 p-2 right-0 z-50"
// //               >
// //                 <li>
// //                   <Link
// //                     to="/profile"
// //                     className="justify-between hover:bg-gray-800 rounded-md p-2"
// //                   >
// //                     Profile <span className="badge badge-success">New</span>
// //                   </Link>
// //                 </li>

// //                 {/* 🆕 POSTS LINK */}
// //                 <li>
// //                 <Link to="/posts/create" className="hover:bg-gray-800 rounded-md p-2">
// //                  ➕ Create Post
// //                 </Link>
// //                 </li>
// //                 <li>
// //                   <Link
// //                     to="/posts"
// //                     className="hover:bg-gray-800 rounded-md p-2"
// //                   >
// //                     📸 Posts
// //                   </Link>
// //                 </li>

// //                 <li>
// //                   <Link
// //                     to="/connections"
// //                     className="justify-between hover:bg-gray-800 rounded-md p-2"
// //                   >
// //                     Connections <span className="badge badge-error">💗</span>
// //                   </Link>
// //                 </li>

// //                 <li>
// //                   <Link
// //                     to="/requests"
// //                     className="justify-between hover:bg-gray-800 rounded-md p-2"
// //                   >
// //                     Requests <span className="badge badge-warning">👁️</span>
// //                   </Link>
// //                 </li>

// //                 <li>
// //                   <button
// //                     onClick={handleLogout}
// //                     className="text-red-400 hover:text-red-300 hover:bg-gray-800 w-full p-2 rounded-md"
// //                   >
// //                     Logout
// //                   </button>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default NavBar;



// // import React from 'react'
// // import { useSelector } from 'react-redux'
// // import { Link } from 'react-router-dom';
// // import axios from 'axios';
// // import { BASE_URL } from '../utils/const';
// // import { useDispatch } from "react-redux";
// // import { removeUser } from "../utils/userSlice";
// // import { useNavigate } from 'react-router-dom';

// // function NavBar() {
// //   const user = useSelector(store => store.user)
// //   console.log(user);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //     const handleLogout = async () => {
// //     try {
// //       await axios.post(BASE_URL + "/auth/logout", {}, { withCredentials: true });
// //       dispatch(removeUser());
// //      // dispatch(removeFeed());
// //      navigate("/login");
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <div className="navbar bg-base-300 shadow-sm">
// //       <div className="flex-1">
// //         <Link to="/" className="btn btn-ghost text-3xl">DevSwipe</Link>
// //       </div>
// //       <div className="flex gap-2">
// // {user && (
// //           <div className="flex items-center gap-4">
// //             {/* Welcome Message */}
// //             <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-green-400 font-semibold px-4 py-2 rounded-xl shadow-md text-center">
// //               👋 Welcome, {user.firstname}!
// //             </div>

// //             {/* Profile Dropdown */}
// //             <div className="dropdown dropdown-end">
// //               <div
// //                 tabIndex={0}
// //                 role="button"
// //                 className="btn btn-ghost btn-circle avatar hover:bg-gray-700 transition"
// //               >
// //                 <div className="w-10 rounded-full border border-gray-500">
// //                   <img alt="User Photo" src={user.photoURL} />
// //                 </div>
// //               </div>
// //               <ul
// //                 tabIndex={0}
// //                 className="menu menu-sm dropdown-content bg-gray-900 text-gray-300 border border-gray-700 rounded-md shadow-lg mt-3 w-52 p-2 right-0 z-50"
// //               >
// //                 <li>
// //                   <Link to="/profile" className="justify-between hover:bg-gray-800 rounded-md p-2">
// //                     Profile <span className="badge badge-success">New</span>
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/connections" className="justify-between hover:bg-gray-800 rounded-md p-2">
// //                     Connections <span className="badge badge-error">💗</span>
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/requests" className="justify-between hover:bg-gray-800 rounded-md p-2">
// //                     Requests <span className="badge badge-warning">👁️</span>
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <button
// //                     onClick={handleLogout}
// //                     className="text-red-400 hover:text-red-300 hover:bg-gray-800 w-full p-2 rounded-md"
// //                   >
// //                     Logout
// //                   </button>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //         )}

// //    {/* {user && (
// //         <div className="dropdown dropdown-end mx-5 flex items-center ">
// //           <div className=''>
// //              <p className='px-4  '>Welcome, {user.firstname}</p>
// //           </div>
         
// //           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">

// //               <div className="w-10 rounded-full">

// //                 <img
// //                   src={user.photoURL}
// //                   alt="Profile"
// //                   className="w-10 h-10 rounded-full object-cover mt-2"
// //                 />
// //               </div>

// //           </div>
// //           <ul
// //             tabIndex="-1"
// //             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
// //             <li>
// //               <Link to="/profile" className="justify-between">
// //                 Profile
// //                 <span className="badge">New</span>
// //               </Link>
// //             </li>
// //             <li><a>Settings</a></li>
// //             <li>   <button
// //                     onClick={handleLogout}
// //                     className="text-red-400 hover:text-red-300 hover:bg-gray-800 w-full p-2 rounded-md"
// //                   >
// //                     Logout
// //                   </button>
// //             </li>
// //           </ul>
// //         </div>)} */}
// //       </div>
// //     </div>
// //   )
// // }

// // export default NavBar