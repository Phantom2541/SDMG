import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
  MDBContainer,
  MDBTypography,
} from "mdbreact";
import Learner from "./learner";
import Basic from "./basic";
import Address from "./address";
import Guardian from "./guardian";
// import Returning from "./returning";
import {
  formatGradeLvl,
  fullAddress,
  fullName,
  getAge,
} from "../../../../services/utilities";
import { generateSY } from "../../../../services/utilities";
import { School } from "../../../../services/fakeDb";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import {
  BROWSE,
  RESET,
} from "../../../../services/redux/slices/admissions/requirements";
import {
  SAVE,
  UPDATE,
  RESET as ENROLLMENTRESET,
} from "../../../../services/redux/slices/admissions/enrollments";
import {
  BROWSE as COURSES,
  RESET as COURSESRESET,
} from "../../../../services/redux/slices/resources/courses";
import { INJECTCREDENTIALS } from "../../../../services/redux/slices/auth";
import { useToasts } from "react-toast-notifications";

const steps = [
    "Education",
    "Personal",
    "Address",
    "Guardian",
    //   "Returnee / Transferee",
  ],
  presetAddress = {
    current: {
      region: "REGION III (CENTRAL LUZON)",
      province: "NUEVA ECIJA",
      city: "CABANATUAN CITY",
      barangay: undefined,
      zip: undefined,
      street: undefined,
    },
    permanent: {
      region: "REGION III (CENTRAL LUZON)",
      province: "NUEVA ECIJA",
      city: "CABANATUAN CITY",
      barangay: undefined,
      zip: undefined,
      street: undefined,
    },
    isSame: true,
  };

export default function EnrollmentForm() {
  const { token, auth, credentials } = useSelector(({ auth }) => auth),
    [learner, setLearner] = useState({
      lrn: undefined,
      type: "new",
      department: "senior",
      course: undefined,
      gradeLvl: 11,
      email: auth?.email,
    }),
    [basic, setBasic] = useState({
      psa: undefined,
      fullName: {
        fname: undefined,
        mname: undefined,
        lname: undefined,
        suffix: undefined,
      },
      isMale: false,
      dob: new Date(),
      pob: undefined,
      indigenousPeople: undefined,
      disability: undefined,
      motherTongue: undefined,
      mobile: undefined,
      "4ps": undefined,
    }),
    [address, setAddress] = useState(presetAddress),
    [guardian, setGuardian] = useState({
      father: {
        fname: undefined,
        mname: undefined,
        lname: undefined,
        suffix: undefined,
        mobile: undefined,
      },
      mother: {
        fname: undefined,
        mname: undefined,
        lname: undefined,
        suffix: undefined,
        mobile: undefined,
      },
      legal: {
        fname: undefined,
        mname: undefined,
        lname: undefined,
        suffix: undefined,
        mobile: undefined,
      },
    }),
    [_department, setDepartment] = useState("senior"),
    // [returning, setReturning] = useState({}),

    { response, isSuccess, message } = useSelector(
      ({ enrollments }) => enrollments
    ),
    [activeStep, setActiveStep] = useState(0),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if (isSuccess && response) {
      const { enrollment, user } = response;
      localStorage.setItem("credentials", JSON.stringify(enrollment));
      localStorage.setItem("auth", JSON.stringify(user));
      setTimeout(() => window.location.reload(), 500);
      dispatch(INJECTCREDENTIALS({ user, credentials: enrollment }));
    }
  }, [response, isSuccess, dispatch]);

  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }

    return () => dispatch(ENROLLMENTRESET());
  }, [message, addToast, dispatch, isSuccess]);

  useEffect(() => {
    if (token && _department) {
      dispatch(BROWSE({ token, key: { department: _department } }));
      dispatch(COURSES({ token, key: { department: _department } }));
    }

    return () => {
      dispatch(RESET());
      dispatch(COURSESRESET());
    };
  }, [token, dispatch, _department]);

  useEffect(() => {
    const {
      lrn = "",
      email = "",
      address,
      guardians,
      psa,
      fullName,
      isMale,
      dob,
      pob,
      indigenousPeople,
      disability,
      motherTongue,
      mobile,
      "4ps": fourPs,
    } = auth;

    if (credentials?._id) {
      setLearner({
        ...credentials,
        course: credentials?.course?._id,
        lrn,
        email,
      });
    }

    if (auth?._id) {
      setAddress(address?.region ? address : presetAddress);
      setGuardian(guardians);
      setBasic({
        psa,
        fullName,
        isMale,
        dob: dob ? new Date(dob) : new Date(),
        pob,
        indigenousPeople,
        disability,
        motherTongue,
        mobile,
        "4ps": fourPs,
      });
    }
  }, [auth, credentials]);

  const handleSave = (isPublished) => {
    const user = { ...basic, address, guardians: guardian, lrn: learner.lrn },
      enrollment = {
        ...learner,
        isPublished,
        batch: generateSY(),
        user: auth._id,
        status: "pending",
      };

    if (address.isSame) user.address.permanent = address.current;

    if (credentials?._id) {
      dispatch(
        UPDATE({
          data: {
            enrollment,
            user,
          },
          token,
        })
      );
    } else {
      dispatch(
        SAVE({
          data: {
            enrollment,
            user,
          },
          token,
        })
      );
    }
  };

  const handleError = (title, text, footer) =>
    Swal.fire({
      icon: "error",
      title,
      text,
      footer,
      showConfirmButton: false,
    });

  const handleValidation = () => {
    const fullname = basic.fullName,
      lrn = learner.lrn,
      course = learner.course,
      mobile = basic.mobile,
      dob = basic.dob,
      _guardian = guardian.legal;

    if (!lrn)
      return handleError(
        "Invalid LRN",
        "This field is required.",
        "Double check Learners Information"
      );

    if (!course)
      return handleError(
        "Invalid Course",
        "This field is required.",
        "Double check Learners Information"
      );

    if (getAge(dob, true) < 5)
      return handleError(
        "Invalid Age",
        "Minimum of 5 years old only.",
        "Double check Personal Information"
      );

    if (!mobile || !mobile.startsWith("9") || mobile.length !== 10)
      return handleError(
        "Invalid Mobile",
        "Please input valid mobile number.",
        "Double check Personal Information"
      );

    if (!fullName(fullname))
      return handleError(
        "Invalid Fullname",
        "First name and Last name are required.",
        "Double check Personal Information"
      );

    if (fullName(_guardian) === "N/A")
      return handleError(
        "Invalid Legal Guardian Fullname",
        "First name and Last name are required.",
        "Double check Guardian Information"
      );

    handleSave(true);
  };

  const handleFinalSubmit = () => {
    Swal.fire({
      focusDeny: true,
      icon: "question",
      title: "Are you sure you want to submit?",
      text: "Once submitted you cannot edit your information.",
      confirmButtonText: `<span class="text-dark">Cancel</span>`,
      confirmButtonColor: "#fff",

      showDenyButton: true,
      denyButtonText: `Save`,
      denyButtonColor: "#54B4D3",

      showCancelButton: true,
      cancelButtonText: "Submit",
      cancelButtonColor: "#3B71CA",
    }).then((result) => {
      if (result.isDenied) {
        handleSave(false);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        handleValidation();
      } else {
        Swal.fire({
          title: "Changes are not Saved!",
          icon: "warning",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      }
    });
  };

  const componentMap = {
    0: Learner,
    1: Basic,
    2: Address,
    3: Guardian,
    // 4: Returning,
  };

  const handleForm = (index) => {
    const stateMap = {
      0: {
        form: learner,
        setForm: setLearner,
      },
      1: {
        form: basic,
        setForm: setBasic,
      },
      2: {
        form: address,
        setForm: setAddress,
      },
      3: {
        form: guardian,
        setForm: setGuardian,
      },
      //   4: {
      //     form: returning,
      //     setForm: setReturning,
      //   },
    };

    return stateMap[index];
  };

  const handleRemarks = () => {
    if (!credentials?._id) return;

    const { isPublished, status, remarks } = credentials;

    let title = "Rejected: ",
      color = "danger",
      text = remarks;

    switch (status) {
      case "validated":
        title = "Validated: ";
        color = "success";
        text = "Form has been validated; please proceed to cashier payment.";
        break;

      case "paid":
        title = "Paid: ";
        color = "success";
        text = "Tuition Fee has been paid; please proceed to registrar.";
        break;

      case "pending":
        if (isPublished) {
          title = "Published: ";
          color = "success";
          text =
            "The form has been submitted; please await validation by the enrollment teacher.";
        } else {
          title = "Draft: ";
          color = "info";
          text = "Form saved as draft.";
        }
        break;

      default:
        break;
    }

    return (
      <MDBTypography className="mb-0" noteColor={color} note noteTitle={title}>
        {text}
      </MDBTypography>
    );
  };

  const Step = componentMap[activeStep];

  const { department, gradeLvl } = learner;

  const { logo, id, name, address: sAddress } = School;

  return (
    <MDBContainer fluid>
      <MDBCard>
        <MDBCardTitle className="mb-0 pt-4 pl-5 pr-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <img
                style={{ height: "100px" }}
                className="rounded-circle"
                src={logo}
                alt={id}
              />

              <div className="ml-2">
                <p
                  className="mb-0"
                  style={{ fontWeight: "bolder", fontSize: "23px" }}
                >
                  {name}
                </p>
                <p style={{ fontSize: "15px" }}>
                  {fullAddress(sAddress, false)}
                </p>

                <p className="font-weight-bold" style={{ fontSize: "20px" }}>
                  ENHANCED BASIC EDUCATION ENROLLMENT FORM
                </p>
              </div>
            </div>
            <div className="text-right">
              <p style={{ fontSize: "20px" }} className="mb-0">
                SY {generateSY(true)}
              </p>
              <p style={{ fontSize: "17px" }}>
                {formatGradeLvl(department, gradeLvl)}
              </p>
            </div>
          </div>
        </MDBCardTitle>

        <MDBCardBody>
          <ul className="stepper stepper-horizontal my-0 py-0">
            {steps.map((step, index) => {
              const color =
                  activeStep === index
                    ? "primary"
                    : index < activeStep
                    ? "success"
                    : "light",
                icon =
                  color === "success" ? <MDBIcon icon="check" /> : index + 1;

              return (
                <li key={`step-${index}`} style={{ pointerEvents: "none" }}>
                  <a href="#!">
                    <span className={`circle bg-${color}`}>{icon}</span>
                    <span className="label">{step} Information</span>
                  </a>
                </li>
              );
            })}
          </ul>
          {handleRemarks()}
        </MDBCardBody>

        <MDBCardBody className="mx-5">
          <Step
            isPublished={credentials?.isPublished}
            setActiveStep={setActiveStep}
            handleForm={handleForm(activeStep)}
            handleFinalSubmit={handleFinalSubmit}
            setDepartment={setDepartment}
          />
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
