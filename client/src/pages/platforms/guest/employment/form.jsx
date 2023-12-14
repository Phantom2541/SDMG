import React from "react";
import {
  MDBBtn,
  MDBCardBody,
  MDBCol,
  MDBDatePicker,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdbreact";
import UploadPDF from "./uploadPDF";
import AddressSelect from "../../../../components/addressSelect";
import CustomSelect from "../../../../components/customSelect";
import { getAge } from "../../../../services/utilities";
import { Departments, Roles } from "../../../../services/fakeDb";
import { useSelector } from "react-redux";

const TEACHERS = ["HEAD", "MASTER", "TEACHER"],
  requirements = ["Application Letter", "Resumé", "Personal Data Sheet"];

export default function Form({
  user = {},
  setUser = () => {},
  employment = {},
  setEmployment = () => {},
  handleSubmit = null,
  isGuest = true,
  submitTxt = "Submit",
  handleReject,
}) {
  const { taken } = useSelector(({ employments }) => employments);

  const {
      mobile,
      fullName = {},
      motherTongue,
      dob,
      pob,
      civilStatus,
      isMale = false,
      address = { isSame: true },
      email = "",
    } = user,
    {
      position,
      emergencyContact = {},
      isPublished,
      _id,
      access,
      department,
      remarks,
    } = employment,
    { primary = {}, secondary = {} } = emergencyContact,
    { fname, lname, mname, suffix } = fullName,
    rowSize = TEACHERS.includes(access) ? "3" : "4";

  return (
    <MDBCardBody className="mx-5">
      <h5 className="mb-0">Personal Information</h5>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={isGuest ? "6" : rowSize}>
            <MDBInput
              label="Applying Position"
              type="text"
              value={position}
              onChange={(e) =>
                setEmployment({
                  ...employment,
                  position: e.target.value,
                })
              }
            />
          </MDBCol>
          {!isGuest && (
            <MDBCol md={rowSize}>
              <CustomSelect
                disableByKey={{ value: taken.access }}
                label="Allowed Access"
                preValue={access}
                choices={Roles.collections}
                texts="str"
                values="value"
                onChange={(access) => setEmployment({ ...employment, access })}
              />
            </MDBCol>
          )}
          {TEACHERS.includes(access) && (
            <MDBCol md="3">
              <CustomSelect
                disableByKey={{ key: taken[access] || [] }}
                label="Department"
                preValue={department}
                choices={Departments.collections}
                texts="name"
                values="key"
                onChange={(department) =>
                  setEmployment({ ...employment, department })
                }
              />
            </MDBCol>
          )}
          <MDBCol md={isGuest ? "6" : rowSize}>
            <MDBInput
              label="Mobile No. +63"
              maxLength={10}
              readOnly={!isGuest}
              value={mobile}
              onChange={(e) =>
                setUser({
                  ...user,
                  mobile: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="6" className="border-right border-top border-left">
            <MDBInput
              label="Last Name"
              readOnly={!isGuest}
              value={lname}
              onChange={(e) =>
                setUser({
                  ...user,
                  fullName: {
                    ...fullName,
                    lname: e.target.value.toUpperCase(),
                  },
                })
              }
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              label="Mother Tongue (ex: Tagalog, English)"
              value={motherTongue}
              readOnly={!isGuest}
              onChange={(e) =>
                setUser({
                  ...user,
                  motherTongue: e.target.value,
                })
              }
            />
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol md="6" className="border-left border-right">
            <MDBInput
              label="First Name"
              value={fname}
              readOnly={!isGuest}
              onChange={(e) =>
                setUser({
                  ...user,
                  fullName: {
                    ...fullName,
                    fname: e.target.value.toUpperCase(),
                  },
                })
              }
            />
          </MDBCol>
          <MDBCol md={isGuest ? "3" : "2"}>
            <label className="mb-0">Birthdate</label>
            {isGuest ? (
              <MDBDatePicker
                className="mt-1"
                autoOk
                value={dob}
                getValue={(dob) =>
                  setUser({
                    ...user,
                    dob,
                  })
                }
              />
            ) : (
              <div className="mt-2">{dob.toDateString()}</div>
            )}
          </MDBCol>
          <MDBCol md="1">
            <MDBInput label="Age" readOnly value={getAge(dob.toDateString())} />
          </MDBCol>
          <MDBCol md={isGuest ? "2" : "3"}>
            <CustomSelect
              disabledAllExceptSelected={!isGuest}
              label="Civil Status"
              preValue={civilStatus}
              choices={[
                { text: "Single", value: "single" },
                { text: "Married", value: "married" },
                { text: "Live in", value: "live-in" },
                { text: "Divorced", value: "divorced" },
              ]}
              texts="text"
              values="value"
              onChange={(civilStatus) =>
                setUser({
                  ...user,
                  civilStatus,
                })
              }
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="mb-3">
          <MDBCol md="4" className="border-left border-bottom">
            <MDBInput
              label="Middle Name"
              value={mname}
              readOnly={!isGuest}
              onChange={(e) =>
                setUser({
                  ...user,
                  fullName: {
                    ...fullName,
                    mname: e.target.value.toUpperCase(),
                  },
                })
              }
            />
          </MDBCol>
          <MDBCol md="2" className="border-right border-bottom">
            <MDBInput
              label="Extension Name"
              value={suffix}
              readOnly={!isGuest}
              onChange={(e) =>
                setUser({
                  ...user,
                  fullName: {
                    ...fullName,
                    suffix: e.target.value.toUpperCase(),
                  },
                })
              }
            />
          </MDBCol>
          <MDBCol md="2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                readOnly={!isGuest}
                checked={isMale}
                onChange={() => setUser({ ...user, isMale: true })}
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
                readOnly={!isGuest}
                checked={!isMale}
                onChange={() => setUser({ ...user, isMale: false })}
                id="Female"
              />
              <label className="form-check-label" htmlFor="Female">
                Female
              </label>
            </div>
          </MDBCol>
          <MDBCol md="4">
            <MDBInput
              label="Place of Birth (Municipality/City)"
              value={pob}
              readOnly={!isGuest}
              onChange={(e) => setUser({ ...user, pob: e.target.value })}
            />
          </MDBCol>
        </MDBRow>

        <AddressSelect
          disabledAllExceptSelected={!isGuest}
          label="Permanent Address"
          address={address.permanent}
          handleChange={(_, permanent) =>
            setUser({
              ...user,
              address: {
                ...address,
                permanent,
              },
            })
          }
        />

        <MDBRow>
          <MDBCol md="8">
            <MDBInput
              type="text"
              label="Street/Purok"
              readOnly={!isGuest}
              value={address?.permanent?.street}
              onChange={(e) =>
                setUser({
                  ...user,
                  address: {
                    ...address,
                    permanent: {
                      ...address.permanent,
                      street: e.target.value,
                    },
                  },
                })
              }
            />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput
              type="text"
              label="Zip Code"
              readOnly={!isGuest}
              value={address?.permanent?.zip}
              onChange={(e) =>
                setUser({
                  ...user,
                  address: {
                    ...address,
                    permanent: {
                      ...address?.permanent,
                      zip: e.target.value.replace(/\D/g, ""),
                    },
                  },
                })
              }
            />
          </MDBCol>
        </MDBRow>
        <div className="d-flex mt-3">
          <div className="">
            <label>
              Is your permanent address is same with your current address?
            </label>
          </div>
          <div className="">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                readOnly={!isGuest}
                checked={address?.isSame}
                onChange={() =>
                  setUser({
                    ...user,
                    address: {
                      ...address,
                      isSame: true,
                    },
                  })
                }
                id="yes"
              />
              <label className="form-check-label" htmlFor="yes">
                Yes
              </label>
            </div>
          </div>
          <div className="">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                readOnly={!isGuest}
                checked={!address?.isSame}
                onChange={() =>
                  setUser({
                    ...user,
                    address: {
                      ...address,
                      isSame: false,
                    },
                  })
                }
                id="no"
              />
              <label className="form-check-label" htmlFor="no">
                No
              </label>
            </div>
          </div>
        </div>

        {!address.isSame && (
          <>
            <div className="mt-3">
              <AddressSelect
                disabledAllExceptSelected={!isGuest}
                label="Current Address"
                address={address?.current}
                handleChange={(_, current) =>
                  setUser({
                    ...user,
                    address: {
                      ...address,
                      current,
                    },
                  })
                }
              />
            </div>
            <MDBRow>
              <MDBCol md="8">
                <MDBInput
                  type="text"
                  label="Street/Purok"
                  readOnly={!isGuest}
                  value={address?.current?.street}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: {
                        ...address,
                        current: {
                          ...address?.current,
                          street: e.target.value,
                        },
                      },
                    })
                  }
                />
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  type="text"
                  label="Zip Code"
                  readOnly={!isGuest}
                  value={address.current?.zip}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: {
                        ...address,
                        current: {
                          ...address.current,
                          zip: e.target.value.replace(/\D/g, ""),
                        },
                      },
                    })
                  }
                />
              </MDBCol>
            </MDBRow>
          </>
        )}
        <hr color="primray" />
        <h6 className="mb-0">In case of Emergency, Notify:</h6>
        <div className="border px-4">
          <MDBRow>
            <MDBCol md="4">
              <MDBInput
                label="Primary Name of Contact"
                readOnly={!isGuest}
                value={primary.name}
                onChange={(e) =>
                  setEmployment({
                    ...employment,
                    emergencyContact: {
                      ...emergencyContact,
                      primary: {
                        ...primary,
                        name: e.target.value,
                      },
                    },
                  })
                }
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Relationship"
                readOnly={!isGuest}
                value={primary.relationship}
                onChange={(e) =>
                  setEmployment({
                    ...employment,
                    emergencyContact: {
                      ...emergencyContact,
                      primary: {
                        ...primary,
                        relationship: e.target.value,
                      },
                    },
                  })
                }
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Mobile No. (+63)"
                readOnly={!isGuest}
                value={primary.mobile}
                maxLength={10}
                onChange={(e) =>
                  setEmployment({
                    ...employment,
                    emergencyContact: {
                      ...emergencyContact,
                      primary: {
                        ...primary,
                        mobile: e.target.value.replace(/\D/g, ""),
                      },
                    },
                  })
                }
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4">
              <MDBInput
                label="Secondary Name of Contact"
                readOnly={!isGuest}
                value={secondary.name}
                onChange={(e) =>
                  setEmployment({
                    ...employment,
                    emergencyContact: {
                      ...emergencyContact,
                      secondary: {
                        ...secondary,
                        name: e.target.value,
                      },
                    },
                  })
                }
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Relationship"
                readOnly={!isGuest}
                value={secondary.relationship}
                onChange={(e) =>
                  setEmployment({
                    ...employment,
                    emergencyContact: {
                      ...emergencyContact,
                      secondary: {
                        ...secondary,
                        relationship: e.target.value,
                      },
                    },
                  })
                }
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Mobile No. (+63)"
                readOnly={!isGuest}
                value={secondary.mobile}
                maxLength={10}
                onChange={(e) =>
                  setEmployment({
                    ...employment,
                    emergencyContact: {
                      ...emergencyContact,
                      secondary: {
                        ...secondary,
                        mobile: e.target.value.replace(/\D/g, ""),
                      },
                    },
                  })
                }
              />
            </MDBCol>
          </MDBRow>
        </div>
        <hr color="primray" />

        <p>Upload{!isGuest && "ed"} PDF's</p>
        <MDBRow>
          {requirements.map((requirement, index) => (
            <MDBCol md="4" key={requirement}>
              <UploadPDF
                email={email}
                title={requirement}
                readOnly={!isGuest || isPublished}
              />
            </MDBCol>
          ))}
        </MDBRow>

        {!isGuest && remarks && (
          <MDBTypography
            className="mb-0"
            noteColor="danger"
            note
            noteTitle="Previous Remarks: "
          >
            {remarks}
          </MDBTypography>
        )}

        {isGuest && !isPublished && (
          <MDBBtn style={{ float: "right" }} color="primary" type="submit">
            {submitTxt}
          </MDBBtn>
        )}
        {!isGuest && (
          <div className="float-right">
            <MDBBtn
              onClick={() => handleReject(_id)}
              type="button"
              color="danger"
            >
              Reject
            </MDBBtn>
            <MDBBtn type="submit" color="success">
              Approve
            </MDBBtn>
          </div>
        )}
      </form>
    </MDBCardBody>
  );
}
