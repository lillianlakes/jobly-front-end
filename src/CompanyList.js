import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchBox from "./SearchBox";

function CompanyList() {
    // make an API request here by calling the function in api.js
    // useEffect
    // isLoading 
    // await it!
    
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [companyName, setCompanyName] = useState("");    

    function search(companyName) {
      setCompanyName(companyName);
    }

    useEffect(function getCompaniesWhenMounted() {
      async function getCompanies() {
        let companiesResults;

        if (!companyName) {
          companiesResults = await JoblyApi.request('companies')
        } else {
          companiesResults = await JoblyApi.request(`companies?${companyName}`)
        }
        setCompanies(companies => companiesResults);
        setIsLoading(false);
      }
      getCompanies();
    }, [companyName]);
  
    if (isLoading) return <i>Loading...</i>;
  
    console.log(`companies is `, companies)

    return (
        <div>
          <SearchBox search={search}/>

          {companies.map(company =>
            <CompanyCard key={company.handle} company={company}/>)}

        </div>
    );
  }

export default CompanyList;