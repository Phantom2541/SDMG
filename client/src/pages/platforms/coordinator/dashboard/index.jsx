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
          Welcome to SMDG
        </h4>
        <p className="grey-text mt-3">
          As a Coordinator, you can create and view your staff.
        </p>
        <hr />
      </div>
      <section className="mt-2">
        <MDBRow>
          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader color="warning-color">
                <MDBIcon fixed icon="book-open" className="mr-3" />
                Sections
              </MDBCardHeader>
              <MDBCardBody>
                <p className="font-small grey-text">
                  The Exams section provides a straightforward process for
                  taking exams and assessments. This section offers a
                  user-friendly platform to complete and manage academic
                  assessments, making it a seamless experience for test-takers.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader color="info-color">
                <MDBIcon icon="poll" fixed className="mr-3" />
                Employees
              </MDBCardHeader>
              <MDBCardBody>
                <p className="font-small grey-text">
                  The Results section provides access to the outcomes of your
                  assessments, whether they are exams, surveys, or other data
                  collection forms. Analyze and interpret the collected data to
                  make informed decisions or track progress effectively.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
}
