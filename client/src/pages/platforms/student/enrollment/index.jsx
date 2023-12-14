import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody } from "mdbreact";
import { School } from "../../../../services/fakeDb";
import { fullAddress } from "../../../../services/utilities";
import Learner from "./learner";
import { useDispatch, useSelector } from "react-redux";
import {
  BROWSE,
  RESET,
} from "../../../../services/redux/slices/admissions/requirements";
import {
  BROWSE as COURSES,
  RESET as COURSESRESET,
} from "../../../../services/redux/slices/resources/courses";

const { name, address: sAddress, logo, id } = School;

export default function Enrollment() {
  const [enrollment, setEnrollment] = useState({
      department: "senior",
      gradeLvl: 11,
      course: undefined,
    }),
    { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const { department } = enrollment;

  useEffect(() => {
    if (token && department) {
      dispatch(BROWSE({ token, key: { department } }));
      dispatch(COURSES({ token, key: { department } }));
    }

    return () => {
      dispatch(RESET());
      dispatch(COURSESRESET());
    };
  }, [department, token, dispatch]);

  return (
    <MDBCard>
      <MDBCardBody className="px-0 py-1">
        <div className="text-center">
          <h1 className="font-weight-bold text-primary mb-0">{name}</h1>
          <p className="mt-0 font-weight-bold">{fullAddress(sAddress)}</p>
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
          <div className="text-white h1">ENHANCED BASIC ENROLLMENT FORM</div>
          <div className="invisible">
            <img
              src={logo}
              alt={id}
              height="150"
              className="bg-white rounded-circle"
            />
          </div>
        </div>
        <form>
          <Learner setForm={setEnrollment} form={enrollment} />
        </form>
      </MDBCardBody>
    </MDBCard>
  );
}
