import React, { useState } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
  MDBBtn,
} from "mdbreact";
import CustomSelect from "../../../../../components/customSelect";

// declare your expected items
const _form = {
  keyDisable: "",
};

export default function Disable({ showDisable, toggle }) {
  const [form, setForm] = useState(_form);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const { keyDisable } = form;
  return (
    <MDBModal
      isOpen={showDisable}
      toggle={toggle}
      backdrop
      disableFocusTrap={false}
    >
      <MDBModalHeader
        toggle={toggle}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="user-slash" className="mr-2" />
        Employee Name
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form>
          <CustomSelect label="Choose a violation" />
          <div>
            <span></span>
            <MDBInput
              type="text"
              label='Please type "CONFIRM" to Proceed.'
              value={keyDisable}
              onChange={(e) => handleChange("keyDisable", e.target.value)}
              required
              outline
            />
          </div>
          <MDBBtn
            type="submit"
            color="primary"
            className="float-right"
            disabled={keyDisable !== "CONFIRM"}
          >
            Proceed
          </MDBBtn>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
