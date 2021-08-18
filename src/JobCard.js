import React from "react";

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

  return (
    <div>
        <h1>{title}</h1>
        <p>Salary: {salary}</p>
        <p>Equity: {equity}</p>
    </div>  
  )
}

export default JobCard;