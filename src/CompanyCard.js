import React from "react";

function CompanyCard({ company }) {

  console.log(`company sent to CompanyCard is `, company);
  
  const { name, description, logoUrl } = company;
  return (
    <div>
      <h2>{name}</h2>
      <img src={logoUrl} alt={`${name} logo`} />
      <p>{description}</p>
    </div>
  )
}

export default CompanyCard;