import React from "react";
import { MDBBtn, MDBDatePicker, MDBInput } from "mdbreact";
import { getAge } from "../../../../services/utilities";

export default function Basic({
  setActiveStep,
  handleForm,
  isPublished,
  viewing = false,
}) {
  const { form, setForm } = handleForm;

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const {
    fullName = {
      fname: "",
      lname: "",
      mname: "",
      suffix: "",
    },
    pob,
    indigenousPeople,
    disability,
    psa,
    isMale,
    dob,
    motherTongue,
    mobile,
    "4ps": fourPs,
  } = form;

  const { fname, mname, lname, suffix } = fullName;

  return (
    <>
      {viewing && <h5 className="mt-4">Basic Information</h5>}
      <div className="row">
        <div className="col-6">
          <MDBInput
            readOnly={isPublished}
            label="PSA Birth Certificate No. (if available upon registration)"
            value={psa}
            onChange={(e) => handleChange("psa", e.target.value.toUpperCase())}
          />
        </div>
        <div className="col-6">
          <MDBInput
            readOnly={isPublished}
            label="Mobile No. (+63)"
            maxLength={10}
            value={mobile}
            onChange={(e) =>
              handleChange("mobile", e.target.value.replace(/\D/g, ""))
            }
          />
        </div>

        <div className="col-5 border-right border-top border-left">
          <MDBInput
            readOnly={isPublished}
            label="Last Name"
            value={lname}
            onChange={(e) =>
              handleChange("fullName", {
                ...fullName,
                lname: e.target.value.toUpperCase(),
              })
            }
          />
        </div>
        <div className="col-2">
          <label className="mb-0">Birthdate</label>
          {isPublished ? (
            <div className="mt-2">{dob.toDateString()}</div>
          ) : (
            <MDBDatePicker
              className="mt-1"
              autoOk
              value={dob}
              getValue={(e) => handleChange("dob", e)}
            />
          )}
        </div>
        <div className="col-1">
          <MDBInput label="Age" readOnly value={getAge(dob.toDateString())} />
        </div>
        <div className="col-4">
          <MDBInput
            readOnly={isPublished}
            label="Mother Tongue (ex: Tagalog, English)"
            value={motherTongue}
            onChange={(e) =>
              handleChange("motherTongue", e.target.value.toUpperCase())
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-5 border-left border-right">
          <MDBInput
            readOnly={isPublished}
            label="First Name"
            value={fname}
            onChange={(e) =>
              handleChange("fullName", {
                ...fullName,
                fname: e.target.value.toUpperCase(),
              })
            }
          />
        </div>
        <div className="col-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              disabled={isPublished}
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
              disabled={isPublished}
              checked={!isMale}
              onChange={() => handleChange("isMale", false)}
              id="Female"
            />
            <label className="form-check-label" htmlFor="Female">
              Female
            </label>
          </div>
        </div>
        <div className="col-5">
          <MDBInput
            readOnly={isPublished}
            label="Place of Birth (Municipality/City)"
            value={pob}
            onChange={(e) => handleChange("pob", e.target.value.toUpperCase())}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3 border-left border-bottom">
          <MDBInput
            readOnly={isPublished}
            label="Middle Name"
            value={mname}
            onChange={(e) =>
              handleChange("fullName", {
                ...fullName,
                mname: e.target.value.toUpperCase(),
              })
            }
          />
        </div>
        <div className="col-2 border-right border-bottom">
          <MDBInput
            readOnly={isPublished}
            label="Extension Name"
            value={suffix}
            onChange={(e) =>
              handleChange("fullName", {
                ...fullName,
                suffix: e.target.value.toUpperCase(),
              })
            }
          />
        </div>
        <div className="col-7">
          <MDBInput
            readOnly={isPublished}
            label="Are you part of any Indigenous or Cultural Community? If yes, please specify."
            value={indigenousPeople}
            onChange={(e) =>
              handleChange("indigenousPeople", e.target.value.toUpperCase())
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <MDBInput
            readOnly={isPublished}
            label="Are you a beneficiary of 4Ps? If Yes, write the 4Ps Household ID"
            value={fourPs}
            onChange={(e) => handleChange("4ps", e.target.value.toUpperCase())}
          />
        </div>
        <div className="col-6">
          <MDBInput
            readOnly={isPublished}
            label="Do you have a Disability? If Yes, specify the type of disability"
            value={disability}
            onChange={(e) =>
              handleChange("disability", e.target.value.toUpperCase())
            }
          />
        </div>
      </div>
      <MDBBtn
        onClick={() => setActiveStep(0)}
        style={{ float: "left" }}
        color="dark"
        className="z-depth-0"
        outline
      >
        Return
      </MDBBtn>
      <MDBBtn
        onClick={() => setActiveStep(2)}
        style={{ float: "right" }}
        color="info"
      >
        Next
      </MDBBtn>
    </>
  );
}
