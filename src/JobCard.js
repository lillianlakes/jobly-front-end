import React, { useContext, useMemo, useState } from "react";
import "./JobCard.css";
import formatSalary from "./utilities/formatSalary.js"
import UserContext from "./UserContext";
import JoblyApi from "./api";

/**  Shows title, salary and equity for a job
 * 
 *   Prop:
 *   - job: object representing the job, like
 *     { id, title, salary, equity, companyHandle, companyName }
 * 
 *   App -> Routes -> JobList -> [JobCard, ...]
*/
function JobCard({ job }) {
  const { id, title, salary, equity } = job;
  const { currentUser, setCurrentUser } = useContext(UserContext);
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

  async function handleSubmit() {

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
          applications: [...prevApplications, jobId]
        };
      });
    } catch (err) {
      console.error("Unable to apply for job:", err);
    } finally {
      setIsApplying(false);
    }
  }

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h5 className="card-title"><b>{title}</b></h5>
        <p>{salary && <small>Salary: {formatSalary(salary)}</small>}</p>
        {typeof (equity) === "object"
          ? <p></p>
          : <p>{<small>Equity: {equity}</small>}</p>
        }
        {!isApplied
          ?
          <button className="btn btn-primary btn-sm apply-btn"
            onClick={handleSubmit}
            disabled={isApplying}
            aria-label={`Apply for ${title}`}
          >
            {isApplying ? "Applying..." : "Apply"}
          </button>
          :
          <button className="btn btn-sm applied-btn" disabled aria-label={`Already applied for ${title}`}>
            Applied!
          </button>
        }
      </div>
    </div>
  )
}

export default JobCard;