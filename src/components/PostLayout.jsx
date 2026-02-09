import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/const";
import { addUser, removeUser } from "../utils/userSlice";

const PostLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await axios.get(`${BASE_URL}/profile`, {
        withCredentials: true,
      });
      
      dispatch(addUser(res.data));
    } catch (err) {
      console.error("Auth error:", err);
      
      // Clear user data on auth failure
      dispatch(removeUser());
      
      // Store the attempted location for redirect after login
      const from = location.pathname + location.search;
      
      // Only redirect to login if not already there
      if (location.pathname !== "/login") {
        navigate("/login", { 
          state: { from },
          replace: true 
        });
      }
      
      setError("Session expired. Please login again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch user if we don't have user data
    if (!user) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Refresh user data periodically (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        fetchUser();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [user]);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-base-200">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-base-content/60">Loading your feed...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error Screen (with retry option)
  if (error && !user) {
    return (
      <div className="min-h-screen flex flex-col bg-base-200">
        <NavBar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="card bg-base-100 shadow-xl max-w-md w-full">
            <div className="card-body text-center">
              <h2 className="card-title justify-center text-error">
                Authentication Error
              </h2>
              <p className="text-base-content/70">{error}</p>
              <div className="card-actions justify-center mt-4">
                <button 
                  onClick={fetchUser} 
                  className="btn btn-primary"
                >
                  Retry
                </button>
                <button 
                  onClick={() => navigate("/login")} 
                  className="btn btn-ghost"
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Main Layout (only renders when user is authenticated)
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <NavBar user={user} />
      <main className="flex-grow">
        <Outlet context={{ user, refreshUser: fetchUser }} />
      </main>
      <Footer />
    </div>
  );
};

export default PostLayout;


// import React, { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// import NavBar from "./NavBar";
// import Footer from "./Footer";
// import { BASE_URL } from "../utils/const";
// import { addUser } from "../utils/userSlice";

// const PostLayout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((store) => store.user);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/profile`, {
//         withCredentials: true,
//       });
//       dispatch(addUser(res.data));
//     } catch (err) {
//       navigate("/login");
//     }
//   };

//   useEffect(() => {
//     if (!user) {
//       fetchUser();
//     }
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <NavBar />
//       <main className="flex-grow">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default PostLayout;


// import React from "react";
// import NavBar from "./NavBar";
// import { Outlet } from "react-router-dom";

// const PostLayout = () => {
//   return (
//     <>
//       <NavBar />
//       <div className="min-h-screen bg-base-200">
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default PostLayout;
