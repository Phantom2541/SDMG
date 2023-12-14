import React, { useState } from "react";
import Form from "./form";
import { MDBCard, MDBCardBody, MDBCollapse } from "mdbreact";
import SyllabusGenerator from "../../../../../../../../components/syllabusGenerator";
import "./style.css";

export default function Syllabus({ course, gradeLvl }) {
  const [selectedBoard, setSelectedBoard] = useState(""),
    [selectedSubject, setSelectedSubject] = useState({});

  const handleClick = (subject, board) => {
    if (board === selectedBoard) return;
    setSelectedBoard(board);
    setSelectedSubject(subject);
  };

  return (
    <>
      <MDBCollapse isOpen={Boolean(selectedBoard)}>
        <Form
          selectedBoard={selectedBoard}
          selectedSubject={selectedSubject}
          course={course}
          setSelectedBoard={setSelectedBoard}
          setSelectedSubject={setSelectedSubject}
          gradeLvl={gradeLvl}
        />
      </MDBCollapse>

      <MDBCard>
        <MDBCardBody className="p-0">
          <table className="syllabus-table">
            <thead>
              <tr>
                <th />
                <th className="text-center">
                  1<sup>st</sup> Semester
                </th>
                <th className="text-center">
                  2<sup>nd</sup> Semester
                </th>
              </tr>
            </thead>
            <SyllabusGenerator
              handleClick={handleClick}
              selectedBoard={selectedBoard}
              selectedSubject={selectedSubject}
            />
          </table>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
