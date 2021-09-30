import React from "react";
import "./JobCard.css";
import formatSalary from "./utilities/formatSalary.js"

/**  Shows title, salary and equity for a job
 * 
 *   Prop:
 *   - job: object representing the job, like
 *     { id, title, salary, equity, companyHandle, companyName }
 * 
 *   App -> Routes -> JobList -> [JobCard, ...]
*/
function JobCard({ job }) {

  const { title, salary, equity } = job;
  console.log(typeof(equity), "THIS IS THE TYPE FOR EQUITY VAR")

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h5 className="card-title"><b>{title}</b></h5>
        <p>{salary && <div><small>Salary: {formatSalary(salary)}</small></div>}</p>
        <p>{equity !== undefined && <small>Equity: {equity}</small>}</p>
      </div>
    </div>
  )
}

export default JobCard;