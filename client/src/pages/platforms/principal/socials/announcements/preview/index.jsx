import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
  // MDBBtn,
  MDBModal,
  MDBModalBody,
  // MDBIcon,
  MDBModalHeader,
  // MDBInput,
} from "mdbreact";
import Cards from "./card";

// declare your expected items
// const _form = {
//   name: "",
// };

export default function ModalPreview({ show, toggle, selected, willCreate }) {
  return (
    <MDBModal
      size="lg"
      isOpen={show}
      toggle={toggle}
      backdrop
      disableFocusTrap={false}
    >
      <MDBModalHeader
        toggle={toggle}
        className="light-blue darken-3 white-text"
      >
        Announcement Preview
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <Cards />
      </MDBModalBody>
    </MDBModal>
  );
}
