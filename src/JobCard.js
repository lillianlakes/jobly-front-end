import React, { useContext } from "react";
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
  
  async function handleSubmit() {
   
    let jobId = +id;
    await JoblyApi.applyToJob(currentUser.username, jobId);
   
    let updatedUser = await JoblyApi.getCurrentUser(currentUser.username)
    setCurrentUser(updatedUser);
  }

  console.log(currentUser, "<---- CURRENT USER OBJ")
  console.log(currentUser.applications, "<---- LIST OF APPLICATIONS")

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h5 className="card-title"><b>{title}</b></h5>
        <p>{salary && <small>Salary: {formatSalary(salary)}</small>}</p>
        {typeof (equity) === "object"
          ? <p></p>
          : <p>{<small>Equity: {equity}</small>}</p>
        }
        {!currentUser.applications.includes(id)
          ?
          <button className="btn btn-primary btn-sm apply-btn"
            onClick={handleSubmit}
          >
            Apply
          </button>
          :
          <div className="applied"><p>Applied!</p></div>
        }
      </div>
    </div>
  )
}

export default JobCard;