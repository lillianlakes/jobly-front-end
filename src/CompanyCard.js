import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

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
      <Link className="CompanyCard card" to={`companies/${handle}`}>
        <div className="card-body">
          <h6 className="card-title">
            {name}
            {logoUrl && <img src={logoUrl}
                             alt={`${name} logo`}
                             className="float-right ml-5" />}
            <p><small>{description}</small></p>
          </h6>
        </div>
      </Link>
  )
}

export default CompanyCard;