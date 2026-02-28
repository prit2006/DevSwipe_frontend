import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProject as deleteProjectAction } from "../utils/projectSlice";

function MyProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const fetchMyProjects = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/project/my`, {
                withCredentials: true,
            });
            setProjects(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyProjects();
    }, []);

    const handleDelete = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }

        try {
            await axios.delete(`${BASE_URL}/project/${projectId}`, {
                withCredentials: true,
            });
            setProjects(projects.filter((p) => p._id !== projectId));
            dispatch(deleteProjectAction(projectId));
        } catch (error) {
            console.log(error);
            alert("Failed to delete project");
        }
    };

    const toggleVisibility = async (projectId) => {
        try {
            const res = await axios.patch(
                `${BASE_URL}/project/${projectId}/toggle-visibility`,
                {},
                { withCredentials: true }
            );

            setProjects(
                projects.map((p) =>
                    p._id === projectId ? res.data.project : p
                )
            );
        } catch (error) {
            console.log(error);
            alert("Failed to toggle visibility");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-2xl text-blue-400">Loading your projects...</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-blue-400">
                    💼 My Projects ({projects.length})
                </h1>
                <Link
                    to="/projects/create"
                    className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                    ➕ New Project
                </Link>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-2xl text-gray-400 mb-6">
                        You haven't created any projects yet
                    </p>
                    <Link
                        to="/projects/create"
                        className="inline-block px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                        Create Your First Project
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="bg-gray-800 border border-gray-700 rounded-lg p-6"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-white">
                                    {project.header}
                                </h2>
                                <span
                                    className={`px-3 py-1 text-xs rounded-full ${project.isPublic
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-600 text-gray-300"
                                        }`}
                                >
                                    {project.isPublic ? "Public" : "Private"}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 mb-4 line-clamp-3">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack?.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-700 text-blue-300 text-sm rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            {/* Links */}
                            <div className="flex gap-4 mb-4 text-sm">
                                {project.githubURL && (
                                    <a
                                        href={project.githubURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        📂 GitHub
                                    </a>
                                )}

                                {project.deployURL && (
                                    <a
                                        href={project.deployURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-400 hover:underline"
                                    >
                                        🌐 Live Demo
                                    </a>
                                )}
                            </div>


                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
                                <Link
                                    to={`/projects/${project._id}`}
                                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm"
                                >
                                    👁️ View
                                </Link>
                                <Link
                                    to={`/projects/edit/${project._id}`}
                                    state={{ project }}
                                    className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition text-sm"
                                >
                                    ✏️ Edit
                                </Link>
                                <button
                                    onClick={() => toggleVisibility(project._id)}
                                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition text-sm"
                                >
                                    {project.isPublic ? "🔒 Make Private" : "🔓 Make Public"}
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-sm"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyProjects;