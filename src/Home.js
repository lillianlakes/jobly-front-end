import React, { useContext } from "react";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";



/** Goes to the homepage, displays differently depending on whether user is
 * logged in.
 */
function Home() {
  const currentUser = useContext(UserContext);
  console.log("Home", currentUser)

  return (
    <div>
      {currentUser ?
        (
          <div>
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place.</p>
            <h2>Welcome Back! {currentUser.firstName}</h2>
          </div>
        )
        :
        (
          <div>
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place.</p>
            <Link to="/login"><button>Log in</button></Link>
            <Link to="/signup"><button>Sign up</button></Link>
          </div>
        )}
    </div>
  )
}

export default Home;