import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/const";

const JobsFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    role: "",
    technology: "",
    company: "",
  });

  /* ---------------- FETCH JOBS ---------------- */

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v.trim() !== "")
      );

      const query = new URLSearchParams(activeFilters).toString();
      const url = query ? `${BASE_URL}/job?${query}` : `${BASE_URL}/job`;

      const res = await axios.get(url, { withCredentials: true });

      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FIRST LOAD ---------------- */

  useEffect(() => {
    fetchJobs();
  }, []);

  /* ---------------- DEBOUNCE FILTER ---------------- */

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchJobs();
    }, 700);

    return () => clearTimeout(delay);
  }, [filters]);

  /* ---------------- HANDLE INPUT ---------------- */

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">

      {/* HEADER */}

      <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
        Open Jobs & Internships
      </h1>

      {/* ---------------- FILTERS ---------------- */}

      <div className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row gap-4 mb-8 shadow-md">

        <input
          type="text"
          name="role"
          placeholder="Search by Role"
          value={filters.role}
          onChange={handleChange}
          className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
        />

        <input
          type="text"
          name="technology"
          placeholder="Search by Tech / Skill"
          value={filters.technology}
          onChange={handleChange}
          className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
        />

        <input
          type="text"
          name="company"
          placeholder="Search by Company"
          value={filters.company}
          onChange={handleChange}
          className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
        />

      </div>

      {/* ---------------- JOB GRID ---------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* LOADING */}

        {loading &&
          Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 animate-pulse"
              >
                <div className="h-5 bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-8 bg-gray-700 rounded mt-6"></div>
              </div>
            ))}

        {/* JOBS */}

        {!loading &&
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-gray-800 border border-gray-700 hover:border-green-500 transition rounded-lg p-6 shadow-lg flex flex-col justify-between group"
            >
              <div>
                <h2 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">
                  {job.title}
                </h2>

                <p className="text-gray-400 font-medium mb-3">
                  {job.company} • {job.role}
                </p>

                <p className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded inline-block mb-4">
                  DL: {new Date(job.deadline).toLocaleDateString()}
                </p>

                {/* SKILLS */}

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills?.slice(0, 4).map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}

                  {job.skills?.length > 4 && (
                    <span className="text-xs text-gray-500">
                      +{job.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <Link
                to={`/jobs/${job._id}`}
                className="mt-4 bg-gray-700 hover:bg-green-600 text-white text-center py-2 rounded transition font-semibold"
              >
                View Details
              </Link>
            </div>
          ))}

        {/* EMPTY STATE */}

        {!loading && jobs.length === 0 && (
          <p className="text-center text-gray-400 col-span-full">
            No active jobs found for these filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobsFeed;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../utils/const";

// const JobsFeed = () => {
//     const [jobs, setJobs] = useState([]);
//     const [filters, setFilters] = useState({ role: "", technology: "", company: "" });

//    const fetchJobs = async () => {
//     try {

//         const activeFilters = Object.fromEntries(
//             Object.entries(filters).filter(([_, v]) => v.trim() !== "")
//         );

//         const query = new URLSearchParams(activeFilters).toString();

//         const url = query ? `${BASE_URL}/job?${query}` : `${BASE_URL}/job`;

//         const res = await axios.get(url, { withCredentials: true });

//         setJobs(res.data);

//     } catch (err) {
//         console.error(err);
//     }
// };

//     useEffect(() => {
//         // debounce fetch
//         const delayBounceFn = setTimeout(() => {
//             fetchJobs();
//         }, 500);
//         return () => clearTimeout(delayBounceFn);
//     }, [filters]);

//     const handleChange = (e) => {
//         setFilters({ ...filters, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="p-4 md:p-8 max-w-7xl mx-auto">
//             <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">Open Jobs & Internships</h1>

//             {/* Search/Filters */}
//             <div className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row gap-4 mb-8 shadow-md">
//                 <input
//                     type="text" name="role" placeholder="Search by Role"
//                     value={filters.role} onChange={handleChange}
//                     className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
//                 />
//                 <input
//                     type="text" name="technology" placeholder="Search by Tech / Skill"
//                     value={filters.technology} onChange={handleChange}
//                     className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
//                 />
//                 <input
//                     type="text" name="company" placeholder="Search by Company"
//                     value={filters.company} onChange={handleChange}
//                     className="p-3 bg-gray-900 text-gray-200 rounded border border-gray-700 flex-1 hover:border-green-500 focus:border-green-500 outline-none transition"
//                 />
//             </div>

//             {/* Job Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {jobs.map(job => (
//                     <div key={job._id} className="bg-gray-800 border border-gray-700 hover:border-green-500 transition-colors rounded-lg p-6 shadow-lg flex flex-col justify-between group">
//                         <div>
//                             <h2 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">{job.title}</h2>
//                             <p className="text-gray-400 font-medium mb-3">{job.company} • {job.role}</p>
//                             <p className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded inline-block mb-4">
//                                 DL: {new Date(job.deadline).toLocaleDateString()}
//                             </p>
//                             <div className="flex flex-wrap gap-2 mb-4">
//                                 {job.skills?.slice(0, 4).map((s, i) => (
//                                     <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{s}</span>
//                                 ))}
//                                 {job.skills?.length > 4 && <span className="text-xs text-gray-500">+{job.skills.length - 4}</span>}
//                             </div>
//                         </div>
//                         <Link to={`/jobs/${job._id}`} className="mt-4 bg-gray-700 hover:bg-green-600 text-white text-center py-2 rounded transition font-semibold">
//                             View Details
//                         </Link>
//                     </div>
//                 ))}
//                 {jobs.length === 0 && <p className="text-center text-gray-400 col-span-full">No active jobs found for these filters.</p>}
//             </div>
//         </div>
//     );
// };

// export default JobsFeed;
