import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

function SavedItems() {
    const [activeTab, setActiveTab] = useState("posts");
    const [savedPosts, setSavedPosts] = useState([]);
    const [savedProjects, setSavedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSavedData = async () => {
        try {
            setLoading(true);
            const [postsRes, projectsRes] = await Promise.all([
                axios.get(`${BASE_URL}/bookmark/posts`, { withCredentials: true }),
                axios.get(`${BASE_URL}/bookmark/projects`, { withCredentials: true }),
            ]);
            setSavedPosts(postsRes.data);
            setSavedProjects(projectsRes.data);
        } catch (err) {
            console.error("Error fetching bookmarks:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedData();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-white">🔖 Saved Items</h1>
            </div>

            {/* TABS */}
            <div className="flex border-b border-gray-700 mb-6">
                <button
                    onClick={() => setActiveTab("posts")}
                    className={`px-6 py-3 font-semibold text-lg transition ${activeTab === "posts"
                            ? "text-blue-400 border-b-2 border-blue-400"
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                >
                    Posts ({savedPosts.length})
                </button>
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`px-6 py-3 font-semibold text-lg transition ${activeTab === "projects"
                            ? "text-blue-400 border-b-2 border-blue-400"
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                >
                    Projects ({savedProjects.length})
                </button>
            </div>

            {/* CONTENT */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner text-info loading-lg"></span>
                </div>
            ) : (
                <div className="animate-fadeIn">
                    {/* POSTS TAB */}
                    {activeTab === "posts" && (
                        <div className="space-y-6">
                            {savedPosts.length === 0 ? (
                                <div className="text-center py-20 text-gray-500 bg-gray-800/50 rounded-xl border border-gray-700">
                                    <div className="text-6xl mb-4">📑</div>
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No Saved Posts</h3>
                                    <p>When you save a post on the feed, it will show up here.</p>
                                </div>
                            ) : (
                                savedPosts.map((post) => (
                                    <PostCard key={post._id} post={post} refreshPosts={fetchSavedData} />
                                ))
                            )}
                        </div>
                    )}

                    {/* PROJECTS TAB */}
                    {activeTab === "projects" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {savedProjects.length === 0 ? (
                                <div className="col-span-1 md:col-span-2 text-center py-20 text-gray-500 bg-gray-800/50 rounded-xl border border-gray-700">
                                    <div className="text-6xl mb-4">💼</div>
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No Saved Projects</h3>
                                    <p>When you save an interesting project, you can find it here later.</p>
                                </div>
                            ) : (
                                savedProjects.map((project) => (
                                    <div
                                        key={project._id}
                                        className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:border-blue-500 transition duration-300 flex flex-col h-full"
                                    >
                                        {/* Project Image */}
                                        <div className="h-48 bg-gray-900 border-b border-gray-700 overflow-hidden relative">
                                            {project.websiteImages && project.websiteImages.length > 0 ? (
                                                <img
                                                    src={project.websiteImages[0]}
                                                    alt={project.header}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-600">
                                                    <span className="text-4xl">📸</span>
                                                </div>
                                            )}

                                            <div className="absolute top-3 right-3">
                                                <span className={`px-2 py-1 text-xs font-bold rounded shadow bg-gray-900/80 backdrop-blur ${project.isPublic ? "text-green-400" : "text-gray-400"}`}>
                                                    {project.isPublic ? "Public" : "Private"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex items-center gap-3 mb-3">
                                                <img
                                                    src={project.ownerId?.photoURL}
                                                    className="w-8 h-8 rounded-full border border-gray-600"
                                                    alt="owner"
                                                />
                                                <span className="text-sm text-gray-400">
                                                    {project.ownerId?.firstname} {project.ownerId?.lastname}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition">
                                                {project.header}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {project.description}
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-gray-700 flex justify-end">
                                                <Link
                                                    to={`/projects/${project._id}`}
                                                    className="px-4 py-2 bg-blue-600/20 text-blue-400 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition"
                                                >
                                                    View Details →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SavedItems;
