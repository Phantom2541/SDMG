import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavItem,
  MDBMask,
  MDBView,
  MDBNavLink,
  MDBBtn,
} from "mdbreact";
import "./index.css";
import { School } from "../../services/fakeDb";
import Register from "./register";
import Login from "./login";
import Footer from "./footer";
// import ContactUs from "./contactUs";
import Features from "./features";
import BG1 from "../../assets/landing/bg1.jpg";
import BG2 from "../../assets/landing/bg2.jpg";
import BG3 from "../../assets/landing/bg3.jpg";
import BG4 from "../../assets/landing/bg4.jpg";
import BG5 from "../../assets/landing/bg5.jpg";
// import Mission from "./mission";
// import Vision from "./vision";
import Core from "./core";

const backgrounds = [BG1, BG2, BG3, BG4, BG5].sort(() => Math.random() - 0.5);

const Index = ({ toggle }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setImageIndex((prev) => {
        if (prev > 3) return 0;

        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <MDBView src={backgrounds[imageIndex]} fixed>
      <MDBMask
        overlay="stylish-light"
        className="rgba-white-light d-flex justify-content-centr align-items-center"
      >
        <MDBContainer className="h-100 d-flex align-items-center">
          <div className="pt-5">
            <h1 className="display-4 white-text font-weight-bold mb-0">WHAT</h1>
            <h1 className="display-4 white-text font-weight-bold mb-0">
              ARE YOU
            </h1>
            <h1 className="display-4 white-text font-weight-bold mb-0">
              WAITING FOR?
            </h1>
            <h5 className="text-uppercase white-text my-3">
              Give your future a boost at&nbsp;
              <strong>{School.abbreviation}!</strong>
            </h5>
            <MDBBtn id="featureOffset" outline color="light">
              register
            </MDBBtn>
            <MDBBtn onClick={toggle} outline color="light">
              login
            </MDBBtn>
          </div>
        </MDBContainer>
      </MDBMask>
    </MDBView>
  );
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: "",
      show: false,
    };
  }

  toggle = () => this.setState({ show: !this.state.show });

  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));

  handleLink = (to) => {
    const section = document.getElementById(to);

    if (section) {
      this.setState({ collapseID: "" });
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  render() {
    const { show, collapseID } = this.state;

    return (
      <>
        <Login show={show} toggle={this.toggle} />
        <div
          id="landing"
          style={{ minWidth: show ? "initial" : "650px", overflowX: "hidden" }}
        >
          <MDBNavbar dark expand="md" fixed="top" scrolling transparent>
            <MDBContainer>
              <MDBNavbarBrand
                href="#"
                onClick={() => this.handleLink("landing")}
              >
                <strong className="white-text">{School.name}</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler
                onClick={this.toggleCollapse("navbarCollapse")}
              />
              <MDBCollapse id="navbarCollapse" isOpen={collapseID} navbar>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={() => this.handleLink("featureOffset")}
                      to="#"
                    >
                      Features
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink onClick={this.toggle} to="#">
                      Register
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink onClick={this.toggle} to="#">
                      Login
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>

          <section id="home">
            <Index toggle={this.toggle} />
          </section>

          <Features />

          {/* <Core /> */}

          {/* <Mission />

            <Vision /> */}

          <hr className="my-5" />
          {/* <Register /> */}

          {/* <section id="register">
            <MDBView>
              <MDBMask
                className="d-flex justify-content-center align-items-center"
                overlay="gradient"
              >
                <MDBContainer className="h-100 d-flex justify-content-center align-items-center">
                  <Register />
                </MDBContainer>
              </MDBMask>
            </MDBView>
          </section> */}

          {/* <ContactUs /> */}

          <Footer />
        </div>
      </>
    );
  }
}
