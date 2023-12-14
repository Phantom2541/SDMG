import { MDBCol, MDBInput, MDBRow } from "mdbreact";
import React from "react";

export default function Learner() {
  return (
    <form>
      <MDBRow>
        <MDBCol md="6">
          <MDBInput label="Learner Reference No. (LRN)" />
        </MDBCol>
        <MDBCol md="6">
          <MDBInput label="Learner Type" />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="6">
          <MDBInput label="Department" />
        </MDBCol>
        <MDBCol>
          <MDBInput label="Grade Level" />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <img
            alt="student 1 x 1"
            src="https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg:large"
            height="145px"
            width="auto"
          />
        </MDBCol>
      </MDBRow>
    </form>
  );
}
