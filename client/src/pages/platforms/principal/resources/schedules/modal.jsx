import React from "react";
import { MDBModal, MDBModalBody, MDBIcon, MDBModalHeader } from "mdbreact";

export default function Modal({ show, toggle }) {
  return (
    <MDBModal isOpen={show} toggle={toggle} backdrop disableFocusTrap={false}>
      <MDBModalHeader
        toggle={toggle}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="user" className="mr-2" />
        Create a Schedule
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form></form>
      </MDBModalBody>
    </MDBModal>
  );
}
