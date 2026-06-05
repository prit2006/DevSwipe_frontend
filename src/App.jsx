import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import appStore, { persistor } from "./utils/appStore";

import Body from "./components/Body";
import PostLayout from "./components/PostLayout";
import Feed from "./components/Feed";
import PostsFeed from "./components/PostsFeed";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import CreatePost from "./components/CreatePost";
import SavedItems from "./components/SavedItems";
import MyPosts from "./components/MyPosts";
import SinglePost from "./components/SinglePost";
import Premium from "./components/Premium";
import Chat from "./components/Chat";


// 🆕 PROJECT COMPONENTS
import ProjectLayout from "./components/ProjectLayout";
import ProjectsFeed from "./components/ProjectsFeed";
import CreateProject from "./components/CreateProject";
import MyProjects from "./components/MyProjects";
import SingleProject from "./components/SingleProject";
import EditProject from "./components/EditProject";
import UserProjects from "./components/UserProjects";
import ProjectStats from "./components/ProjectStats";

// 👑 ADMIN COMPONENTS
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import UsersManagement from "./components/admin/UsersManagement";
import PostsManagement from "./components/admin/PostsManagement";
import ProjectsManagement from "./components/admin/ProjectsManagement";
import AdminUserProfile from "./components/admin/AdminUserProfile";
import ProjectDetails from "./components/admin/ProjectDetails";
import AdminRoute from "./components/admin/AdminRoute";

// 💼 JOBS COMPONENTS
import JobLayout from "./components/JobLayout";
import JobsFeed from "./components/JobsFeed";
import JobDetails from "./components/JobDetails";
import MyApplications from "./components/MyApplications";
import JobManagement from "./components/admin/JobManagement";
import ApplicationReview from "./components/admin/ApplicationReview";
import PaymentsManagement from "./components/admin/PaymentsManagement";
import ResumeReportsManagement from "./components/admin/ResumeReportsManagement";

// 🤖 AI INTERVIEW COMPONENTS
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import InterviewReport from "./components/InterviewReport";
import MyInterviewReports from "./components/MyInterviewReports";

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* 🔥 MAIN SWIPE APP */}
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="saved" element={<SavedItems />} />
              <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
              <Route path="my-resumes" element={<MyInterviewReports />} />
              <Route path="interview-reports/:id" element={<InterviewReport />} />
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

            {/* 💼 JOBS SECTION */}
            <Route path="/jobs" element={<JobLayout />}>
              <Route index element={<JobsFeed />} />
              <Route path="my-applications" element={<MyApplications />} />
              <Route path=":id" element={<JobDetails />} />
            </Route>

            {/* 👑 ADMIN SECTION */}
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="users/:id" element={<AdminUserProfile />} />
              <Route path="posts" element={<PostsManagement />} />
              <Route path="projects" element={<ProjectsManagement />} />
              <Route path="projects/:id" element={<ProjectDetails />} />
              <Route path="jobs" element={<JobManagement />} />
              <Route path="resume-reports" element={<ResumeReportsManagement />} />
              <Route path="applications" element={<ApplicationReview />} />
              <Route path="payments" element={<PaymentsManagement />} />
            </Route>

            {/* 🔐 AUTH */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
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
