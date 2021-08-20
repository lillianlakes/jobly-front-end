import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <input value={term} onChange={handleChange}
        placeholder="Enter search term..." />
      <button>Search!</button>
    </form>
  );
}

export default SearchBox;