import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBIcon, MDBDatePicker } from "mdbreact";
import AddressSelect from "../addressSelect";
import { useDispatch, useSelector } from "react-redux";
import { RESET, UPDATE } from "../../services/redux/slices/auth";
import { useToasts } from "react-toast-notifications";
import { isEqual } from "lodash";
import "./account.css";
import { getAge } from "../../services/utilities";

const _form = {
  fullName: {
    fname: "",
    mname: "",
    lname: "",
    suffix: "",
  },
  dob: "",
  mobile: "",
  pob: "",
  isMale: false,
  address: {
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
  },
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
};

export default function Account() {
  const [view, setView] = useState(0),
    { auth, token, isSuccess, role } = useSelector(({ auth }) => auth),
    [form, setForm] = useState(_form),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if (auth._id && isSuccess) {
      addToast("Account Updated Successfully", {
        appearance: "success",
      });
      dispatch(RESET());
    }
  }, [auth, isSuccess, dispatch, addToast]);

  useEffect(() => {
    if (auth._id) {
      if (auth.address.region) setForm(auth.address);
      setTimeout(() => setForm(auth), 1000);
    }
  }, [auth]);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      address,
      role: undefined,
      email: undefined,
      isActive: undefined,
      updatedAt: undefined,
      createdAt: undefined,
    };

    const _auth = {
      ...auth,
      role: undefined,
      email: undefined,
      isActive: undefined,
      updatedAt: undefined,
      createdAt: undefined,
    };

    if (isEqual(data, _auth))
      return addToast("No changes found, skipping update.", {
        appearance: "info",
      });

    dispatch(
      UPDATE({
        data,
        token,
      })
    );
  };

  const { fullName, isMale, dob, pob, email, mobile, address, guardians } =
      form,
    { mother, father } = guardians,
    { current, permanent } = address;

  return (
    <form onSubmit={handleSubmit}>
      <div className="account-infos">
        {view !== 1 ? (
          <div
            className="account-info cursor-pointer"
            onClick={() => setView(1)}
          >
            {fullName?.fname}&nbsp;
            {fullName?.mname}&nbsp;
            {fullName?.lname}&nbsp;
          </div>
        ) : (
          <div className="editable-content">
            <div className="edit-input-group">
              <div className="inputBox">
                <input
                  className="edit-input"
                  type="text"
                  required
                  value={fullName.fname}
                  onChange={(e) =>
                    handleChange("fullName", {
                      ...fullName,
                      fname: e.target.value.toUpperCase(),
                    })
                  }
                />
                <label className="edit-label">First name</label>
              </div>
              <div className="inputBox">
                <input
                  className="edit-input"
                  type="text"
                  required
                  value={fullName.mname}
                />
                <label className="edit-label">Middle name</label>
              </div>
              <div className="inputBox">
                <input
                  className="edit-input"
                  type="text"
                  required
                  value={fullName.lname}
                />
                <label className="edit-label">Last name</label>
              </div>
            </div>
            <div className="edit-btn-group">
              <button type="submit" className="edit-btn">
                <MDBIcon icon="check" />
              </button>
              <button
                className="edit-btn"
                type="button"
                onClick={() => setView(0)}
              >
                <MDBIcon icon="times" className="m-0 p-0" />
              </button>
            </div>
          </div>
        )}

        <div className="account-info">
          <MDBIcon icon="map-pin" className="text-primary" /> {current.province}
        </div>
      </div>
      {view !== 2 ? (
        <div
          className="account-grade cursor-pointer"
          onClick={() => setView(2)}
        >
          Senior High School Grade 12 (ABM)
        </div>
      ) : (
        <div className="editable-content">
          <select>
            <option>To fix</option>
          </select>
          <div className="edit-btn-group">
            <button className="edit-btn">
              <MDBIcon icon="check" />
            </button>
            <button className="edit-btn" onClick={() => setView(0)}>
              <MDBIcon icon="times" className="m-0 p-0" />
            </button>
          </div>
        </div>
      )}
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
          {view !== 3 ? (
            <MDBCol
              className="text-info cursor-pointer"
              onClick={() => setView(3)}
            >
              {mobile}
            </MDBCol>
          ) : (
            <div className="editable-content">
              <div className="inputBox">
                <input
                  className="edit-input"
                  type="number"
                  required
                  value={mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                />
                <label className="edit-label">Strand and grade Level</label>
              </div>
              <div className="edit-btn-group">
                <button className="edit-btn" type="submit">
                  <MDBIcon icon="check" />
                </button>
                <button
                  className="edit-btn"
                  type="button"
                  onClick={() => setView(0)}
                >
                  <MDBIcon icon="times" className="m-0 p-0" />
                </button>
              </div>
            </div>
          )}
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Address:
          </MDBCol>
          {view !== 4 ? (
            <MDBCol className="cursor-pointer" onClick={() => setView(4)}>
              {current.region},&nbsp;
              {current.province},&nbsp;
              {current.city},&nbsp;
              {current.barangay},&nbsp;
              {current.street},&nbsp;
              {current.zip}
            </MDBCol>
          ) : (
            <div className="editable-content">
              <AddressSelect
                address={current}
                label="Current Address"
                handleChange={(_, current) =>
                  handleChange("address", { ...address, current })
                }
              />

              <div className="edit-btn-group">
                <button className="edit-btn" type="submit">
                  <MDBIcon icon="check" />
                </button>
                <button
                  className="edit-btn"
                  type="button"
                  onClick={() => setView(0)}
                >
                  <MDBIcon icon="times" className="m-0 p-0" />
                </button>
              </div>
            </div>
          )}
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            E-mail:
          </MDBCol>
          {view !== 5 ? (
            <MDBCol
              className="text-info cursor-pointer"
              onClick={() => setView(5)}
            >
              {email}
            </MDBCol>
          ) : (
            <div className="editable-content">
              <div className="inputBox">
                <input
                  className="edit-input"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <label className="edit-label">Enter E-mail</label>
              </div>
              <div className="edit-btn-group">
                <button className="edit-btn" type="submit">
                  <MDBIcon icon="check" />
                </button>
                <button
                  className="edit-btn"
                  type="button"
                  onClick={() => setView(0)}
                >
                  <MDBIcon icon="times" className="m-0 p-0" />
                </button>
              </div>
            </div>
          )}
        </MDBRow>
        <div className="account-basic">Basic Information</div>
        <MDBRow>
          <MDBCol md="2" className="mx-0">
            Birthday:
          </MDBCol>
          {view !== 6 ? (
            <MDBCol className="cursor-pointer" onClick={() => setView(6)}>
              {new Date(dob).toDateString()}
            </MDBCol>
          ) : (
            <div className="editable-content">
              <MDBDatePicker className="mb-0" />
              <div className="edit-btn-group">
                <button className="edit-btn">
                  <MDBIcon icon="check" />
                </button>
                <button className="edit-btn" onClick={() => setView(0)}>
                  <MDBIcon icon="times" className="m-0 p-0" />
                </button>
              </div>
            </div>
          )}
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Place Of Birth:
          </MDBCol>
          {view !== 7 ? (
            <MDBCol className="cursor-pointer" onClick={() => setView(7)}>
              {pob}
            </MDBCol>
          ) : (
            <div className="editable-content">
              <div className="inputBox">
                <input className="edit-input" type="text" required />
                <label className="edit-label">Place of Birth</label>
              </div>
              <div className="edit-btn-group">
                <button className="edit-btn">
                  <MDBIcon icon="check" />
                </button>
                <button className="edit-btn" onClick={() => setView(0)}>
                  <MDBIcon icon="times" className="m-0 p-0" />
                </button>
              </div>
            </div>
          )}
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Age:
          </MDBCol>
          <MDBCol>{getAge(dob)}</MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Gender:
          </MDBCol>
          {view !== 8 ? (
            <MDBCol className="cursor-pointer" onClick={() => setView(8)}>
              {isMale ? "Male" : "Female"}
            </MDBCol>
          ) : (
            <div className="editable-content">
              <div className="d-flex">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isMale}
                    onChange={() => handleChange("isMale", true)}
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
                    checked={!isMale}
                    onChange={() => handleChange("isMale", false)}
                    id="Female"
                  />
                  <label className="form-check-label" htmlFor="Female">
                    Female
                  </label>
                </div>
              </div>
              <div className="edit-btn-group">
                <button className="edit-btn">
                  <MDBIcon icon="check" />
                </button>
                <button className="edit-btn" onClick={() => setView(0)}>
                  <MDBIcon icon="times" className="m-0 p-0" />
                </button>
              </div>
            </div>
          )}
        </MDBRow>
        <div className="account-family">Legal Guardian Information</div>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Name:
          </MDBCol>
          {view !== 9 ? (
            <MDBCol className="cursor-pointer" onClick={() => setView(9)}>
              {mother.fname} &nbsp;{mother.mname} &nbsp;{mother.lname}
            </MDBCol>
          ) : (
            <div className="editable-content">
              <div className="inputBox">
                <input className="edit-input" type="text" required />
                <label className="edit-label">Full name</label>
              </div>
              <div className="edit-btn-group">
                <button className="edit-btn">
                  <MDBIcon icon="check" />
                </button>
                <button className="edit-btn" onClick={() => setView(0)}>
                  <MDBIcon icon="times" className="m-0 p-0" />
                </button>
              </div>
            </div>
          )}
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Relationship:
          </MDBCol>
          {view !== 10 ? (
            <MDBCol className="cursor-pointer" onClick={() => setView(10)}>
              Mother
            </MDBCol>
          ) : (
            <div className="editable-content">
              <div className="inputBox">
                <input className="edit-input" type="text" required />
                <label className="edit-label">Relationship</label>
              </div>
              <div className="edit-btn-group">
                <button className="edit-btn">
                  <MDBIcon icon="check" />
                </button>
                <button className="edit-btn" onClick={() => setView(0)}>
                  <MDBIcon icon="times" className="m-0 p-0" />
                </button>
              </div>
            </div>
          )}
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md="2" className="mx-0">
            Mobile:
          </MDBCol>
          {view !== 11 ? (
            <MDBCol className="cursor-pointer" onClick={() => setView(11)}>
              {mother.mobile}
            </MDBCol>
          ) : (
            <div className="editable-content">
              <div className="inputBox">
                <input className="edit-input" type="text" required />
                <label className="edit-label">Mobile No.</label>
              </div>
              <div className="edit-btn-group">
                <button className="edit-btn">
                  <MDBIcon icon="check" />
                </button>
                <button className="edit-btn" onClick={() => setView(0)}>
                  <MDBIcon icon="times" className="m-0 p-0" />
                </button>
              </div>
            </div>
          )}
        </MDBRow>
      </div>
    </form>
  );
}
