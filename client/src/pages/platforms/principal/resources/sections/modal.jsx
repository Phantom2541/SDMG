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
import CustomSelect from "../../../../../components/customSelect";
import { Departments } from "../../../../../services/fakeDb";
import { formatGradeLvl } from "../../../../../services/utilities";

const _form = {
  name: "",
  gradeLvl: 1,
  department: "grade",
  advisor: "",
};
const { collections, getGradeLevels } = Departments;

export default function Modal({ show, toggle, selected, willCreate }) {
  const [form, setForm] = useState(_form),
    { token } = useSelector(({ auth }) => auth),
    [showGrade, setShowGrade] = useState(true),
    // { isLoading } = useSelector(({ rooms }) => rooms),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if (!willCreate && selected._id) {
      setForm(selected);
    }
  }, [willCreate, selected]);

  // used for rerendering MDBSelect
  useEffect(() => {
    if (!showGrade) {
      setTimeout(() => setShowGrade(true), 1);
    }
  }, [showGrade]);

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
      console.log(form);
    }

    setForm(_form);
    toggle();
  };

  const handleClose = () => {
    setForm(_form);
    toggle();
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const { name, gradeLvl, department, advisor } = form;
  return (
    <MDBModal isOpen={show} toggle={toggle} backdrop disableFocusTrap={false}>
      <MDBModalHeader
        toggle={handleClose}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="user" className="mr-2" />
        {!willCreate ? "Update" : "Create"} a Section
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <MDBRow>
            <MDBCol>
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
          </MDBRow>
          <div className="row">
            <div className="col-6">
              <CustomSelect
                choices={collections}
                label="Department"
                preValue={department}
                values="key"
                texts="name"
                onChange={(e) => {
                  setForm({
                    ...form,
                    department: e,
                    gradeLvl: getGradeLevels(e)[0],
                  });
                  setShowGrade(false);
                }}
              />
            </div>
            <div className="col-6">
              {showGrade && (
                <CustomSelect
                  choices={getGradeLevels(department).map((id) => ({
                    id,
                    str: formatGradeLvl(department, id),
                  }))}
                  label="Grade Level"
                  preValue={gradeLvl}
                  values="id"
                  texts="str"
                  onChange={(e) => handleChange("gradeLvl", e)}
                />
              )}
            </div>
          </div>
          <MDBInput
            type="text"
            label="Advisor"
            value={advisor}
            onChange={(e) => handleChange("advisor", e.target.value)}
          />

          <div className="text-center mb-1-half">
            <MDBBtn
              type="submit"
              //   disabled={isLoading}
              color="primary"
              className="mb-2 float-right"
            >
              Submit
            </MDBBtn>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
