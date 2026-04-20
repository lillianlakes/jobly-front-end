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
    salary,
    equity,
    score,
    reasons,
  } = recommendation;

  const { currentUser, setCurrentUser, refreshRecommendations } = useContext(UserContext);
  const [isApplying, setIsApplying] = useState(false);

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

  const scoreLabel = Number.isFinite(Number(score))
    ? `${Math.min(100, Math.max(0, Math.round(Number(score))))}%`
    : null;

  return (
    <article className="recommendation-card card">
      <div className="card-body recommendation-card-body">
        <div className="recommendation-card-top">
          <div>
            <h3 className="recommendation-title">{title}</h3>
            <Link className="recommendation-company" to={`/companies/${companyHandle}`}>
              {companyHandle}
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
          <button
            className="btn btn-primary btn-sm apply-btn"
            onClick={handleApply}
            disabled={isApplying}
            aria-label={`Apply for ${title}`}
          >
            {isApplying ? "Applying..." : "Apply"}
          </button>
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