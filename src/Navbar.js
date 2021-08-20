import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "./Navbar.css";

/** 
 * NavBar generates two different navbars, and chooses which to display depending on
 * whether the user is logged in or out
 */

function NavBar({ logOut }) {
  const currentUser = useContext(UserContext);
  console.log("NavBar", currentUser)
  return (

    <nav className="Navigation navbar navbar-expand-md">
      <NavLink className="navbar-brand" exact to="/">Jobly</NavLink>

      {currentUser.username ? (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" exact to="/companies">Companies</NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" exact to="/companies/jobs">Jobs</NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" exact to="/profile">Profile</NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/" onClick={logOut}>Log out {currentUser.username}</a>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link"exact to="/login">Login</NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" exact to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      )}
    </nav>

  );
}

export default NavBar;

