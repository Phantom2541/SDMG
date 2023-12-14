import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
} from "mdbreact";
import CustomSelect from "../../../../../components/customSelect";
import { Departments } from "../../../../../services/fakeDb";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE,
  UPDATE,
} from "../../../../../services/redux/slices/admissions/requirements";
import { isEqual } from "lodash";
import { useToasts } from "react-toast-notifications";

const _form = {
  title: "",
  department: "grade",
};

const { collections, getName } = Departments;

export default function Modal({ show, toggle, selected = null, willCreate }) {
  const [form, setForm] = useState(_form),
    { isLoading } = useSelector(({ requirements }) => requirements),
    { token } = useSelector(({ auth }) => auth),
    { addToast } = useToasts(),
    dispatch = useDispatch();

  useEffect(() => {
    if (!willCreate && selected._id) {
      setForm(selected);
    }
  }, [willCreate, selected]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      departmentName: getName(form.department),
    };

    if (willCreate) {
      dispatch(
        SAVE({
          data,
          token,
        })
      );
    } else {
      if (isEqual(form, selected)) {
        addToast("No changes found, skipping update.", {
          appearance: "info",
        });
      } else {
        dispatch(
          UPDATE({
            data,
            token,
          })
        );
      }
    }

    setForm(_form);
    toggle();
  };

  const handleClose = () => {
    setForm(_form);
    toggle();
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const { title, department } = form;

  return (
    <MDBModal isOpen={show} toggle={toggle} backdrop disableFocusTrap={false}>
      <MDBModalHeader
        toggle={handleClose}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="user" className="mr-2" />
        {willCreate ? "Add" : "Update"} {selected.title || "a Requirement"}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <CustomSelect
            choices={collections}
            label="Department"
            preValue={department}
            values="key"
            texts="name"
            onChange={(e) => handleChange("department", e)}
          />

          <MDBInput
            type="text"
            label="Title"
            required
            value={title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <MDBBtn
            disabled={isLoading}
            type="submit"
            color="primary"
            className="mb-2 float-right"
          >
            {willCreate ? "Submit" : "Update"}
          </MDBBtn>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
