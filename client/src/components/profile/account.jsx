import React, { useState } from "react";
import { MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
// import AddressSelect from "../addressSelect";
// import { useDispatch, useSelector } from "react-redux";
// import { RESET, UPDATE } from "../../services/redux/slices/auth";
// import { useToasts } from "react-toast-notifications";
// import { isEqual } from "lodash";
import "./account.css";

export default function Account() {
  const [view, setView] = useState(true);
  // { auth, token, isSuccess, role } = useSelector(({ auth }) => auth),
  //   [address, setAddress] = useState({
  //     region: "REGION III (CENTRAL LUZON)",
  //     province: "NUEVA ECIJA",
  //     city: "CABANATUAN CITY",
  //     barangay: "",
  //     zip: "",
  //     street: "",
  //   }),
  //   [form, setForm] = useState({
  //     fullName: {
  //       fname: "",
  //       mname: "",
  //       lname: "",
  //       suffix: "",
  //     },
  //     dob: "",
  //     mobile: "",
  //     isMale: false,
  //   }),
  //   dispatch = useDispatch(),
  //   { addToast } = useToasts();

  // useEffect(() => {
  //   if (auth._id && isSuccess) {
  //     addToast("Account Updated Successfully", {
  //       appearance: "success",
  //     });
  //     dispatch(RESET());
  //   }
  // }, [auth, isSuccess, dispatch, addToast]);

  // useEffect(() => {
  //   if (auth._id) {
  //     if (auth.address.region) setAddress(auth.address);
  //     setTimeout(() => setForm(auth), 1000);
  //   }
  // }, [auth]);

  // const handleChange = (key, value) => setForm({ ...form, [key]: value });

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const data = {
  //     ...form,
  //     address,
  //     role: undefined,
  //     email: undefined,
  //     isActive: undefined,
  //     updatedAt: undefined,
  //     createdAt: undefined,
  //   };

  //   const _auth = {
  //     ...auth,
  //     role: undefined,
  //     email: undefined,
  //     isActive: undefined,
  //     updatedAt: undefined,
  //     createdAt: undefined,
  //   };

  //   if (isEqual(data, _auth))
  //     return addToast("No changes found, skipping update.", {
  //       appearance: "info",
  //     });

  //   dispatch(
  //     UPDATE({
  //       data,
  //       token,
  //     })
  //   );
  // };

  return (
    <>
      <div className="float-right">
        <MDBBtn size="sm" className="px-3 mr-5" onClick={() => setView(false)}>
          <MDBIcon icon="pen" />
          &nbsp; Edit Profile
        </MDBBtn>
      </div>
      <div className="account-infos">
        {view ? (
          <div
            className="account-info cursor-pointer"
            onClick={() => setView(false)}
          >
            Jhon Kevin P. Magtalas
          </div>
        ) : (
          <div className="editable-content">
            <div className="edit-input-group">
              <div className="inputBox">
                <input className="edit-input" type="text" required="required" />
                <label className="edit-label">First name</label>
              </div>
              <div className="inputBox">
                <input className="edit-input" type="text" required="required" />
                <label className="edit-label">Middle name</label>
              </div>
              <div className="inputBox">
                <input className="edit-input" type="text" required="required" />
                <label className="edit-label">Last name</label>
              </div>
            </div>
            <div className="edit-btn-group">
              <button className="edit-btn">
                <MDBIcon icon="check" />
              </button>
              <button className="edit-btn" onClick={() => setView(true)}>
                <MDBIcon icon="times" className="m-0 p-0" />
              </button>
            </div>
          </div>
        )}

        <div className="account-info">
          <MDBIcon icon="map-pin" className="text-primary" /> Nueva Vizcaya, NV
        </div>
      </div>
      <div className="account-info">Senior High School Grade 12 (ABM)</div>
      <div className="account-contents">
        <div className="account-content">
          <MDBIcon icon="user" /> About
        </div>
        <hr className="m-0" />
        <div className="account-content">Contact Information</div>
        <MDBRow>
          <MDBCol md="2" className="mx-0">
            Mobile:
          </MDBCol>
          <MDBCol className="text-info">+63 927 342 2159</MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Address:
          </MDBCol>
          <MDBCol>Nueva Vizcaya, Bayombong, Magsaysay,</MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            E-mail:
          </MDBCol>
          <MDBCol className="text-info">magtalas555@gmail.com</MDBCol>
        </MDBRow>
        <div className="account-basic">Basic Information</div>
        <MDBRow>
          <MDBCol md="2" className="mx-0">
            Birthday:
          </MDBCol>
          <MDBCol>August 27, 1998</MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Place Of Birth:
          </MDBCol>
          <MDBCol>VRH</MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Age:
          </MDBCol>
          <MDBCol>25</MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Gender:
          </MDBCol>
          <MDBCol>Male</MDBCol>
        </MDBRow>
        <div className="account-family">Legal Guardian Information</div>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Name:
          </MDBCol>
          <MDBCol>Evelyn Magtalas</MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Relationship:
          </MDBCol>
          <MDBCol>Mother</MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Mobile:
          </MDBCol>
          <MDBCol>+63 943 235 6463</MDBCol>
        </MDBRow>
      </div>
    </>
  );
}
