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
        <p>Salary: {salary}</p>
        <p>Equity: {equity}</p>
      </div>
    </div>  
  )
}

export default JobCard;