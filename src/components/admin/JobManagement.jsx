import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";

const JobManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        role: "",
        skills: "",
        description: "",
        eligibility: "",
        deadline: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchJobs = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/jobs`, { withCredentials: true });
            setJobs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePostJob = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const payload = {
                ...formData,
                skills: formData.skills.split(",").map(s => s.trim()).filter(s => s)
            };
            await axios.post(`${BASE_URL}/admin/jobs`, payload, { withCredentials: true });
            setSuccess("Job posted successfully!");
            setFormData({ title: "", company: "", role: "", skills: "", description: "", eligibility: "", deadline: "" });
            fetchJobs();
        } catch (err) {
            setError(err.response?.data || "Failed to post job");
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await axios.delete(`${BASE_URL}/admin/jobs/${id}`, { withCredentials: true });
            fetchJobs();
        } catch (err) {
            alert("Failed to delete job");
        }
    };

    return (
        <div className="p-6 bg-gray-800 text-gray-200 min-h-screen rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-green-400">Manage Jobs & Internships</h2>

            {/* POST JOB FORM */}
            <div className="bg-gray-900 p-6 rounded-lg mb-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Post a New Job</h3>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {success && <p className="text-green-500 mb-2">{success}</p>}
                <form onSubmit={handlePostJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white" />
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white" />
                    <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role (e.g., Software Engineer)" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white" />
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white" />
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white md:col-span-2" rows="3"></textarea>
                    <textarea name="eligibility" value={formData.eligibility} onChange={handleChange} placeholder="Eligibility Criteria" required className="p-3 bg-gray-800 border border-gray-700 rounded text-white md:col-span-2" rows="2"></textarea>
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 mb-1">Application Deadline</label>
                        <input type="datetime-local" name="deadline" value={formData.deadline} onChange={handleChange} required className="p-3 bg-gray-800 border border-gray-700 rounded text-white w-full" />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition">Post Job</button>
                    </div>
                </form>
            </div>

            {/* JOB LIST */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Posted Jobs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map(job => (
                        <div key={job._id} className="bg-gray-900 p-5 rounded-lg border border-gray-700 relative flex flex-col justify-between">
                            <div>
                                <h4 className="text-lg font-bold text-white">{job.title}</h4>
                                <p className="text-sm text-gray-400 mb-2">{job.company} • {job.role}</p>
                                <p className="text-xs font-semibold text-blue-400 bg-blue-900/30 inline-block px-2 py-1 rounded mb-4">
                                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {job.skills?.slice(0, 3).map((s, i) => (
                                        <span key={i} className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">{s}</span>
                                    ))}
                                    {job.skills?.length > 3 && <span className="text-xs text-gray-500">+{job.skills.length - 3}</span>}
                                </div>
                            </div>
                            <button onClick={() => handleDeleteJob(job._id)} className="w-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white py-2 rounded transition mt-2">
                                Delete Job
                            </button>
                        </div>
                    ))}
                    {jobs.length === 0 && <p className="text-gray-400 col-span-full">No jobs posted yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default JobManagement;
