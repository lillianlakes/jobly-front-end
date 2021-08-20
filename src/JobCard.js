import React from "react";
import "./JobCard.css";

/**  Shows title, salary and equity for a job
 * 
 *   Prop:
 *   - job: object representing the job, like
 *     { id, title, salary, equity, companyHandle, companyName }
 * 
 *   App -> Routes -> JobList -> [JobCard, ...]
*/
function JobCard({ job }) {

  const { title, salary, equity, companyName } = job;

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && <div><small>Salary: {salary}</small></div>}
        {equity !== undefined && <div><small>Equity: {equity}</small></div>}
      </div>
    </div>
  )
}

export default JobCard;