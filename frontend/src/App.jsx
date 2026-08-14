import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const analyzeResume = async () => {
    if (!file || !jobDescription.trim()) {
      setError("Please upload a resume and enter a job description.");
      return;
    }

    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    setLoading(true);

    try {
      const response = await fetch("https://resume-analyzer-g9kd.onrender.com", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      setResult(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12 shadow-premium-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-in fade-in duration-600">
            <h1 className="text-5xl font-bold mb-3">📄 Resume Analyzer</h1>
            <p className="text-xl opacity-95 font-light">
              Get AI-powered insights on how well your resume matches the job description
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {!result ? (
            <div className="animate-in fade-in duration-500">
              {/* Form Card */}
              <div className="card max-w-2xl mx-auto">
                <div className="card-header">
                  <h2 className="text-2xl font-bold text-gray-900">Analyze Your Resume</h2>
                </div>
                <div className="card-body space-y-6">
                  {/* File Upload Section */}
                  <div className="form-group">
                    <label className="label-text">📎 Upload Your Resume</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-blue-600 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer">
                        {fileName ? (
                          <>
                            <span className="text-3xl animate-pulse">✓</span>
                            <span className="font-medium text-gray-900">{fileName}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-4xl animate-bounce-slow">⬆</span>
                            <span className="text-gray-900 font-medium">Click to upload or drag and drop</span>
                            <span className="text-sm text-gray-500">PDF or DOCX (max 10MB)</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Job Description Section */}
                  <div className="form-group">
                    <label className="label-text">💼 Job Description</label>
                    <textarea
                      rows="12"
                      value={jobDescription}
                      onChange={(event) => {
                        setJobDescription(event.target.value);
                        setError(null);
                      }}
                      placeholder="Paste the complete job description here..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 resize-vertical transition-all duration-300 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Include key requirements, skills, and responsibilities
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-100 border border-red-400 rounded-xl text-red-700 animate-in slide-in-from-top">
                      <span className="text-xl">⚠</span>
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Analyze Button */}
                  <button
                    onClick={analyzeResume}
                    disabled={loading}
                    className={`btn-primary ${loading ? "opacity-75" : ""}`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing Your Resume...
                      </>
                    ) : (
                      <>
                        <span>🔍</span>Analyze Resume
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500 space-y-6">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Analysis Results</h2>
                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary"
                >
                  ← Analyze Another Resume
                </button>
              </div>

              {/* Score Card */}
              <div className="card bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center gap-8 p-8">
                  <div className="relative w-48 h-48 flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={getScoreColor(result.score.score)}
                        strokeWidth="8"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: `${(result.score.score / 100) * 283} 283`,
                          transition: "stroke-dasharray 0.5s ease",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-5xl font-bold">{result.score.score}%</span>
                      <span className="text-sm opacity-90 font-medium">Match Score</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg leading-relaxed">
                      {result.score.score >= 80
                        ? "🎉 Excellent match! Your resume aligns very well with the job requirements."
                        : result.score.score >= 60
                        ? "👍 Good match! Consider addressing the missing skills."
                        : "💡 Fair match. Focus on developing the missing skills."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Candidate Info */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-xl font-bold">Candidate Profile</h3>
                </div>
                <div className="card-body space-y-4">
                  <div className="text-2xl font-semibold text-blue-600">
                    👤 {result.analysis.candidate_name || "Resume"}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{result.analysis.summary}</p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Technical Skills */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-lg font-bold">💻 Technical Skills</h3>
                  </div>
                  <div className="card-body">
                    <div className="flex flex-wrap gap-2">
                      {result.analysis.technical_skills && result.analysis.technical_skills.length > 0 ? (
                        result.analysis.technical_skills.map((skill) => (
                          <span key={skill} className="skill-tag technical">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">No technical skills found</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Matched Skills */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-lg font-bold">✅ Matched Skills</h3>
                  </div>
                  <div className="card-body">
                    <div className="flex flex-wrap gap-2">
                      {result.score.matched_skills && result.score.matched_skills.length > 0 ? (
                        result.score.matched_skills.map((skill) => (
                          <span key={skill} className="skill-tag matched">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">No matched skills</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-lg font-bold">❌ Missing Skills</h3>
                  </div>
                  <div className="card-body">
                    <div className="flex flex-wrap gap-2">
                      {result.score.missing_skills && result.score.missing_skills.length > 0 ? (
                        result.score.missing_skills.map((skill) => (
                          <span key={skill} className="skill-tag missing">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-green-600 italic font-medium">✓ All required skills matched!</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <button onClick={() => setResult(null)} className="btn-secondary">
                  ← Analyze Another Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 opacity-80">
        <p className="text-sm">Resume Analyzer © 2024 | Powered by AI</p>
      </footer>
    </div>
  );
}

export default App;
