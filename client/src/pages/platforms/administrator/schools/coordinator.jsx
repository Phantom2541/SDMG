import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
} from "mdbreact";
import {
  COORDINATOR,
  UPDATE,
} from "../../../../services/redux/slices/resources/schools";
import CustomSelect from "../../../../components/customSelect";

// declare your expected items

export default function Coordinator({ show, toggle, selected }) {
  const { coordinators } = useSelector(({ schools }) => schools),
    { token } = useSelector(({ auth }) => auth),
    [ciD, setCId] = useState(""), // Coordinator Id
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(COORDINATOR({ token }));
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UPDATE({ data: { coordinator: ciD, school: selected }, token }));
    toggle();
  };
  return (
    <MDBModal isOpen={show} toggle={toggle} backdrop disableFocusTrap={false}>
      <MDBModalHeader
        toggle={toggle}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="user" className="mr-2" />
        Assign Coordinator
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <CustomSelect
            label={"Choose Coordinator"}
            choices={coordinators.map(({ fullName, _id }) => ({
              fullName:
                fullName.fname + " " + fullName.mname + " " + fullName.lname,
              value: _id,
            }))}
            texts={"fullName"}
            values={"value"}
            onChange={(id) => setCId(id)}
          />
          <div className="text-center">
            <MDBBtn color="primary" disabled={!ciD} type="submit">
              Submit
            </MDBBtn>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
