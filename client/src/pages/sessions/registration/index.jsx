import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import Student from "./student";
import View from "./view";
import Basic from "./basic";
import { School } from "../../../services/fakeDb";
import { fullAddress, getAge } from "../../../services/utilities";
import Images from "./images";
import Agreement from "./agreement";
import Swal from "sweetalert2";
import Success from "./success";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import Employee from "./employee";

const _form = {
    fullName: {
      fname: "",
      lname: "",
      mname: "",
      suffix: "",
    },
    email: "",
    password: "",
    cpassword: "",
    pob: undefined,
    dob: new Date(),
    isMale: false,
    mobile: "",
    civilStatus: undefined,
    position: undefined,
    address: {
      isSame: true,
      current: {
        region: "REGION III (CENTRAL LUZON)",
        province: "NUEVA ECIJA",
        city: "CABANATUAN CITY",
        barangay: undefined,
        street: "",
        zip: "",
      },
      permanent: {
        region: "REGION III (CENTRAL LUZON)",
        province: "NUEVA ECIJA",
        city: "CABANATUAN CITY",
        barangay: undefined,
        street: "",
        zip: "",
      },
    },
    disability: undefined,
    role: "student",
    lrn: undefined,
    psa: undefined,
    motherTongue: undefined,
    indigenousPeople: undefined,
    "4ps": undefined,
    guardians: {
      mother: {
        fname: undefined,
        lname: undefined,
        mname: undefined,
        suffix: undefined,
        mobile: undefined,
      },
      father: {
        fname: undefined,
        lname: undefined,
        mname: undefined,
        suffix: undefined,
        mobile: undefined,
      },
    },
  },
  { name, logo, address: sAddress, id } = School;

export default function Registration() {
  const [form, setForm] = useState(_form),
    [view, setView] = useState(false),
    { isSuccess } = useSelector(({ users }) => users),
    history = useHistory();

  const handleError = (title, text) =>
    Swal.fire({
      title,
      text,
      icon: "error",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, cpassword, role, dob, mobile } = form;

    if (!mobile.startsWith("9"))
      return handleError("Invalid Mobile", "ex.: 9xx-xxx-xxxx");

    if (password !== cpassword)
      return handleError("Invalid Passwords", "Passwords does not match");

    if (role === "student" && getAge(dob, true) < 5)
      return handleError("Invalid Age", "Minimum age of 5 year old");

    if (role === "employee" && getAge(dob, true) < 18)
      return handleError("Invalid Age", "Minimum age of 18 year old");

    setView(true);
    console.log(form);
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const Roles = {
    student: Student,
    employee: Employee,
  };

  const OtherInformation = Roles[form.role];

  if (isSuccess) return <Success />;

  if (view) return <View user={form} goBack={() => setView(false)} />;

  return (
    <>
      <MDBCol md="8" className="offset-md-2 py-5">
        <MDBCard>
          <MDBCardBody className="px-0">
            <div className="text-center d-flex align-items-center justify-content-between">
              <MDBBtn
                onClick={() => history.push("/")}
                color="transparent"
                className="z-depth-0"
              >
                <MDBIcon icon="arrow-left" className="mr-2" />
                return
              </MDBBtn>
              <div>
                <h1 className="font-weight-bold text-primary mb-0">{name}</h1>
                <p className="mt-0 font-weight-bold">{fullAddress(sAddress)}</p>
              </div>
              <MDBBtn className="invisible">preset</MDBBtn>
            </div>
            <div
              className="d-flex align-items-center justify-content-between mb-5 bg-primary"
              style={{
                height: "80px",
                paddingLeft: "10rem",
                paddingRight: "10rem",
              }}
            >
              <div className="text-white">
                <img
                  src={logo}
                  alt={id}
                  height="150"
                  className="bg-white rounded-circle"
                />
              </div>
              <div className="text-white h1">REGISTRATION FORM</div>
              <div className="invisible">
                <img
                  src={logo}
                  alt={id}
                  height="150"
                  className="bg-white rounded-circle"
                />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <Basic handleChange={handleChange} form={form} />
              <OtherInformation handleChange={handleChange} form={form} />
              <Images />
              <Agreement School={School} />
              <MDBBtn color="primary" type="submit" className="mt-3 mx-5">
                Proceed to Submit
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </>
  );
}
