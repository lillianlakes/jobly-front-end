import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";

/** docstring!!! */

function NavBar({ logout }) {


  const currentUser = useContext(UserContext); //{}?

  console.log(currentUser, "CURR USER FROM NAVBAR");

  console.log(`current user boolean @ Nav `, !!currentUser);

  return (
      <nav className="NavBar">
        <NavLink exact to="/">Jobly</NavLink>
        {currentUser ? (
          <div>
            <NavLink exact to="/companies">Companies</NavLink>
            <NavLink exact to="/companies/jobs">Jobs</NavLink>
            <NavLink exact to="/profile">Edit Profile</NavLink>
            <NavLink exact to="/" onClick={logout}>Log out {currentUser.username}</NavLink>
          </div>
        ):(
          <div>
            <NavLink exact to="/login">Login</NavLink>
            <NavLink exact to="/signup">Sign Up</NavLink>
          </div>
        )}
      </nav>
    );
}

export default NavBar;

