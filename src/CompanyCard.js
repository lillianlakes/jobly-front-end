import React from "react";
import { Link } from "react-router-dom";

/**  Shows name, description and logo of company
 * 
 *   Prop:
 *   - company: object representing the company, like
 *     { handle, name, description, numEmployees, logoUrl, jobs }
 *     where jobs is [{ id, title, salary, equity }, ...]
 * 
 *   App -> Routes -> CompanyList -> CompanyCard
*/
function CompanyCard({ company }) {

  const { name, description, logoUrl, handle } = company;

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