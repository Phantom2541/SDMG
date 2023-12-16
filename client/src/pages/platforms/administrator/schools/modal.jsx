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
};

export default function Modal({ show, toggle, selected, willCreate }) {
  const { isLoading } = useSelector(({ schools }) => schools),
    { token } = useSelector(({ auth }) => auth),
    [form, setForm] = useState(_form),
    [address, setAddress] = useState(_form),
    { addToast } = useToasts(),
    dispatch = useDispatch();

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
    dispatch(
      SAVE({
        data: form,
        token,
      })
    );

    setForm(_form);
    toggle();
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
  // const handleCategory =()=>
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

          <label> Category</label>
          <MDBRow>
            <MDBCol md="4" className="mb-4">
              <MDBCard>
                <MDBCardHeader color="primary-color">
                  <MDBIcon fixed icon="chalkboard" className="mr-3" />
                  Elementary
                </MDBCardHeader>
                <MDBCardBody>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={handleValue("category")}
                      onClick={(e) => handleChange("category", "Pre")}
                      id="flexCheckChecked"
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      Pre Elementary
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={handleValue("category")}
                      onClick={(e) => handleChange("category", "Elem")}
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
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
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={handleValue("category")}
                      onClick={(e) => handleChange("category", "JHS")}
                      id="flexCheckChecked"
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      Junior
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={handleValue("category")}
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
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
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={handleValue("category")}
                      id="flexCheckChecked"
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      Under Graduate
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={handleValue("category")}
                      id="flexCheckChecked"
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      Masteral
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={handleValue("category")}
                      id="flexCheckChecked"
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      Doctorate
                    </label>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          <AddressSelect
            label="Campus Address"
            address={address}
            handleChange={(_, value) => setAddress(value)}
          />

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
