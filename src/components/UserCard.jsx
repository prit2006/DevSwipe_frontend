import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/const";
import { removeUserFromFeed } from "../utils/feedSlice";
import { motion } from "framer-motion";

const SWIPE_THRESHOLD = 120;

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  if (!user) return null;

  const {
    _id,
    firstname,
    lastname,
    age,
    gender,
    about,
    photoURL,
    skills = [],
  } = user;

  const sendRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.error("Swipe Request Error:", error);
    }
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      // 👉 Right Swipe
      sendRequest("interested");
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      // 👈 Left Swipe
      sendRequest("ignored");
    }
  };

  return (
    <motion.div
      className="card bg-base-300 w-96 shadow-xl p-4 cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ rotate: 8, scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <figure>
        <img
          src={photoURL || "https://via.placeholder.com/300"}
          alt="User"
          className="rounded-xl"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstname} {lastname}
        </h2>

        {age && gender && (
          <p className="text-sm text-gray-500">
            {age}, {gender}
          </p>
        )}

        {about && <p>{about}</p>}

        {skills.length > 0 && (
          <div className="mt-2">
            <h3 className="font-semibold mb-1">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-700 px-2 py-1 rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;


// import axios from "axios";
// import React from "react";
// import { useDispatch } from "react-redux";
// import { BASE_URL } from "../utils/const";
// import { removeUserFromFeed } from "../utils/feedSlice";

// const UserCard = ({ user }) => {
//   const dispatch = useDispatch();

//   if (!user) return null;

//   const {
//     _id,
//     firstname,
//     lastname,
//     age,
//     gender,
//     about,
//     photoURL,
//     skills = [],
//   } = user;

//   const handleSendRequest = async (status, userId) => {
//     try {
//       await axios.post(
//         `${BASE_URL}/request/send/${status}/${userId}`,
//         {},
//         { withCredentials: true }
//       );

//       dispatch(removeUserFromFeed(userId));
//     } catch (error) {
//       console.error("Request Error:", error);
//     }
//   };

//   return (
//     <div className="card bg-base-300 w-96 shadow-xl p-4">
//       <figure>
//         <img
//           src={photoURL || "https://via.placeholder.com/300"}
//           alt="User"
//           className="rounded-xl"
//         />
//       </figure>

//       <div className="card-body">
//         <h2 className="card-title">
//           {firstname} {lastname}
//         </h2>

//         {age && gender && (
//           <p className="text-sm text-gray-500">
//             {age}, {gender}
//           </p>
//         )}

//         {about && <p>{about}</p>}

//         {skills.length > 0 && (
//           <div className="mt-2">
//             <h3 className="font-semibold mb-1">Skills</h3>
//             <div className="flex flex-wrap gap-2">
//               {skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="bg-blue-200 text-blue-700 px-2 py-1 rounded-lg text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="card-actions justify-center mt-4">
//           <button
//             className="btn btn-accent"
//             onClick={() => handleSendRequest("ignored", _id)}
//           >
//             Ignore
//           </button>

//           <button
//             className="btn btn-secondary"
//             onClick={() => handleSendRequest("interested", _id)}
//           >
//             Interested
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;
