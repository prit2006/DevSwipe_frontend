import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/const";

const Login = () => {
  const [emailId, setEmail] = useState("pritpastagiya2006@gmail.com");
  const [password, setPassword] = useState("Prit@2006");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          email: emailId,
          pass: password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300 px-4">
      <div className="w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>

        <div className="card bg-base-300/80 backdrop-blur-xl shadow-2xl border border-base-content/10 hover:shadow-primary/20 transition-all duration-300">
          <div className="card-body p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-base-content/60 mt-2">
                Sign in to continue your journey
              </p>
            </div>

            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <label className="form-control w-full mb-4">
                <div className="label">
                  <span className="label-text font-medium">Email Address</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-base-content/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={emailId}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </label>

              {/* Password Input */}
              <label className="form-control w-full mb-2">
                <div className="label">
                  <span className="label-text font-medium">Password</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-base-content/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-base-content/40 hover:text-base-content/60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-base-content/40 hover:text-base-content/60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </label>

              {/* Forgot Password Link */}
              <div className="text-right mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-focus transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-error mb-4 animate-shake">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mb-4 text-white relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-focus to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              {/* Divider */}
              <div className="divider text-sm text-base-content/40">OR</div>


              {/* Signup Link */}
              <div className="text-center">
                <p className="text-sm text-base-content/60">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary font-semibold hover:text-primary-focus transition-colors"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-base-content/40">
          <p>Secured by industry-standard encryption</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import axios from "axios";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { addUser } from "../utils/userSlice";
// import { BASE_URL } from "../utils/const";

// const Login = () => {
//   const [emailId, setEmail] = useState("pritpastagiya2006@gmail.com");
//   const [password, setPassword] = useState("Prit@2006");
//   const [error, setError] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/auth/login`,
//         {
//           email: emailId,
//           pass: password,
//         },
//         { withCredentials: true }
//       );

//       dispatch(addUser(res.data));
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="flex justify-center my-10">
//       <div className="card bg-base-300 w-96 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center">Login</h2>

//           <label className="form-control w-full max-w-xs my-2">
//             <div className="label">
//               <span className="label-text">Email</span>
//             </div>
//             <input
//               type="text"
//               value={emailId}
//               onChange={(e) => setEmail(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//           </label>

//           <label className="form-control w-full max-w-xs my-2">
//             <div className="label">
//               <span className="label-text">Password</span>
//             </div>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//           </label>

//           {error && (
//             <p className="text-red-500 text-center mt-2">{error}</p>
//           )}

//           <div className="card-actions justify-center mt-4">
//             <button className="btn btn-primary w-full" onClick={handleLogin}>
//               Login
//             </button>
//           </div>

//           {/* SIGNUP LINK */}
//           <div className="text-center mt-4">
//             <p className="text-sm">
//               Don’t have an account?{" "}
//               <Link to="/signup" className="text-primary font-semibold">
//                 Sign up
//               </Link>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import axios from "axios";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addUser } from "../utils/userSlice";
// import { BASE_URL } from "../utils/const";

// const Login = () => {
//   const [emailId, setEmail] = useState("pritpastagiya2006@gmail.com");
//   const [password, setPassword] = useState("Prit@2006");
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL+"/auth/login",
//         {
//           email: emailId,
//           pass: password,
//         },
//         { withCredentials: true }
//       );

//       console.log(res.data);
//       dispatch(addUser(res.data))
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="flex justify-center my-10">
//       <div className="card bg-base-300 w-96 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center">Login</h2>

//           <label className="form-control w-full max-w-xs my-2">
//             <div className="label">
//               <span className="label-text">Email</span>
//             </div>
//             <input
//               type="text"
//               value={emailId}
//               onChange={(e) => setEmail(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//           </label>

//           <label className="form-control w-full max-w-xs my-2">
//             <div className="label">
//               <span className="label-text">Password</span>
//             </div>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//           </label>

//           {error && (
//             <p className="text-red-500 text-center mt-2">{error}</p>
//           )}

//           <div className="card-actions justify-center mt-4">
//             <button className="btn btn-primary" onClick={handleLogin}>
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [emailId, setemailId] = useState("pritpastagiya2006@gmail.com");
//   const [pass, setpass] = useState("Prit@2006");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const HandleLogin = async () => {
//     try {
//       const result =await axios.post("http://localhost:3000/auth/login", {
//      email: emailId,
//      pass
//     });
//     console.log(result.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
//       <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-6">

//         <h2 className="text-3xl font-bold text-center text-white mb-2">
//           Welcome Back
//         </h2>
//         <p className="text-center text-gray-400 mb-6">
//           Login to continue
//         </p>

//         <form className="space-y-4" onSubmit={HandleLogin}>
//           {/* Email */}
//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Email</label>
//             <input
//               type="email"
//               value={emailId}
//               onChange={(e) => setemailId(e.target.value)}
//               className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg"
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={pass}
//                 onChange={(e) => setpass(e.target.value)}
//                 className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-2.5 text-sm text-gray-400"
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
