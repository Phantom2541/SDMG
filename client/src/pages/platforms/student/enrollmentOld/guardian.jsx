import { MDBBtn, MDBInput } from "mdbreact";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { UPDATE } from "../../../../services/redux/slices/admissions/enrollments";

const _preset = {
  fname: undefined,
  lname: undefined,
  mname: undefined,
  suffix: undefined,
  mobile: undefined,
};

export default function Guardian({
  setActiveStep,
  handleForm,
  handleFinalSubmit,
  isPublished,
  viewing,
  goBack,
}) {
  const { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const { form, setForm } = handleForm;

  const handleChange = (obj, key, value) =>
    setForm({ ...form, [obj]: { ...form[obj], [key]: value.toUpperCase() } });

  const { father = _preset, mother = _preset, legal = _preset, _id } = form;

  const handleReject = async () => {
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
            enrollment: {
              status: "rejected",
              _id,
              remarks,
              isPublished: false,
            },
            isViewing: true,
          },
          token,
        })
      );
      goBack();
    }
  };

  return (
    <>
      {viewing && <h5 className="mt-4">Guardians Information</h5>}
      <div className="border p-2">
        <span>Legal Guardian's Name</span>
        <div className="row">
          <div className="col-3">
            <MDBInput
              readOnly={isPublished}
              label="Last Name"
              value={legal.lname}
              onChange={(e) => handleChange("legal", "lname", e.target.value)}
            />
          </div>
          <div className="col-3">
            <MDBInput
              readOnly={isPublished}
              label="First Name"
              value={legal.fname}
              onChange={(e) => handleChange("legal", "fname", e.target.value)}
            />
          </div>
          <div className="col-3">
            <MDBInput
              readOnly={isPublished}
              label="Middle Name"
              value={legal.mname}
              onChange={(e) => handleChange("legal", "mname", e.target.value)}
            />
          </div>
          <div className="col-1">
            <MDBInput
              readOnly={isPublished}
              label="Suffix"
              value={legal.suffix}
              onChange={(e) => handleChange("legal", "suffix", e.target.value)}
            />
          </div>
          <div className="col-2">
            <MDBInput
              readOnly={isPublished}
              label="Mobile No. (+63)"
              maxLength={10}
              value={legal.mobile}
              onChange={(e) =>
                handleChange(
                  "legal",
                  "mobile",
                  e.target.value.replace(/\D/g, "")
                )
              }
            />
          </div>
        </div>
      </div>

      <div className="border p-2 my-2">
        <span>Father's Name</span>
        <div className="row">
          <div className="col-3">
            <MDBInput
              readOnly={isPublished}
              label="Last Name"
              value={father.lname}
              onChange={(e) => handleChange("father", "lname", e.target.value)}
            />
          </div>
          <div className="col-3">
            <MDBInput
              readOnly={isPublished}
              label="First Name"
              value={father.fname}
              onChange={(e) => handleChange("father", "fname", e.target.value)}
            />
          </div>
          <div className="col-3">
            <MDBInput
              readOnly={isPublished}
              label="Middle Name"
              value={father.mname}
              onChange={(e) => handleChange("father", "mname", e.target.value)}
            />
          </div>
          <div className="col-1">
            <MDBInput
              readOnly={isPublished}
              label="Suffix"
              value={father.suffix}
              onChange={(e) => handleChange("father", "suffix", e.target.value)}
            />
          </div>
          <div className="col-2">
            <MDBInput
              readOnly={isPublished}
              label="Mobile No. (+63)"
              maxLength={10}
              value={father.mobile}
              onChange={(e) =>
                handleChange(
                  "father",
                  "mobile",
                  e.target.value.replace(/\D/g, "")
                )
              }
            />
          </div>
        </div>
      </div>

      <div className="border p-2">
        <span>Mother's Maiden Name</span>
        <div className="row">
          <div className="col-3">
            <MDBInput
              readOnly={isPublished}
              label="Last Name"
              value={mother.lname}
              onChange={(e) => handleChange("mother", "lname", e.target.value)}
            />
          </div>
          <div className="col-3">
            <MDBInput
              readOnly={isPublished}
              label="First Name"
              value={mother.fname}
              onChange={(e) => handleChange("mother", "fname", e.target.value)}
            />
          </div>
          <div className="col-3">
            <MDBInput
              readOnly={isPublished}
              label="Middle Name"
              value={mother.mname}
              onChange={(e) => handleChange("mother", "mname", e.target.value)}
            />
          </div>
          <div className="col-1">
            <MDBInput
              readOnly={isPublished}
              label="Suffix"
              value={mother.suffix}
              onChange={(e) => handleChange("mother", "suffix", e.target.value)}
            />
          </div>
          <div className="col-2">
            <MDBInput
              readOnly={isPublished}
              label="Mobile No. (+63)"
              maxLength={10}
              value={mother.mobile}
              onChange={(e) =>
                handleChange(
                  "mother",
                  "mobile",
                  e.target.value.replace(/\D/g, "")
                )
              }
            />
          </div>
        </div>
      </div>

      <MDBBtn
        onClick={() => setActiveStep(2)}
        style={{ float: "left" }}
        color="dark"
        className="z-depth-0"
        outline
      >
        Return
      </MDBBtn>

      {!isPublished && (
        <MDBBtn
          style={{ float: "right" }}
          color={viewing ? "success" : "primary"}
          onClick={handleFinalSubmit}
        >
          {viewing ? "Approve" : "Submit"}
        </MDBBtn>
      )}
      {viewing && (
        <MDBBtn
          style={{ float: "right" }}
          color="danger"
          onClick={handleReject}
        >
          Reject
        </MDBBtn>
      )}
    </>
  );
}
