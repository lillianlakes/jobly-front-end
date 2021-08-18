import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ company }) {

  console.log(`company sent to CompanyCard is `, company);

  const { name, description, logoUrl, handle } = company;

  console.log(name, "is name");
  return (

    <div>
      <Link to={`companies/${handle}`}>
        <h2>{name}</h2>
        {logoUrl && <img src={logoUrl} alt={`${name} logo`} />}
        <p>{description}</p>
      </Link>
    </div>
  )
}

export default CompanyCard;