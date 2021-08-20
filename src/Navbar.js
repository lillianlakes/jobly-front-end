import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";

/** 
 * NavBar generates two different navbars, and chooses which to display depending on
 * whether the user is logged in or out
 */

function NavBar({ logOut }) {
  const currentUser = useContext(UserContext);
 console.log("NavBar", currentUser)
  return (
    <nav className="NavBar">
      <NavLink exact to="/">Jobly</NavLink>
      {currentUser.username ? (
        <div>
          <NavLink exact to="/companies">Companies</NavLink>
          <NavLink exact to="/companies/jobs">Jobs</NavLink>
          <NavLink exact to="/profile">Edit Profile</NavLink>
          <NavLink exact to="/" onClick={logOut}>Log out {currentUser.username}</NavLink>
        </div>
      ) : (
        <div>
          <NavLink exact to="/login">Login</NavLink>
          <NavLink exact to="/signup">Sign Up</NavLink>
        </div>
      )}
    </nav>
  );
}

export default NavBar;

