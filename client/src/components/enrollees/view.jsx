import React, { useState, useEffect } from "react";
import { MDBBtn, MDBIcon, MDBTypography } from "mdbreact";
import { formatGradeLvl, fullName } from "../../services/utilities";
import { Courses } from "../../services/fakeDb";
import Learner from "../../pages/platforms/student/enrollment/learner";
import Basic from "../../pages/platforms/student/enrollment/basic";
import Address from "../../pages/platforms/student/enrollment/address";
import Guardian from "../../pages/platforms/student/enrollment/guardian";
import { useDispatch, useSelector } from "react-redux";
import {
  BROWSE,
  RESET,
} from "../../services/redux/slices/admissions/requirements";
import Swal from "sweetalert2";
import { UPDATE } from "../../services/redux/slices/admissions/enrollments";

export default function View({ enrollment, setSelected }) {
  const { user, department, gradeLvl, course = {}, remarks, _id } = enrollment;

  const [activeStep, setActiveStep] = useState(0),
    [learner, setLearner] = useState({
      lrn: undefined,
      type: "new",
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
    [address, setAddress] = useState({
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
    }),
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
    { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const goBack = () => setSelected({});

  useEffect(() => {
    if (token && department) {
      dispatch(BROWSE({ token, key: { department } }));
    }

    return () => {
      dispatch(RESET());
    };
  }, [token, department, dispatch]);

  useEffect(() => {
    if (enrollment?._id) {
      const { user = {}, type, _id } = enrollment,
        {
          psa = "",
          lrn = "",
          email = "",
          fullName = {},
          isMale,
          dob,
          pob,
          indigenousPeople,
          disability,
          motherTongue,
          mobile,
          "4ps": fourPs,
          address,
          guardians,
        } = user;

      setLearner({ lrn, email, type, user: user?._id });
      setBasic({
        psa,
        fullName,
        isMale,
        dob: new Date(dob),
        pob,
        indigenousPeople,
        disability,
        motherTongue,
        mobile,
        "4ps": fourPs,
      });
      setAddress(address);
      setGuardian({ ...guardians, _id });
    }
  }, [enrollment]);

  const handleFinalSubmit = () =>
    Swal.fire({
      focusDeny: true,
      icon: "question",
      title: "Are you sure?",
      text: "This action is irreversible.",
      confirmButtonText: `<span class="text-dark">Cancel</span>`,
      confirmButtonColor: "#fff",

      showDenyButton: true,
      denyButtonText: `Proceed`,
      denyButtonColor: "#3B71CA",
    }).then((res) => {
      if (res.isDenied) {
        const user = {
            ...basic,
            address,
            guardians: guardian,
            lrn: learner.lrn,
          },
          enrollment = {
            ...learner,
            status: "validated",
            _id,
          };

        if (address.isSame) user.address.permanent = address.current;

        dispatch(
          UPDATE({
            data: {
              user,
              enrollment,
              isViewing: true,
            },
            token,
          })
        );
        goBack();
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

  const componentMap = {
    0: Learner,
    1: Basic,
    2: Address,
    3: Guardian,
    // 4: Returning,
  };

  const Step = componentMap[activeStep];

  return (
    <>
      <div className="d-flex align-items-center">
        <MDBBtn color="transparent" className="z-depth-0" onClick={goBack}>
          <MDBIcon icon="arrow-left" />
        </MDBBtn>
        <div>
          <p className="font-weight-bold mb-0 h4-responsive">
            {fullName(user?.fullName)}
          </p>
          <p className="text-muted mb-0">
            {formatGradeLvl(department, gradeLvl)}&nbsp;-&nbsp;
            {Courses.displayName(course?.pk)}
          </p>
        </div>
      </div>
      {remarks && (
        <MDBTypography
          className="mb-0 mt-3"
          noteColor="danger"
          note
          noteTitle="Previous Remarks: "
        >
          {remarks}
        </MDBTypography>
      )}
      <Step
        viewing
        isPublished={false}
        setActiveStep={setActiveStep}
        handleForm={handleForm(activeStep)}
        handleFinalSubmit={handleFinalSubmit}
        goBack={goBack}
      />
    </>
  );
}
