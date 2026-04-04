// import { useSelector } from "react-redux";
// import EditProfile from "./EditProfile";


// const Profile = () => {
//   const user = useSelector((store) => store.user);

//    return (
//     user && (
//       <div>
//         <EditProfile user={user} />
//       </div>
//     )
//   );

// };

// export default Profile;

import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return user ? <EditProfile user={user} /> : null;
};

export default Profile; 