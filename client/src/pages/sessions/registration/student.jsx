import React from "react";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import { formatMobile } from "../../../services/utilities";

export default function Student({ handleChange, form, view = false }) {
  const { lrn, psa, indigenousPeople, "4ps": fourPs, guardians } = form,
    { mother, father } = guardians;

  return (
    <>
      <div className="blue darken-3 px-5 py-2 text-white font-weight-bold h5-responsive">
        IV. STUDENT ADDITIONAL INFORMATION
      </div>
      <MDBContainer className="px-5" fluid>
        <label className="mb-0 pb-0 mt-4">
          <b>LRN & PSA</b>
          {!view && (
            <>
              &nbsp;-&nbsp;<i>Enter your LRN & PSA correctly</i>
            </>
          )}
        </label>
        <MDBRow className={`${view && "pt-2"}`}>
          <MDBCol className="px-1" md="5">
            {view ? (
              <>
                <h6 className="mb-0">Learners Reference Number (LRN): </h6>
                <h5 className="font-weight-bold">{lrn}</h5>
              </>
            ) : (
              <MDBInput
                label="Learner Reference No. (LRN)"
                type="string"
                required
                value={lrn}
                outline
                onChange={(e) => handleChange("lrn", e.target.value)}
              />
            )}
          </MDBCol>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">PSA Birth Certificate Number: </h6>
                <h5 className="font-weight-bold">{psa}</h5>
              </>
            ) : (
              <MDBInput
                label="PSA Birth Certificate No. (if available upon registration)"
                value={psa}
                outline
                onChange={(e) => handleChange("psa", e.target.value)}
              />
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow className={`${view && "pt-2"}`}>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Indigenous or Cultural Community: </h6>
                <h5 className="font-weight-bold">
                  {indigenousPeople || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Are you part of any Indigenous or Cultural Community?"
                type="text"
                outline
                value={indigenousPeople}
                onChange={(e) =>
                  handleChange("indigenousPeople", e.target.value)
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">4ps Household ID: </h6>
                <h5 className="font-weight-bold">{fourPs || <i>N/A</i>}</h5>
              </>
            ) : (
              <MDBInput
                label="Are you a beneficiary of 4Ps?"
                type="text"
                outline
                value={fourPs}
                onChange={(e) => handleChange("4ps", e.target.value)}
              />
            )}
          </MDBCol>
        </MDBRow>

        <b>Mother's Maiden Information</b>
        <MDBRow className={`${view && "pt-2"}`}>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">First name: </h6>
                <h5 className="font-weight-bold">
                  {mother?.fname || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="First name"
                type="text"
                outline
                value={mother?.fname}
                onChange={(e) =>
                  handleChange("guardians", {
                    ...guardians,
                    mother: { ...mother, fname: e.target.value.toUpperCase() },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Middle name: </h6>
                <h5 className="font-weight-bold">
                  {mother?.mname || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Middle name"
                type="text"
                outline
                value={mother?.mname}
                onChange={(e) =>
                  handleChange("guardians", {
                    ...guardians,
                    mother: { ...mother, mname: e.target.value.toUpperCase() },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Last name: </h6>
                <h5 className="font-weight-bold">
                  {mother?.lname || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Last name"
                type="text"
                outline
                value={mother?.lname}
                onChange={(e) =>
                  handleChange("guardians", {
                    ...guardians,
                    mother: { ...mother, lname: e.target.value.toUpperCase() },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Suffix: </h6>
                <h5 className="font-weight-bold">
                  {mother?.suffix || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Suffix"
                type="text"
                outline
                value={mother?.suffix}
                onChange={(e) =>
                  handleChange("guardians", {
                    ...guardians,
                    mother: { ...mother, suffix: e.target.value.toUpperCase() },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Mobile: </h6>
                <h5 className="font-weight-bold">
                  {mother?.mobile ? formatMobile(mother.mobile) : <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Mobile No. (+63)"
                maxLength={10}
                outline
                value={mother?.mobile}
                onChange={(e) =>
                  handleChange("guardians", {
                    ...guardians,
                    mother: {
                      ...mother,
                      mobile: e.target.value.replace(/\D/g, ""),
                    },
                  })
                }
              />
            )}
          </MDBCol>
        </MDBRow>

        <b>Father's Information</b>
        <MDBRow className={`${view && "pt-2"}`}>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">First name: </h6>
                <h5 className="font-weight-bold">
                  {father?.fname || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="First name"
                type="text"
                outline
                value={father?.fname}
                onChange={(e) =>
                  handleChange("guardians", {
                    ...guardians,
                    father: { ...father, fname: e.target.value.toUpperCase() },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Middle name: </h6>
                <h5 className="font-weight-bold">
                  {father?.mname || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Middle name"
                type="text"
                outline
                value={father?.mname}
                onChange={(e) =>
                  handleChange("guardians", {
                    ...guardians,
                    father: { ...father, mname: e.target.value.toUpperCase() },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Last name: </h6>
                <h5 className="font-weight-bold">
                  {father?.lname || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Last name"
                type="text"
                outline
                value={father?.lname}
                onChange={(e) =>
                  handleChange("guardians", {
                    ...guardians,
                    father: { ...father, lname: e.target.value.toUpperCase() },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Suffix: </h6>
                <h5 className="font-weight-bold">
                  {father?.suffix || <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Suffix"
                type="text"
                outline
                maxLength={10}
                value={father?.suffix}
                onChange={(e) =>
                  handleChange("guardians", {
                    ...guardians,
                    father: { ...father, suffix: e.target.value.toUpperCase() },
                  })
                }
              />
            )}
          </MDBCol>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Mobile: </h6>
                <h5 className="font-weight-bold">
                  {father?.mobile ? formatMobile(father.mobile) : <i>N/A</i>}
                </h5>
              </>
            ) : (
              <MDBInput
                label="Mobile No. (+63)"
                maxLength={10}
                outline
                value={father?.mobile}
                onChange={(e) =>
                  handleChange("guardians", {
                    ...guardians,
                    father: {
                      ...father,
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
