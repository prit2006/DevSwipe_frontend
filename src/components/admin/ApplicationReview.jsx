import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";

const ApplicationReview = () => {
    const [applications, setApplications] = useState([]);
   const [loadingId, setLoadingId] = useState(null);
    const [error, setError] = useState("");

    const fetchApplications = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/applications`, { withCredentials: true });
            setApplications(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load applications");
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

   const handleVerify = async (id) => {

    setLoadingId(id);

    try {

        await axios.patch(
            `${BASE_URL}/admin/applications/${id}/verify`,
            {},
            { withCredentials: true }
        );

        alert("Application verified and email sent");

        fetchApplications();

    } catch (err) {

        alert("Failed to verify application");

    } finally {

        setLoadingId(null);

    }
};

    return (
        <div className="p-6 bg-gray-800 text-gray-200 min-h-screen rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-green-400">Application Review</h2>
            {error && <p className="text-red-500">{error}</p>}

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                        <tr>
                            <th className="px-6 py-3">Applicant</th>
                            <th className="px-6 py-3">Job / Role</th>
                            <th className="px-6 py-3">Applied At</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app._id} className="border-b bg-gray-900 border-gray-700 hover:bg-gray-800 transition">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={app.userId?.photoURL || "https://via.placeholder.com/40"} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <div className="font-semibold text-white">{app.userId?.firstname} {app.userId?.lastname}</div>
                                        <div className="text-xs text-gray-500">{app.userId?.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-white font-medium">{app.jobId?.title}</div>
                                    <div className="text-xs text-gray-500">{app.jobId?.company} - {app.jobId?.role}</div>
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(app.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${app.status === 'verified' ? 'bg-green-900/50 text-green-400' :
                                            app.status === 'rejected' ? 'bg-red-900/50 text-red-400' :
                                                'bg-yellow-900/50 text-yellow-500'
                                        }`}>
                                        {app.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {app.status === 'applied' && (
                                      <button
onClick={() => handleVerify(app._id)}
disabled={loadingId === app._id}
className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition disabled:opacity-50"
>
{loadingId === app._id ? "Verifying..." : "Verify & Email"}
</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {applications.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    No applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationReview;
