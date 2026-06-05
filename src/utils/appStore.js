import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import postReducer from "./postSlice";
import projectReducer from "./projectSlice"; // 🆕
import notificationReducer from "./notificationSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist user state
};

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  post: postReducer,
  project: projectReducer, // 🆕
  notification: notificationReducer,
  connection: connectionReducer,
  request: requestReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(appStore);
export default appStore;


// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import feedReducer from "./feedSlice";
// import connectionReducer from "./connectionSlice";
// import requestReducer from "./requestSlice";
// import postReducer from "./postSlice"; // 👈 NEW


// const appStore = configureStore({
//   reducer: {
//     user: userReducer,
//     feed: feedReducer,        // user info feed
//     post: postReducer,        // posts only
//     connection: connectionReducer,
//     request: requestReducer,
//   },
// });

// export default appStore;



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