import React from "react";
import {
  MDBCol,
  MDBInput,
  MDBRow,
  DatePicker,
  MDBContainer,
  MDBIcon,
} from "mdbreact";
import AddressSelect from "../../../components/addressSelect";
import { formatMobile, getAge } from "../../../services/utilities";

export default function Basic({ handleChange, form, view = false }) {
  const {
      fullName,
      email,
      password,
      cpassword,
      pob,
      dob,
      isMale,
      mobile,
      disability,
      motherTongue,
      address,
      role,
    } = form,
    { fname, mname, lname, suffix } = fullName,
    { current, permanent, isSame } = address;

  return (
    <>
      <div className="blue darken-3 px-5 py-2 text-white font-weight-bold h5-responsive">
        I. IDENTIFYING INFORMATION
      </div>
      <MDBContainer className="px-5" fluid>
        <label className="mb-0 mt-3">
          <b>Fullname</b>
          {!view && (
            <>
              &nbsp;- <i>Enter your fullname correctly</i>
            </>
          )}
        </label>
        <MDBRow className={`${view && "pt-2"}`}>
          <MDBCol className="px-1" md="4">
            {view ? (
              <>
                <h6 className="mb-0">First name: </h6>
                <h5 className="font-weight-bold">{fname}</h5>
              </>
            ) : (
              <MDBInput
                label="First name"
                type="text"
                outline
                required
                value={fname}
                onChange={(e) =>
                  handleChange("fullName", {
                    ...fullName,
                    fname: e.target.value.toUpperCase(),
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1" md="3">
            {view ? (
              <>
                <h6 className="mb-0">Middle name: </h6>
                <h5 className="font-weight-bold">{mname}</h5>
              </>
            ) : (
              <MDBInput
                label="Middle name"
                type="text"
                outline
                value={mname}
                onChange={(e) =>
                  handleChange("fullName", {
                    ...fullName,
                    mname: e.target.value.toUpperCase(),
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1" md="3">
            {view ? (
              <>
                <h6 className="mb-0">Last name: </h6>
                <h5 className="font-weight-bold">{lname}</h5>
              </>
            ) : (
              <MDBInput
                label="Last name"
                type="text"
                outline
                required
                value={lname}
                onChange={(e) =>
                  handleChange("fullName", {
                    ...fullName,
                    lname: e.target.value.toUpperCase(),
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1" md="2">
            {view ? (
              <>
                <h6 className="mb-0">Suffix: </h6>
                <h5 className="font-weight-bold">{suffix || <i>N/A</i>}</h5>
              </>
            ) : (
              <MDBInput
                label="Suffix"
                type="text"
                outline
                value={suffix}
                onChange={(e) =>
                  handleChange("fullName", {
                    ...fullName,
                    suffix: e.target.value.toUpperCase(),
                  })
                }
              />
            )}
          </MDBCol>
        </MDBRow>
        <label className="mb-0 pb-0">
          <b>Place of Birth & Date of Birth</b>{" "}
          {!view && (
            <>
              &nbsp;- <i>Indicate your birth of place & birth date correctly</i>
            </>
          )}
        </label>
        <MDBRow className={`${view && "pt-2"}`}>
          <MDBCol md={view ? "4" : "5"} className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Place of Birth: </h6>
                <h5 className="font-weight-bold">{pob}</h5>
              </>
            ) : (
              <MDBInput
                label="Place of birth"
                type="text"
                value={pob}
                outline
                onChange={(e) => handleChange("pob", e.target.value)}
              />
            )}
          </MDBCol>
          <MDBCol className={`px-1 ${!view && "d-flex align-items-center"}`}>
            {view ? (
              <>
                <h6 className="mb-0">Date of Birth: </h6>
                <h5 className="font-weight-bold">
                  {new Date(dob).toDateString()}, {getAge(dob)}
                </h5>
              </>
            ) : (
              <>
                <DatePicker
                  value={dob}
                  getValue={(e) => handleChange("dob", e)}
                />
                <MDBIcon
                  title={getAge(dob)}
                  icon="info-circle"
                  className="text-info"
                />
              </>
            )}
          </MDBCol>
          <MDBCol md="2">
            {view ? (
              <>
                <h6 className="mb-0">Gender: </h6>
                <h5 className="font-weight-bold">
                  {isMale ? "MALE" : "FEMALE"}
                </h5>
              </>
            ) : (
              <>
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
              </>
            )}
          </MDBCol>
          <MDBCol md="3" className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Mobile: </h6>
                <h5 className="font-weight-bold">{formatMobile(mobile)}</h5>
              </>
            ) : (
              <MDBInput
                label="Mobile No. (+63)"
                maxLength={10}
                required
                outline
                value={mobile}
                onChange={(e) =>
                  handleChange("mobile", e.target.value.replace(/\D/g, ""))
                }
              />
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow className={`${view && "pt-2"}`}>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Disabilities: </h6>
                <h5 className="font-weight-bold">{disability || <i>N/A</i>}</h5>
              </>
            ) : (
              <MDBInput
                label="Do you have any Disabilities? If Yes, specify the type of disability"
                type="text"
                outline
                value={disability}
                onChange={(e) => handleChange("disability", e.target.value)}
              />
            )}
          </MDBCol>
          <MDBCol md="4" className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Mother Tongue: </h6>
                <h5 className="font-weight-bold">
                  {motherTongue || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Mother Tongue (ex: Tagalog, English)"
                type="text"
                outline
                value={motherTongue}
                onChange={(e) => handleChange("motherTongue", e.target.value)}
              />
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="blue darken-3 px-5 py-2 text-white font-weight-bold h5-responsive">
        II. ADDRESS INFORMATION
      </div>
      <MDBContainer className="px-5" fluid>
        <label className="mt-3">
          <b>Address </b>
          {!view && (
            <>
              &nbsp;-&nbsp;
              <i>
                Select region first, and then province, then city, and finally
                your barangay
              </i>
            </>
          )}
        </label>
        <AddressSelect
          view={view}
          address={current}
          label="Current Address"
          handleChange={(_, current) =>
            handleChange("address", { ...address, current })
          }
        />
        {view ? (
          <h6>
            Current Address is the same as Permanent Address:&nbsp;
            <strong>{isSame ? "Yes" : "No"}</strong>
          </h6>
        ) : (
          <div className="d-flex mb-3">
            <label>
              Is your permanent address is same with your current address?
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isSame}
                onChange={() =>
                  handleChange("address", { ...address, isSame: true })
                }
                id="Yes"
              />
              <label className="form-check-label" htmlFor="Yes">
                Yes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={!isSame}
                onChange={() =>
                  handleChange("address", { ...address, isSame: false })
                }
                id="No"
              />
              <label className="form-check-label" htmlFor="No">
                No
              </label>
            </div>
          </div>
        )}
        {!isSame && (
          <AddressSelect
            view={view}
            address={permanent}
            label="Permanent Address"
            handleChange={(_, permanent) =>
              handleChange("address", { ...address, permanent })
            }
          />
        )}
      </MDBContainer>
      <div className="blue darken-3 px-5 py-2 text-white font-weight-bold h5-responsive">
        III. ACCOUNT INFORMATION
      </div>
      <MDBContainer className="px-5" fluid>
        <label className="mb-0 pb-0 mt-3">
          <b>Email & {view ? "Account Type" : "Password"}</b>
          {!view && (
            <>
              &nbsp;- <i>Enter your email & password correctly</i>
            </>
          )}
        </label>
        <MDBRow className={`${view && "pt-2"}`}>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">E-mail Address: </h6>
                <h5 className="font-weight-bold">{email}</h5>
              </>
            ) : (
              <MDBInput
                label="Enter E-mail Address"
                type="text"
                outline
                required
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            )}
          </MDBCol>
          {!view && (
            <>
              <MDBCol className="px-1">
                <MDBInput
                  label="Enter Password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  outline
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </MDBCol>
              <MDBCol className="px-1 ">
                <MDBInput
                  label="Re-enter Password"
                  type="password"
                  required
                  minLength={8}
                  value={cpassword}
                  outline
                  onChange={(e) => handleChange("cpassword", e.target.value)}
                />
              </MDBCol>
            </>
          )}
          <MDBCol md={view ? "6" : "2"}>
            {view ? (
              <>
                <h6 className="mb-0">Account Type: </h6>
                <h5 className="font-weight-bold text-uppercase">{role}</h5>
              </>
            ) : (
              <>
                <label className="mb-0">Account Type</label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="employee">Employee</option>
                  <option value="guardian" disabled>
                    Guardian
                  </option>
                </select>
              </>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
