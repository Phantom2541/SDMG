import {
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdbreact";
import React, { useEffect } from "react";
import { fullName } from "../../../services/utilities";
import { useDispatch, useSelector } from "react-redux";
import { SAVE } from "../../../services/redux/slices/users";
import Basic from "./basic";
import UserImg from "../../../assets/registration/1x1.jpg";
import Signature from "../../../assets/registration/eSignature.jpg";
import Student from "./student";
import Employee from "./employee";
import Swal from "sweetalert2";

export default function View({ goBack, user = {} }) {
  const { isSuccess, message } = useSelector(({ users }) => users),
    dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      Swal.fire({
        title: "Oops.",
        icon: "warning",
        text: message,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  }, [isSuccess, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = { ...user };

    if (user?.address.isSame) form.address.permanent = user?.address?.current;

    dispatch(SAVE(user));
  };

  const Roles = {
    student: Student,
    employee: Employee,
  };

  const { fullName: fullname, role } = user;

  const OtherInformation = Roles[role];

  return (
    <MDBCol md="8" className="offset-md-2 py-5">
      <MDBCard className="pb-3">
        <MDBCardHeader className="bg-primary text-white text-center">
          <h1 className="font-weight-bold mb-0">CHECK YOUR ENTRIES</h1>
          <h3>Scroll down below and check your entries before you submit.</h3>
        </MDBCardHeader>
        <MDBContainer className="px-5 my-4" fluid>
          <MDBRow>
            <MDBCol md="2" className="d-flex align-items-center">
              <img
                src={UserImg}
                className="mx-auto border"
                style={{ width: "100px", aspectRatio: "1/1" }}
                alt="User"
                title="1x1 Photo"
              />
            </MDBCol>
            <MDBCol>
              <h4 className="font-weight-bold mb-0">{fullName(fullname)}</h4>
              <img
                style={{
                  width: "auto",
                  height: "100px",
                  aspectRatio: "16/9",
                }}
                className="border"
                src={Signature}
                height="75"
                width="auto"
                alt="E-Signature"
                title="E-Signature"
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <Basic form={user} view />
        <OtherInformation form={user} view />
        <div className="blue lighten-3 px-5 py-5 mt-4 font-weight-bold">
          <h5 className="text-danger mb-0 font-weight-bold">WARNING:</h5>
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
