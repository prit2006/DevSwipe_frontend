import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/const";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    pass: "",
    age: "",
    gender: "",
    skills: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => {
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.pass) {
      setError("Please fill all required fields");
      return;
    }
    setError("");
    setCurrentStep(2);
  };

  const prevStep = () => {
    setError("");
    setCurrentStep(1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("firstname", formData.firstname);
      data.append("lastname", formData.lastname);
      data.append("email", formData.email);
      data.append("pass", formData.pass);
      data.append("age", formData.age);
      data.append("gender", formData.gender);
      const skillsArray = formData.skills.split(",").map((s) => s.trim()).filter(Boolean);
      data.append("skills", JSON.stringify(skillsArray));
      if (formData.photo) data.append("photo", formData.photo);
      await axios.post(`${BASE_URL}/auth/signup`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .signup-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }

        /* Ambient blobs */
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

        @keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px, 60px) scale(1.1); } }
        @keyframes drift2 { from { transform: translate(0,0); } to { transform: translate(-50px, -30px) scale(1.08); } }
        @keyframes drift3 { from { transform: translate(0,0); } to { transform: translate(30px, -50px) scale(0.95); } }

        /* Card */
        .card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
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

        /* Heading */
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

        /* Step indicator */
        .steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-bottom: 2rem;
        }
        .step-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          border: 2px solid transparent;
          transition: all 0.35s ease;
        }
        .step-circle.active {
          background: linear-gradient(135deg, #6c63ff, #c471ed);
          color: #fff;
          box-shadow: 0 0 18px rgba(108,99,255,0.55);
        }
        .step-circle.inactive {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.35);
          border-color: rgba(255,255,255,0.1);
        }
        .step-label {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
        }
        .step-label.active-label { color: rgba(255,255,255,0.75); }
        .step-wrapper { display: flex; flex-direction: column; align-items: center; }
        .step-line {
          width: 56px;
          height: 2px;
          background: rgba(255,255,255,0.1);
          margin: 0 4px;
          margin-bottom: 20px;
          transition: background 0.35s;
          flex-shrink: 0;
        }
        .step-line.filled { background: linear-gradient(90deg, #6c63ff, #c471ed); }

        /* Input */
        .field { display: flex; flex-direction: column; gap: 0.35rem; }
        .field-group { display: flex; flex-direction: column; gap: 1rem; }

        .label-text {
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.6px;
          padding-left: 2px;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="number"],
        select {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          -webkit-appearance: none;
        }
        input::placeholder { color: rgba(255,255,255,0.25); }
        input:focus, select:focus {
          border-color: rgba(108,99,255,0.7);
          background: rgba(108,99,255,0.08);
          box-shadow: 0 0 0 3px rgba(108,99,255,0.15);
        }
        select option { background: #1a1a2e; color: #fff; }

        /* Password wrapper */
        .pw-wrap { position: relative; }
        .pw-wrap input { padding-right: 3.5rem; }
        .pw-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255,255,255,0.4);
          font-size: 0.78rem;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 6px;
          transition: color 0.2s;
        }
        .pw-toggle:hover { color: rgba(255,255,255,0.8); }

        /* File input */
        .file-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1.5px dashed rgba(255,255,255,0.15);
          border-radius: 12px;
          padding: 0.85rem 1rem;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s;
        }
        .file-label:hover {
          border-color: rgba(108,99,255,0.5);
          background: rgba(108,99,255,0.07);
        }
        .file-label input[type="file"] { display: none; }
        .file-icon {
          width: 32px;
          height: 32px;
          background: rgba(108,99,255,0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .file-text { font-size: 0.88rem; color: rgba(255,255,255,0.5); }
        .file-text strong { color: rgba(255,255,255,0.75); font-weight: 500; }

        /* Avatar preview */
        .avatar-preview {
          display: flex;
          justify-content: center;
          padding-top: 0.25rem;
        }
        .avatar-preview img {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(108,99,255,0.5);
          box-shadow: 0 0 20px rgba(108,99,255,0.3);
          animation: popIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes popIn { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }

        /* Alerts */
        .alert {
          padding: 0.7rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
        }
        .alert-error {
          background: rgba(255, 85, 85, 0.12);
          border: 1px solid rgba(255,85,85,0.25);
          color: #ff8080;
        }
        .alert-success {
          background: rgba(0,210,100,0.1);
          border: 1px solid rgba(0,210,100,0.25);
          color: #5de8a0;
        }

        /* Buttons */
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
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(108,99,255,0.35);
        }
        .btn-primary:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 6px 28px rgba(108,99,255,0.45); }
        .btn-primary:active:not(:disabled) { transform: translateY(0); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-ghost {
          width: 100%;
          padding: 0.85rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: rgba(255,255,255,0.65);
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.09); color: #fff; transform: translateY(-1px); }

        .btn-row { display: flex; gap: 0.75rem; }
        .btn-row .btn-ghost,
        .btn-row .btn-primary { flex: 1; width: auto; }

        /* Step form animation */
        .step-form {
          animation: fadeIn 0.35s ease both;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }

        /* Row layout for name fields on wider screens */
        @media (min-width: 420px) {
          .name-row { display: flex; gap: 0.75rem; }
          .name-row .field { flex: 1; }
        }

        /* Footer link */
        .footer-text {
          text-align: center;
          margin-top: 1.5rem;
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

        /* Spinner */
        .spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="signup-root">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <div className="card">
          <h1 className="heading">Create Account</h1>
          <p className="subheading">Join in just two quick steps</p>

          {/* Step indicator */}
          <div className="steps">
            <div className="step-wrapper">
              <div className={`step-circle ${currentStep >= 1 ? "active" : "inactive"}`}>1</div>
              <span className={`step-label ${currentStep >= 1 ? "active-label" : ""}`}>Basics</span>
            </div>
            <div className={`step-line ${currentStep >= 2 ? "filled" : ""}`} />
            <div className="step-wrapper">
              <div className={`step-circle ${currentStep >= 2 ? "active" : "inactive"}`}>2</div>
              <span className={`step-label ${currentStep >= 2 ? "active-label" : ""}`}>Profile</span>
            </div>
          </div>

          <form onSubmit={handleSignup}>

            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="field-group step-form">
                <div className="name-row">
                  <div className="field">
                    <label className="label-text">First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Jane"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label-text">Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Doe"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label-text">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label className="label-text">Password</label>
                  <div className="pw-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="pass"
                      placeholder="Min. 8 characters"
                      value={formData.pass}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="pw-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <button type="button" className="btn-primary" onClick={nextStep}>
                  Continue →
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="field-group step-form">
                <div className="name-row">
                  <div className="field">
                    <label className="label-text">Age</label>
                    <input
                      type="number"
                      name="age"
                      placeholder="25"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label-text">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label className="label-text">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="React, Node.js, Python..."
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label className="label-text">Profile Photo</label>
                  <label className="file-label">
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <div className="file-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a48fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                    <span className="file-text">
                      {formData.photo
                        ? <><strong>{formData.photo.name}</strong></>
                        : <><strong>Choose photo</strong> or drag & drop</>
                      }
                    </span>
                  </label>
                </div>

                {preview && (
                  <div className="avatar-preview">
                    <img src={preview} alt="Preview" />
                  </div>
                )}

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="btn-row">
                  <button type="button" className="btn-ghost" onClick={prevStep}>← Back</button>
                  <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading && <span className="spinner" />}
                    {isLoading ? "Creating..." : "Create Account"}
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="footer-text">
            Already have an account?{" "}
            <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { BASE_URL } from "../utils/const";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     pass: "",
//     age: "",
//     gender: "",
//     skills: "",
//     photo: null
//   });

//   const [preview, setPreview] = useState(null);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       setFormData({ ...formData, [name]: files[0] });
//       setPreview(URL.createObjectURL(files[0]));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const nextStep = () => {
//     if (
//       !formData.firstname ||
//       !formData.lastname ||
//       !formData.email ||
//       !formData.pass
//     ) {
//       setError("Please fill all required fields");
//       return;
//     }

//     setError("");
//     setCurrentStep(2);
//   };

//   const prevStep = () => {
//     setError("");
//     setCurrentStep(1);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     setError("");
//     setIsLoading(true);

//     try {
//       const data = new FormData();

//       data.append("firstname", formData.firstname);
//       data.append("lastname", formData.lastname);
//       data.append("email", formData.email);
//       data.append("pass", formData.pass);
//       data.append("age", formData.age);
//       data.append("gender", formData.gender);

//       const skillsArray = formData.skills
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean);

//       data.append("skills", JSON.stringify(skillsArray));

//       if (formData.photo) {
//         data.append("photo", formData.photo);
//       }

//       await axios.post(`${BASE_URL}/auth/signup`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });

//       setSuccess("Signup successful! Redirecting...");

//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data || "Signup failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300 px-4 py-10">

//       <div className="card w-full max-w-xl bg-base-300 shadow-xl">

//         <div className="card-body">

//           <h2 className="text-3xl font-bold text-center mb-4">
//             Create Account
//           </h2>

//           {/* STEP INDICATOR */}

//           <div className="flex justify-center mb-6">
//             <div className="flex items-center gap-3">
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-white" : "bg-base-200"}`}>
//                 1
//               </div>

//               <div className="w-10 h-1 bg-base-200"></div>

//               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-white" : "bg-base-200"}`}>
//                 2
//               </div>
//             </div>
//           </div>

//           <form onSubmit={handleSignup}>

//             {/* STEP 1 */}

//             {currentStep === 1 && (
//               <div className="space-y-4">

//                 <input
//                   type="text"
//                   name="firstname"
//                   placeholder="First Name"
//                   className="input input-bordered w-full"
//                   value={formData.firstname}
//                   onChange={handleChange}
//                 />

//                 <input
//                   type="text"
//                   name="lastname"
//                   placeholder="Last Name"
//                   className="input input-bordered w-full"
//                   value={formData.lastname}
//                   onChange={handleChange}
//                 />

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   className="input input-bordered w-full"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />

//                 <div className="relative">

//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="pass"
//                     placeholder="Password"
//                     className="input input-bordered w-full"
//                     value={formData.pass}
//                     onChange={handleChange}
//                   />

//                   <button
//                     type="button"
//                     className="absolute right-3 top-2 text-sm"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? "Hide" : "Show"}
//                   </button>

//                 </div>

//                 <button
//                   type="button"
//                   className="btn btn-primary w-full"
//                   onClick={nextStep}
//                 >
//                   Continue
//                 </button>

//               </div>
//             )}

//             {/* STEP 2 */}

//             {currentStep === 2 && (
//               <div className="space-y-4">

//                 <input
//                   type="number"
//                   name="age"
//                   placeholder="Age"
//                   className="input input-bordered w-full"
//                   value={formData.age}
//                   onChange={handleChange}
//                 />

//                 <select
//                   name="gender"
//                   className="select select-bordered w-full"
//                   value={formData.gender}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Gender</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>

//                 <input
//                   type="text"
//                   name="skills"
//                   placeholder="Skills (React, Node, Java)"
//                   className="input input-bordered w-full"
//                   value={formData.skills}
//                   onChange={handleChange}
//                 />

//                 {/* PHOTO UPLOAD */}

//                 <div>

//                   <label className="label">
//                     <span className="label-text">Profile Photo</span>
//                   </label>

//                   <input
//                     type="file"
//                     name="photo"
//                     accept="image/*"
//                     className="file-input file-input-bordered w-full"
//                     onChange={handleChange}
//                   />

//                 </div>

//                 {/* PREVIEW */}

//                 {preview && (
//                   <div className="flex justify-center">
//                     <img
//                       src={preview}
//                       alt="preview"
//                       className="w-24 h-24 rounded-full object-cover mt-2"
//                     />
//                   </div>
//                 )}

//                 {error && (
//                   <div className="alert alert-error text-sm">{error}</div>
//                 )}

//                 {success && (
//                   <div className="alert alert-success text-sm">{success}</div>
//                 )}

//                 <div className="flex gap-3">

//                   <button
//                     type="button"
//                     className="btn btn-outline w-full"
//                     onClick={prevStep}
//                   >
//                     Back
//                   </button>

//                   <button
//                     type="submit"
//                     className="btn btn-primary w-full"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Creating..." : "Create Account"}
//                   </button>

//                 </div>

//               </div>
//             )}

//           </form>

//           <p className="text-center mt-4 text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-primary font-semibold">
//               Login
//             </Link>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { BASE_URL } from "../utils/const";

// const Signup = () => {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         firstname: "",
//         lastname: "",
//         email: "",
//         pass: "",
//         age: "",
//         gender: "",
//         skills: "",
//         photoURL: ""
//     });

//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [currentStep, setCurrentStep] = useState(1);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");
//         setIsLoading(true);

//         try {
//             const payload = {
//                 ...formData,
//                 age: Number(formData.age),
//                 skills: formData.skills
//                     .split(",")
//                     .map((skill) => skill.trim())
//                     .filter(Boolean)
//             };

//             await axios.post(`${BASE_URL}/auth/signup`, payload);

//             setSuccess("Signup successful! Redirecting to login...");
//             setTimeout(() => navigate("/login"), 1500);
//         } catch (err) {
//             console.error(err);
//             setError(err.response?.data || "Signup failed");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const nextStep = () => {
//         if (currentStep === 1 && (!formData.firstname || !formData.lastname || !formData.email || !formData.pass)) {
//             setError("Please fill all required fields");
//             return;
//         }
//         setError("");
//         setCurrentStep(2);
//     };

//     const prevStep = () => {
//         setError("");
//         setCurrentStep(1);
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300 px-4 py-10">
//             <div className="w-full max-w-2xl">
//                 {/* Decorative elements */}
//                 <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
//                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>

//                 <div className="card bg-base-300/80 backdrop-blur-xl shadow-2xl border border-base-content/10 hover:shadow-secondary/20 transition-all duration-300">
//                     <div className="card-body p-8">
//                         {/* Header */}
//                         <div className="text-center mb-6">
//                             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="h-8 w-8 text-secondary"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
//                                     />
//                                 </svg>
//                             </div>
//                             <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
//                                 Create Account
//                             </h2>
//                             <p className="text-base-content/60 mt-2">
//                                 Join us and start your journey today
//                             </p>
//                         </div>

//                         {/* Progress Steps */}
//                         <div className="flex items-center justify-center mb-8">
//                             <div className="flex items-center gap-2">
//                                 <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-base-200 text-base-content/40'} transition-all`}>
//                                     {currentStep > 1 ? (
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                         </svg>
//                                     ) : (
//                                         <span className="font-semibold">1</span>
//                                     )}
//                                 </div>
//                                 <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-base-200'} transition-all`}></div>
//                                 <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-base-200 text-base-content/40'} transition-all`}>
//                                     <span className="font-semibold">2</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <form onSubmit={handleSignup}>
//                             {/* Step 1: Basic Info */}
//                             {currentStep === 1 && (
//                                 <div className="space-y-4">
//                                     {/* Name Row */}
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <label className="form-control w-full">
//                                             <div className="label">
//                                                 <span className="label-text font-medium">First Name *</span>
//                                             </div>
//                                             <div className="relative">
//                                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                                     </svg>
//                                                 </div>
//                                                 <input
//                                                     type="text"
//                                                     name="firstname"
//                                                     value={formData.firstname}
//                                                     placeholder="John"
//                                                     className="input input-bordered w-full pl-10 focus:input-primary transition-all"
//                                                     onChange={handleChange}
//                                                     required
//                                                 />
//                                             </div>
//                                         </label>

//                                         <label className="form-control w-full">
//                                             <div className="label">
//                                                 <span className="label-text font-medium">Last Name *</span>
//                                             </div>
//                                             <div className="relative">
//                                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                                     </svg>
//                                                 </div>
//                                                 <input
//                                                     type="text"
//                                                     name="lastname"
//                                                     value={formData.lastname}
//                                                     placeholder="Doe"
//                                                     className="input input-bordered w-full pl-10 focus:input-primary transition-all"
//                                                     onChange={handleChange}
//                                                     required
//                                                 />
//                                             </div>
//                                         </label>
//                                     </div>

//                                     {/* Email */}
//                                     <label className="form-control w-full">
//                                         <div className="label">
//                                             <span className="label-text font-medium">Email Address *</span>
//                                         </div>
//                                         <div className="relative">
//                                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                                                 </svg>
//                                             </div>
//                                             <input
//                                                 type="email"
//                                                 name="email"
//                                                 value={formData.email}
//                                                 placeholder="you@example.com"
//                                                 className="input input-bordered w-full pl-10 focus:input-primary transition-all"
//                                                 onChange={handleChange}
//                                                 required
//                                             />
//                                         </div>
//                                     </label>

//                                     {/* Password */}
//                                     <label className="form-control w-full">
//                                         <div className="label">
//                                             <span className="label-text font-medium">Password *</span>
//                                         </div>
//                                         <div className="relative">
//                                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                                                 </svg>
//                                             </div>
//                                             <input
//                                                 type={showPassword ? "text" : "password"}
//                                                 name="pass"
//                                                 value={formData.pass}
//                                                 placeholder="Create a strong password"
//                                                 className="input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all"
//                                                 onChange={handleChange}
//                                                 required
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                                             >
//                                                 {showPassword ? (
//                                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40 hover:text-base-content/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                                                     </svg>
//                                                 ) : (
//                                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40 hover:text-base-content/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                                     </svg>
//                                                 )}
//                                             </button>
//                                         </div>
//                                     </label>

//                                     <button
//                                         type="button"
//                                         onClick={nextStep}
//                                         className="btn btn-primary w-full mt-6 group"
//                                     >
//                                         <span className="flex items-center justify-center gap-2">
//                                             Continue
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                                             </svg>
//                                         </span>
//                                     </button>
//                                 </div>
//                             )}

//                             {/* Step 2: Additional Info */}
//                             {currentStep === 2 && (
//                                 <div className="space-y-4">
//                                     {/* Age & Gender */}
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <label className="form-control w-full">
//                                             <div className="label">
//                                                 <span className="label-text font-medium">Age</span>
//                                             </div>
//                                             <div className="relative">
//                                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                                     </svg>
//                                                 </div>
//                                                 <input
//                                                     type="number"
//                                                     name="age"
//                                                     value={formData.age}
//                                                     placeholder="25"
//                                                     className="input input-bordered w-full pl-10 focus:input-primary transition-all"
//                                                     onChange={handleChange}
//                                                 />
//                                             </div>
//                                         </label>

//                                         <label className="form-control w-full">
//                                             <div className="label">
//                                                 <span className="label-text font-medium">Gender</span>
//                                             </div>
//                                             <select
//                                                 name="gender"
//                                                 value={formData.gender}
//                                                 className="select select-bordered w-full focus:select-primary transition-all"
//                                                 onChange={handleChange}
//                                             >
//                                                 <option value="">Select Gender</option>
//                                                 <option value="Male">Male</option>
//                                                 <option value="Female">Female</option>
//                                                 <option value="Other">Other</option>
//                                             </select>
//                                         </label>
//                                     </div>

//                                     {/* Skills */}
//                                     <label className="form-control w-full">
//                                         <div className="label">
//                                             <span className="label-text font-medium">Skills</span>
//                                             <span className="label-text-alt text-base-content/40">Comma separated</span>
//                                         </div>
//                                         <div className="relative">
//                                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                                                 </svg>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 name="skills"
//                                                 value={formData.skills}
//                                                 placeholder="React, Node.js, Python"
//                                                 className="input input-bordered w-full pl-10 focus:input-primary transition-all"
//                                                 onChange={handleChange}
//                                             />
//                                         </div>
//                                     </label>

//                                     {/* Photo URL */}
//                                     <label className="form-control w-full">
//                                         <div className="label">
//                                             <span className="label-text font-medium">Profile Photo URL</span>
//                                         </div>
//                                         <div className="relative">
//                                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                                 </svg>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 name="photoURL"
//                                                 value={formData.photoURL}
//                                                 placeholder="https://example.com/photo.jpg"
//                                                 className="input input-bordered w-full pl-10 focus:input-primary transition-all"
//                                                 onChange={handleChange}
//                                             />
//                                         </div>
//                                     </label>

//                                     {/* Error/Success Messages */}
//                                     {error && (
//                                         <div className="alert alert-error animate-shake">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                             </svg>
//                                             <span className="text-sm">{error}</span>
//                                         </div>
//                                     )}

//                                     {success && (
//                                         <div className="alert alert-success">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                             </svg>
//                                             <span className="text-sm">{success}</span>
//                                         </div>
//                                     )}

//                                     {/* Action Buttons */}
//                                     <div className="flex gap-3 mt-6">
//                                         <button
//                                             type="button"
//                                             onClick={prevStep}
//                                             className="btn btn-outline flex-1 group"
//                                         >
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
//                                             </svg>
//                                             Back
//                                         </button>
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary flex-1 group relative overflow-hidden"
//                                             disabled={isLoading}
//                                         >
//                                             <span className="relative z-10 flex items-center justify-center gap-2">
//                                                 {isLoading ? (
//                                                     <>
//                                                         <span className="loading loading-spinner loading-sm"></span>
//                                                         Creating...
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         Create Account
//                                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                                         </svg>
//                                                     </>
//                                                 )}
//                                             </span>
//                                             <div className="absolute inset-0 bg-gradient-to-r from-primary-focus to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </form>

//                         {/* Login Link */}
//                         <div className="text-center mt-6">
//                             <p className="text-sm text-base-content/60">
//                                 Already have an account?{" "}
//                                 <Link
//                                     to="/login"
//                                     className="text-primary font-semibold hover:text-primary-focus transition-colors"
//                                 >
//                                     Sign in
//                                 </Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="text-center mt-6 text-sm text-base-content/40">
//                     <p>By signing up, you agree to our Terms & Privacy Policy</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/const";

// const Signup = () => {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         firstname: "",
//         lastname: "",
//         email: "",
//         pass: "",
//         age: "",
//         gender: "",
//         skills: "",
//         photoURL: ""
//     });

//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSignup = async () => {
//         try {
//             setError("");
//             setSuccess("");

//             const payload = {
//                 ...formData,
//                 age: Number(formData.age),
//                 skills: formData.skills
//                     .split(",")
//                     .map((skill) => skill.trim())
//                     .filter(Boolean)
//             };

//             await axios.post(`${BASE_URL}/auth/signup`, payload);

//             setSuccess("Signup successful! Redirecting to login...");
//             setTimeout(() => navigate("/login"), 1500);
//         } catch (err) {
//             console.error(err);
//             setError(err.response?.data || "Signup failed");
//         }
//     };

//     return (
//         <div className="flex justify-center my-10">
//             <div className="card bg-base-300 w-96 shadow-xl">
//                 <div className="card-body">
//                     <h2 className="card-title justify-center">Sign Up</h2>

//                     <input
//                         type="text"
//                         name="firstname"
//                         placeholder="First Name"
//                         className="input input-bordered w-full my-1"
//                         onChange={handleChange}
//                     />

//                     <input
//                         type="text"
//                         name="lastname"
//                         placeholder="Last Name"
//                         className="input input-bordered w-full my-1"
//                         onChange={handleChange}
//                     />

//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         className="input input-bordered w-full my-1"
//                         onChange={handleChange}
//                     />

//                     <input
//                         type="password"
//                         name="pass"
//                         placeholder="Password"
//                         className="input input-bordered w-full my-1"
//                         onChange={handleChange}
//                     />

//                     <input
//                         type="number"
//                         name="age"
//                         placeholder="Age"
//                         className="input input-bordered w-full my-1"
//                         onChange={handleChange}
//                     />

//                     <select
//                         name="gender"
//                         className="select select-bordered w-full my-1"
//                         onChange={handleChange}
//                     >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                     </select>


//                     <input
//                         type="text"
//                         name="skills"
//                         placeholder="Skills (comma separated)"
//                         className="input input-bordered w-full my-1"
//                         onChange={handleChange}
//                     />

//                     <input
//                         type="text"
//                         name="photoURL"
//                         placeholder="Photo URL"
//                         className="input input-bordered w-full my-1"
//                         onChange={handleChange}
//                     />

//                     {error && <p className="text-red-500 text-center">{error}</p>}
//                     {success && <p className="text-green-500 text-center">{success}</p>}

//                     <button className="btn btn-primary mt-3" onClick={handleSignup}>
//                         Create Account
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;
