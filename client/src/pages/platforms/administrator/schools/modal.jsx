import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
} from "mdbreact";
import {
  SAVE,
  UPDATE,
} from "../../../../services/redux/slices/resources/schools";
import { isEqual } from "lodash";
import { useToasts } from "react-toast-notifications";
import AddressSelect from "../../../../components/addressSelect";
// declare your expected items
const _form = {
  name: "",
  id: "",
  abbreviation: "",
  address: {
    region: "REGION III (CENTRAL LUZON)",
    province: "NUEVA ECIJA",
    city: "CABANATUAN CITY",
    barangay: undefined,
    street: "",
    zip: "",
  },
};

export default function Modal({ show, toggle, selected, willCreate }) {
  const { isLoading } = useSelector(({ schools }) => schools),
    { token } = useSelector(({ auth }) => auth),
    [form, setForm] = useState(_form),
    { addToast } = useToasts(),
    dispatch = useDispatch();

  const [checkedItems, setCheckedItems] = useState([]);

  const handleUpdate = () => {
    toggle();

    // check if object has changed
    if (isEqual(form, selected))
      return addToast("No changes found, skipping update.", {
        appearance: "info",
      });

    dispatch(
      UPDATE({
        data: { ...form, _id: selected._id },
        token,
      })
    );

    setForm(_form);
  };

  const handleCreate = () => {
    toggle();

    const category = Object.entries(checkedItems)
      .filter(([_, value]) => value === true)
      .map((entrty) => entrty[0]);
    dispatch(
      SAVE({
        data: { ...form, category },
        token,
      })
    );
    setForm(_form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (willCreate) {
      return handleCreate();
    }

    handleUpdate();
  };

  // use for direct values like strings and numbers
  const handleValue = (key) =>
    willCreate ? form[key] : form[key] || selected[key];

  const handleChange = (key, value) => setForm({ ...form, [key]: value });
  // State to manage the checked status of multiple checkboxes

  // Function to handle checkbox change
  const handleCheckboxChange = (itemName) => {
    setCheckedItems((prevCheckedItems) => {
      console.log("collection", prevCheckedItems);
      return {
        ...prevCheckedItems,
        [itemName]: !prevCheckedItems[itemName],
      };
    });
  };

  return (
    <MDBModal
      size="xl"
      isOpen={show}
      toggle={toggle}
      backdrop
      disableFocusTrap={false}
    >
      <MDBModalHeader
        toggle={toggle}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="user" className="mr-2" />
        {willCreate ? "Create" : "Update"}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <MDBInput
            type="text"
            label="School ID"
            value={handleValue("id")}
            onChange={(e) => handleChange("id", e.target.value)}
            required
            icon="user-shield"
          />
          <MDBInput
            type="text"
            label="Name"
            value={handleValue("name")}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            icon="user-shield"
          />
          <MDBInput
            type="text"
            label="Abbreviation"
            value={handleValue("abbreviation")}
            onChange={(e) => handleChange("abbreviation", e.target.value)}
            required
            icon="user-shield"
          />
          <label>
            <b>Category :</b>
            {Object.keys(checkedItems)
              .filter((key) => checkedItems[key])
              .join(", ")}
          </label>
          <MDBRow>
            <MDBCol md="4" className="mb-4">
              <MDBCard>
                <MDBCardHeader color="primary-color">
                  <MDBIcon fixed icon="chalkboard" className="mr-3" />
                  Elementary
                </MDBCardHeader>
                <MDBCardBody>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={checkedItems["prep"] || false}
                      onChange={() => handleCheckboxChange("prep")}
                      id="prep"
                    />
                    <label className="form-check-label" htmlFor="prep">
                      Pre Elementary
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={checkedItems["elem"] || false}
                      onChange={() => handleCheckboxChange("elem")}
                      id="elem"
                    />
                    <label className="form-check-label" htmlFor="elem">
                      Elementary
                    </label>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="4" className="mb-4">
              <MDBCard>
                <MDBCardHeader color="secondary-color">
                  <MDBIcon fixed icon="chalkboard" className="mr-3" />
                  High School
                </MDBCardHeader>
                <MDBCardBody>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={checkedItems["jhs"] || false}
                      onChange={() => handleCheckboxChange("jhs")}
                      id="jhs"
                    />
                    <label className="form-check-label" htmlFor="jhs">
                      Junior
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={checkedItems["shs"] || false}
                      onChange={() => handleCheckboxChange("shs")}
                      id="shs"
                    />
                    <label className="form-check-label" htmlFor="shs">
                      Senior
                    </label>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="4" className="mb-4">
              <MDBCard>
                <MDBCardHeader color="success-color">
                  <MDBIcon fixed icon="chalkboard" className="mr-3" />
                  College
                </MDBCardHeader>
                <MDBCardBody>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={checkedItems["college"] || false}
                      onChange={() => handleCheckboxChange("college")}
                      id="college"
                    />
                    <label className="form-check-label" htmlFor="college">
                      Under Graduate
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={checkedItems["masteral"] || false}
                      onChange={() => handleCheckboxChange("masteral")}
                      id="masteral"
                    />
                    <label className="form-check-label" htmlFor="masteral">
                      Masteral
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={checkedItems["doctorate"] || false}
                      onChange={() => handleCheckboxChange("doctorate")}
                      id="doctorate"
                    />
                    <label className="form-check-label" htmlFor="doctorate">
                      Doctorate
                    </label>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <AddressSelect
            label="Campus Area"
            address={form["address"]}
            handleChange={(_, address) => handleChange("address", address)}
          />
          {/* <AddressSelect
            label="Campus Address"
            address={address}
            handleChange={(_, value) => {
              console.log(value);
            }}
          /> */}

          <div className="text-center mb-1-half">
            <MDBBtn
              type="submit"
              disabled={isLoading}
              color="info"
              className="mb-2"
              rounded
            >
              {willCreate ? "submit" : "update"}
            </MDBBtn>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
