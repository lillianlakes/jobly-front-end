import { NavLink } from "react-router-dom";

/** docstring!!! */

function NavBar() {
    return (
        <nav className="NavBar">
          <NavLink exact to="/">Jobly</NavLink>
          <NavLink exact to="/companies">Companies</NavLink>
          <NavLink exact to="/companies/jobs">Jobs</NavLink>
          <NavLink exact to="/login">Login</NavLink>
          <NavLink exact to="/signup">Sign Up</NavLink>
          <NavLink exact to="/profile">Edit Profile</NavLink>
        </nav>
      );
}

export default NavBar;

