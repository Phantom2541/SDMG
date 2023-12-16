import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdbreact";

export default function Dashboard() {
  return (
    <MDBContainer fluid>
      <div className="mb-5">
        <h4 className="text-left font-weight-bold dark-grey-text">
          Welcome to Student Mass Data Gathering
        </h4>
        <p className="grey-text mt-3">
          As a Student, you can manage information through the Profile.
        </p>
        <hr />
      </div>
      <section className="mt-2">
        <MDBRow>
          <MDBCol className="mb-4">
            <MDBCard>
              <MDBCardHeader color="warning-color">
                <MDBIcon fixed icon="book-open" className="mr-3" />
                Personal Data
              </MDBCardHeader>
              <MDBCardBody>
                <p className="font-small grey-text">
                  Please go to your profile - my account and check if is
                  correct.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
}
