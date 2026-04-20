import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import SearchBox from "./SearchBox";

/**  Makes API call to show all jobs or filter specific jobs 
 *   by title.
 * 
 *   State:
 *   - jobs: array of jobs objects, like 
 *    [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *   - isLoading: boolean to show if the API call is in progress
 *   - jobTitle: string search term entered by user
 * 
 *   App -> Routes -> JobList -> [SearchBox, [JobCard, ...]]
*/
function JobList() {

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState("");

  function search(jobTitle) {
    setJobTitle(jobTitle);
  }

  useEffect(function getJobsWhenMounted() {
    async function getJobs() {
      let jobsResults;

      if (!jobTitle) {
        jobsResults = await JoblyApi.request('jobs')
      } else {
        jobsResults = await JoblyApi.request(`jobs?title=${jobTitle}`)
      }
      setJobs(jobsResults.jobs);
      setIsLoading(false);
    }
    getJobs();
  }, [jobTitle]);

  if (isLoading) return <i>Loading...</i>;

  return (
    <div className="JobList page-shell">
      <div className="page-header">
        <p className="page-kicker">Find your next move</p>
        <h1 className="page-title">Jobs</h1>
        <p className="page-subtitle">Browse roles from modern companies, compare compensation at a glance, and apply in one click.</p>
      </div>
      <SearchBox search={search} />
      {jobs.length
        ? (
          <div>
            <div className="JobList-list">
              {jobs.map(job =>
                <JobCard key={job.id} job={job} />
              )}
            </div>
          </div>
        ) : (<p className="lead">Sorry, no results were found!</p>)}
    </div>
  );

}

export default JobList;











