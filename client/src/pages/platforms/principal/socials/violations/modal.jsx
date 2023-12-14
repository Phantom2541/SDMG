import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
} from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { SAVE, UPDATE } from "../../../../../services/redux/slices/violations";
import { useToasts } from "react-toast-notifications";
import { isEqual } from "lodash";

const _form = {
  title: "",
  description: "",
};

export default function Modal({ show, toggle, willCreate, selected }) {
  const [form, setForm] = useState(_form),
    { token, auth } = useSelector(({ auth }) => auth),
    { isLoading } = useSelector(({ violations }) => violations),
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
      dispatch(SAVE({ data: { ...form, createdBy: auth._id }, token }));
    }

    setForm(_form);
    toggle();
  };

  const handleClose = () => {
    setForm(_form);
    toggle();
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const { title, description } = form;

  return (
    <MDBModal isOpen={show} toggle={toggle} backdrop disableFocusTrap={false}>
      <MDBModalHeader
        toggle={handleClose}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="user" className="mr-2" />
        {!willCreate ? "Update" : "Create"} a Violation
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <MDBInput
            type="text"
            label="Title"
            value={title}
            onChange={(e) =>
              handleChange("title", e.target.value.toUpperCase())
            }
            required
          />

          <MDBInput
            type="textarea"
            label="Description"
            value={description}
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
