import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBFooter } from "mdbreact";

export default function Footer() {
  return (
    <MDBFooter className="text-center text-md-left">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <ul className="list-unstyled d-flex justify-content-center mb-0 pb-0 pt-2 list-inline">
              <li
                className="list-inline-item cursor-pointer"
                onClick={() =>
                  window.open("https://www.facebook.com/z3.star/", "_blank")
                }
              >
                <MDBIcon
                  fab
                  icon="facebook"
                  size="2x"
                  className="white-text p-2 m-2"
                />
              </li>
              <li
                className="list-inline-item cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/benedict-pajarillaga-98b864222/",
                    "_blank"
                  )
                }
              >
                <MDBIcon
                  fab
                  icon="linkedin"
                  size="2x"
                  className="white-text p-2 m-2"
                />
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBFooter style={{ zIndex: 2 }}>
        <p className="footer-copyright mb-0 py-3 text-center">
          &copy; 2023 Copyright:&nbsp;
          <a
            href="https://www.technowiz.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            TechnoWiz.com
          </a>
        </p>
      </MDBFooter>
    </MDBFooter>
  );
}
