import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/const";

const MyInterviewReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/interview`, {
          withCredentials: true,
        });
        setReports(response.data.interviewReports);
      } catch (err) {
        console.error(err);
        setError("Failed to load interview reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-error mt-10 text-xl">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold text-primary">My AI Resumes & Reports</h1>
        <Link to="/resume-analyzer" className="btn btn-primary">
          Analyze New Resume
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="text-center mt-20 text-gray-400">
          <p className="text-xl mb-4">You haven't generated any AI reports yet.</p>
          <Link to="/resume-analyzer" className="btn btn-outline btn-primary">
            Get Started
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <div key={report._id} className="card bg-base-200 shadow-xl border border-white/5 hover:border-primary/30 transition-all duration-300">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-xl mb-1 text-white truncate max-w-[250px]">
                      {report.title}
                    </h2>
                    <p className="text-sm text-gray-400 mb-3">
                      {report.recommendedJobId?.company 
                        ? `Target: ${report.recommendedJobId.company}` 
                        : "General Analysis"}
                    </p>
                  </div>
                  <div className="radial-progress text-primary font-bold text-sm bg-base-300 border-4 border-base-300" style={{"--value": report.matchScore, "--size": "3.5rem", "--thickness": "0.4rem"}} role="progressbar">
                    {report.matchScore}%
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Generated: {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                  <Link 
                    to={`/interview-reports/${report._id}`} 
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    View Full Report
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInterviewReports;
