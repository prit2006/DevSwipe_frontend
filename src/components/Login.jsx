import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/const";

const Login = () => {
  const [emailId, setEmail] = useState("pritpastagiya2006@gmail.com");
  const [password, setPassword] = useState("Prit@2006");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/auth/login",
        {
          email: emailId,
          pass: password,
        },
        { withCredentials: true }
      );

      console.log(res.data);
      dispatch(addUser(res.data))
      navigate("/"); 
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          {error && (
            <p className="text-red-500 text-center mt-2">{error}</p>
          )}

          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


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
