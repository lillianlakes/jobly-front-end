import React, { useContext, useEffect, useMemo, useState } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import UserContext from "./UserContext";

/**  Makes API call to show all jobs user has applied for.
 * 
 *   State:
 *   - jobs: array of jobs objects, like 
 *    [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *   - isLoading: boolean to show if the API call is in progress
 * 
 *   App -> Routes -> Applications -> [JobCard, ...]
*/

function Applications() {

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const applications = useMemo(() => {
    return Array.isArray(currentUser?.applications)
      ? currentUser.applications.map(Number)
      : [];
  }, [currentUser]);

  useEffect(function getJobsWhenMounted() {
    async function getJobs() {
      if (applications.length === 0) {
        setJobs([]);
        setIsLoading(false);
        return;
      }

      let jobsResults = await JoblyApi.request('jobs')
      let appliedJobs = jobsResults.jobs.filter(j => applications.includes(Number(j.id)));
     
      setJobs(appliedJobs);
      setIsLoading(false);
    }
    getJobs();
  }, [applications]);

  if (isLoading) return <i>Loading...</i>;

  return (
    <div className="JobList col-md-8 offset-md-2">
      {jobs.length
        ? (
          <div>
            <h1>Applications</h1>
            <div className="JobList-list">
              {jobs.map(job =>
                <JobCard key={job.id} job={job} />
              )}
            </div>
          </div>
        ) : (<p className="lead">No applications yet!</p>)}
    </div>
  );

}

export default Applications;