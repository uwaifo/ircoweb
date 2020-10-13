import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
import { GetCurrentUser, GetCurrentUserprofile } from "helpers/getCurrentUser";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import { LogoutUser } from "helpers/getCurrentUser";

function ExamplesNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    checkUser();
  });

  //USE EFFECT FUNCTIONS
  async function checkUser() {
    try {
      const data = await GetCurrentUser();
      const userInfo = await GetCurrentUserprofile(data);
      setUserProfile(userInfo);
      //console.log(userProfile);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  //logout
  const logout = () => {
    setUserProfile({});
    LogoutUser();
    //Auth.signOut();
  };
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/"
            target="_blank"
            title="Coded by Creative Tim"
            //tag={Link}
          >
            <img
              alt="..."
              width="100"
              height="100"
              //className="img-circle img-no-padding img-responsive"
              src={require("assets/img/logo/logo.png")}
            />
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink to="/" tag={Link}>
                <i className="" /> Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/community" tag={Link}>
                <i className="" /> Community
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/user/survey" tag={Link}>
                <i className="" /> Survey
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/timeline" tag={Link}>
                <i className="" /> Time Line
              </NavLink>
            </NavItem>
            {(function() {
              if (userProfile) {
                if (
                  userProfile.userRole === "INVESTOR" ||
                  userProfile.userRole === "ADMIN"
                ) {
                  return (
                    <NavItem>
                      <NavLink to="/investor" tag={Link}>
                        <i className="" /> Investors
                      </NavLink>
                    </NavItem>
                  );
                }
              }
            })()}
            {(function() {
              if (userProfile) {
                return (
                  <NavItem>
                    <NavLink to="/auth" tag={Link} onClick={logout}>
                      <i className="" /> Logout
                    </NavLink>
                  </NavItem>
                );
              } else {
                return (
                  <NavItem>
                    <NavLink to="/auth" tag={Link}>
                      <i className="" /> Login
                    </NavLink>
                  </NavItem>
                );
              }
            })()}
            {/*<NavItem>
              <NavLink to="/auth" tag={Link}>
                <i className="" /> Login
              </NavLink>
            </NavItem>*/}
            <NavItem>
              <NavLink to="/about" tag={Link}>
                <i className="" /> About
              </NavLink>
            </NavItem>
            {(function() {
              if (userProfile) {
                if (userProfile.userRole === "ADMIN") {
                  return (
                    <NavItem>
                      <NavLink to="/admin" tag={Link}>
                        <i className="" /> Admin
                      </NavLink>
                    </NavItem>
                  );
                }
              }
            })()}
            <NavItem>
              <NavLink to="/contact" tag={Link}>
                <i className="" /> Contact
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default ExamplesNavbar;
