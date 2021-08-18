import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobList from "./JobList"


function CompanyDetail() {
    // make an API request here by calling the function in api.js
    // useEffect
    // isLoading 
    // await it!
    const [company, setCompany] = useState("");
    const [isLoading, setIsLoading] = useState(true);  
    const { handle } = useParams();

    useEffect(function getCompanyWhenMounted() {
      async function getCompany() {
        const companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
        setIsLoading(false);
      }
      getCompany();
    }, []);

    const { name, description, jobs } = company;

    if (isLoading) return <i>Loading...</i>;
  
    return (
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
            <JobList jobs={jobs}/>
        </div>
    );
  }

export default CompanyDetail;