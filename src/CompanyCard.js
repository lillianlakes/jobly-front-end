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
          <h5 className="card-title">
            <div>{name}</div>
            <div>{logoUrl && <img src={logoUrl}
                             alt={`${name} logo`}
                             className="float-right ml-5" />}
            </div>
          </h5>
          <p><small>{description}</small></p>
        </div>
      </Link>
  )
}

export default CompanyCard;