import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/const";

const InterviewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingResume, setDownloadingResume] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/interview/${id}`, {
          withCredentials: true,
        });
        setReport(response.data.interviewReport);
      } catch (err) {
        console.error(err);
        setError("Failed to load interview report.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

  const handleGenerateResume = async () => {
    try {
      setDownloadingResume(true);
      const response = await axios.get(`${BASE_URL}/interview/${id}/generate-resume`, {
        responseType: 'blob', // Important for downloading files
        withCredentials: true,
      });

      // Create a blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Improved_AI_Resume_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate resume", err);
      alert("Failed to generate and download AI resume.");
    } finally {
      setDownloadingResume(false);
    }
  };

  const handleFindSimilarJobs = () => {
    const recommendedRole = report.recommendedJobId?.role || report.title;
    const query = recommendedRole ? `?role=${encodeURIComponent(recommendedRole)}` : "";
    navigate(`/jobs${query}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[80vh]"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  if (error || !report) {
    return <div className="text-center text-error mt-10 text-xl">{error || "Report not found"}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">AI Interview Analysis</h1>
        <div className="flex flex-wrap justify-end gap-3">
          {report.recommendedJobId && (
            <Link to={`/jobs/${report.recommendedJobId._id}`} className="btn btn-secondary">
              View Recommended Job
            </Link>
          )}
          <button 
            onClick={handleGenerateResume} 
            className={`btn btn-accent ${downloadingResume ? "loading" : ""}`}
            disabled={downloadingResume}
          >
            {downloadingResume ? "Generating..." : "Generate AI Resume PDF"}
          </button>
          <button
            onClick={handleFindSimilarJobs}
            className="btn btn-primary"
          >
            Find Similar Jobs
          </button>
        </div>
      </div>

      {/* Match Score & Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-200 shadow-xl col-span-1">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Match Score</h2>
            <div className="radial-progress text-primary font-bold text-2xl my-4" style={{"--value": report.matchScore, "--size": "8rem", "--thickness": "1rem"}} role="progressbar">
              {report.matchScore}%
            </div>
            <p className="text-sm">Based on your resume and the recommended job ({report.recommendedJobId?.title || report.title}).</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl col-span-2">
          <div className="card-body">
            <h2 className="card-title text-xl border-b pb-2">Target Role: {report.title}</h2>
            <p className="mt-2 text-sm">{report.jobDescription}</p>
          </div>
        </div>
      </div>

      {/* Skill Gaps */}
      {report.skillGaps && report.skillGaps.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Skill Gaps Identified</h2>
          <div className="flex flex-wrap gap-4">
            {report.skillGaps.map((gap, index) => (
              <div key={index} className={`badge badge-lg p-4 ${
                gap.severity === 'high' ? 'badge-error' : 
                gap.severity === 'medium' ? 'badge-warning' : 'badge-info'
              }`}>
                {gap.skill} (Severity: {gap.severity})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preparation Plan */}
      {report.preparationPlan && report.preparationPlan.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Preparation Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.preparationPlan.map((plan, index) => (
              <div key={index} className="card bg-base-100 shadow border border-base-300">
                <div className="card-body p-4">
                  <h3 className="font-bold text-lg">Day {plan.day}: {plan.focus}</h3>
                  <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                    {plan.tasks.map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interview Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-secondary">Technical Questions</h2>
          <div className="space-y-4">
            {report.technicalQuestions?.map((q, index) => (
              <div key={index} className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="tech-accordion" defaultChecked={index === 0} /> 
                <div className="collapse-title text-md font-medium">
                  {q.question}
                </div>
                <div className="collapse-content text-sm space-y-2">
                  <p><span className="font-semibold text-info">Intention:</span> {q.intention}</p>
                  <p><span className="font-semibold text-success">How to answer:</span> {q.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-accent">Behavioral Questions</h2>
          <div className="space-y-4">
            {report.behavioralQuestions?.map((q, index) => (
              <div key={index} className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="behav-accordion" defaultChecked={index === 0} /> 
                <div className="collapse-title text-md font-medium">
                  {q.question}
                </div>
                <div className="collapse-content text-sm space-y-2">
                  <p><span className="font-semibold text-info">Intention:</span> {q.intention}</p>
                  <p><span className="font-semibold text-success">How to answer:</span> {q.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default InterviewReport;
