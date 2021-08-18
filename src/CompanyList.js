import React, {useEffect, useState} from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchBox from "./SearchBox";

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
    const [companyName, setCompanyName] = useState("");    

    function search(companyName) {
      setCompanyName(companyName);
    }

    // TODO: put line 35 into the search function... then we don't need anything with companyName
    useEffect(function getCompaniesWhenMounted() {
      async function getCompanies() {
        let companiesResults;

        if (!companyName) {
          companiesResults = await JoblyApi.request('companies')
        } else {
          companiesResults = await JoblyApi.request(`companies?name=${companyName}`)
        }
        setCompanies(companiesResults.companies);
        setIsLoading(false);
      }
      getCompanies();
    }, [companyName]);
  
    if (isLoading) return <i>Loading...</i>;

    // TODO: refactor: if (companies.length === 0) return <i>Loading...</i> ... this would re-render when setCompanies updates
    // then delete 'setIsLoading(false)'
    return (
        <div>
          <SearchBox search={search}/>
          {companies.map(company => 
            <CompanyCard key={company.handle} company={company}/>
            )}
        </div>
    );
  }

export default CompanyList;