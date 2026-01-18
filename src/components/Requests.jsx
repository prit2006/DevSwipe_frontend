import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.request);

  const reviewRequest = async (status, requestId, senderUserId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${senderUserId}`,
        {},
        { withCredentials: true }
      );

      // ✅ REMOVE FROM UI
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/requests/received`,
        { withCredentials: true }
      );
      dispatch(addRequests(res.data));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <h1 className="flex justify-center text-2xl my-10 text-green-300">
        No Requests found
      </h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl text-pink-400 p-4">
        Requests ({requests.length})
      </h1>

      {requests.map(request => {
        const { _id: requestId, senderId } = request;
        const { _id: senderUserId, firstname, lastname, photoURL, age, gender, about } = senderId;

        return (
          <div
            key={requestId}
            className="flex justify-between items-center m-2 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <img
              src={photoURL}
              alt="profile"
              className="w-14 h-14 rounded-full object-cover"
            />

            <div className="text-left flex-1 mx-4">
              <h2 className="font-bold text-xl">
                {firstname} {lastname}
              </h2>
              {age && gender && <p>{age} • {gender}</p>}
              <p>{about}</p>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-secondary mx-2"
                onClick={() =>
                  reviewRequest("accepted", requestId, senderUserId)
                }
              >
                Accept
              </button>

              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={() =>
                  reviewRequest("rejected", requestId, senderUserId)
                }
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

// import axios from "axios";
// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { addRequests, removeRequest } from "../utils/requestSlice";

// const Requests = () => {
//   const dispatch = useDispatch();
//   const requests = useSelector((store) => store.request);

//   const reviewRequest = async (status, senderId) => {
//     try {
//       await axios.post(
//         `${BASE_URL}/request/review/${status}/${senderId}`,
//         {},
//         { withCredentials: true }
//       );

//       dispatch(removeRequest(senderId));
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/user/requests/received`,
//         { withCredentials: true }
//       );

//       dispatch(addRequests(res.data));
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   if (!requests) return null;

//   if (requests.length === 0) {
//     return (
//       <h1 className="flex justify-center text-2xl my-10 text-green-300">
//         No Requests found
//       </h1>
//     );
//   }

//   return (
//     <div className="text-center my-10">
//       <h1 className="font-bold text-3xl text-pink-400 p-4">
//         Requests ({requests.length})
//       </h1>

//       {requests.map((request) => {
//         const { senderId } = request;

//         const {
//           _id: senderUserId,
//           firstname,
//           lastname,
//           photoURL,
//           age,
//           gender,
//           about
//         } = senderId;

//         return (
//           <div
//             key={senderUserId}
//             className="flex justify-between items-center m-2 p-2 rounded-lg bg-base-300 w-2/3 mx-auto"
//           >
//             <img
//               alt="photo"
//               className="w-14 h-14 rounded-full object-cover"
//               src={photoURL}
//             />

//             <div className="text-left m-4 p-4">
//               <h2 className="font-bold text-xl">
//                 {firstname} {lastname}
//               </h2>
//               {age && gender && <p>{age} {gender}</p>}
//               <p>{about}</p>
//             </div>

//             <div>
//               <button
//                 className="btn btn-secondary mx-2"
//                 onClick={() => reviewRequest("accepted", senderUserId)}
//               >
//                 Accept
//               </button>

//               <button
//                 className="btn btn-primary mx-2"
//                 onClick={() => reviewRequest("rejected", senderUserId)}
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Requests;



// import axios from "axios";
// import React, { useState } from "react";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { addRequests, removeRequest } from "../utils/requestSlice";

// const Requests = () => {
//   const dispatch = useDispatch();
//   const requests = useSelector((store) => store.request);
//   console.log(requests);

//   const reviewRequest = async (status, _id) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/review" + "/" + status + "/" + _id,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeRequest(_id));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchRequests = async () => {
//     try {
//       const requests = await axios.get(BASE_URL + "/user/requests/recieved", {
//         withCredentials: true,
//       });
//       dispatch(addRequests(requests.data.connectionRequests));
//       //   console.log(requests.data.connectionRequests);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useState(() => {
//     fetchRequests();
//   }, []);
//   if (!requests) return;
//   if (requests.length == 0)
//     return (
//       <>
//         <h1 className="flex justify-center text-2xl my-10 text-green-300">
//           No Requests found
//         </h1>
//       </>
//     );

//   return (
//     <div className=" text-center my-10">
//       <h1 className="font-bold text-3xl text-pink-400 p-4">
//         Requests ({requests.length})
//       </h1>
//       {requests.map((request) => {
//         const { _id, firstname, lastname, photoURL, age, gender, about } =
//           request.fromUserId;

//         return (
//           <div
//             key={_id}
//             className="flex justify-between items-center m-2 p-2  rounded-lg bg-base-300 w-2/3 mx-auto"
//           >
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
//             <div className="">
//               <button
//                 className="btn btn-secondary mx-2"
//                 onClick={() => reviewRequest("accepted", request._id)}
//               >
//                 Accept
//               </button>
//               <button
//                 className="btn btn-primary mx-2"
//                 onClick={() => reviewRequest("rejected", request._id)}
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Requests;