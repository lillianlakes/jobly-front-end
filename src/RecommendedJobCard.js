import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import formatSalary from "./utilities/formatSalary";
import "./JobCard.css";

function RecommendedJobCard({ recommendation }) {
  const {
    id,
    title,
    companyHandle,
    companyName,
    name,
    salary,
    equity,
    score,
    reasons,
  } = recommendation;

  const { currentUser, setCurrentUser, refreshRecommendations } = useContext(UserContext);
  const { skipRecommendation } = useContext(UserContext);
  const [isApplying, setIsApplying] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  const applications = useMemo(() => {
    const appArray = currentUser?.applications;
    if (!Array.isArray(appArray)) return [];
    return appArray.map(Number);
  }, [currentUser?.applications]);

  const isApplied = useMemo(() => {
    const numericId = Number(id);
    return applications.includes(numericId);
  }, [applications, id]);

  async function handleApply() {
    if (!currentUser?.username || isApplied || isApplying) return;

    setIsApplying(true);

    try {
      const jobId = Number(id);
      await JoblyApi.applyToJob(currentUser.username, jobId);

      setCurrentUser(prevUser => {
        const prevApplications = Array.isArray(prevUser?.applications)
          ? prevUser.applications.map(Number)
          : [];

        if (prevApplications.includes(jobId)) return prevUser;

        return {
          ...prevUser,
          applications: [...prevApplications, jobId],
        };
      });

      if (typeof refreshRecommendations === "function") {
        refreshRecommendations();
      }
    } catch (err) {
      console.error("Unable to apply for recommended job:", err);
    } finally {
      setIsApplying(false);
    }
  }

  async function handleSkip() {
    if (isSkipping) return;

    setIsSkipping(true);

    try {
      if (typeof skipRecommendation === "function") {
        skipRecommendation(id);
      }

      if (typeof refreshRecommendations === "function") {
        refreshRecommendations();
      }
    } finally {
      setIsSkipping(false);
    }
  }

  const scoreLabel = Number.isFinite(Number(score))
    ? `${Math.min(100, Math.max(0, Math.round(Number(score))))}%`
    : null;

  const companyDisplayName = useMemo(() => {
    const explicitName = companyName || name;
    if (explicitName) return explicitName;

    return String(companyHandle || "")
      .split("-")
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [companyHandle, companyName, name]);

  return (
    <article className="recommendation-card card">
      <div className="card-body recommendation-card-body">
        <div className="recommendation-card-top">
          <div>
            <h3 className="recommendation-title">{title}</h3>
            <Link className="recommendation-company" to={`/companies/${companyHandle}`}>
              {companyDisplayName}
            </Link>
          </div>
          {scoreLabel ? <span className="recommendation-score">{scoreLabel}</span> : null}
        </div>

        <div className="recommendation-details">
          {salary ? <p>Salary: {formatSalary(salary)}</p> : null}
          {equity ? <p>Equity: {equity}</p> : null}
        </div>

        {Array.isArray(reasons) && reasons.length ? (
          <div className="recommendation-reasons">
            <p className="recommendation-reasons-label">Why it matches</p>
            <ul>
              {reasons.map((reason, idx) => <li key={`${id}-reason-${idx}`}>{reason}</li>)}
            </ul>
          </div>
        ) : null}

        {!isApplied ? (
          <div className="recommendation-actions">
            <button
              className="btn btn-primary btn-sm apply-btn"
              onClick={handleApply}
              disabled={isApplying}
              aria-label={`Apply for ${title}`}
            >
              {isApplying ? "Applying..." : "Apply"}
            </button>
            <button
              className="btn btn-outline-secondary btn-sm skip-btn"
              onClick={handleSkip}
              disabled={isSkipping}
              aria-label={`Skip ${title}`}
            >
              {isSkipping ? "Skipping..." : "Skip"}
            </button>
          </div>
        ) : (
          <button className="btn btn-sm applied-btn" disabled aria-label={`Already applied for ${title}`}>
            Applied!
          </button>
        )}
      </div>
    </article>
  );
}

export default RecommendedJobCard;