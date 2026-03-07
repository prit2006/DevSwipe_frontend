import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/const";
import { addUser } from "../utils/userSlice";
import EditUserCard from "./EditUserCard";

const EditProfile = ({ user }) => {

  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");

  const [skills, setSkills] = useState(
    user?.skills ? user.skills.join(",") : ""
  );

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

      const skillsArray = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      formData.append("skills", JSON.stringify(skillsArray));

      if (photo) {
        formData.append("photo", photo);
      }

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

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
    <>
      <div className="flex justify-center my-10 gap-10 flex-wrap">

        {/* ================= FORM ================= */}

        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">

            <h2 className="card-title justify-center">
              Edit Profile
            </h2>

            {/* First Name */}

            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="input input-bordered w-full my-2"
            />

            {/* Last Name */}

            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="input input-bordered w-full my-2"
            />

            {/* Age */}

            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full my-2"
            />

            {/* Gender */}

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full my-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {/* Skills */}

            <input
              type="text"
              placeholder="Skills (React, Node, Java)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="input input-bordered w-full my-2"
            />

            {/* About */}

            <textarea
              placeholder="About you"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full my-2"
            />

            {/* Photo Upload */}

            <label className="label mt-2">
              <span className="label-text">Upload Profile Photo</span>
            </label>

            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handlePhotoChange}
            />

            {/* Preview */}

            {preview && (
              <div className="flex justify-center mt-4">
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}

            {error && (
              <p className="text-red-500 text-center text-sm mt-2">
                {error}
              </p>
            )}

            {/* Save Button */}

            <div className="card-actions justify-center mt-4">

              <button
                className="btn btn-primary"
                onClick={saveProfile}
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  "Save Profile"
                )}

              </button>

            </div>
          </div>
        </div>

        {/* ================= LIVE PREVIEW ================= */}

        <EditUserCard
          user={{
            firstname,
            lastname,
            photoURL: preview,
            about,
            age,
            gender,
            skills: skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          }}
        />

      </div>

      {/* ================= SUCCESS TOAST ================= */}

      {showToast && (
        <div className="toast toast-top toast-center pt-20">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}

    </>
  );
};

export default EditProfile;


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

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setPhoto(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const saveProfile = async () => {
//     setError("");

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

     

//             <div className="card-actions justify-center mt-4">
//               <button
//                 className="btn btn-primary"
//                 onClick={saveProfile}
//               >
//                 Save Profile
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

// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { BASE_URL } from "../utils/const";
// import { addUser } from "../utils/userSlice";
// import EditUserCard from "./EditUserCard";

// const EditProfile = ({ user }) => {
//   const dispatch = useDispatch();
//   const isedit = true;

//   // 🔹 State initialization (safe defaults)
//   const [firstname, setFirstname] = useState(user?.firstname || "");
//   const [lastname, setLastname] = useState(user?.lastname || "");
//   const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
//   const [age, setAge] = useState(user?.age || "");
//   const [gender, setGender] = useState(user?.gender || "");
//   const [about, setAbout] = useState(user?.about || "");
//   const [skills, setSkills] = useState(user?.skills || []);
//   const [error, setError] = useState("");
//   const [showToast, setShowToast] = useState(false);

//  const saveProfile = async () => {
//   setError("");

//   try {
//     const res = await axios.patch(
//       `${BASE_URL}/profile/edit`,
//       {
//         firstname,
//         lastname,
//         photoURL,
//         age,
//         gender,
//         about,
//         skills,
//       },
//       { withCredentials: true }
//     );

//     dispatch(addUser(res.data));

//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   } catch (err) {
//     setError(err?.response?.data || "Something went wrong");
//   }
// };


//   return (
//     <>
//       <div className="flex justify-center my-10 gap-10 flex-wrap">
//         {/* ================= FORM CARD ================= */}
//         <div className="card bg-base-300 w-96 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title justify-center">Edit Profile</h2>

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

//             {/* Photo URL */}
//             <input
//               type="text"
//               placeholder="Photo URL"
//               value={photoURL}
//               onChange={(e) => setPhotoURL(e.target.value)}
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
//                     type="text"
//                     value={skills}
//                     onChange={(e) => setSkills(e.target.value.split(","))}
//                     className="input input-bordered w-full max-w-xs"
//                   />

//             {/* About */}
//             <textarea
//               placeholder="About you"
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//               className="textarea textarea-bordered w-full my-2"
//             />

//             {error && (
//               <p className="text-red-500 text-center text-sm">{error}</p>
//             )}

//             <div className="card-actions justify-center mt-4">
//               <button className="btn btn-primary" onClick={saveProfile}>
//                 Save Profile
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ================= LIVE PREVIEW CARD ================= */}
//         <EditUserCard
//           user={{
//             firstname,
//             lastname,
//             photoURL,
//             about,
//             age,
//             gender,
//             skills,
//           }}
//         />
//       </div>

//       {/* ================= TOAST ================= */}
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
// // import UserCard from "./UserCard";
// // import axios from "axios";
// // import { BASE_URL } from "../utils/constants";
// // import { useDispatch } from "react-redux";
// // import { addUser } from "../utils/userSlice";

// // const EditProfile = ({ user }) => {
// //   const [firstName, setFirstname] = useState(user.firstname);
// //   const [lastName, setLastName] = useState(user.lastname);
// //   const [photoURL, setPhotoURL] = useState(user.photoURL);
// //   const [age, setAge] = useState(user.age || "");
// //   const [gender, setGender] = useState(user.gender);
// //   const [about, setAbout] = useState(user.about);
// //   const [skills, setSkills] = useState(user.skills || []);
// //   const [error, setError] = useState("");
// //   const [showToast, setShowToast] = useState(false);
// //   const dispatch = useDispatch();

// //   const saveProfile = async () => {
// //     //clearing the errors
// //     setError("");
// //     try {
// //       const res = await axios.post(
// //         BASE_URL + "/profile/edit",
// //         {
// //           firstName,
// //           lastName,
// //           photoURL,
// //           age,
// //           gender,
// //           about,
// //           skills,
// //         },
// //         {
// //           withCredentials: true,
// //         }
// //       );
// //       dispatch(addUser(res.data.data));
// //       setShowToast(true);
// //       setTimeout(() => {
// //         setShowToast(false);
// //       }, 3000);
// //     } catch (error) {
// //       setError(error.response.data);
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="flex justify-center  my-10 max ">
// //         <div className="flex justify-center mx-10 ">
// //           <div className="card bg-base-300 w-96 shadow-xl">
// //             <div className="card-body">
// //               <h2 className="card-title justify-center">Edit Profile</h2>
// //               <div>
// //                 <label className="form-control w-full max-w-xs my-2">
// //                   <div className="label">
// //                     <span className="label-text">First Name</span>
// //                   </div>
// //                   <input
// //                     type="text"
// //                     value={firstName}
// //                     onChange={(e) => setFirstname(e.target.value)}
// //                     className="input input-bordered w-full max-w-xs"
// //                   />
// //                 </label>
// //                 <label className="form-control w-full max-w-xs my-2">
// //                   <div className="label">
// //                     <span className="label-text">Last Name</span>
// //                   </div>
// //                   <input
// //                     type="text"
// //                     value={lastName}
// //                     onChange={(e) => setLastName(e.target.value)}
// //                     className="input input-bordered w-full max-w-xs"
// //                   />
// //                 </label>
// //                 <label className="form-control w-full max-w-xs my-2">
// //                   <div className="label">
// //                     <span className="label-text">Age</span>
// //                   </div>
// //                   <input
// //                     type="text"
// //                     value={age}
// //                     onChange={(e) => setAge(e.target.value)}
// //                     className="input input-bordered w-full max-w-xs"
// //                   />
// //                 </label>
// //                 <label className="form-control w-full max-w-xs my-2">
// //                   <div className="label">
// //                     <span className="label-text">PhotoURL</span>
// //                   </div>
// //                   <input
// //                     type="text"
// //                     value={photoURL}
// //                     onChange={(e) => setPhotoURL(e.target.value)}
// //                     className="input input-bordered w-full max-w-xs"
// //                   />
// //                 </label>
// //                 <label className="form-control w-full max-w-xs my-2">
// //                   <div className="label">
// //                     <span className="label-text">Gender</span>
// //                   </div>
// //                   <div className="dropdown">
// //                     <div tabIndex={0} role="button" className="btn m-1">
// //                       {gender || "Select gender"}
// //                     </div>
// //                     <ul
// //                       tabIndex={0}
// //                       className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
// //                     >
// //                       <li>
// //                         <button onClick={() => setGender("Male")}>Male</button>
// //                       </li>
// //                       <li>
// //                         <button onClick={() => setGender("Female")}>
// //                           Female
// //                         </button>
// //                       </li>
// //                       <li>
// //                         <button onClick={() => setGender("Others")}>
// //                           Others
// //                         </button>
// //                       </li>
// //                     </ul>
// //                   </div>
// //                 </label>
// //                 <label className="form-control w-full max-w-xs my-2">
// //                   <div className="label">
// //                     <span className="label-text">Skills</span>
// //                   </div>
// //                   <input
// //                     type="text"
// //                     value={skills}
// //                     onChange={(e) => setSkills(e.target.value.split(","))}
// //                     className="input input-bordered w-full max-w-xs"
// //                   />
// //                 </label>

// //                 <label className="form-control w-full max-w-xs my-2">
// //                   <div className="label">
// //                     <span className="label-text">About</span>
// //                   </div>
// //                   <textarea
// //                     placeholder="Bio"
// //                     type="text"
// //                     value={about}
// //                     onChange={(e) => setAbout(e.target.value)}
// //                     className="input input-bordered w-full max-w-xs"
// //                   ></textarea>
// //                 </label>
// //               </div>
// //               <p className="text-red-500 text-center">{error}</p>
// //               <div className="card-actions justify-center mt-2">
// //                 <button className="btn btn-primary" onClick={saveProfile}>
// //                   Save Profile
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <UserCard
// //           user={{ firstName, lastName, photoURL, about, age, gender , skills }}
// //         />
// //       </div>
// //       {showToast && (
// //         <div className="toast toast-top toast-center pt-20 ">
// //           <div className="alert alert-success">
// //             <span>Profile saved successfully</span>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default EditProfile;