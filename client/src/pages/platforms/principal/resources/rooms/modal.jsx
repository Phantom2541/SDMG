import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdbreact";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE,
  UPDATE,
} from "../../../../../services/redux/slices/resources/rooms";
import { isEqual } from "lodash";

const _form = {
  name: "",
  description: "",
  capacity: 1,
};

export default function Modal({ show, toggle, selected, willCreate }) {
  const [form, setForm] = useState(_form),
    { token } = useSelector(({ auth }) => auth),
    { isLoading } = useSelector(({ rooms }) => rooms),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if (!willCreate && selected._id) {
      setForm(selected);
    }
  }, [willCreate, selected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!willCreate) {
      if (isEqual(form, selected)) {
        addToast("No changes found, skipping update.", {
          appearance: "info",
        });
      } else {
        dispatch(
          UPDATE({
            data: form,
            token,
          })
        );
      }
    } else {
      dispatch(SAVE({ data: form, token }));
    }

    setForm(_form);
    toggle();
  };

  const handleClose = () => {
    setForm(_form);
    toggle();
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const { name, description, capacity } = form;

  return (
    <MDBModal isOpen={show} toggle={toggle} backdrop disableFocusTrap={false}>
      <MDBModalHeader
        toggle={handleClose}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="user" className="mr-2" />
        {!willCreate ? "Update" : "Create"} a Room
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <MDBRow>
            <MDBCol md="8">
              <MDBInput
                type="text"
                label="Name"
                value={name}
                onChange={(e) =>
                  handleChange("name", e.target.value.toUpperCase())
                }
                required
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                type="number"
                min={1}
                label="Capacity"
                value={capacity}
                onChange={(e) =>
                  handleChange("capacity", Number(e.target.value))
                }
              />
            </MDBCol>
          </MDBRow>

          <MDBInput
            type="textarea"
            label="Description and Landmark"
            value={description}
            rows={3}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <div className="text-center mb-1-half">
            <MDBBtn
              type="submit"
              disabled={isLoading}
              color="primary"
              className="mb-2 float-right"
            >
              {!willCreate ? "Update" : "Submit"}
            </MDBBtn>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
