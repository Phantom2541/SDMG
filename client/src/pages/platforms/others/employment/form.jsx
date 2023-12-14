import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import React from "react";
import { Departments } from "../../../../services/fakeDb";

export default function Form({ form, handleChange, view = false }) {
  const { position, department, emergencyContact } = form,
    { primary, secondary } = emergencyContact;

  const isTeacher = position.includes("TEACHER");
  return (
    <>
      <div className="blue darken-3 px-5 py-2 text-white font-weight-bold h5-responsive">
        I. EMPLOYMENT INFORMATION
      </div>
      <MDBContainer className="px-5" fluid>
        <label className="mb-0 pb-0 mt-4">
          <b>Position {isTeacher && "& Department"}</b>
          &nbsp;-&nbsp;
          <i>Enter your Position {isTeacher && "& Department"} correctly</i>
        </label>
        <MDBRow>
          <MDBCol>
            {view ? (
              <>
                <h6 className="mb-0">Applying Postion:</h6>
                <h5 className="font-weight-bold">{position || <i>N/A</i>}</h5>
              </>
            ) : (
              <MDBInput
                required
                label="Applying Position"
                type="text"
                outline
                value={position}
                onChange={(e) =>
                  handleChange("position", e.target.value.toUpperCase())
                }
              />
            )}
          </MDBCol>
          {isTeacher && (
            <MDBCol>
              {view ? (
                <>
                  <h6 className="mb-0">Department:</h6>
                  <h5 className="font-weight-bold">
                    {department || <i>N/A</i>}
                  </h5>
                </>
              ) : (
                <>
                  <label className="mb-0">Department</label>
                  <select
                    className="form-control"
                    onChange={(e) => handleChange("department", e.target.value)}
                  >
                    {Departments.collections?.map(({ key, name }) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </MDBCol>
          )}
        </MDBRow>
      </MDBContainer>
      <div className="blue darken-3 px-5 py-2 text-white font-weight-bold h5-responsive">
        II. EMERGENCY CONTACT
      </div>
      <MDBContainer className="px-5" fluid>
        <label className="mb-0 pb-0 mt-4">
          <b>Primary & Secondary Information</b>
          &nbsp;-&nbsp;<i>Enter your Primary & Secondary Contact correctly</i>
        </label>
        <h6 className="mb-0 mt-3 font-weight-bold">Primary Contact</h6>
        <MDBRow>
          <MDBCol>
            {view ? (
              <>
                <h6 className="mb-0">Fullname:</h6>
                <h5 className="font-weight-bold">
                  {primary.name || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                required
                label="Fullname"
                type="text"
                outline
                value={primary.name}
                onChange={(e) =>
                  handleChange("emergencyContact", {
                    ...emergencyContact,
                    primary: { ...primary, name: e.target.value },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol>
            {view ? (
              <>
                <h6 className="mb-0">Relationship:</h6>
                <h5 className="font-weight-bold">
                  {primary.relationship || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                required
                label="Relationship"
                type="text"
                outline
                value={primary.relationship}
                onChange={(e) =>
                  handleChange("emergencyContact", {
                    ...emergencyContact,
                    primary: { ...primary, relationship: e.target.value },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol>
            {view ? (
              <>
                <h6 className="mb-0">Mobile No.:</h6>
                <h5 className="font-weight-bold">
                  {primary.mobile || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                required
                label="Mobile No. (+63)"
                type="text"
                maxLength={10}
                outline
                value={primary.mobile}
                onChange={(e) =>
                  handleChange("emergencyContact", {
                    ...emergencyContact,
                    primary: {
                      ...primary,
                      mobile: e.target.value.replace(/\D/g, ""),
                    },
                  })
                }
              />
            )}
          </MDBCol>
        </MDBRow>
        <h6 className="mb-0 mt-3 font-weight-bold">Secondary Contact</h6>
        <MDBRow>
          <MDBCol>
            {view ? (
              <>
                <h6 className="mb-0">Fullname:</h6>
                <h5 className="font-weight-bold">
                  {secondary.name || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Fullname"
                outline
                value={secondary.name}
                onChange={(e) =>
                  handleChange("emergencyContact", {
                    ...emergencyContact,
                    secondary: { ...secondary, name: e.target.value },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol>
            {view ? (
              <>
                <h6 className="mb-0">Relationship:</h6>
                <h5 className="font-weight-bold">
                  {secondary.relationship || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Relationship"
                type="text"
                outline
                value={secondary.relationship}
                onChange={(e) =>
                  handleChange("emergencyContact", {
                    ...emergencyContact,
                    secondary: { ...secondary, relationship: e.target.value },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol>
            {view ? (
              <>
                <h6 className="mb-0">Mobile No.:</h6>
                <h5 className="font-weight-bold">
                  {secondary.mobile || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Mobile No."
                type="text"
                outline
                maxLength={10}
                max={10}
                value={secondary.mobile}
                onChange={(e) =>
                  handleChange("emergencyContact", {
                    ...emergencyContact,
                    secondary: {
                      ...secondary,
                      mobile: e.target.value.replace(/\D/g, ""),
                    },
                  })
                }
              />
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
