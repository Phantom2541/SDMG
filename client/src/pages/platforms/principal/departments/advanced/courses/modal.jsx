import React, { useState } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdbreact";
import CustomSelect from "../../../../../../components/customSelect";
import { Courses } from "../../../../../../services/fakeDb";
import { useDispatch, useSelector } from "react-redux";
import { SAVE } from "../../../../../../services/redux/slices/resources/courses";

const _form = {
  pk: undefined,
  degreeProgram: undefined,
};

export default function Modal({ show, toggle, departmentKey }) {
  const [form, setForm] = useState(_form),
    { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const { abbreviation = "Choose a Course" } = Courses.find(form.pk);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE({ data: { ...form, department: departmentKey }, token }));
    setForm(_form);
    toggle();
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  return (
    <MDBModal isOpen={show} toggle={() => {}} backdrop>
      <MDBModalHeader
        toggle={toggle}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="user" className="mr-2" />
        Add a Course
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <CustomSelect
            label="Course"
            choices={Courses[departmentKey]}
            texts="name"
            values="id"
            onChange={(pk) => handleChange("pk", pk)}
          />
          <MDBRow>
            <MDBCol>
              <MDBInput label="Abbrevation" readOnly value={abbreviation} />
            </MDBCol>
            {departmentKey === "college" && (
              <MDBCol>
                <MDBInput type="number" label="Degree Program" />
              </MDBCol>
            )}
          </MDBRow>
          <MDBBtn className="float-right" color="primary" type="submit">
            Submit
          </MDBBtn>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
