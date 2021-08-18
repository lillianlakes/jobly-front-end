import React from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./api";

function CompanyList() {
    // make an API request here by calling the function in api.js
    // useEffect
    // isLoading 
    // await it!
    
    return (
        <div>
            <p>Company List</p>
            <Link to="/">Go Home</Link>
        </div>
    )
}

export default CompanyList;