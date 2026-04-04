import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/const";

const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        { email: emailId, pass: password },
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }

        .blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 { width: 520px; height: 520px; background: #6c63ff; top: -120px; left: -160px; animation: drift1 14s ease-in-out infinite alternate; }
        .blob-2 { width: 400px; height: 400px; background: #ff6b9d; bottom: -100px; right: -100px; animation: drift2 18s ease-in-out infinite alternate; }
        .blob-3 { width: 280px; height: 280px; background: #00d2ff; top: 50%; left: 55%; animation: drift3 12s ease-in-out infinite alternate; }

        @keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,60px) scale(1.1); } }
        @keyframes drift2 { from { transform: translate(0,0); } to { transform: translate(-50px,-30px) scale(1.08); } }
        @keyframes drift3 { from { transform: translate(0,0); } to { transform: translate(30px,-50px) scale(0.95); } }

        .card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          padding: 2.5rem 2rem;
          animation: slideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 480px) {
          .card { padding: 2rem 1.25rem; border-radius: 20px; }
        }

        /* Avatar icon */
        .avatar-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(108,99,255,0.25), rgba(196,113,237,0.2));
          border: 1px solid rgba(108,99,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
          box-shadow: 0 0 28px rgba(108,99,255,0.2);
        }

        .heading {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.6rem, 5vw, 2.1rem);
          color: #fff;
          text-align: center;
          letter-spacing: -0.5px;
          margin-bottom: 0.25rem;
        }
        .subheading {
          text-align: center;
          color: rgba(255,255,255,0.42);
          font-size: 0.88rem;
          margin-bottom: 2rem;
        }

        .field-group { display: flex; flex-direction: column; gap: 1rem; }
        .field { display: flex; flex-direction: column; gap: 0.35rem; }

        .label-text {
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.6px;
          padding-left: 2px;
        }

        .input-wrap { position: relative; }
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.35;
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        input[type="email"],
        input[type="text"],
        input[type="password"] {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 0.75rem 1rem 0.75rem 2.6rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
        }
        input::placeholder { color: rgba(255,255,255,0.25); }
        input:focus {
          border-color: rgba(108,99,255,0.7);
          background: rgba(108,99,255,0.08);
          box-shadow: 0 0 0 3px rgba(108,99,255,0.15);
        }

        .pw-input { padding-right: 3.5rem !important; }
        .pw-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .pw-toggle:hover { color: rgba(255,255,255,0.75); }

        .forgot-row {
          display: flex;
          justify-content: flex-end;
        }
        .forgot-link {
          font-size: 0.8rem;
          color: #a48fff;
          text-decoration: none;
          transition: color 0.2s;
        }
        .forgot-link:hover { color: #c471ed; }

        .alert-error {
          padding: 0.7rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          background: rgba(255,85,85,0.12);
          border: 1px solid rgba(255,85,85,0.25);
          color: #ff8080;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: shake 0.4s ease;
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }

        .btn-primary {
          width: 100%;
          padding: 0.85rem 1rem;
          background: linear-gradient(135deg, #6c63ff, #c471ed);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(108,99,255,0.35);
        }
        .btn-primary:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 6px 28px rgba(108,99,255,0.45); }
        .btn-primary:active:not(:disabled) { transform: translateY(0); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

        .arrow-icon { transition: transform 0.2s; }
        .btn-primary:hover:not(:disabled) .arrow-icon { transform: translateX(4px); }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255,255,255,0.2);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .footer-text {
          text-align: center;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.38);
        }
        .footer-text a {
          color: #a48fff;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-text a:hover { color: #c471ed; }

        .secure-note {
          position: relative;
          z-index: 1;
          margin-top: 1.25rem;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }
      `}</style>

      <div className="login-root">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <div className="card">
          {/* Icon */}
          <div className="avatar-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a48fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>

          <h1 className="heading">Welcome Back</h1>
          <p className="subheading">Sign in to continue your journey</p>

          <form onSubmit={handleLogin}>
            <div className="field-group">

              {/* Email */}
              <div className="field">
                <label className="label-text">Email Address</label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    value={emailId}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field">
                <label className="label-text">Password</label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="pw-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="pw-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="forgot-row">
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </div>

              {/* Error */}
              {error && (
                <div className="alert-error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </>
                )}
              </button>

              <div className="divider">or</div>

              <p className="footer-text">
                Don't have an account?{" "}
                <Link to="/signup">Create one now</Link>
              </p>

            </div>
          </form>
        </div>

        <div className="secure-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Secured by industry-standard encryption
        </div>
      </div>
    </>
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
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

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
//       if (res.data.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Invalid email or password");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300 px-4">
//       <div className="w-full max-w-md">
//         {/* Decorative elements */}
//         <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>

//         <div className="card bg-base-300/80 backdrop-blur-xl shadow-2xl border border-base-content/10 hover:shadow-primary/20 transition-all duration-300">
//           <div className="card-body p-8">
//             {/* Header */}
//             <div className="text-center mb-6">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-primary"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//               </div>
//               <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                 Welcome Back
//               </h2>
//               <p className="text-base-content/60 mt-2">
//                 Sign in to continue your journey
//               </p>
//             </div>

//             <form onSubmit={handleLogin}>
//               {/* Email Input */}
//               <label className="form-control w-full mb-4">
//                 <div className="label">
//                   <span className="label-text font-medium">Email Address</span>
//                 </div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-base-content/40"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                       />
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     value={emailId}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="input input-bordered w-full pl-10 focus:input-primary transition-all"
//                     placeholder="you@example.com"
//                     required
//                   />
//                 </div>
//               </label>

//               {/* Password Input */}
//               <label className="form-control w-full mb-2">
//                 <div className="label">
//                   <span className="label-text font-medium">Password</span>
//                 </div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-base-content/40"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                       />
//                     </svg>
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all"
//                     placeholder="Enter your password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     {showPassword ? (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-base-content/40 hover:text-base-content/60"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-base-content/40 hover:text-base-content/60"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </label>

//               {/* Forgot Password Link */}
//               <div className="text-right mb-6">
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-primary hover:text-primary-focus transition-colors"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div className="alert alert-error mb-4 animate-shake">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="stroke-current shrink-0 h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <span className="text-sm">{error}</span>
//                 </div>
//               )}

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 className="btn btn-primary w-full mb-4 text-white relative overflow-hidden group"
//                 disabled={isLoading}
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   {isLoading ? (
//                     <>
//                       <span className="loading loading-spinner loading-sm"></span>
//                       Signing in...
//                     </>
//                   ) : (
//                     <>
//                       Sign In
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 group-hover:translate-x-1 transition-transform"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13 7l5 5m0 0l-5 5m5-5H6"
//                         />
//                       </svg>
//                     </>
//                   )}
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-primary-focus to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
//               </button>

//               {/* Divider */}
//               <div className="divider text-sm text-base-content/40">OR</div>


//               {/* Signup Link */}
//               <div className="text-center">
//                 <p className="text-sm text-base-content/60">
//                   Don't have an account?{" "}
//                   <Link
//                     to="/signup"
//                     className="text-primary font-semibold hover:text-primary-focus transition-colors"
//                   >
//                     Create one now
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-6 text-sm text-base-content/40">
//           <p>Secured by industry-standard encryption</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

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
