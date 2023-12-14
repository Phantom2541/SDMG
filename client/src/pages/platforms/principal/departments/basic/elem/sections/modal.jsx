import React, { useEffect, useState } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
  MDBBtn,
} from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../../../../../../components/customSelect";
import { fullName } from "../../../../../../../services/utilities";
import {
  SAVE,
  UPDATE,
} from "../../../../../../../services/redux/slices/resources/sections";
import { useToasts } from "react-toast-notifications";
import { isEqual } from "lodash";

const _form = {
  name: "",
  adviser: undefined,
};

export default function Modal({
  show,
  toggle,
  gradeLvl,
  department,
  selected,
  willCreate,
  course,
}) {
  const [form, setForm] = useState(_form),
    { collections } = useSelector(({ employments }) => employments),
    { isSuccess, message, employmentId } = useSelector(
      ({ sections }) => sections
    ),
    { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }
  }, [isSuccess, message, addToast, employmentId, dispatch]);

  useEffect(() => {
    if (!willCreate && selected._id) {
      setForm({
        adviser: selected?.adviser?._id,
        name: selected.name,
      });
    }
  }, [willCreate, selected]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { ...form, department, gradeLvl };

    if (course) data.course = course;

    if (!willCreate) {
      if (
        isEqual(form, {
          adviser: selected?.adviser?._id,
          name: selected.name,
        })
      ) {
        addToast("No changes found, skipping update.", {
          appearance: "info",
        });
      } else {
        dispatch(
          UPDATE({
            data: { ...data, _id: selected._id },
            token,
          })
        );
      }
    } else {
      dispatch(SAVE({ data, token }));
    }

    toggle();

    setForm(_form);
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleClose = () => {
    setForm(_form);
    toggle();
  };

  const { name, adviser } = form;

  return (
    <MDBModal isOpen={show} toggle={() => {}} backdrop>
      <MDBModalHeader
        toggle={handleClose}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="user" className="mr-2" />
        {!willCreate ? `Update ${name}` : "Add a Section"}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <MDBInput
            label="Name"
            type="text"
            value={name}
            onChange={(e) => handleChange("name", e.target.value.toUpperCase())}
          />
          <CustomSelect
            choices={collections?.map((c) => ({
              ...c,
              adviser: fullName(c.user),
            }))}
            texts="adviser"
            values="_id"
            label="Adviser"
            preValue={adviser}
            onChange={(e) => handleChange("adviser", e)}
          />
          <MDBBtn className="float-right" color="primary" type="submit">
            {!willCreate ? "Update" : "Submit"}
          </MDBBtn>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
