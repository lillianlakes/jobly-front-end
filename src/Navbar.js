import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "./UserContext";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import "./Navbar.css";

/** 
 * NavBar generates two different navbars, and chooses which to display depending on
 * whether the user is logged in or out
 */

function NavBar({ logOut }) {
  const { currentUser } = useContext(UserContext);

  return (
    <Navbar collapseOnSelect expand="lg">

      <Nav className="Navigation navbar navbar-expand-md navbar-dark bg-dark">
        <NavbarBrand eventKey="1" as={Link} className="navbar-brand me-auto pl-0" exact to="/"><h4>Jobly</h4></NavbarBrand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          {currentUser.username ? (
            <div className="navbar-nav ml-auto">
              <Nav.Item className="nav-item mr-4">
                <Nav.Link eventKey="2" as={Link} className="nav-link" exact to="/companies">Companies</Nav.Link>
              </Nav.Item>

              <Nav.Item className="nav-item mr-4">
                <Nav.Link eventKey="3" as={Link} className="nav-link" exact to="/companies/jobs">Jobs</Nav.Link>
              </Nav.Item>

              <Nav.Item className="nav-item mr-4">
                <Nav.Link eventKey="4" as={Link} className="nav-link" exact to="/profile">Profile</Nav.Link>
              </Nav.Item>

              <Nav.Item className="nav-item">
                <a className="nav-link" href="/" onClick={logOut}>Log out {currentUser.username}</a>
              </Nav.Item>

            </div>

          ) : (

            <div className="navbar-nav ml-auto">
              <Nav.Item className="nav-item mr-4">
                <NavLink eventKey="5" as={Link} className="nav-link" exact to="/login">Login</NavLink>
              </Nav.Item>
              <Nav.Item className="nav-item mr-4">
                <NavLink eventKey="6" as={Link} className="nav-link" exact to="/signup">Sign Up</NavLink>
              </Nav.Item>
            </div>

          )}
        </Navbar.Collapse>
      </Nav>
    </Navbar>

  );
}

export default NavBar;


