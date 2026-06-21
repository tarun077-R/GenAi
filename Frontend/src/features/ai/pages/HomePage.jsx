import React, { useRef, useState, useEffect } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";
const HomePage = () => {
  const { loading, generateReport, reports, getAllReports } = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();
  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };
  useEffect(() => {
    getAllReports();
  }, []);
  if (loading) {
    return (
      <main>
        <h1>Generating Interview Report...</h1>
      </main>
    );
  }
  return (
    <main className="home">
      <div className="container">
        <div className="hero">
          <h1>
            Create Your Custom <span>Interview Plan</span>
          </h1>

          <p>
            Let our AI analyze the job requirements and your profile to generate
            a personalized interview strategy.
          </p>
        </div>

        <div className="content">
          <div className="left">
            <h3>🎯 Target Job Description</h3>

            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              name="jobDescription"
              id="jobDescription"
              placeholder="Paste the job description here..."
            />
          </div>

          <div className="right">
            <h3>👤 Your Profile</h3>

            <div className="input-group">
              <label htmlFor="resume">Upload Resume</label>

              <label htmlFor="resume" className="upload-box">
                <div className="upload-icon">📄</div>

                <p>Click to upload your resume</p>

                <span>PDF Only</span>
              </label>

              <input
                ref={resumeInputRef}
                type="file"
                id="resume"
                accept=".pdf"
              />
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="input-group">
              <label htmlFor="selfDescription">Self Description</label>

              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                id="selfDescription"
                name="selfDescription"
                placeholder="Describe yourself, your skills and experience..."
              />
            </div>

            <div className="note">
              Either Resume or Self Description is required.
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={handleGenerateReport} className="generate-btn">
            Generate Interview Strategy
          </button>
        </div>
      </div>
      {reports.length > 0 && (
        <section className="recent-reports">
          <h2>Recent Interview Reports</h2>
          <ul className="report-list">
            {reports.map((report) => (
              <li
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
                className="report-item"
              >
                <h3>{report.title}</h3>
                <p className="report-meta">
                  Generated on {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <p
                  className={`match-score ${report.matchScore >= 80 ? "score--high" : report.matchScore >= 60 ? "score--mid" : "score--low"}`}
                >
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default HomePage;
