import React from "react";
import { MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow } from "mdbreact";
import AddressSelect from "../../../../../../components/addressSelect";

export default function Address() {
  return (
    <MDBCard>
      <MDBCardBody>
        <form>
          <MDBRow>
            <MDBCol>
              <AddressSelect
                label="Current address"
                address={{
                  region: "REGION III (CENTRAL LUZON)",
                  province: "NUEVA ECIJA",
                  city: "CABANATUAN CITY",
                  barangay: "",
                  zip: "",
                  street: "",
                }}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <MDBInput label="Sitio/Street Name" />
            </MDBCol>
            <MDBCol>
              <MDBInput label="Zip Code" />
            </MDBCol>
          </MDBRow>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
}
