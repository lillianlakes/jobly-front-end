import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchBox from "./SearchBox";
import "./CompanyList.css";

/**  Makes API call to show all companies or filter specific companies 
 *   by name.
 * 
 *   State:
 *   - companies: array of company objects, like 
 *    [ { handle, name, description, numEmployees, logoUrl }, ...]
 *   - isLoading: boolean to show if the API call is in progress
 *   - companyName: string search term entered by user
 * 
 *   App -> Routes -> CompanyList -> [SearchBox, CompanyCard]
*/
function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [companyHandle, setCompanyHandle] = useState("");

  function search(companyHandle) {
    setCompanyHandle(companyHandle);
  }

  useEffect(function getCompaniesWhenMounted() {
    async function getCompanies() {
      let companiesResults;
      
      if (!companyHandle) {
        companiesResults = await JoblyApi.request('companies')
      } else {
        companiesResults = await JoblyApi.request(`companies?name=${companyHandle}`);
      }
      setCompanies(companiesResults.companies);
      setIsLoading(false);
    }
    getCompanies();
  }, [companyHandle]);

  if (isLoading) return <i>Loading...</i>;

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchBox search={search} />
      {companies.length
        ? (
        <div>
            <h1>Companies</h1>
            <div className="CompanyList-list">
              {companies.map(company =>
                <CompanyCard
                  key={company.handle}
                  company={company}
                />
              )}
            </div>
        </div>
        ) : (
          <p className="lead">Sorry, no results were found!</p>
        )}
    </div>
  );
}

export default CompanyList;