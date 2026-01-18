import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

function Connections() {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connection",
        { withCredentials: true }
      );

      dispatch(addConnection(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // ✅ HANDLE EMPTY OR NULL STATE PROPERLY
  if (!connections || connections.length === 0) {
    return (
      <h1 className="flex justify-center text-2xl my-10 text-green-300">
        No connections found
      </h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl text-pink-400">
        Connections ({connections.length})
      </h1>

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
            className="flex items-center m-2 p-2 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <img
              alt="photo"
              className="w-14 h-14 rounded-full object-contain"
              src={photoURL}
            />

            <div className="text-left m-4 p-4">
              <h2 className="font-bold text-xl">
                {firstname} {lastname}
              </h2>

              {age && gender && <p>{age} • {gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Connections;



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

