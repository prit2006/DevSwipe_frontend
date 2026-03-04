import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

function Connections() {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-3xl text-gray-400 font-semibold">
          No Connections Yet
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-12 px-6">

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 
      bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
        Your Connections ({connections.length})
      </h1>

      {/* Cards */}
      <div className="grid gap-6">
        {connections.map((connection) => {
          const {
            _id,
            firstname,
            lastname,
            photoURL,
            age,
            gender,
            about,
          } = connection.connectionWith;

          return (
            <div
              key={_id}
              className="flex items-center justify-between p-6 rounded-2xl
              bg-slate-800/40 backdrop-blur-md border border-slate-700
              hover:border-blue-400 hover:scale-[1.02]
              transition duration-300 shadow-lg"
            >
              
              {/* Left Section */}
              <div className="flex items-center gap-5">

                {/* Avatar */}
                <div className="relative">
                  <img
                    src={photoURL}
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                  />

                  {/* Online Indicator */}
                  {/* <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-black rounded-full"></span> */}
                </div>

                {/* User Info */}
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {firstname} {lastname}
                  </h2>

                  {age && gender && (
                    <p className="text-sm text-blue-300">
                      {age} • {gender}
                    </p>
                  )}

                  <p className="text-gray-400 text-sm max-w-md">
                    {about}
                  </p>
                </div>
              </div>

              {/* Chat Button */}
              <Link to={"/chat/" + _id}>
                <button
                  className="px-5 py-2 rounded-lg font-semibold text-white
                  bg-gradient-to-r from-blue-500 to-cyan-500
                  hover:scale-105 transition shadow-md"
                >
                  💬 Chat
                </button>
              </Link>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Connections;

// import React, { useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnection } from "../utils/connectionSlice";
// import { Link } from "react-router-dom";

// function Connections() {
//   const connections = useSelector((store) => store.connection);
//   const dispatch = useDispatch();

//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(
//         BASE_URL + "/user/connection",
//         { withCredentials: true }
//       );

//       dispatch(addConnection(res.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   // ✅ HANDLE EMPTY OR NULL STATE PROPERLY
//   if (!connections || connections.length === 0) {
//     return (
//       <h1 className="flex justify-center text-2xl my-10 text-green-300">
//         No connections found
//       </h1>
//     );
//   }

//   return (
//     <div className="text-center my-10">
//       <h1 className="font-bold text-3xl text-pink-400">
//         Connections ({connections.length})
//       </h1>

//       {connections.map((connection) => {
//         const {
//           _id,
//           firstname,
//           lastname,
//           photoURL,
//           age,
//           gender,
//           about,
//         } = connection.connectionWith;

//         return (
//           <div
//             key={_id}
//             className="flex items-center m-2 p-2 rounded-lg bg-base-300 w-1/2 mx-auto"
//           >
//             <img
//               alt="photo"
//               className="w-14 h-14 rounded-full object-contain"
//               src={photoURL}
//             />

//             <div className="text-left m-4 p-4">
//               <h2 className="font-bold text-xl">
//                 {firstname} {lastname}
//               </h2>

//               {age && gender && <p>{age} • {gender}</p>}
//               <p>{about}</p>
//             </div>
//             <div className="border-t border-gray-700 my-1">
//                <Link to={"/chat/" + _id}>
//               <button className="btn btn-primary">Chat</button>
//             </Link>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Connections;



// import React, { useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnection, removeConnection } from "../utils/connectionSlice";

// function Connections() {
//   const connections = useSelector((store) => store.connection);
//   const dispatch = useDispatch();

//   const fetchConnections = async () => {
//     try {
//       dispatch(removeConnection());

//       const res = await axios.get(
//         BASE_URL + "/user/connection",
//         { withCredentials: true }
//       );

//       dispatch(addConnection(res.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connections) return null;

//   if (connections.length === 0) {
//     return (
//       <h1 className="flex justify-center text-2xl my-10 text-green-300">
//         No connections found
//       </h1>
//     );
//   }

//   return (
//     <div className="text-center my-10">
//       <h1 className="font-bold text-3xl text-pink-400">
//         Connections ({connections.length})
//       </h1>

//       {connections.map((connection) => {
//         const {
//           _id,
//           firstname,
//           lastname,
//           photoURL,
//           age,
//           gender,
//           about
//         } = connection.connectionWith;   // ✅ IMPORTANT FIX

//         return (
//           <div
//             key={_id}
//             className="flex items-center m-2 p-2 rounded-lg bg-base-300 w-1/2 mx-auto"
//           >
//             <img
//               alt="photo"
//               className="w-14 h-14 rounded-full object-contain"
//               src={photoURL}
//             />

//             <div className="text-left m-4 p-4">
//               <h2 className="font-bold text-xl">
//                 {firstname} {lastname}
//               </h2>

//               {age && gender && <p>{age} {gender}</p>}
//               <p>{about}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Connections;


// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnection, removeConnection } from "../utils/connectionSlice";

// const Connections = () => {
 
//   const connections = useSelector((store) => store.connection);
//   console.log(connections);
//   const dispatch = useDispatch();
  
//   const fetchConnections = async () => {
//     try {
//       dispatch(removeConnection());
//       const connections = await axios.get(BASE_URL + "/user/connection", {
//         withCredentials: true,
//       });
//       dispatch(addConnection(connections.data));
//       console.log(connections.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connections) return;
//   if (connections.length == 0)
//     return (
//       <>
//         <h1 className="flex justify-center text-2xl my-10 text-green-300">
//           No conections found
//         </h1>
//       </>
//     );

//   return (
//     <div className=" text-center my-10">
//       <h1 className="font-bold text-3xl text-pink-400">Connections ({connections.length})</h1>
//       {connections.map((connection) => {
//         const {_id, firstname, lastname, photoURL, age, gender, about } =
//           connection;

//         return (
//           <div key={_id} className="flex items-center m-2 p-2  rounded-lg bg-base-300 w-1/2 mx-auto">
//             <div>
//               <img
//                 alt="photo"
//                 className="w-14 h-14 rounded-full object-contain"
//                 src={photoURL}
//               />
//             </div>
//             <div className="text-left m-4 p-4 ">
//               <h2 className="font-bold text-xl">
//                 {firstname + " " + lastname}
//               </h2>
//               {age && gender && <p>{age + " " + gender}</p>}
//               <p>{about}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Connections;

