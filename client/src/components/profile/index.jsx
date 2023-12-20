import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBContainer } from "mdbreact";
import ProfileImage from "./image";
import Account from "./account";

export default function Profile() {
  return (
    <MDBContainer fluid>
      <MDBCard className="p-5">
        <MDBRow>
          <MDBCol md="3">
            <ProfileImage />
          </MDBCol>
          <MDBCol lg="9">
            <Account />
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
