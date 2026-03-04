import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import { Link } from "react-router-dom";

const ProjectsManagement = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/projects`, {
                withCredentials: true,
            });
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to permanently delete this project?")) {
            try {
                await axios.delete(`${BASE_URL}/admin/projects/${id}`, { withCredentials: true });
                fetchProjects();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const filteredProjects = projects.filter((p) =>
        p.header?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ownerId?.firstname?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fade-in space-y-6">

            {/* Header & Search */}
            <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-content/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span>🚀</span> Projects Management
                </h2>
                <div className="relative w-full sm:w-96">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="input input-bordered w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="w-5 h-5 absolute left-3 top-3.5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            {/* Table */}
            <div className="bg-base-100 rounded-2xl shadow-sm border border-base-content/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200/50">
                            <tr>
                                <th>Project Name</th>
                                <th>Owner</th>
                                <th>Tech Stack</th>
                                <th>Visibility</th>
                                <th>Created</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8">
                                        <span className="loading loading-spinner text-primary"></span>
                                    </td>
                                </tr>
                            ) : filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-base-content/50">No projects found.</td>
                                </tr>
                            ) : (
                                filteredProjects.map((project) => (
                                    <tr key={project._id} className="hover:bg-base-200/30">
                                        <td>
                                            <div className="font-semibold line-clamp-1 max-w-[250px]" title={project.header}>
                                                <Link to={`/admin/projects/${project._id}`} className="hover:text-primary transition-colors cursor-pointer">
                                                    {project.header}
                                                </Link>
                                            </div>
                                            <div className="text-xs text-base-content/50 mt-1 flex gap-2">
                                                {project.githubURL && <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> Repo</span>}
                                                {project.deployURL && <span className="flex items-center gap-1">🌐 Live</span>}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <div className="avatar">
                                                    <div className="w-8 h-8 rounded-full border border-base-300 shadow-sm">
                                                        <img src={project.ownerId?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${project.ownerId?.firstname}`} alt="owner" />
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium">{project.ownerId?.firstname} {project.ownerId?.lastname}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex flex-wrap gap-1">
                                                {project.techStack?.slice(0, 2).map((tech, i) => (
                                                    <span key={i} className="badge badge-outline badge-xs opacity-70">{tech}</span>
                                                ))}
                                                {project.techStack?.length > 2 && <span className="text-xs opacity-50">+{project.techStack.length - 2}</span>}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge badge-sm font-medium ${project.isPublic ? 'badge-success' : 'badge-ghost'}`}>
                                                {project.isPublic ? 'Public' : 'Private'}
                                            </span>
                                        </td>
                                        <td className="text-sm text-base-content/70">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="text-right">
                                            <Link to={`/admin/projects/${project._id}`} className="btn btn-xs btn-ghost text-info mr-2">View</Link>
                                            <button onClick={() => handleDelete(project._id)} className="btn btn-xs btn-ghost text-error">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProjectsManagement;
