import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import {
  SAVE,
  UPDATE,
  RERENDER,
} from "../../../../../../../../services/redux/slices/resources/subjects";
import { isEqual } from "lodash";
import { useToasts } from "react-toast-notifications";

const _form = {
  title: "",
  hours: 1,
};

export default function Form({
  selectedSubject,
  selectedBoard,
  setSelectedSubject,
  setSelectedBoard,
  course,
  gradeLvl,
}) {
  const [form, setForm] = useState(_form),
    { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if (selectedSubject?._id) {
      setForm(selectedSubject);
    }
  }, [selectedSubject]);

  const deconstructBoardId = (text = true) => {
    if (!selectedBoard) return;

    const [curriculum, position] = selectedBoard.split("/"),
      [x, y] = position.split("-").map(Number);

    if (text) {
      const sup = ["st", "nd", "rd"];
      return (
        <h5 className="mb-0 mt-2">
          {curriculum.toUpperCase()} SUBJECT - {x}
          <sup>{sup[x - 1]}</sup> semester
        </h5>
      );
    }

    return {
      curriculum,
      semester: x,
      position: y,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      ...deconstructBoardId(false),
      course: course._id,
      gradeLvl,
    };

    if (form?._id) {
      if (isEqual(data, selectedSubject)) {
        addToast("No changes found, skipping update.", {
          appearance: "info",
        });
      } else {
        dispatch(
          UPDATE({
            token,
            data,
          })
        );
      }
    } else {
      dispatch(
        SAVE({
          token,
          data,
        })
      );
    }

    setSelectedSubject({});
    setForm(_form);
    setSelectedBoard("");
  };

  const handleSubmitBtn = () => {
    let text = "submit",
      color = "primary";

    if (form?._id) {
      const { semester, position, curriculum } = form;
      const boardId = `${curriculum}/${semester}-${position}`;

      text = "update";
      color = "info";

      if (boardId !== selectedBoard) {
        text = "transfer";
        color = "warning";
      }
    }

    return (
      <div>
        <MDBBtn
          onClick={() => {
            setSelectedSubject({});
            setForm(_form);
            setSelectedBoard("");
            dispatch(RERENDER());
          }}
          type="button"
          color="transparent"
          size="sm"
          className="mt-4 z-depth-0"
        >
          cancel
        </MDBBtn>
        <MDBBtn type="submit" color={color} size="sm" className="mt-4">
          {text}
        </MDBBtn>
      </div>
    );
  };

  const { title, hours } = form;

  return (
    <MDBCard>
      <MDBCardBody className="py-0">
        {deconstructBoardId()}
        <form onSubmit={handleSubmit}>
          <MDBRow>
            <MDBCol md="8">
              <MDBInput
                label="Title"
                type="text"
                required
                value={title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value.toUpperCase() })
                }
              />
            </MDBCol>
            <MDBCol md="1">
              <MDBInput
                label="Hours"
                type="number"
                required
                value={String(hours)}
                onChange={(e) =>
                  setForm({ ...form, hours: Number(e.target.value) })
                }
              />
            </MDBCol>
            <MDBCol md="3">{handleSubmitBtn()}</MDBCol>
          </MDBRow>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
}
