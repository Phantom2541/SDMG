import React from "react";
import { MDBCol, MDBInput, MDBRow, MDBDatePicker } from "mdbreact";

export default function Basic() {
  return (
    <form>
      <MDBRow>
        <MDBCol md="6">
          <MDBInput label="PSA Birth Certificate No." />
        </MDBCol>
        <MDBCol md="6">
          <MDBInput label="Mobile No. (+63)" />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="5">
          <MDBInput label="Last Name" />
        </MDBCol>
        <MDBCol md="2">
          <MDBDatePicker className="p-0" />
        </MDBCol>
        <MDBCol md="1">
          <MDBInput label="Age" />
        </MDBCol>
        <MDBCol md="4">
          <MDBInput label="Mother Tounge" />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="5">
          <MDBInput label="First Name" />
        </MDBCol>
        <MDBCol md="2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked="false"
              // onChange={() => handleChange("isMale", !isMale)}
              id="Male"
            />
            <label className="form-check-label" htmlFor="Male">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked="true"
              // onChange={() => handleChange("isMale", !isMale)}
              id="Female"
            />
            <label className="form-check-label" htmlFor="Female">
              Female
            </label>
          </div>
        </MDBCol>
        <MDBCol md="5">
          <MDBInput label="Place of Birth (Municipality/City)" />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="3">
          <MDBInput label="Middle Name" />
        </MDBCol>
        <MDBCol md="2">
          <MDBInput label="Middle Name" />
        </MDBCol>
        <MDBCol md="7">
          <MDBInput label="Do you belong to any Indigenous People Community/Cultural Community? if Yes, please specify  " />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="6">
          <label>Is your family a beneficiary of 4Ps?</label>
          <MDBInput label="if Yes, write the 4Ps Households ID Number" />
        </MDBCol>
        <MDBCol md="6">
          <label>Do you have a Disability?</label>
          <MDBInput label="if Yes, specify the type of disability" />
        </MDBCol>
      </MDBRow>
    </form>
  );
}
