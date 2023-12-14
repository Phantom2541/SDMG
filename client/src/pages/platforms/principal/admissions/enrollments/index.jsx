import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTable,
  MDBView,
} from "mdbreact";
import Modal from "./modal";
import { formatGradeLvl, fullName } from "../../../../../services/utilities";

const students = [
  {
    _id: 1,
    fullName: {
      fname: "John",
      lname: "Doe",
      mname: "James",
      suffix: "Jr",
    },
    gradeLvl: 8,
    department: "junior",
    course: "Math",
  },
  {
    _id: 2,
    fullName: {
      fname: "Alice",
      lname: "Smith",
      mname: "Marie",
      suffix: "",
    },
    gradeLvl: 14,
    department: "college",
    course: "Science",
  },
  {
    _id: 3,
    fullName: {
      fname: "Bob",
      lname: "Johnson",
      mname: "Lee",
      suffix: "III",
    },
    department: "grade",
    gradeLvl: 5,
  },
  {
    _id: 4,
    fullName: {
      fname: "Charlie",
      lname: "Brown",
      mname: "William",
      suffix: "",
    },
    gradeLvl: 11,
    department: "senior",
    course: "History",
  },
  {
    _id: 5,
    fullName: {
      fname: "Jane",
      lname: "Taylor",
      mname: "Elizabeth",
      suffix: "Sr",
    },
    gradeLvl: 17,
    department: "college",
    course: "Art",
  },
  {
    _id: 6,
    fullName: {
      fname: "Marie",
      lname: "Lee",
      mname: "Alice",
      suffix: "",
    },
    gradeLvl: 3,
    department: "grade",
  },
  {
    _id: 7,
    fullName: {
      fname: "William",
      lname: "Johnson",
      mname: "Robert",
      suffix: "",
    },
    gradeLvl: 7,
    department: "junior",
    course: "English",
  },
  {
    _id: 8,
    fullName: {
      fname: "Elizabeth",
      lname: "Brown",
      mname: "Marie",
      suffix: "",
    },
    gradeLvl: 12,
    department: "senior",
    course: "Science",
  },
  {
    _id: 9,
    fullName: {
      fname: "John",
      lname: "Smith",
      mname: "David",
      suffix: "II",
    },
    gradeLvl: 9,
    department: "junior",
    course: "History",
  },
  {
    _id: 10,
    fullName: {
      fname: "Alice",
      lname: "Doe",
      mname: "Grace",
      suffix: "",
    },
    gradeLvl: 6,
    department: "grade",
  },
  {
    _id: 11,
    fullName: {
      fname: "Robert",
      lname: "Taylor",
      mname: "John",
      suffix: "",
    },
    gradeLvl: 13,
    department: "college",
    course: "Math",
  },
  {
    _id: 12,
    fullName: {
      fname: "Grace",
      lname: "Jones",
      mname: "Robert",
      suffix: "",
    },
    gradeLvl: 4,
    department: "grade",
  },
  {
    _id: 13,
    fullName: {
      fname: "David",
      lname: "Brown",
      mname: "Marie",
      suffix: "",
    },
    gradeLvl: 10,
    department: "junior",
    course: "Science",
  },
  {
    _id: 14,
    fullName: {
      fname: "Taylor",
      lname: "Johnson",
      mname: "Alice",
      suffix: "III",
    },
    gradeLvl: 15,
    department: "college",
    course: "History",
  },
  {
    _id: 15,
    fullName: {
      fname: "John",
      lname: "Smith",
      mname: "William",
      suffix: "Jr",
    },
    gradeLvl: 2,
    department: "grade",
  },
];

export default function Enrollments() {
  const [show, setShow] = useState(false);

  return (
    <>
      <MDBCard narrow className="pb-3">
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Enrollment List</span>

          <form id="subject-inline-search" className="form-inline ml-2">
            <div className="form-group md-form py-0 mt-0">
              <input
                className="form-control placeholder-white w-80"
                type="text"
                placeholder="Title Search..."
                name="searchKey"
                required
              />
              <MDBBtn
                type="submit"
                size="sm"
                color="info"
                className="d-inline ml-2 px-2"
              >
                <MDBIcon icon="search" />
              </MDBBtn>
            </div>
          </form>
        </MDBView>
        <MDBCardBody>
          <MDBTable responsive hover>
            <thead>
              <tr>
                <th className="th-lg">Fullname</th>
                <th className="th-lg">Grade Level - Course</th>
                <th className="th-lg" />
              </tr>
            </thead>

            <tbody>
              {students?.map((student) => {
                const {
                  _id,
                  fullName: fullname,
                  gradeLvl,
                  course,
                  department,
                } = student;
                return (
                  <tr key={_id}>
                    <td>{fullName(fullname)}</td>
                    <td>
                      {formatGradeLvl(department, gradeLvl)}
                      {course && ` - ${course}`}
                    </td>

                    <td className="py-2 text-center">
                      <MDBBtn
                        floating
                        className="m-0"
                        size="sm"
                        color="info"
                        title="Preview"
                        onClick={() => {
                          // setSelected(student);
                          setShow(true);
                        }}
                      >
                        <MDBIcon icon="eye" />
                      </MDBBtn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
      <Modal show={show} toggle={() => setShow(false)} />
    </>
  );
}
