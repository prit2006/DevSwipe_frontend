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
        photoURL: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const payload = {
                ...formData,
                age: Number(formData.age),
                skills: formData.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean)
            };

            await axios.post(`${BASE_URL}/auth/signup`, payload);

            setSuccess("Signup successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            console.error(err);
            setError(err.response?.data || "Signup failed");
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = () => {
        if (currentStep === 1 && (!formData.firstname || !formData.lastname || !formData.email || !formData.pass)) {
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300 px-4 py-10">
            <div className="w-full max-w-2xl">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>

                <div className="card bg-base-300/80 backdrop-blur-xl shadow-2xl border border-base-content/10 hover:shadow-secondary/20 transition-all duration-300">
                    <div className="card-body p-8">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-secondary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                                Create Account
                            </h2>
                            <p className="text-base-content/60 mt-2">
                                Join us and start your journey today
                            </p>
                        </div>

                        {/* Progress Steps */}
                        <div className="flex items-center justify-center mb-8">
                            <div className="flex items-center gap-2">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-base-200 text-base-content/40'} transition-all`}>
                                    {currentStep > 1 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="font-semibold">1</span>
                                    )}
                                </div>
                                <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-base-200'} transition-all`}></div>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-base-200 text-base-content/40'} transition-all`}>
                                    <span className="font-semibold">2</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSignup}>
                            {/* Step 1: Basic Info */}
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    {/* Name Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">First Name *</span>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="firstname"
                                                    value={formData.firstname}
                                                    placeholder="John"
                                                    className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </label>

                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Last Name *</span>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="lastname"
                                                    value={formData.lastname}
                                                    placeholder="Doe"
                                                    className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </label>
                                    </div>

                                    {/* Email */}
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-medium">Email Address *</span>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                </svg>
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                placeholder="you@example.com"
                                                className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </label>

                                    {/* Password */}
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-medium">Password *</span>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="pass"
                                                value={formData.pass}
                                                placeholder="Create a strong password"
                                                className="input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all"
                                                onChange={handleChange}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40 hover:text-base-content/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40 hover:text-base-content/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </label>

                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="btn btn-primary w-full mt-6 group"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            Continue
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            )}

                            {/* Step 2: Additional Info */}
                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    {/* Age & Gender */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Age</span>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="number"
                                                    name="age"
                                                    value={formData.age}
                                                    placeholder="25"
                                                    className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </label>

                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Gender</span>
                                            </div>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                className="select select-bordered w-full focus:select-primary transition-all"
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </label>
                                    </div>

                                    {/* Skills */}
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-medium">Skills</span>
                                            <span className="label-text-alt text-base-content/40">Comma separated</span>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                name="skills"
                                                value={formData.skills}
                                                placeholder="React, Node.js, Python"
                                                className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </label>

                                    {/* Photo URL */}
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-medium">Profile Photo URL</span>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                name="photoURL"
                                                value={formData.photoURL}
                                                placeholder="https://example.com/photo.jpg"
                                                className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </label>

                                    {/* Error/Success Messages */}
                                    {error && (
                                        <div className="alert alert-error animate-shake">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm">{error}</span>
                                        </div>
                                    )}

                                    {success && (
                                        <div className="alert alert-success">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm">{success}</span>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="btn btn-outline flex-1 group"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                            </svg>
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary flex-1 group relative overflow-hidden"
                                            disabled={isLoading}
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {isLoading ? (
                                                    <>
                                                        <span className="loading loading-spinner loading-sm"></span>
                                                        Creating...
                                                    </>
                                                ) : (
                                                    <>
                                                        Create Account
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </>
                                                )}
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary-focus to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-base-content/60">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-primary font-semibold hover:text-primary-focus transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-base-content/40">
                    <p>By signing up, you agree to our Terms & Privacy Policy</p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

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
