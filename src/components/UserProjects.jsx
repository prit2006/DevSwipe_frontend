import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useParams, Link, useNavigate } from "react-router-dom";

function UserProjects() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/project/user/${userId}`, {
        withCredentials: true,
      });
      setProjects(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProjects();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-blue-400">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-600 bg-opacity-20 border border-red-600 rounded-lg p-6 text-red-400">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate("/projects")}
            className="mt-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-blue-400 mb-8">
        User's Projects ({projects.length})
      </h1>

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-400">
            This user hasn't created any public projects yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project._id}
              to={`/projects/${project._id}`}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition group"
            >
              <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition mb-4">
                {project.header}
              </h2>

              <p className="text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack?.slice(0, 5).map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-blue-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack?.length > 5 && (
                  <span className="px-3 py-1 bg-gray-700 text-gray-400 text-sm rounded-full">
                    +{project.techStack.length - 5} more
                  </span>
                )}
              </div>

              <div className="flex gap-4 text-sm">
                {project.githubURL && (
                  <span className="text-gray-500">📂 GitHub</span>
                )}
                {project.deployURL && (
                  <span className="text-gray-500">🌐 Live Demo</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProjects;