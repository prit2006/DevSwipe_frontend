import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Body from "./components/Body";
import PostLayout from "./components/PostLayout";
import Feed from "./components/Feed";
import PostsFeed from "./components/PostsFeed";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import CreatePost from "./components/CreatePost";
import MyPosts from "./components/MyPosts";
import SinglePost from "./components/SinglePost";

// 🆕 PROJECT COMPONENTS
import ProjectLayout from "./components/ProjectLayout";
import ProjectsFeed from "./components/ProjectsFeed";
import CreateProject from "./components/CreateProject";
import MyProjects from "./components/MyProjects";
import SingleProject from "./components/SingleProject";
import EditProject from "./components/EditProject";
import UserProjects from "./components/UserProjects";
import ProjectStats from "./components/ProjectStats";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* 🔥 MAIN SWIPE APP */}
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
          </Route>

          {/* 🔥 POSTS SECTION */}
          <Route path="/posts" element={<PostLayout />}>
            <Route index element={<PostsFeed />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="my" element={<MyPosts />} />
            <Route path=":postId" element={<SinglePost />} />
          </Route>

          {/* 🆕 PROJECTS SECTION */}
          <Route path="/projects" element={<ProjectLayout />}>
            <Route index element={<ProjectsFeed />} />
            <Route path="create" element={<CreateProject />} />
            <Route path="my" element={<MyProjects />} />
            <Route path="stats" element={<ProjectStats />} />
            <Route path="edit/:projectId" element={<EditProject />} />
            <Route path="user/:userId" element={<UserProjects />} />
            <Route path=":projectId" element={<SingleProject />} />
          </Route>

          {/* 🔐 AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import appStore from "./utils/appStore";

// import Body from "./components/Body";
// import PostLayout from "./components/PostLayout";
// import Feed from "./components/Feed";
// import PostsFeed from "./components/PostsFeed";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Profile from "./components/Profile";
// import Connections from "./components/Connections";
// import Requests from "./components/Requests";
// import CreatePost from "./components/CreatePost";
// import MyPosts from "./components/MyPosts";
// import SinglePost from "./components/SinglePost";

// function App() {
//   return (
//     <Provider store={appStore}>
//       <BrowserRouter>
//         <Routes>

//           {/* 🔥 MAIN SWIPE APP */}
//           <Route path="/" element={<Body />}>
//             <Route index element={<Feed />} />
//             <Route path="profile" element={<Profile />} />
//             <Route path="connections" element={<Connections />} />
//             <Route path="requests" element={<Requests />} />
//           </Route>

//           {/* 🔥 POSTS SECTION (SEPARATE LAYOUT) */}
//           <Route path="/posts" element={<PostLayout />}>
//             <Route index element={<PostsFeed />} />
//             <Route path="create" element={<CreatePost />} />
//             <Route path="my" element={<MyPosts />} />
//             <Route path=":postId" element={<SinglePost />} />
//           </Route>

//           {/* 🔐 AUTH */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import appStore from "./utils/appStore";

// import Body from "./components/Body";
// import PostLayout from "./components/PostLayout";
// import Feed from "./components/Feed";
// import PostsFeed from "./components/PostsFeed";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Profile from "./components/Profile";
// import Connections from "./components/Connections";
// import Requests from "./components/Requests";
// import CreatePost from "./components/CreatePost";

// function App() {
//   return (
//     <Provider store={appStore}>
//       <BrowserRouter>
//         <Routes>

//           {/* 🔥 MAIN SWIPE APP */}
//           <Route path="/" element={<Body />}>
//             <Route index element={<Feed />} />
//             <Route path="profile" element={<Profile />} />
//             <Route path="connections" element={<Connections />} />
//             <Route path="requests" element={<Requests />} />
//           </Route>

//           {/* 🔥 POSTS PAGE (SEPARATE PAGE) */}
//           <Route path="/posts" element={<PostLayout />}>
//             <Route index element={<PostsFeed />} />
//             <Route path="create" element={<CreatePost />} />
//           </Route>

//           {/* 🔐 AUTH */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;



// import React from "react";
// import{BrowserRouter, Route,  Routes} from "react-router-dom"
// import Body from "./components/Body";
// import Login from "./components/Login";
// import Profile from "./components/Profile";
// import {Provider} from "react-redux"
// import appStore from "./utils/appStore";
// import Feed from "./components/Feed";
// import Connections from "./components/Connections";
// import Requests from "./components/Requests";
// import Signup from "./components/Signup";
// import PostsFeed from "./components/PostsFeed";

// function App() {
//   return (
//     <>
//     <Provider store={appStore}>
//     <BrowserRouter basename="/">
//     <Routes>
//       <Route path="/" element={<Body/>}>
//               <Route path="/" element={<Feed />}/>
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/login" element={<Login/>}/>
//               <Route path="/profile" element={<Profile/>}/>
//                <Route path="/connections" element={<Connections />} />
//               <Route path="/requests" element={<Requests />} />
//               <Route path="/posts" element={<PostsFeed />} />
//       </Route>
//     </Routes>
//     </BrowserRouter>
//     </Provider>
//     </>
//   );
// }

// export default App;
