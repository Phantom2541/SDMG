import React from "react";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import { capitalize } from "../../../services/utilities";

export default function Employee({ handleChange, form, view = false }) {
  const { civilStatus = "single", position } = form;

  return (
    <>
      <div className="blue darken-3 px-5 py-2 text-white font-weight-bold h5-responsive">
        IV. EMPLOYEE ADDITIONAL INFORMATION
      </div>
      <MDBContainer className="px-5" fluid>
        <label className="mb-0 pb-0 my-3">
          <b>Civil Status & Applying Position</b>
          {!view && (
            <>
              &nbsp;-&nbsp;
              <i>Provide these informations</i>
            </>
          )}
        </label>
        <MDBRow>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Civil Status: </h6>
                <h5 className="font-weight-bold text-uppercase">
                  {civilStatus}
                </h5>
              </>
            ) : (
              <>
                <label className="mb-0">Civil Status</label>
                <select
                  value={civilStatus}
                  onChange={(e) => handleChange("civilStatus", e.target.value)}
                  className="form-control"
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                  <option value="separated">Separated</option>
                  <option value="annulled">Annulled</option>
                </select>
              </>
            )}
          </MDBCol>
          <MDBCol className="px-1">
            {view ? (
              <>
                <h6 className="mb-0">Applying Position: </h6>
                <h5 className="font-weight-bold">{capitalize(position)}</h5>
              </>
            ) : (
              <MDBInput
                label="Applying Position"
                type="text"
                required
                value={position}
                outline
                onChange={(e) => handleChange("position", e.target.value)}
              />
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
