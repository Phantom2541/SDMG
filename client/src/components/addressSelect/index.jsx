import React from "react";
import { MDBRow, MDBCol, MDBInput } from "mdbreact";
import { Philippines } from "../../services/fakeDb";

export default function AddressSelect({
  handleChange = () => {},
  address = {},
  size = "3",
  label = "Address Information",
  view = false,
}) {
  const handleAddress = (key, value) => {
    const _address = { ...address };

    switch (key) {
      case "region":
        _address.region = value;
        _address.province = Philippines.initialProvince(value);
        _address.city = Philippines.initialCity(_address.province);
        break;

      case "province":
        _address.province = value;
        const cityCode = Philippines.initialCity(value);
        _address.city = cityCode;
        break;

      default:
        _address[key] = value;
        break;
    }

    handleChange("address", _address);
  };

  const {
    region = "REGION III (CENTRAL LUZON)",
    province = "NUEVA ECIJA",
    city = "CABANATUAN CITY",
    barangay = "",
    zip = "",
    street = "",
  } = address;

  return (
    <>
      <h6>
        <b>{label}</b>
      </h6>
      <MDBRow className={`${view && "pt-2"}`}>
        <MDBCol md={size} className="px-1">
          {view ? (
            <>
              <h6 className="mb-0">Region:</h6>
              <h5 className="font-weight-bold">{region}</h5>
            </>
          ) : (
            <>
              <label className="mb-0">Region</label>
              <select
                value={region}
                onChange={(e) => handleAddress("region", e.target.value)}
                className="form-control"
              >
                {Philippines.Regions.map(({ name, code }) => (
                  <option key={code} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </>
          )}
        </MDBCol>
        <MDBCol md={size} className="px-1">
          {view ? (
            <>
              <h6 className="mb-0">Province:</h6>
              <h5 className="font-weight-bold">{province}</h5>
            </>
          ) : (
            <>
              <label className="mb-0">Province</label>
              <select
                value={province}
                onChange={(e) => handleAddress("province", e.target.value)}
                className="form-control"
              >
                {Philippines.Provinces(region).map(({ name, code }) => (
                  <option key={code} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </>
          )}
        </MDBCol>
        <MDBCol md={size} className="px-1">
          {view ? (
            <>
              <h6 className="mb-0">City/Municipality:</h6>
              <h5 className="font-weight-bold">{city}</h5>
            </>
          ) : (
            <>
              <label className="mb-0">City/Municipality</label>
              <select
                value={city}
                onChange={(e) => handleAddress("city", e.target.value)}
                className="form-control"
              >
                {Philippines.Cities(province).map(({ name, code }) => (
                  <option key={code} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </>
          )}
        </MDBCol>
        <MDBCol md={size} className="px-1">
          {view ? (
            <>
              <h6 className="mb-0">Barangay:</h6>
              <h5 className="font-weight-bold">{barangay || <i>N/A</i>}</h5>
            </>
          ) : (
            <>
              <label className="mb-0">City/Municipality</label>
              <select
                value={barangay}
                onChange={(e) => handleAddress("barangay", e.target.value)}
                className="form-control"
              >
                <option>???</option>
                {Philippines.Barangays(city).map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </>
          )}
        </MDBCol>
      </MDBRow>
      <MDBRow className={`${view && "pt-2"}`}>
        <MDBCol md="8" className="px-1">
          {view ? (
            <>
              <h6 className="mb-0">Street:</h6>
              <h5 className="font-weight-bold">{street || <i>N/A</i>}</h5>
            </>
          ) : (
            <MDBInput
              type="text"
              label="Street Name"
              value={street}
              outline
              onChange={(e) => handleAddress("street", e.target.value)}
            />
          )}
        </MDBCol>
        <MDBCol md="4" className="px-1">
          {view ? (
            <>
              <h6 className="mb-0">Zip Code:</h6>
              <h5 className="font-weight-bold">{zip || <i>N/A</i>}</h5>
            </>
          ) : (
            <MDBInput
              type="number"
              label="Zip Code"
              value={String(zip)}
              outline
              onChange={(e) => handleAddress("zip", Number(e.target.value))}
            />
          )}
        </MDBCol>
      </MDBRow>
    </>
  );
}
