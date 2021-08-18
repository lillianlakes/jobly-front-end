import React from "react";
import { Link } from "react-router-dom";

function JobList( {jobs} ) {
    return (
        <div>
            {jobs.map(job => 
            <div key={job.id}>
                <h1>{job.title}</h1>
                <p>Salary: {job.salary}</p>
                <p>Equity: {job.equity}</p>
            </div>
            )}
        </div>
    );
}

export default JobList;