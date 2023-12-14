import React from "react";
import { MDBContainer } from "mdbreact";

export default function Agreement() {
  return (
    <>
      <div className="blue darken-3 px-5 py-2 text-white font-weight-bold h5-responsive text-center">
        COFIRMATION TO ALLOW THE STORAGE AND USE OF MY PERSONAL DATA
      </div>
      <MDBContainer className="px-5 m-3" fluid>
        <div className="form-check">
          <input required className="form-check-input" type="checkbox" id="1" />
          <label className="form-check-label" htmlFor="1">
            The information entered above is true and correct.
          </label>
        </div>
        <div className="form-check">
          <input required className="form-check-input" type="checkbox" id="2" />
          <label className="form-check-label" htmlFor="2">
            I have the full knowledge in providing the above information.
          </label>
        </div>
      </MDBContainer>
    </>
  );
}
