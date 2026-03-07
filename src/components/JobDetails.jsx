import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/const";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [applying, setApplying] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        axios.get(`${BASE_URL}/job/${id}`, { withCredentials: true })
            .then(res => setJob(res.data))
            .catch(err => setError("Job not found."));
    }, [id]);

    const handleApply = async () => {
        setApplying(true);
        setError("");
        setSuccess("");
        try {
            await axios.post(`${BASE_URL}/job/apply/${id}`, {}, { withCredentials: true });
            setSuccess("Successfully applied!");
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.response?.data || "Application failed");
            setApplying(false);
        }
    };

    if (error && !job) return <div className="text-center text-red-500 mt-20 font-bold">{error}</div>;
    if (!job) return <div className="text-center text-gray-400 mt-20 text-xl animate-pulse">Loading Job Details...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 mt-10 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
            <button onClick={() => navigate(-1)} className="text-green-400 hover:underline mb-6 inline-block font-semibold">
                &larr; Back to Jobs
            </button>
            <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
            <p className="text-xl text-green-400 mb-6 font-medium">{job.company} • {job.role}</p>

            <div className="flex flex-wrap gap-2 mb-6">
                {job.skills?.map((s, i) => (
                    <span key={i} className="bg-gray-700/50 text-green-300 border border-green-800 px-3 py-1 rounded-full text-sm">{s}</span>
                ))}
            </div>

            <div className="mb-6 bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-inner">
                <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Description</h2>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{job.description}</p>
            </div>

            <div className="mb-6 bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-inner">
                <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Eligibility Criteria</h2>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{job.eligibility}</p>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-400 mb-1">Application Deadline</h2>
                <p className="text-blue-400 font-semibold">{new Date(job.deadline).toLocaleString()}</p>
            </div>

            {error && <p className="text-red-400 mb-4 bg-red-900/20 border border-red-800 p-3 rounded">{error}</p>}
            {success && <p className="text-green-400 mb-4 bg-green-900/20 border border-green-800 p-3 rounded">{success}</p>}

            <button
                onClick={handleApply}
                disabled={applying || success}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-lg text-lg"
            >
                {success ? "Applied ✔️" : applying ? "Applying..." : "Apply Now"}
            </button>
        </div>
    );
};

export default JobDetails;
