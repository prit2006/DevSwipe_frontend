import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed && feed.length > 0) return;

      const response = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(response.data));
    } catch (error) {
      console.error("Feed Fetch Error:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Loading
  if (!feed) {
    return (
      <h1 className="flex justify-center mt-52 text-2xl">
        Loading feed...
      </h1>
    );
  }

  // No users left
  if (feed.length === 0) {
    return (
      <h1 className="flex justify-center mt-52 text-3xl">
        No more users!!!!
      </h1>
    );
  }

  // ✅ ONLY SHOW FIRST USER (TINDER STYLE)
  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;


// import axios from "axios";
// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import UserCard from "./UserCard";

// const Feed = () => {
//   const dispatch = useDispatch();
//   const feed = useSelector((store) => store.feed);

//   const getFeed = async () => {
//     try {
//       // Prevent refetch if feed already exists
//       if (feed && feed.length > 0) return;

//       const response = await axios.get(`${BASE_URL}/user/feed`, {
//         withCredentials: true,
//       });

//       dispatch(addFeed(response.data));
//     } catch (error) {
//       console.error("Feed Fetch Error:", error);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []); // ✅ IMPORTANT: empty dependency array

//   // Loading state
//   if (!feed) {
//     return (
//       <h1 className="flex justify-center mt-52 text-2xl">
//         Loading feed...
//       </h1>
//     );
//   }

//   // No users left
//   if (feed.length === 0) {
//     return (
//       <h1 className="flex justify-center mt-52 text-3xl">
//         No more users!!!!
//       </h1>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center gap-4 my-5">
//       {feed.map((user) => (
//         <UserCard key={user._id} user={user} />
//       ))}
//     </div>
//   );
// };

// export default Feed;
