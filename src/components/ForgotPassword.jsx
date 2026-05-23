import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/const";

const ForgotPassword = () => {
  const [emailId, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [step, setStep] = useState(1); // 1: enter email, 2: enter otp & new pass
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/forgot-password`, { email: emailId });
      setSuccessMsg(res.data.message || "OTP sent successfully!");
      setStep(2);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to send OTP. Check if the email is correct.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/reset-password`, {
        email: emailId,
        otp: otp,
        newPassword: newPassword
      });
      setSuccessMsg(res.data.message || "Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to reset password. Check OTP.");
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
        
        .alert-success {
          padding: 0.7rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          background: rgba(85,255,136,0.12);
          border: 1px solid rgba(85,255,136,0.25);
          color: #80ff9a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: slideUp 0.4s ease;
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

        .footer-text {
          text-align: center;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.38);
          margin-top: 1rem;
        }
        .footer-text a {
          color: #a48fff;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-text a:hover { color: #c471ed; }

      `}</style>

      <div className="login-root">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <div className="card">
          <div className="avatar-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a48fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          <h1 className="heading">Forgot Password</h1>
          <p className="subheading">
            {step === 1 ? "Enter your email to receive an OTP" : "Enter OTP and your new password"}
          </p>

          <form onSubmit={step === 1 ? handleSendOTP : handleResetPassword}>
            <div className="field-group">

              {/* Email */}
              <div className="field" style={{ display: step === 1 || step === 2 ? 'flex' : 'none' }}>
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
                    disabled={step === 2}
                  />
                </div>
              </div>

              {/* OTP and New Password (Step 2 only) */}
              {step === 2 && (
                <>
                  <div className="field">
                    <label className="label-text">OTP</label>
                    <div className="input-wrap">
                      <span className="input-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                        </svg>
                      </span>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        required
                        maxLength={6}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label-text">New Password</label>
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
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
                </>
              )}

              {/* Error */}
              {error && (
                <div className="alert-error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}
              
              {/* Success */}
              {successMsg && (
                <div className="alert-success">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  {successMsg}
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner" />
                    {step === 1 ? "Sending..." : "Resetting..."}
                  </>
                ) : (
                  <>
                    {step === 1 ? "Send OTP" : "Reset Password"}
                  </>
                )}
              </button>

              <p className="footer-text">
                Remembered your password?{" "}
                <Link to="/login">Back to Login</Link>
              </p>

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
