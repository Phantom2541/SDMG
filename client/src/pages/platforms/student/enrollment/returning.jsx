import React from "react";
import { MDBBtn, MDBInput } from "mdbreact";

export default function Returning() {
  return (
    <form>
      <div className="row">
        <div className="col-6">
          <MDBInput label="Last Grade Level Completed" />
        </div>
        <div className="col-6">
          <MDBInput label="Last School Year Completed" />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <MDBInput label="Last School Attended" />
        </div>
        <div className="col-2">
          <MDBInput type="number" label="School ID" />
        </div>
      </div>
      <MDBBtn style={{ float: "right" }} type="submit" color="primary">
        Submit
      </MDBBtn>
    </form>
  );
}
