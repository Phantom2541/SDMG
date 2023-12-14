import React, { useEffect, useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBView,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
  MDBSpinner,
} from "mdbreact";
import AddressSelect from "../addressSelect";
import { useDispatch, useSelector } from "react-redux";
import { RESET, UPDATE } from "../../services/redux/slices/auth";
import { useToasts } from "react-toast-notifications";
import { isEqual } from "lodash";

export default function Account({ setView }) {
  const { auth, token, isSuccess, role } = useSelector(({ auth }) => auth),
    [address, setAddress] = useState({
      region: "REGION III (CENTRAL LUZON)",
      province: "NUEVA ECIJA",
      city: "CABANATUAN CITY",
      barangay: "",
      zip: "",
      street: "",
    }),
    [form, setForm] = useState({
      fullName: {
        fname: "",
        mname: "",
        lname: "",
        suffix: "",
      },
      dob: "",
      mobile: "",
      isMale: false,
    }),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if (auth._id && isSuccess) {
      addToast("Account Updated Successfully", {
        appearance: "success",
      });
      dispatch(RESET());
    }
  }, [auth, isSuccess, dispatch, addToast]);

  useEffect(() => {
    if (auth._id) {
      if (auth.address.region) setAddress(auth.address);
      setTimeout(() => setForm(auth), 1000);
    }
  }, [auth]);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      address,
      role: undefined,
      email: undefined,
      isActive: undefined,
      updatedAt: undefined,
      createdAt: undefined,
    };

    const _auth = {
      ...auth,
      role: undefined,
      email: undefined,
      isActive: undefined,
      updatedAt: undefined,
      createdAt: undefined,
    };

    if (isEqual(data, _auth))
      return addToast("No changes found, skipping update.", {
        appearance: "info",
      });

    dispatch(
      UPDATE({
        data,
        token,
      })
    );
  };

  return (
    <>
      <MDBView cascade className="mdb-color lighten-3 card-header">
        <h5 className="mb-0 font-weight-bold text-center text-white">
          Account Details
        </h5>
      </MDBView>

      <MDBCardBody>
        {form._id ? (
          <form onSubmit={handleSubmit}>
            <MDBRow>
              <MDBCol md="4" className="pr-0">
                <MDBInput
                  type="text"
                  value={form.fullName?.fname}
                  onChange={(e) =>
                    handleChange("fullName", {
                      ...form.fullName,
                      fname: e.target.value.toUpperCase(),
                    })
                  }
                  label="First name"
                  required
                />
              </MDBCol>
              <MDBCol md="3" className="px-0">
                <MDBInput
                  type="text"
                  value={form.fullName?.mname}
                  onChange={(e) =>
                    handleChange("fullName", {
                      ...form.fullName,
                      mname: e.target.value.toUpperCase(),
                    })
                  }
                  label="Middle name"
                />
              </MDBCol>
              <MDBCol md="4" className="px-0">
                <MDBInput
                  type="text"
                  value={form.fullName?.lname}
                  onChange={(e) =>
                    handleChange("fullName", {
                      ...form.fullName,
                      lname: e.target.value.toUpperCase(),
                    })
                  }
                  label="Last name"
                  required
                />
              </MDBCol>
              <MDBCol md="1" style={{ paddingTop: "2px" }} className="pl-0">
                <MDBSelect
                  className="colorful-select dropdown-primary hidden-md-down text-left"
                  label="Suffix"
                  getValue={(e) =>
                    handleChange("fullName", {
                      ...form.fullName,
                      suffix: e[0] === "N/A" ? "" : e[0],
                    })
                  }
                >
                  <MDBSelectInput />
                  <MDBSelectOptions>
                    <MDBSelectOption
                      selected={!form.fullName.suffix}
                      value="N/A"
                    >
                      N/A
                    </MDBSelectOption>
                    <MDBSelectOption
                      selected={form.fullName.suffix === "JR"}
                      value="JR"
                    >
                      JR
                    </MDBSelectOption>
                    <MDBSelectOption
                      selected={form.fullName.suffix === "III"}
                      value="III"
                    >
                      III
                    </MDBSelectOption>
                    <MDBSelectOption
                      selected={form.fullName.suffix === "IV"}
                      value="IV"
                    >
                      IV
                    </MDBSelectOption>
                    <MDBSelectOption
                      selected={form.fullName.suffix === "V"}
                      value="V"
                    >
                      V
                    </MDBSelectOption>
                    <MDBSelectOption
                      selected={form.fullName.suffix === "SR"}
                      value="SR"
                    >
                      SR
                    </MDBSelectOption>
                  </MDBSelectOptions>
                </MDBSelect>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="4">
                <MDBInput
                  type="date"
                  value={form.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  required
                  label="Birthdate"
                />
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  type="text"
                  value={form.mobile}
                  onChange={(e) =>
                    handleChange("mobile", e.target.value.replace(/\D/g, ""))
                  }
                  required
                  label="Mobile (+63)"
                  maxLength={10}
                />
              </MDBCol>

              <MDBCol md="4">
                <MDBSelect
                  className="colorful-select dropdown-primary hidden-md-down text-left"
                  label="Gender"
                  getValue={(e) => handleChange("isMale", e[0] === "true")}
                >
                  <MDBSelectInput />
                  <MDBSelectOptions>
                    <MDBSelectOption selected={form.isMale} value="true">
                      Male
                    </MDBSelectOption>
                    <MDBSelectOption selected={!form.isMale} value="false">
                      Female
                    </MDBSelectOption>
                  </MDBSelectOptions>
                </MDBSelect>
              </MDBCol>
            </MDBRow>
            <AddressSelect
              label="Current Address"
              address={address}
              handleChange={(_, value) => setAddress(value)}
            />
            <MDBRow>
              <MDBCol size="8">
                <MDBInput
                  type="text"
                  label="Street"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  type="number"
                  label="Zip Code"
                  value={address.zip}
                  onChange={(e) =>
                    setAddress({ ...address, zip: e.target.value })
                  }
                />
              </MDBCol>
            </MDBRow>
            <div
              className={
                role === "GUEST"
                  ? "d-flex justify-content-between"
                  : "text-center"
              }
            >
              {role === "GUEST" && (
                <MDBBtn
                  onClick={() => {
                    if (!auth.dob)
                      return addToast(
                        "Please complete your Account Details first.",
                        {
                          appearance: "info",
                        }
                      );

                    setView("enrollment");
                  }}
                  type="button"
                  color="primary"
                  rounded
                >
                  Enrollment form
                </MDBBtn>
              )}

              <MDBBtn color="info" type="submit" rounded>
                Update account
              </MDBBtn>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <MDBSpinner />
          </div>
        )}
      </MDBCardBody>
    </>
  );
}
