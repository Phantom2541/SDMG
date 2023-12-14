import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
} from "mdbreact";
import Login from "./login";
import { School } from "../../services/fakeDb";
import Banner from "./banner";
import Features from "./features";
import "./index.css";
// import Register from "./register";
import Mission from "./mission";

export default function Home() {
  const [collapseID, setCollapseID] = useState(false),
    [login, setLogin] = useState(false);

  const handleLink = () => {
    console.log("test");
  };

  const toggleLogin = () => setLogin(!login);

  return (
    <>
      <Login show={login} toggle={toggleLogin} />
      <div id="landing" style={{ minWidth: "650px", overflowX: "hidden" }}>
        <MDBNavbar
          dark
          expand="md"
          fixed="top"
          scrolling
          transparent
          style={{ minWidth: "768px" }}
        >
          <MDBContainer>
            <MDBNavbarBrand href="#" onClick={() => handleLink("landing")}>
              <strong className="white-text">{School.name}</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={() => setCollapseID(!collapseID)} />
            <MDBCollapse id="navbarCollapse" isOpen={collapseID} navbar>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={() => handleLink("featureOffset")}
                    to="#"
                  >
                    Features
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/register">Register</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink onClick={toggleLogin} to="#">
                    Login
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>

        <Banner />
        <Features />
        {/* <Register /> */}
        <Mission />
      </div>
    </>
  );
}
