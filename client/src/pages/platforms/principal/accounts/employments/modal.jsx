import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBIcon, MDBModalHeader } from "mdbreact";
// import EmploymentForm from "../../../guest/employment/form";
import Swal from "sweetalert2";
import { Departments, Roles } from "../../../../../services/fakeDb";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../../../../../services/redux/slices/admissions/employments";

const TEACHERS = ["HEAD", "MASTER", "TEACHER"];

export default function Modal({ show, toggle, selected }) {
  const [form, setForm] = useState({}),
    { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  useEffect(() => {
    if (show && selected?._id) {
      setForm(selected);
    }
  }, [selected, show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { position, access, department, _id } = form,
      employment = { position, access, department, status: "approved", _id },
      _access = Roles.getStr(access);

    if (TEACHERS.includes(access) && !department)
      return Swal.fire({
        title: "Invalid Parameters",
        icon: "error",
        html: `A department is required for <b>${_access}</b> access`,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });

    let html = `You are about to provide <b>${
      department && TEACHERS.includes(access)
        ? `${Departments.getName(department)} `
        : ""
    }${_access}</b> access and <b>${position}</b> position`;

    Swal.fire({
      focusDeny: true,
      icon: "question",
      title: "Are you sure?",
      html,
      footer: "This action is irreversible.",
      confirmButtonText: `<span class="text-dark">Cancel</span>`,
      confirmButtonColor: "#fff",

      showDenyButton: true,
      denyButtonText: `Proceed`,
      denyButtonColor: "#3B71CA",
    }).then((res) => {
      if (res.isDenied) {
        dispatch(
          UPDATE({
            data: {
              employment,
            },
            token,
          })
        );
        setForm({});
        toggle();
      } else {
        Swal.fire({
          title: "Changes are not Saved!",
          icon: "warning",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      }
    });
  };

  const handleReject = async (_id) => {
    const { value: remarks } = await Swal.fire({
      icon: "question",
      title: "Reject this person?",
      input: "textarea",
      inputLabel: "Please specify your reason.",
      inputPlaceholder: "Write a reason for rejection...",
      showCancelButton: true,
      cancelButtonColor: "#fff",
      cancelButtonText: `<span class="text-dark">Cancel</span>`,

      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Reject!",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    if (remarks) {
      dispatch(
        UPDATE({
          data: {
            employment: {
              status: "rejected",
              _id,
              remarks,
              isPublished: false,
            },
          },
          token,
        })
      );
      setForm({});
      toggle();
    }
  };

  return (
    <MDBModal size="xl" isOpen={show} toggle={() => {}} backdrop>
      <MDBModalHeader
        toggle={toggle}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="user" className="mr-2" />
        Approve an Employment
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        {/* <EmploymentForm
          user={{ ...selected.user, dob: new Date(selected?.user?.dob) }}
          employment={form}
          isGuest={false}
          setEmployment={setForm}
          handleSubmit={handleSubmit}
          handleReject={handleReject}
        /> */}
      </MDBModalBody>
    </MDBModal>
  );
}
