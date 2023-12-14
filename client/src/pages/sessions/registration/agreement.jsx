import { MDBContainer } from "mdbreact";
import React from "react";

export default function Agreement({ School }) {
  const { abbreviation, name } = School;
  return (
    <>
      <div className="blue darken-3 px-5 py-2 text-white text-center font-weight-bold h5-responsive">
        CONFIRMATION TO ALLOW THE STORAGE AND USE OF MY PERSONAL DATA
      </div>
      <MDBContainer className="mt-3 px-5" fluid>
        <h3>This is to certify that</h3>
        <div className="form-check">
          <input required className="form-check-input" type="checkbox" id="1" />
          <label className="form-check-label" htmlFor="1">
            The information entered above is true and correct.
          </label>
        </div>
        <div className="form-check">
          <input required className="form-check-input" type="checkbox" id="2" />
          <label className="form-check-label" htmlFor="2">
            I have the full knowledge in prividing the above information.
          </label>
        </div>
        <div className="form-check">
          <input required className="form-check-input" type="checkbox" id="3" />
          <label className="form-check-label" htmlFor="3">
            I understand the purpose of enrolling myself in the registry of the
            &nbsp;<b>{name}</b>
          </label>
        </div>
        <div className="form-check">
          <input required className="form-check-input" type="checkbox" id="4" />
          <label className="form-check-label" htmlFor="4">
            I have personally given my consent to allow the use of the
            information contained in this form.
          </label>
        </div>
        <div className="form-check">
          <input required className="form-check-input" type="checkbox" id="5" />
          <label className="form-check-label" htmlFor="5">
            I understand that this form containes my personal information to be
            stored in the <b>{abbreviation}</b> database.
          </label>
        </div>
      </MDBContainer>
    </>
  );
}
