import React, { useState } from "react";
import "./SearchBox.css";

/** Takes in a search term and calls the search function
 *  on click
 * 
 *  Props: 
 *  - search function (from either CompanyList or JobList)
 * 
 *  State:
 *  - term: term that is being searched for
 * 
 *  [CompanyList, JobList] -> SearchBox
 */
function SearchBox({ search }) {
  const [term, setTerm] = useState("");

  function handleChange(evt) {
    setTerm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    search(term);
    setTerm("");
  }

  return (
    <div className="SearchBox mb-4">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="searchbar form-control form-control-lg flex-grow-1"
          name="searchBox"
          value={term}
          onChange={handleChange}
          placeholder="Enter search term..."
        />
        <button type="submit" className="searchbutton btn btn-lg btn-primary">
          Search!
        </button>
      </form>
    </div>
  );
}

export default SearchBox;