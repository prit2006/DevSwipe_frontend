// components/ProjectsFeed.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addProjects } from "../utils/projectSlice";
import { Link } from "react-router-dom";

function ProjectsFeed() {
  const projects = useSelector((store) => store.project);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchTech, setSearchTech] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchProjects = async (pageNum = 1, tech = "") => {
    try {
      setLoading(true);
      let url = `${BASE_URL}/project/feed/all?page=${pageNum}&limit=10`;

      if (tech) {
        url = `${BASE_URL}/project/search/tech?tech=${tech}`;
      }

      const res = await axios.get(url, { withCredentials: true });

      if (tech) {
        dispatch(addProjects(res.data));
        setPagination(null);
      } else {
        dispatch(addProjects(res.data.projects));
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(page, searchTech);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProjects(1, searchTech);
  };

  if (loading && !projects) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-green-400">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400">🚀 Projects Feed</h1>
        <Link
          to="/projects/create"
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          ➕ New Project
        </Link>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTech}
            onChange={(e) => setSearchTech(e.target.value)}
            placeholder="Search by tech stack (React, Node, MongoDB...)"
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
          />
          <button className="px-6 py-3 bg-green-600 rounded-lg">
            🔍 Search
          </button>
        </div>
      </form>

      {!projects || projects.length === 0 ? (
        <div className="text-center text-2xl text-gray-400 my-10">
          No projects found. Connect with developers to see their projects!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project._id}`}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold text-white">
                    {project.header}
                  </h2>
                  <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">
                    Public
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-blue-300 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Owner */}
                <div className="text-sm text-gray-400">
                 By{" "}
                <span className="text-white font-semibold">
                      {project.ownerId?.firstname} {project.ownerId?.lastname}
                </span>
                </div>

               

                {/* Links */}
                <div className="flex gap-4 mt-3 text-sm text-gray-500">
                  {project.githubURL && <span>📂 GitHub</span>}
                  {project.deployURL && <span>🌐 Live Demo</span>}
                </div>
              </Link>
            ))}
          </div>

          {pagination && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-gray-700 rounded-lg"
              >
                ← Previous
              </button>

              <span className="text-gray-400">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <button
                disabled={page === pagination.totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-gray-700 rounded-lg"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectsFeed;


// // components/ProjectsFeed.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useDispatch, useSelector } from "react-redux";
// import { addProjects } from "../utils/projectSlice";
// import { Link } from "react-router-dom";

// function ProjectsFeed() {
//   const projects = useSelector((store) => store.project);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [searchTech, setSearchTech] = useState("");
//   const [page, setPage] = useState(1);
//   const [pagination, setPagination] = useState(null);

//   const fetchProjects = async (pageNum = 1, tech = "") => {
//     try {
//       setLoading(true);
//       let url = `${BASE_URL}/project/feed/all?page=${pageNum}&limit=10`;
      
//       if (tech) {
//         url = `${BASE_URL}/project/search/tech?tech=${tech}`;
//       }

//       const res = await axios.get(url, { withCredentials: true });

//       if (tech) {
//         dispatch(addProjects(res.data));
//       } else {
//         dispatch(addProjects(res.data.projects));
//         setPagination(res.data.pagination);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects(page, searchTech);
//   }, [page]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//     fetchProjects(1, searchTech);
//   };

//   if (loading && !projects) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-2xl text-green-400">Loading projects...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold text-blue-400">🚀 Projects Feed</h1>
//         <Link
//           to="/projects/create"
//           className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
//         >
//           ➕ New Project
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="mb-8">
//         <div className="flex gap-4">
//           <input
//             type="text"
//             value={searchTech}
//             onChange={(e) => setSearchTech(e.target.value)}
//             placeholder="Search by tech stack (React, Node, MongoDB...)"
//             className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition font-semibold"
//           >
//             🔍 Search
//           </button>
//           {searchTech && (
//             <button
//               type="button"
//               onClick={() => {
//                 setSearchTech("");
//                 setPage(1);
//                 fetchProjects(1, "");
//               }}
//               className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
//             >
//               Clear
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Projects Grid */}
//       {!projects || projects.length === 0 ? (
//         <div className="text-center text-2xl text-gray-400 my-10">
//           No projects found. Connect with developers to see their projects!
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {projects.map((project) => (
//               <Link
//                 key={project._id}
//                 to={`/projects/${project._id}`}
//                 className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition group"
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-start mb-4">
//                   <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition">
//                     {project.header}
//                   </h2>
//                   {project.isPublic && (
//                     <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">
//                       Public
//                     </span>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-400 mb-4 line-clamp-2">
//                   {project.description}
//                 </p>

//                 {/* Tech Stack */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.techStack?.slice(0, 5).map((tech, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 bg-gray-700 text-blue-300 text-sm rounded-full"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                   {project.techStack?.length > 5 && (
//                     <span className="px-3 py-1 bg-gray-700 text-gray-400 text-sm rounded-full">
//                       +{project.techStack.length - 5} more
//                     </span>
//                   )}
//                 </div>

//                 {/* Owner */}
//                 <div className="flex items-center gap-2 text-sm text-gray-400">
//                   <span>By:</span>
//                   <span className="text-white font-semibold">
//                     {project.ownerId?.firstName} {project.ownerId?.lastName}
//                   </span>
//                 </div>

//                 {/* Links Preview */}
//                 <div className="flex gap-4 mt-4 text-sm">
//                   {project.githubURL && (
//                     <span className="text-gray-500">📂 GitHub</span>
//                   )}
//                   {project.deployURL && (
//                     <span className="text-gray-500">🌐 Live Demo</span>
//                   )}
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {/* Pagination */}
//           {pagination && !searchTech && (
//             <div className="flex justify-center items-center gap-4 mt-8">
//               <button
//                 onClick={() => setPage(page - 1)}
//                 disabled={page === 1}
//                 className={`px-6 py-2 rounded-lg font-semibold ${
//                   page === 1
//                     ? "bg-gray-700 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 ← Previous
//               </button>

//               <span className="text-gray-400">
//                 Page {pagination.currentPage} of {pagination.totalPages}
//               </span>

//               <button
//                 onClick={() => setPage(page + 1)}
//                 disabled={page === pagination.totalPages}
//                 className={`px-6 py-2 rounded-lg font-semibold ${
//                   page === pagination.totalPages
//                     ? "bg-gray-700 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 Next →
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default ProjectsFeed;