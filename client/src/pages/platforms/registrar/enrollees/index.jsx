import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBCol,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTypography,
} from "mdbreact";
import Enrollees from "../../../../components/enrollees";
import { useDispatch, useSelector } from "react-redux";
import {
  GETALL,
  RESET,
} from "../../../../services/redux/slices/resources/sections";
import { fullName, generateSY } from "../../../../services/utilities";
import { isEqual } from "lodash";
import Swal from "sweetalert2";
import { UPDATE } from "../../../../services/redux/slices/admissions/enrollments";

export default function Registrar() {
  const [sections, setSections] = useState([]),
    [filter, setFilter] = useState({ course: "", gradelvl: "" }),
    { token } = useSelector(({ auth }) => auth),
    { collections } = useSelector(({ sections }) => sections),
    dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(GETALL({ token, key: { batch: JSON.stringify(generateSY()) } }));
    }

    return () => {
      dispatch(RESET);
    };
  }, [token, dispatch]);

  useEffect(() => {
    setSections(
      collections.filter(({ course, gradeLvl }) =>
        isEqual(filter, { course, gradeLvl })
      )
    );
  }, [collections, filter]);

  const handleDrop = (e, sectionId, sectionName) => {
    e.preventDefault();
    const { enrollmentId, fullName } = JSON.parse(
      e.dataTransfer.getData("text/plain")
    );

    Swal.fire({
      focusDeny: true,
      icon: "question",
      title: "Are you sure?",
      html: `You are about to assign <b>${fullName}</b> to <b>${sectionName}</b>.`,
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
            token,
            data: {
              enrollment: {
                _id: enrollmentId,
                section: sectionId,
                status: "approved",
              },
              isViewing: true,
            },
          })
        );
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

  const handleInstructions = () => {
    if (!sections.length) {
      const { course } = filter;
      if (course)
        return (
          <MDBTypography
            className="mb-0"
            noteColor="warning"
            note
            noteTitle="Oops: "
          >
            No sections exist for this grade level and section
          </MDBTypography>
        );

      return (
        <MDBTypography
          className="mb-0"
          noteColor="info"
          note
          noteTitle="Instructions: "
        >
          Drag an Enrollee to choose a section
        </MDBTypography>
      );
    }

    return (
      <div>
        <MDBInput
          onDragOver={dragOver}
          type="search"
          label="Keyword Search..."
        />
      </div>
    );
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <MDBRow>
      <MDBCol md="9">
        <Enrollees status="paid" setFilter={setFilter} />
      </MDBCol>
      <MDBCol md="3" className="px-0">
        {handleInstructions()}
        {sections?.map(({ _id, name, adviser = {}, count }) => (
          <MDBListGroup
            onDragOver={dragOver}
            onDrop={(e) => handleDrop(e, _id, name)}
            key={_id}
          >
            <MDBListGroupItem className="d-flex justify-content-between align-items-start">
              <div>
                <div className="font-weight-bold">{name}</div>
                {fullName(adviser?.fullName)}
              </div>
              <MDBBadge pill color="primary">
                {count}
              </MDBBadge>
            </MDBListGroupItem>
          </MDBListGroup>
        ))}
      </MDBCol>
    </MDBRow>
  );
}
