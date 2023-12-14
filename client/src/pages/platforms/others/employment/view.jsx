import React from "react";
import { MDBBtn, MDBCard, MDBCardHeader, MDBCol, MDBContainer } from "mdbreact";
import Form from "./form";

export default function View({ form, goBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("biew", form);
  };
  return (
    <MDBCol md="12" className=" py-5">
      <MDBCard className="pb-3">
        <MDBCardHeader className="bg-primary text-white text-center">
          <h1 className="font-weight-bold mb-0">CHECK YOUR ENTRIES</h1>
          <h3>Scroll down below and check your entries before you submit.</h3>
        </MDBCardHeader>
        <MDBContainer className="px-5 my-4" fluid></MDBContainer>
        <Form form={form} view />
        <div className="blue lighten-3 px-4 py-3 mt-4 font-weight-bold">
          <h5 className="text-danger mb-0 mt-3 font-weight-bold">WARNING:</h5>
          <p>
            CHECK ALL YOUR ENTRIES BEFORE YOU SUBMIT THEM. EDITING THE DATA IS
            COMPLICATED AS IT DEMANDS RIGOROUS TIME TO CORRECT.
          </p>
          <p>
            I-check muna lahat ng pangalan, address, birthday at iba pang
            inpormasyon kung tama bago isumite.
          </p>
        </div>
        <MDBContainer className="px-4 mt-4" fluid>
          <form onSubmit={handleSubmit}>
            <div className="form-check">
              <h5 className="font-weight-bold text-danger">
                Are you sure that the record is correct and ready for
                submission?
              </h5>
              <input
                required
                className="form-check-input"
                type="checkbox"
                id="5"
              />
              <label className="form-check-label" htmlFor="5">
                Yes and I certify that the above information is correct, final
                and ready for submission.
              </label>
            </div>
            <div className="w-50 mt-2">
              <MDBBtn type="submit" color="primary" size="lg">
                Submit Now!
              </MDBBtn>
              <MDBBtn
                onClick={goBack}
                type="button"
                color="primary"
                size="lg"
                outline
              >
                Review & Edit
              </MDBBtn>
            </div>
          </form>
        </MDBContainer>
      </MDBCard>
    </MDBCol>
  );
}
