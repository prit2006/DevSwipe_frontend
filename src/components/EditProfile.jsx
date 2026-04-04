// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { BASE_URL } from "../utils/const";
// import { addUser } from "../utils/userSlice";
// import EditUserCard from "./EditUserCard";

// const EditProfile = ({ user }) => {

//   const dispatch = useDispatch();

//   const [firstname, setFirstname] = useState(user?.firstname || "");
//   const [lastname, setLastname] = useState(user?.lastname || "");
//   const [age, setAge] = useState(user?.age || "");
//   const [gender, setGender] = useState(user?.gender || "");
//   const [about, setAbout] = useState(user?.about || "");

//   const [skills, setSkills] = useState(
//     user?.skills ? user.skills.join(",") : ""
//   );

//   const [photo, setPhoto] = useState(null);
//   const [preview, setPreview] = useState(user?.photoURL || "");

//   const [error, setError] = useState("");
//   const [showToast, setShowToast] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     setPhoto(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const saveProfile = async () => {

//     setError("");
//     setLoading(true);

//     try {

//       const formData = new FormData();

//       formData.append("firstname", firstname);
//       formData.append("lastname", lastname);
//       formData.append("age", age);
//       formData.append("gender", gender);
//       formData.append("about", about);

//       const skillsArray = skills
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean);

//       formData.append("skills", JSON.stringify(skillsArray));

//       if (photo) {
//         formData.append("photo", photo);
//       }

//       const res = await axios.patch(
//         `${BASE_URL}/profile/edit`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       dispatch(addUser(res.data));

//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);

//     } catch (err) {
//       setError(err?.response?.data || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center my-10 gap-10 flex-wrap">

//         {/* ================= FORM ================= */}

//         <div className="card bg-base-300 w-96 shadow-xl">
//           <div className="card-body">

//             <h2 className="card-title justify-center">
//               Edit Profile
//             </h2>

//             {/* First Name */}

//             <input
//               type="text"
//               placeholder="First Name"
//               value={firstname}
//               onChange={(e) => setFirstname(e.target.value)}
//               className="input input-bordered w-full my-2"
//             />

//             {/* Last Name */}

//             <input
//               type="text"
//               placeholder="Last Name"
//               value={lastname}
//               onChange={(e) => setLastname(e.target.value)}
//               className="input input-bordered w-full my-2"
//             />

//             {/* Age */}

//             <input
//               type="number"
//               placeholder="Age"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="input input-bordered w-full my-2"
//             />

//             {/* Gender */}

//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="select select-bordered w-full my-2"
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>

//             {/* Skills */}

//             <input
//               type="text"
//               placeholder="Skills (React, Node, Java)"
//               value={skills}
//               onChange={(e) => setSkills(e.target.value)}
//               className="input input-bordered w-full my-2"
//             />

//             {/* About */}

//             <textarea
//               placeholder="About you"
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//               className="textarea textarea-bordered w-full my-2"
//             />

//             {/* Photo Upload */}

//             <label className="label mt-2">
//               <span className="label-text">Upload Profile Photo</span>
//             </label>

//             <input
//               type="file"
//               accept="image/*"
//               className="file-input file-input-bordered w-full"
//               onChange={handlePhotoChange}
//             />

//             {/* Preview */}

//             {preview && (
//               <div className="flex justify-center mt-4">
//                 <img
//                   src={preview}
//                   alt="preview"
//                   className="w-24 h-24 rounded-full object-cover"
//                 />
//               </div>
//             )}

//             {error && (
//               <p className="text-red-500 text-center text-sm mt-2">
//                 {error}
//               </p>
//             )}

//             {/* Save Button */}

//             <div className="card-actions justify-center mt-4">

//               <button
//                 className="btn btn-primary"
//                 onClick={saveProfile}
//                 disabled={loading}
//               >

//                 {loading ? (
//                   <>
//                     <span className="loading loading-spinner loading-sm"></span>
//                     Saving...
//                   </>
//                 ) : (
//                   "Save Profile"
//                 )}

//               </button>

//             </div>
//           </div>
//         </div>

//         {/* ================= LIVE PREVIEW ================= */}

//         <EditUserCard
//           user={{
//             firstname,
//             lastname,
//             photoURL: preview,
//             about,
//             age,
//             gender,
//             skills: skills
//               .split(",")
//               .map((s) => s.trim())
//               .filter(Boolean),
//           }}
//         />

//       </div>

//       {/* ================= SUCCESS TOAST ================= */}

//       {showToast && (
//         <div className="toast toast-top toast-center pt-20">
//           <div className="alert alert-success">
//             <span>Profile saved successfully</span>
//           </div>
//         </div>
//       )}

//     </>
//   );
// };

// export default EditProfile;


// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useDispatch } from "react-redux";
// // import { BASE_URL } from "../utils/const";
// // import { addUser } from "../utils/userSlice";
// // import EditUserCard from "./EditUserCard";

// // const EditProfile = ({ user }) => {
// //   const dispatch = useDispatch();

// //   const [firstname, setFirstname] = useState(user?.firstname || "");
// //   const [lastname, setLastname] = useState(user?.lastname || "");
// //   const [age, setAge] = useState(user?.age || "");
// //   const [gender, setGender] = useState(user?.gender || "");
// //   const [about, setAbout] = useState(user?.about || "");

// //   const [skills, setSkills] = useState(
// //     user?.skills ? user.skills.join(",") : ""
// //   );

// //   const [photo, setPhoto] = useState(null);
// //   const [preview, setPreview] = useState(user?.photoURL || "");

// //   const [error, setError] = useState("");
// //   const [showToast, setShowToast] = useState(false);

// //   const handlePhotoChange = (e) => {
// //     const file = e.target.files[0];

// //     if (file) {
// //       setPhoto(file);
// //       setPreview(URL.createObjectURL(file));
// //     }
// //   };

// //   const saveProfile = async () => {
// //     setError("");

// //     try {
// //       const formData = new FormData();

// //       formData.append("firstname", firstname);
// //       formData.append("lastname", lastname);
// //       formData.append("age", age);
// //       formData.append("gender", gender);
// //       formData.append("about", about);

// //       const skillsArray = skills
// //         .split(",")
// //         .map((s) => s.trim())
// //         .filter(Boolean);

// //       formData.append("skills", JSON.stringify(skillsArray));

// //       if (photo) {
// //         formData.append("photo", photo);
// //       }

// //       const res = await axios.patch(
// //         `${BASE_URL}/profile/edit`,
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //           withCredentials: true,
// //         }
// //       );

// //       dispatch(addUser(res.data));

// //       setShowToast(true);
// //       setTimeout(() => setShowToast(false), 3000);
// //     } catch (err) {
// //       setError(err?.response?.data || "Something went wrong");
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="flex justify-center my-10 gap-10 flex-wrap">

// //         {/* ================= FORM ================= */}

// //         <div className="card bg-base-300 w-96 shadow-xl">
// //           <div className="card-body">

// //             <h2 className="card-title justify-center">
// //               Edit Profile
// //             </h2>

// //             {/* First Name */}

// //             <input
// //               type="text"
// //               placeholder="First Name"
// //               value={firstname}
// //               onChange={(e) => setFirstname(e.target.value)}
// //               className="input input-bordered w-full my-2"
// //             />

// //             {/* Last Name */}

// //             <input
// //               type="text"
// //               placeholder="Last Name"
// //               value={lastname}
// //               onChange={(e) => setLastname(e.target.value)}
// //               className="input input-bordered w-full my-2"
// //             />

// //             {/* Age */}

// //             <input
// //               type="number"
// //               placeholder="Age"
// //               value={age}
// //               onChange={(e) => setAge(e.target.value)}
// //               className="input input-bordered w-full my-2"
// //             />

// //             {/* Gender */}

// //             <select
// //               value={gender}
// //               onChange={(e) => setGender(e.target.value)}
// //               className="select select-bordered w-full my-2"
// //             >
// //               <option value="">Select Gender</option>
// //               <option value="Male">Male</option>
// //               <option value="Female">Female</option>
// //               <option value="Other">Other</option>
// //             </select>

// //             {/* Skills */}

// //             <input
// //               type="text"
// //               placeholder="Skills (React, Node, Java)"
// //               value={skills}
// //               onChange={(e) => setSkills(e.target.value)}
// //               className="input input-bordered w-full my-2"
// //             />

// //             {/* About */}

// //             <textarea
// //               placeholder="About you"
// //               value={about}
// //               onChange={(e) => setAbout(e.target.value)}
// //               className="textarea textarea-bordered w-full my-2"
// //             />

// //             {/* Photo Upload */}

// //             <label className="label mt-2">
// //               <span className="label-text">Upload Profile Photo</span>
// //             </label>

// //             <input
// //               type="file"
// //               accept="image/*"
// //               className="file-input file-input-bordered w-full"
// //               onChange={handlePhotoChange}
// //             />

     

// //             <div className="card-actions justify-center mt-4">
// //               <button
// //                 className="btn btn-primary"
// //                 onClick={saveProfile}
// //               >
// //                 Save Profile
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ================= LIVE PREVIEW ================= */}

// //         <EditUserCard
// //           user={{
// //             firstname,
// //             lastname,
// //             photoURL: preview,
// //             about,
// //             age,
// //             gender,
// //             skills: skills
// //               .split(",")
// //               .map((s) => s.trim())
// //               .filter(Boolean),
// //           }}
// //         />

// //       </div>

// //       {/* ================= SUCCESS TOAST ================= */}

// //       {showToast && (
// //         <div className="toast toast-top toast-center pt-20">
// //           <div className="alert alert-success">
// //             <span>Profile saved successfully</span>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default EditProfile;

// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useDispatch } from "react-redux";
// // import { BASE_URL } from "../utils/const";
// // import { addUser } from "../utils/userSlice";
// // import EditUserCard from "./EditUserCard";

// // const EditProfile = ({ user }) => {
// //   const dispatch = useDispatch();
// //   const isedit = true;

// //   // 🔹 State initialization (safe defaults)
// //   const [firstname, setFirstname] = useState(user?.firstname || "");
// //   const [lastname, setLastname] = useState(user?.lastname || "");
// //   const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
// //   const [age, setAge] = useState(user?.age || "");
// //   const [gender, setGender] = useState(user?.gender || "");
// //   const [about, setAbout] = useState(user?.about || "");
// //   const [skills, setSkills] = useState(user?.skills || []);
// //   const [error, setError] = useState("");
// //   const [showToast, setShowToast] = useState(false);

// //  const saveProfile = async () => {
// //   setError("");

// //   try {
// //     const res = await axios.patch(
// //       `${BASE_URL}/profile/edit`,
// //       {
// //         firstname,
// //         lastname,
// //         photoURL,
// //         age,
// //         gender,
// //         about,
// //         skills,
// //       },
// //       { withCredentials: true }
// //     );

// //     dispatch(addUser(res.data));

// //     setShowToast(true);
// //     setTimeout(() => setShowToast(false), 3000);
// //   } catch (err) {
// //     setError(err?.response?.data || "Something went wrong");
// //   }
// // };


// //   return (
// //     <>
// //       <div className="flex justify-center my-10 gap-10 flex-wrap">
// //         {/* ================= FORM CARD ================= */}
// //         <div className="card bg-base-300 w-96 shadow-xl">
// //           <div className="card-body">
// //             <h2 className="card-title justify-center">Edit Profile</h2>

// //             {/* First Name */}
// //             <input
// //               type="text"
// //               placeholder="First Name"
// //               value={firstname}
// //               onChange={(e) => setFirstname(e.target.value)}
// //               className="input input-bordered w-full my-2"
// //             />

// //             {/* Last Name */}
// //             <input
// //               type="text"
// //               placeholder="Last Name"
// //               value={lastname}
// //               onChange={(e) => setLastname(e.target.value)}
// //               className="input input-bordered w-full my-2"
// //             />

// //             {/* Age */}
// //             <input
// //               type="number"
// //               placeholder="Age"
// //               value={age}
// //               onChange={(e) => setAge(e.target.value)}
// //               className="input input-bordered w-full my-2"
// //             />

// //             {/* Photo URL */}
// //             <input
// //               type="text"
// //               placeholder="Photo URL"
// //               value={photoURL}
// //               onChange={(e) => setPhotoURL(e.target.value)}
// //               className="input input-bordered w-full my-2"
// //             />

// //             {/* Gender */}
// //             <select
// //               value={gender}
// //               onChange={(e) => setGender(e.target.value)}
// //               className="select select-bordered w-full my-2"
// //             >
// //               <option value="">Select Gender</option>
// //               <option value="Male">Male</option>
// //               <option value="Female">Female</option>
// //               <option value="Other">Other</option>
// //             </select>

// //             {/* Skills */}
// //             <input
// //                     type="text"
// //                     value={skills}
// //                     onChange={(e) => setSkills(e.target.value.split(","))}
// //                     className="input input-bordered w-full max-w-xs"
// //                   />

// //             {/* About */}
// //             <textarea
// //               placeholder="About you"
// //               value={about}
// //               onChange={(e) => setAbout(e.target.value)}
// //               className="textarea textarea-bordered w-full my-2"
// //             />

// //             {error && (
// //               <p className="text-red-500 text-center text-sm">{error}</p>
// //             )}

// //             <div className="card-actions justify-center mt-4">
// //               <button className="btn btn-primary" onClick={saveProfile}>
// //                 Save Profile
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ================= LIVE PREVIEW CARD ================= */}
// //         <EditUserCard
// //           user={{
// //             firstname,
// //             lastname,
// //             photoURL,
// //             about,
// //             age,
// //             gender,
// //             skills,
// //           }}
// //         />
// //       </div>

// //       {/* ================= TOAST ================= */}
// //       {showToast && (
// //         <div className="toast toast-top toast-center pt-20">
// //           <div className="alert alert-success">
// //             <span>Profile saved successfully</span>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default EditProfile;



// // // import React, { useState } from "react";
// // // import UserCard from "./UserCard";
// // // import axios from "axios";
// // // import { BASE_URL } from "../utils/constants";
// // // import { useDispatch } from "react-redux";
// // // import { addUser } from "../utils/userSlice";

// // // const EditProfile = ({ user }) => {
// // //   const [firstName, setFirstname] = useState(user.firstname);
// // //   const [lastName, setLastName] = useState(user.lastname);
// // //   const [photoURL, setPhotoURL] = useState(user.photoURL);
// // //   const [age, setAge] = useState(user.age || "");
// // //   const [gender, setGender] = useState(user.gender);
// // //   const [about, setAbout] = useState(user.about);
// // //   const [skills, setSkills] = useState(user.skills || []);
// // //   const [error, setError] = useState("");
// // //   const [showToast, setShowToast] = useState(false);
// // //   const dispatch = useDispatch();

// // //   const saveProfile = async () => {
// // //     //clearing the errors
// // //     setError("");
// // //     try {
// // //       const res = await axios.post(
// // //         BASE_URL + "/profile/edit",
// // //         {
// // //           firstName,
// // //           lastName,
// // //           photoURL,
// // //           age,
// // //           gender,
// // //           about,
// // //           skills,
// // //         },
// // //         {
// // //           withCredentials: true,
// // //         }
// // //       );
// // //       dispatch(addUser(res.data.data));
// // //       setShowToast(true);
// // //       setTimeout(() => {
// // //         setShowToast(false);
// // //       }, 3000);
// // //     } catch (error) {
// // //       setError(error.response.data);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <div className="flex justify-center  my-10 max ">
// // //         <div className="flex justify-center mx-10 ">
// // //           <div className="card bg-base-300 w-96 shadow-xl">
// // //             <div className="card-body">
// // //               <h2 className="card-title justify-center">Edit Profile</h2>
// // //               <div>
// // //                 <label className="form-control w-full max-w-xs my-2">
// // //                   <div className="label">
// // //                     <span className="label-text">First Name</span>
// // //                   </div>
// // //                   <input
// // //                     type="text"
// // //                     value={firstName}
// // //                     onChange={(e) => setFirstname(e.target.value)}
// // //                     className="input input-bordered w-full max-w-xs"
// // //                   />
// // //                 </label>
// // //                 <label className="form-control w-full max-w-xs my-2">
// // //                   <div className="label">
// // //                     <span className="label-text">Last Name</span>
// // //                   </div>
// // //                   <input
// // //                     type="text"
// // //                     value={lastName}
// // //                     onChange={(e) => setLastName(e.target.value)}
// // //                     className="input input-bordered w-full max-w-xs"
// // //                   />
// // //                 </label>
// // //                 <label className="form-control w-full max-w-xs my-2">
// // //                   <div className="label">
// // //                     <span className="label-text">Age</span>
// // //                   </div>
// // //                   <input
// // //                     type="text"
// // //                     value={age}
// // //                     onChange={(e) => setAge(e.target.value)}
// // //                     className="input input-bordered w-full max-w-xs"
// // //                   />
// // //                 </label>
// // //                 <label className="form-control w-full max-w-xs my-2">
// // //                   <div className="label">
// // //                     <span className="label-text">PhotoURL</span>
// // //                   </div>
// // //                   <input
// // //                     type="text"
// // //                     value={photoURL}
// // //                     onChange={(e) => setPhotoURL(e.target.value)}
// // //                     className="input input-bordered w-full max-w-xs"
// // //                   />
// // //                 </label>
// // //                 <label className="form-control w-full max-w-xs my-2">
// // //                   <div className="label">
// // //                     <span className="label-text">Gender</span>
// // //                   </div>
// // //                   <div className="dropdown">
// // //                     <div tabIndex={0} role="button" className="btn m-1">
// // //                       {gender || "Select gender"}
// // //                     </div>
// // //                     <ul
// // //                       tabIndex={0}
// // //                       className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
// // //                     >
// // //                       <li>
// // //                         <button onClick={() => setGender("Male")}>Male</button>
// // //                       </li>
// // //                       <li>
// // //                         <button onClick={() => setGender("Female")}>
// // //                           Female
// // //                         </button>
// // //                       </li>
// // //                       <li>
// // //                         <button onClick={() => setGender("Others")}>
// // //                           Others
// // //                         </button>
// // //                       </li>
// // //                     </ul>
// // //                   </div>
// // //                 </label>
// // //                 <label className="form-control w-full max-w-xs my-2">
// // //                   <div className="label">
// // //                     <span className="label-text">Skills</span>
// // //                   </div>
// // //                   <input
// // //                     type="text"
// // //                     value={skills}
// // //                     onChange={(e) => setSkills(e.target.value.split(","))}
// // //                     className="input input-bordered w-full max-w-xs"
// // //                   />
// // //                 </label>

// // //                 <label className="form-control w-full max-w-xs my-2">
// // //                   <div className="label">
// // //                     <span className="label-text">About</span>
// // //                   </div>
// // //                   <textarea
// // //                     placeholder="Bio"
// // //                     type="text"
// // //                     value={about}
// // //                     onChange={(e) => setAbout(e.target.value)}
// // //                     className="input input-bordered w-full max-w-xs"
// // //                   ></textarea>
// // //                 </label>
// // //               </div>
// // //               <p className="text-red-500 text-center">{error}</p>
// // //               <div className="card-actions justify-center mt-2">
// // //                 <button className="btn btn-primary" onClick={saveProfile}>
// // //                   Save Profile
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <UserCard
// // //           user={{ firstName, lastName, photoURL, about, age, gender , skills }}
// // //         />
// // //       </div>
// // //       {showToast && (
// // //         <div className="toast toast-top toast-center pt-20 ">
// // //           <div className="alert alert-success">
// // //             <span>Profile saved successfully</span>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default EditProfile;

import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/const";
import { addUser } from "../utils/userSlice";
import EditUserCard from "./EditUserCard";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Mono:wght@400;500&display=swap');

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
    10%  { opacity:1; } 90% { opacity:0.6; }
    100% { transform: translateY(-10vh) translateX(var(--dx)) scale(1.5); opacity:0; }
  }
  @keyframes shimmerBorder {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes gradShift {
    0%,100% { background-position:0% 50%; }
    50%     { background-position:100% 50%; }
  }
  @keyframes cardEntry {
    0%   { opacity:0; transform:perspective(800px) rotateX(8deg) translateY(40px) scale(0.95); }
    100% { opacity:1; transform:perspective(800px) rotateX(0deg) translateY(0) scale(1); }
  }
  @keyframes toastSlide {
    from { opacity:0; transform:translateY(-20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .ep-card-entry { animation: cardEntry 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }

  .ep-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .ep-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.22);
    border-radius: 10px;
    color: rgba(255,255,255,0.8);
    padding: 11px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
    box-sizing: border-box;
  }
  .ep-input::placeholder { color: rgba(255,255,255,0.2); }
  .ep-input:focus {
    border-color: rgba(168,85,247,0.6);
    box-shadow: 0 0 16px rgba(124,58,237,0.2);
  }

  .ep-select {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.22);
    border-radius: 10px;
    color: rgba(255,255,255,0.8);
    padding: 11px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
    appearance: none;
    box-sizing: border-box;
  }
  .ep-select:focus {
    border-color: rgba(168,85,247,0.6);
    box-shadow: 0 0 16px rgba(124,58,237,0.2);
  }
  .ep-select option { background: #0d0520; color: white; }

  .ep-textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.22);
    border-radius: 10px;
    color: rgba(255,255,255,0.8);
    padding: 11px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    outline: none;
    resize: vertical;
    min-height: 90px;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
    box-sizing: border-box;
  }
  .ep-textarea::placeholder { color: rgba(255,255,255,0.2); }
  .ep-textarea:focus {
    border-color: rgba(168,85,247,0.6);
    box-shadow: 0 0 16px rgba(124,58,237,0.2);
  }

  .ep-file-btn {
    width: 100%;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px dashed rgba(124,58,237,0.35);
    background: rgba(124,58,237,0.05);
    color: rgba(167,139,250,0.7);
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    box-sizing: border-box;
  }
  .ep-file-btn:hover {
    border-color: rgba(168,85,247,0.6);
    background: rgba(124,58,237,0.1);
    color: rgba(167,139,250,1);
  }

  .ep-save-btn {
    width: 100%;
    padding: 13px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    box-shadow: 0 0 30px rgba(124,58,237,0.4);
    transition: opacity 0.2s, transform 0.15s;
  }
  .ep-save-btn:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
  .ep-save-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .ep-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(167,139,250,0.55);
    margin-bottom: 6px;
  }

  .ep-field { margin-bottom: 16px; }

  .ep-toast {
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    zIndex: 100;
    padding: 12px 24px;
    border-radius: 12px;
    background: rgba(5,150,105,0.15);
    border: 1px solid rgba(52,211,153,0.4);
    color: rgba(52,211,153,0.95);
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(5,150,105,0.2);
    animation: toastSlide 0.3s ease forwards;
    white-space: nowrap;
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

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills ? user.skills.join(",") : "");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(user?.photoURL || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const saveProfile = async () => {
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("about", about);
      const skillsArray = skills.split(",").map(s => s.trim()).filter(Boolean);
      formData.append("skills", JSON.stringify(skillsArray));
      if (photo) formData.append("photo", photo);
      const res = await axios.patch(`${BASE_URL}/profile/edit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* Toast */}
      {showToast && (
        <div className="ep-toast" style={{ zIndex:100 }}>
          ✔ Profile saved successfully
        </div>
      )}

      <div style={{ position:"relative", zIndex:5, maxWidth:1100, margin:"0 auto", padding:"80px 24px 48px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(167,139,250,0.5)", marginBottom:10 }}>your profile</p>
          <h1 className="ep-grad-title" style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:36, fontWeight:900, lineHeight:1.1 }}>
            Edit Profile
          </h1>
        </div>

        <div style={{ display:"flex", gap:28, justifyContent:"center", flexWrap:"wrap", alignItems:"flex-start" }}>

          {/* ── FORM CARD ── */}
          <div className="ep-card-entry" style={{
            flex:"1 1 360px", maxWidth:420,
            borderRadius:24,
            border:"1px solid rgba(124,58,237,0.22)",
            background:"rgba(255,255,255,0.03)",
            backdropFilter:"blur(40px)",
            boxShadow:"0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            overflow:"hidden",
            position:"relative",
          }}>
            {/* shimmer top bar */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed)", backgroundSize:"300% 100%", animation:"shimmerBorder 3s linear infinite" }}/>

            <div style={{ padding:"32px 28px 28px" }}>

              {/* Name row */}
              <div style={{ display:"flex", gap:12, marginBottom:16 }}>
                <div style={{ flex:1 }}>
                  <label className="ep-label">First Name</label>
                  <input className="ep-input" type="text" placeholder="First name" value={firstname} onChange={e => setFirstname(e.target.value)}/>
                </div>
                <div style={{ flex:1 }}>
                  <label className="ep-label">Last Name</label>
                  <input className="ep-input" type="text" placeholder="Last name" value={lastname} onChange={e => setLastname(e.target.value)}/>
                </div>
              </div>

              {/* Age + Gender row */}
              <div style={{ display:"flex", gap:12, marginBottom:16 }}>
                <div style={{ flex:1 }}>
                  <label className="ep-label">Age</label>
                  <input className="ep-input" type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)}/>
                </div>
                <div style={{ flex:1 }}>
                  <label className="ep-label">Gender</label>
                  <select className="ep-select" value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div className="ep-field">
                <label className="ep-label">Skills (comma separated)</label>
                <input className="ep-input" type="text" placeholder="React, Node, MongoDB..." value={skills} onChange={e => setSkills(e.target.value)}/>
              </div>

              {/* About */}
              <div className="ep-field">
                <label className="ep-label">About</label>
                <textarea className="ep-textarea" placeholder="Tell developers about yourself..." value={about} onChange={e => setAbout(e.target.value)}/>
              </div>

              {/* Photo Upload */}
              <div className="ep-field">
                <label className="ep-label">Profile Photo</label>
                <label className="ep-file-btn">
                  📷 {photo ? photo.name : "Choose photo..."}
                  <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display:"none" }}/>
                </label>
              </div>

              {/* Preview */}
              {preview && (
                <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
                  <div style={{ width:72, height:72, borderRadius:"50%", padding:2, background:"linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
                    <img src={preview} alt="preview" style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", display:"block" }}/>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div style={{ marginBottom:14, padding:"10px 14px", borderRadius:10, background:"rgba(236,72,153,0.08)", border:"1px solid rgba(236,72,153,0.25)" }}>
                  <p style={{ color:"rgba(236,72,153,0.85)", fontSize:11, fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>{error}</p>
                </div>
              )}

              {/* Save */}
              <button className="ep-save-btn" onClick={saveProfile} disabled={loading}>
                {loading
                  ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                      <span style={{ width:14, height:14, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"white", display:"inline-block", animation:"spinRing 0.8s linear infinite" }}/>
                      Saving...
                    </span>
                  : "Save Profile →"
                }
              </button>
            </div>
          </div>

          {/* ── LIVE PREVIEW ── */}
          <div className="ep-card-entry" style={{ flex:"0 0 auto", animationDelay:"0.12s" }}>
            <div style={{ marginBottom:12, textAlign:"center" }}>
              <span style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(6,182,212,0.5)" }}>live preview</span>
            </div>
            <EditUserCard
              user={{
                firstname, lastname,
                photoURL: preview,
                about, age, gender,
                skills: skills.split(",").map(s => s.trim()).filter(Boolean),
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;