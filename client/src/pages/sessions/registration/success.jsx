import React from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBIcon } from "mdbreact";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { RESET } from "../../../services/redux/slices/users";

export default function Success() {
  const history = useHistory(),
    dispatch = useDispatch();

  return (
    <div style={{ height: "100vh" }} className="d-flex align-items-center">
      <MDBCol md="6" className="offset-md-3">
        <MDBCard>
          <MDBCardBody className="text-center text-success">
            <MDBIcon icon="check-circle" size="4x" />
            <h1 className="font-weight-bold">REGISTRATION SUCCESS</h1>
            <h5 className="text-dark mb-3">
              You have successfully submitted your form.
            </h5>
            <p className="text-dark">
              Please proceed to the home page to login.
            </p>
            <MDBBtn
              onClick={() => {
                dispatch(RESET());
                history.push("/");
              }}
              color="success"
              className="mt-3"
              outline
            >
              home page
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  );
}
