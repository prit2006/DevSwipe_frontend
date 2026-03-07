import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/const";

const MyApplications = () => {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/job/applications/me`, { withCredentials: true })
            .then(res => setApps(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-green-400">My Applications</h1>
                <Link to="/jobs" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition font-medium">Find More Jobs</Link>
            </div>

            <div className="grid gap-6">
                {apps.map(app => (
                    <div key={app._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg hover:border-gray-500 transition">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-xl font-bold text-white hover:text-green-300 transition cursor-pointer">
                                {app.jobId ? (
                                   <Link to={`/jobs/${app.jobId?._id}`}>{app.jobId.title}</Link>
                                ) : (
                                    <span className="text-red-400">Deleted Job</span>
                                )}
                            </h2>
                            <p className="text-gray-400 mb-2">{app.jobId?.company || "Unknown Company"} • {app.jobId?.role || "Unknown Role"}</p>
                            <p className="text-sm text-gray-500 font-medium">Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-4 border-t md:border-t-0 border-gray-700 pt-4 md:pt-0 w-full md:w-auto">
                            <span className={`px-5 py-2 rounded-full font-bold text-sm tracking-wide text-center w-full md:w-auto ${app.status === 'verified' ? 'bg-green-900/60 text-green-400 border border-green-800' :
                                    app.status === 'rejected' ? 'bg-red-900/60 text-red-400 border border-red-800' :
                                        'bg-yellow-900/60 text-yellow-400 border border-yellow-800'
                                }`}>
                                {app.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                ))}
                {apps.length === 0 && (
                    <div className="text-center mt-12 bg-gray-800 border border-gray-700 p-12 rounded-xl shadow-lg">
                        <div className="text-5xl mb-4">📄</div>
                        <p className="text-gray-300 text-xl font-medium mb-6">You haven't applied to any jobs yet.</p>
                        <Link to="/jobs" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg inline-block">Explore Opportunities</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplications;
