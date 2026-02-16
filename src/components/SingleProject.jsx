// components/SingleProject.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useParams, useNavigate } from "react-router-dom";

function SingleProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProject = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/project/${projectId}`, {
        withCredentials: true,
      });
      setProject(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const nextImage = () => {
    if (project?.websiteImages?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === project.websiteImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project?.websiteImages?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.websiteImages.length - 1 : prev - 1
      );
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-blue-400">Loading project...</div>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-600 bg-opacity-20 border border-red-600 rounded-lg p-6 text-red-400">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center text-gray-400 text-2xl py-20">
        Project not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      {/* Project Card */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold text-white">
            {project.header}
          </h1>
          <span
            className={`px-4 py-2 rounded-lg ${
              project.isPublic
                ? "bg-green-600 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            {project.isPublic ? "🌍 Public" : "🔒 Private"}
          </span>
        </div>

        {/* Owner */}
        <div className="text-gray-400 mb-6">
          Created by{" "}
          <span className="text-white font-semibold">
  {project.ownerId?.firstname} {project.ownerId?.lastname}
</span>
        </div>

        {/* Description */}
        <h2 className="text-xl font-semibold text-blue-400 mb-2">
          📝 Description
        </h2>
        <p className="text-gray-300 mb-6">{project.description}</p>

        {/* Tech Stack */}
        {project.techStack?.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-blue-400 mb-3">
              🛠️ Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-700 text-blue-300 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Links */}
        <div className="flex gap-4 mb-6">
          {project.githubURL && (
            <a
              href={
                project.githubURL.startsWith("http")
                  ? project.githubURL
                  : `https://${project.githubURL}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-600 rounded-lg hover:border-blue-500 transition"
            >
              <span className="text-2xl">📂</span>
              <span className="font-semibold text-white">GitHub</span>
            </a>
          )}

          {project.deployURL && (
            <a
              href={
                project.deployURL.startsWith("http")
                  ? project.deployURL
                  : `https://${project.deployURL}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              <span className="text-2xl">🌐</span>
              <span className="font-semibold text-white">Live Demo</span>
            </a>
          )}
        </div>

        {/* Dates */}
        <div className="text-sm text-gray-500 flex gap-6">
          <span>
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <span>
            Updated: {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Screenshots */}
      {project.websiteImages?.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">
            📸 Screenshots
          </h2>

          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
            <img
              src={project.websiteImages[currentImageIndex]}
              alt="Screenshot"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x600?text=Image+Not+Available";
              }}
            />

            {project.websiteImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full"
                >
                  →
                </button>
              </>
            )}

            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-lg text-white text-sm">
              {currentImageIndex + 1} / {project.websiteImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProject;
