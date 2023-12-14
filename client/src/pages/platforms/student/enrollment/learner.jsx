import React from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import { Courses, Departments } from "../../../../services/fakeDb";
import { useSelector } from "react-redux";

export default function Learner({ setForm, form }) {
  const { collections: courses } = useSelector(({ courses }) => courses);

  const { department, gradeLvl } = form;

  const depColSize = department === "grade" ? "6" : "4";

  return (
    <>
      <div className="blue darken-3 px-5 py-2 text-white font-weight-bold h5-responsive">
        I. EDUCATION INFORMATION
      </div>
      <MDBContainer className="px-5" fluid>
        <label className="mb-0 mt-3">
          1. <b>Department</b> and <b>Grade Level</b> -&nbsp;
          <i>Enter your choices correctly</i>
        </label>
        <MDBRow className="mt-2">
          <MDBCol className="px-1" md={depColSize}>
            <label className="mb-0">Department</label>
            <select
              value={department}
              onChange={(e) => {
                const department = e.target.value;

                setForm({
                  ...form,
                  department,
                  gradeLvl: Departments.getInitialGrade(department),
                });
              }}
              className="form-control"
            >
              {Departments.collections?.map(({ key, name }) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol className="px-1" md={depColSize}>
            <label className="mb-0">Grade Level</label>
            <select
              value={gradeLvl}
              onChange={(e) =>
                setForm({ ...form, gradeLvl: Number(e.target.value) })
              }
              className="form-control"
            >
              {Departments.getGradeLevels(department)?.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </MDBCol>
          {department !== "grade" && (
            <MDBCol className="px-1" md="4">
              <label className="mb-0">
                {department === "college" ? "Courses" : "Strands"}
              </label>
              <select className="form-control">
                {!courses.length && <option>No courses available</option>}
                {courses?.map(({ _id, pk }) => {
                  const { abbreviation, name } = Courses.find(pk);

                  return (
                    <option key={_id}>
                      ({abbreviation}) {name}
                    </option>
                  );
                })}
              </select>
            </MDBCol>
          )}
        </MDBRow>
      </MDBContainer>
    </>
  );
}
