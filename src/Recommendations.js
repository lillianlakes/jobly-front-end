import React, { useContext } from "react";
import Alert from "./Alert";
import UserContext from "./UserContext";
import RecommendedJobCard from "./RecommendedJobCard";
import "./Recommendations.css";

function Recommendations() {
  const {
    visibleAiRecommendations,
    aiMeta,
    aiLoading,
    aiError,
    refreshRecommendations,
  } = useContext(UserContext);

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
              Showing {visibleAiRecommendations.length} of {aiMeta.totalCandidates} candidate matches
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
        ) : visibleAiRecommendations.length ? (
          <div className="recommendations-grid">
            {visibleAiRecommendations.map(rec => (
              <RecommendedJobCard key={rec.id} recommendation={rec} />
            ))}
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