import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../asset/logo.svg";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../context/UserContext";
import { Fragment, useContext, useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { logoutContext, user } = useContext(Context);
  const [hideHeader, setHideHeader] = useState(false);

  const handleLogout = () => {
    logoutContext();
    navigate("/");
    toast.success("Logout Success");
  };

  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);
  //   }
  // }, []);
  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="/">
          <img src={logo} className="logo react" alt="React logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {((user && user.auth === true) ||
            window.location.pathname === "/" ||
            window.location.pathname === "/users") && (
            <Fragment>
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/users" className="nav-link">
                  Manager Users
                </NavLink>
              </Nav>
              <Nav>
                {user && user.email && (
                  <span className="nav-link">Wecome {user.email} !</span>
                )}
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {user && user.auth === true ? (
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      Logout
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item>
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            </Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
