import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/const";

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/projects/${id}`, {
                withCredentials: true,
            });
            setProject(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to permanently delete this project?")) {
            try {
                await axios.delete(`${BASE_URL}/admin/projects/${id}`, { withCredentials: true });
                navigate("/admin/projects");
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="text-center py-20 text-base-content/50">
                <h2 className="text-xl font-bold">Project not found</h2>
                <Link to="/admin/projects" className="btn btn-outline mt-4">Back to Projects</Link>
            </div>
        );
    }

    // Mock folder structure derived from tech stack / logic
    const mockFiles = [
        { name: "src", type: "folder", icon: "📁", date: new Date(project.updatedAt).toLocaleDateString(), message: "Update main components" },
        { name: "public", type: "folder", icon: "📁", date: new Date(project.createdAt).toLocaleDateString(), message: "Initial commit" },
        { name: "package.json", type: "file", icon: "📄", date: new Date(project.updatedAt).toLocaleDateString(), message: "Bump dependencies" },
        { name: "README.md", type: "file", icon: "📝", date: new Date(project.createdAt).toLocaleDateString(), message: "Add documentation" },
        { name: ".gitignore", type: "file", icon: "📄", date: new Date(project.createdAt).toLocaleDateString(), message: "Initial commit" },
    ];

    return (
        <div className="max-w-5xl mx-auto animate-fade-in space-y-6 pb-12 font-sans">

            {/* GitHub Style Header */}
            <div className="border-b border-base-content/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xl md:text-2xl font-semibold">
                        <svg className="w-6 h-6 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                        <Link to={`/admin/users/${project.ownerId?._id}`} className="text-primary hover:underline">
                            {project.ownerId?.firstname}_{project.ownerId?.lastname}
                        </Link>
                        <span className="text-base-content/40">/</span>
                        <span className="font-bold text-base-content">{project.header}</span>
                        <span className={`badge ml-2 badge-sm ${project.isPublic ? 'badge-ghost border-base-content/20' : 'badge-warning'}`}>
                            {project.isPublic ? 'Public' : 'Private'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {project.githubURL && (
                        <a href={project.githubURL} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline btn-neutral hidden sm:flex">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> Source
                        </a>
                    )}
                    {project.deployURL && (
                        <a href={project.deployURL} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline btn-accent hidden sm:flex">
                            🌐 Visit
                        </a>
                    )}
                    <button onClick={handleDelete} className="btn btn-sm btn-error">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Delete
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Main Content (Repository View) */}
                <div className="lg:w-3/4 space-y-6">

                    {/* File Explorer Mock */}
                    <div className="border border-base-content/20 rounded-xl overflow-hidden bg-base-100 shadow-sm">
                        <div className="bg-base-200/50 px-4 py-3 border-b border-base-content/20 flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 font-medium">
                                <div className="avatar">
                                    <div className="w-6 rounded-full">
                                        <img src={project.ownerId?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${project.ownerId?.firstname}`} alt="avatar" />
                                    </div>
                                </div>
                                <span>{project.ownerId?.firstname}</span>
                                <span className="opacity-60 font-mono">Merge pull request #1 from update-master</span>
                            </div>
                            <span className="opacity-50 hidden sm:block font-mono">1h ago</span>
                        </div>

                        <div className="flex flex-col">
                            {mockFiles.map((file, idx) => (
                                <div key={idx} className={`flex items-center justify-between px-4 py-2.5 hover:bg-base-200/30 transition-colors text-sm ${idx !== mockFiles.length - 1 ? 'border-b border-base-content/5' : ''}`}>
                                    <div className="flex items-center gap-3 w-1/3">
                                        <span className="opacity-80 text-lg">{file.icon}</span>
                                        <span className={`font-mono hover:text-primary cursor-pointer ${file.type === 'folder' ? 'font-semibold text-primary/80' : 'text-base-content/80'}`}>{file.name}</span>
                                    </div>
                                    <div className="w-1/3 text-base-content/50 truncate hidden sm:block shrink-0">
                                        {file.message}
                                    </div>
                                    <div className="w-1/3 text-right text-base-content/40 font-mono text-xs">
                                        {file.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* README Mock */}
                    <div className="border border-base-content/20 rounded-xl overflow-hidden bg-base-100 shadow-sm">
                        <div className="bg-base-200/50 px-4 py-3 border-b border-base-content/20 font-semibold flex items-center gap-2">
                            <span className="opacity-70">📝</span> README.md
                        </div>
                        <div className="p-8 prose prose-base max-w-none text-base-content/80">
                            <h1 className="text-3xl font-bold mb-4">{project.header}</h1>
                            <p className="text-lg mb-6 leading-relaxed whitespace-pre-wrap">{project.description}</p>

                            <h2 className="text-2xl font-bold mb-4 mt-8">Tech Stack</h2>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.techStack?.map((t) => (
                                    <span key={t} className="badge badge-lg badge-outline">{t}</span>
                                ))}
                                {(!project.techStack || project.techStack.length === 0) && <span className="opacity-50">Not specified</span>}
                            </div>

                            {project.websiteImages && project.websiteImages.length > 0 && (
                                <>
                                    <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {project.websiteImages.map((img, idx) => (
                                            <div key={idx} className="border border-base-content/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-48 object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </div>

                {/* Sidebar Info */}
                <div className="lg:w-1/4 space-y-6">
                    <div className="border-b border-base-content/10 pb-4">
                        <h3 className="font-bold text-lg mb-2">About</h3>
                        <p className="text-base-content/70 text-sm line-clamp-4">{project.description}</p>
                        {project.deployURL && (
                            <a href={project.deployURL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-4 text-sm font-semibold hover:text-primary transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                {new URL(project.deployURL).hostname}
                            </a>
                        )}
                    </div>

                    <div className="border-b border-base-content/10 pb-4">
                        <h3 className="font-bold mb-3 text-base-content/80 text-sm">Contributors</h3>
                        <div className="flex items-center gap-2">
                            <Link to={`/admin/users/${project.ownerId?._id}`} className="avatar cursor-pointer hover:opacity-80 transition-opacity" title={project.ownerId?.firstname}>
                                <div className="w-10 rounded-full border border-base-content/20 shadow-sm">
                                    <img src={project.ownerId?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${project.ownerId?.firstname}`} alt="contributor" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-3 text-base-content/80 text-sm">Languages & Tools</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack?.map((t) => (
                                <span key={t} className="px-2 py-1 bg-base-200 rounded text-xs font-semibold text-primary">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectDetails;
