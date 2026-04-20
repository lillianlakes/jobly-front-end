import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";
import UserContext from "./UserContext";
import formatSalary from "./utilities/formatSalary";
import "./Recommendations.css";

function Recommendations() {
  const {
    aiRecommendations,
    aiMeta,
    aiLoading,
    aiError,
    refreshRecommendations,
  } = useContext(UserContext);

  function formatRecommendationScore(score) {
    const numericScore = Number(score);
    if (!Number.isFinite(numericScore)) return null;

    const normalizedScore = Math.min(100, Math.max(0, Math.round(numericScore)));
    return `${normalizedScore}%`;
  }

  return (
    <div className="Recommendations page-shell">
      <div className="page-header">
        <p className="page-kicker">AI assistant</p>
        <h1 className="page-title">Recommendations</h1>
        <p className="page-subtitle">Personalized roles based on your profile and application history.</p>
      </div>

      <section className="recommendations-content content-card">
        <div className="recommendations-topbar">
          {aiMeta ? (
            <p className="recommendations-meta">
              Showing {aiMeta.returned} of {aiMeta.totalCandidates} candidate matches
            </p>
          ) : <div />}

          <button
            className="btn btn-outline-primary refresh-recommendations-btn"
            onClick={refreshRecommendations}
            disabled={aiLoading}
          >
            {aiLoading ? "Refreshing..." : "Refresh recommendations"}
          </button>
        </div>

        {aiError ? <Alert type="danger" messages={[aiError]} /> : null}

        {aiLoading ? (
          <div className="recommendations-state">Loading recommendations...</div>
        ) : aiRecommendations.length ? (
          <div className="recommendations-grid">
            {aiRecommendations.map(rec => {
              const scoreLabel = formatRecommendationScore(rec.score);

              return (
                <article key={rec.id} className="recommendation-card card">
                  <div className="card-body recommendation-card-body">
                    <div className="recommendation-card-top">
                      <div>
                        <h3 className="recommendation-title">{rec.title}</h3>
                        <Link className="recommendation-company" to={`/companies/${rec.companyHandle}`}>
                          {rec.companyHandle}
                        </Link>
                      </div>
                      {scoreLabel ? <span className="recommendation-score">{scoreLabel}</span> : null}
                    </div>

                    <div className="recommendation-details">
                      {rec.salary ? <p>Salary: {formatSalary(rec.salary)}</p> : null}
                      {rec.equity ? <p>Equity: {rec.equity}</p> : null}
                    </div>

                    {Array.isArray(rec.reasons) && rec.reasons.length ? (
                      <div className="recommendation-reasons">
                        <p className="recommendation-reasons-label">Why it matches</p>
                        <ul>
                          {rec.reasons.map((reason, idx) => <li key={`${rec.id}-reason-${idx}`}>{reason}</li>)}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="recommendations-state">
            No recommendations yet—apply to jobs to improve suggestions.
          </div>
        )}
      </section>
    </div>
  );
}

export default Recommendations;