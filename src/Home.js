import React, { useContext } from "react";
import Alert from "./Alert";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";
import RecommendedJobCard from "./RecommendedJobCard";
import "./Home.css"

/** Goes to the homepage, displays differently depending on whether user is
 * logged in.
 */
function Home() {
  const {
    currentUser,
    visibleAiRecommendations,
    aiMeta,
    aiLoading,
    aiError,
    refreshRecommendations,
  } = useContext(UserContext);

  const isLoggedIn = currentUser && currentUser !== "fetching" && currentUser.username;

  return (
    <div className={`Home ${isLoggedIn ? "Home--logged-in" : ""}`}>
      <div className="container home-layout">
        <div className="text-center jobly-welcome">
          <h1 className="mb-4 font-weight-bold">Jobly</h1>
          <p className="lead font-weight-bold">Your One-Stop Shop for Job Applications and Company Research</p>
          {isLoggedIn ?
            (
              <h2>Welcome back, {currentUser.firstName}!</h2>
            )
            :
            (
              <div className="home-button-container">
                <Link className="home-button btn btn-primary font-weight-bold mr-3"
                  to="/login">Log in
                </Link>
                <Link className="home-button btn btn-primary font-weight-bold"
                  to="/signup">Sign Up</Link>
              </div>
            )}
        </div>

        {isLoggedIn ? (
          <section className="recommendations-panel">
            <div className="recommendations-header">
              <div>
                <p className="page-kicker">AI assistant</p>
                <h2>Recommended for you</h2>
                <p className="recommendations-subtitle">
                  Personalized roles based on your profile and application history.
                </p>
              </div>
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
              <>
                {aiMeta ? (
                  <p className="recommendations-meta">
                    Showing {visibleAiRecommendations.length} of {aiMeta.totalCandidates} candidate matches
                  </p>
                ) : null}
                <div className="recommendations-grid">
                  {visibleAiRecommendations.map(rec => (
                    <RecommendedJobCard key={rec.id} recommendation={rec} />
                  ))}
                </div>
              </>
            ) : (
              <div className="recommendations-state">
                No recommendations yet—apply to jobs to improve suggestions.
              </div>
            )}
          </section>
        ) : null}
      </div>
    </div>
  )
}

export default Home;