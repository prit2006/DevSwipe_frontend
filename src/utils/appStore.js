import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import postReducer from "./postSlice"; // 👈 NEW

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,        // user info feed
    post: postReducer,        // posts only
    connection: connectionReducer,
    request: requestReducer,
  },
});

export default appStore;



// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import feedReducer from "./feedSlice";
// import connectionReducer from "./connectionSlice";
// import requestReducer from "./requestSlice";


// const appStore = configureStore({
//   reducer: {
//     user: userReducer,
//     feed: feedReducer,
//     connection: connectionReducer,
//     request: requestReducer,
//   },
// });

// export default appStore;