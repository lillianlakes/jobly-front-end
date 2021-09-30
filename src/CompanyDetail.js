import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import "./CompanyDetail.css"

/**  Makes API call to show details of a specific company.
 * 
 *   State:
 *   - company: object representing the company, like
 *     { handle, name, description, numEmployees, logoUrl, jobs }
 *     where jobs is [{ id, title, salary, equity }, ...]
 *   - isLoading: boolean to show if the API call is in progress
 *   - handle: company handle that is passed in as a URL parameter
 *     when the company is clicked on
 * 
 *   App -> Routes -> CompanyDetail -> [JobCard, ...]
*/
function CompanyDetail() {
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { handle } = useParams();

  useEffect(function getCompanyWhenMounted() {
    async function getCompany() {
      const companyData = await JoblyApi.getCompany(handle);
      setCompany(companyData);
      setIsLoading(false);
    }
    getCompany();
  }, [handle]);

  const { name, description, jobs } = company;

  if (isLoading) return <i>Loading...</i>;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h2>{name}</h2>
      <p>{description}</p>
      {jobs.map(job =>
        <JobCard key={job.id} job={job} />
      )}
    </div>
  );
}

export default CompanyDetail;