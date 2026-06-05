import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/const";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type !== "application/pdf") {
        setFile(null);
        setError("Please upload a valid PDF resume.");
        return;
      }

      setFile(selectedFile);
      setError("");
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a resume PDF");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);
    if (selfDescription.trim()) {
      formData.append("selfDescription", selfDescription.trim());
    }
    if (jobDescription.trim()) {
      formData.append("jobDescription", jobDescription.trim());
    }

    try {
      const response = await axios.post(`${BASE_URL}/interview/analyze-resume`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      const reportId = response.data.interviewReport._id;
      navigate(`/interview-reports/${reportId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4 text-primary">AI Resume Analyzer</h2>
          <p className="text-sm mb-4">Upload your resume to get an AI-powered report, generate a tailored resume PDF, and find matching jobs.</p>
          
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Upload Resume (PDF)</span>
              </label>
              <input 
                type="file" 
                accept="application/pdf"
                className="file-input file-input-bordered file-input-primary w-full" 
                onChange={handleFileChange}
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Self Description (Optional)</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24" 
                placeholder="Tell us a bit about yourself, your goals, or any specific skills you want to highlight..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                disabled={loading}
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Job Description (Optional)</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-28"
                placeholder="Paste the job description or target role details to tailor the analysis and AI resume..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={loading}
              ></textarea>
            </div>

            {error && <div className="text-error text-sm mt-2">{error}</div>}

            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                disabled={loading || !file}
              >
                {loading ? "Analyzing..." : "Analyze Resume"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
