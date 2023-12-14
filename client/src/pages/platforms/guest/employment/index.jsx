import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBContainer,
  MDBTypography,
} from "mdbreact";
import { fullAddress, getAge } from "../../../../services/utilities";
import { generateSY } from "../../../../services/utilities";
import { School } from "../../../../services/fakeDb";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET,
  SAVE,
  UPDATE,
} from "../../../../services/redux/slices/admissions/employments";
import Form from "./form";
import { INJECTCREDENTIALS } from "../../../../services/redux/slices/auth";
import { useToasts } from "react-toast-notifications";

const { logo, id, name, address: sAddress } = School,
  subtract18 = () => {
    const today = new Date();
    return new Date(today.setFullYear(today.getFullYear() - 18));
  };

export default function EmploymentForm() {
  const [employment, setEmployment] = useState({
      position: "",
      emergencyContact: {
        primary: {
          name: "",
          relationship: "",
          mobile: "",
        },
        secondary: {
          name: "",
          relationship: "",
          mobile: "",
        },
      },
    }),
    [user, setUser] = useState({
      fullName: {
        fname: "",
        lname: "",
        mname: "",
        suffix: "",
      },
      address: {
        current: {
          region: "REGION III (CENTRAL LUZON)",
          province: "NUEVA ECIJA",
          city: "CABANATUAN CITY",
          barangay: "",
          zip: "",
          street: "",
        },
        permanent: {
          region: "REGION III (CENTRAL LUZON)",
          province: "NUEVA ECIJA",
          city: "CABANATUAN CITY",
          barangay: "",
          zip: "",
          street: "",
        },
        isSame: true,
      },
      civilStatus: "single",
      mobile: "",
      isMale: false,
      motherTongue: "",
      dob: subtract18(),
      pob: "",
    }),
    { auth, token, credentials } = useSelector(({ auth }) => auth),
    { response, isSuccess, message } = useSelector(
      ({ employments }) => employments
    ),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if (isSuccess && response) {
      const { employment, user } = response;
      localStorage.setItem("credentials", JSON.stringify(employment));
      localStorage.setItem("auth", JSON.stringify(user));
      dispatch(INJECTCREDENTIALS({ user, credentials: employment }));
    }
  }, [response, isSuccess, dispatch]);

  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }

    return () => dispatch(RESET());
  }, [message, addToast, dispatch, isSuccess]);

  useEffect(() => {
    if (credentials?._id) {
      setEmployment(credentials);
    }

    if (auth?._id) {
      setUser({ ...auth, dob: auth.dob ? new Date(auth.dob) : subtract18() });
    }
  }, [auth, credentials]);

  const handleSave = (isPublished) => {
    const _user = { ...user };
    if (user.address.isSame) _user.address.current = user.address.permanent;

    if (credentials?._id) {
      dispatch(
        UPDATE({
          data: {
            user: _user,
            employment: {
              ...employment,
              isPublished,
              status: "pending",
            },
          },
          token,
        })
      );
    } else {
      dispatch(
        SAVE({
          data: {
            user: _user,
            employment: { ...employment, user: auth._id, isPublished },
          },
          token,
        })
      );
    }
  };

  const handleError = (title) =>
    Swal.fire({
      title,
      text: "This field is required.",
      icon: "error",
      showConfirmButton: false,
    });

  const handleValidation = () => {
    const { position, emergencyContact } = employment,
      { mobile, dob, fullName } = user;

    if (!position) return handleError("Applying Position cannot be empty.");

    if (!mobile || !mobile.startsWith("9") || mobile.length < 10)
      return handleError("Invalid Mobile Number.");

    if (getAge(dob, true) < 18)
      return handleError("Minimum Age is 18 years old.");

    if (!fullName?.fname || !fullName?.lname)
      return handleError("Last name and First name are required.");

    if (Object.values(emergencyContact?.primary).filter(Boolean).length !== 3)
      return handleError("Primary Emergency Contact is required.");

    if (
      !emergencyContact?.primary?.mobile?.startsWith("9") ||
      emergencyContact?.primary?.mobile?.length < 10
    )
      return handleError("Invalid Primary Mobile Number.");

    handleSave(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const handleRemarks = () => {
    if (!credentials?._id) return;

    const { isPublished, status, remarks } = credentials;

    let title = "Rejected: ",
      color = "danger",
      text = remarks;

    if (status === "pending") {
      if (isPublished) {
        title = "Published: ";
        color = "success";
        text =
          "The form has been submitted; please await validation by the principal.";
      } else {
        title = "Draft: ";
        color = "info";
        text = "Form saved as draft.";
      }
    }

    return (
      <MDBCardBody>
        <MDBTypography
          className="mb-0"
          noteColor={color}
          note
          noteTitle={title}
        >
          {text}
        </MDBTypography>
      </MDBCardBody>
    );
  };

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
                  EMPLOYMENT FORM
                </p>
              </div>
            </div>
            <div className="text-right">
              <p style={{ fontSize: "20px" }} className="mb-0">
                SY {generateSY(true)}
              </p>
            </div>
          </div>
        </MDBCardTitle>

        {handleRemarks()}

        <Form
          employment={employment}
          setEmployment={setEmployment}
          user={user}
          setUser={setUser}
          handleSubmit={handleSubmit}
        />
      </MDBCard>
    </MDBContainer>
  );
}
