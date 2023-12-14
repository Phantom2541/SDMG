import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTable,
  MDBView,
} from "mdbreact";
import Modal from "./modal";

const _form = [
  {
    department: "junior",
    title: "Science, Technology, Engineering, and Mathematics",
    abbreviation: "STEM",
  },
  {
    department: "college",
    title: "Bachelor of Arts in Psychology",
    abbreviation: "BAPSY-2",
  },
  {
    department: "junior",
    title: "General Education",
    abbreviation: "GenEd",
  },
  {
    department: "college",
    title: "Bachelor of Business Administration",
    abbreviation: "BBA-3",
  },
  {
    department: "senior",
    title: "Accountancy, Business, and Management",
    abbreviation: "ABM",
  },
  {
    department: "college",
    title: "Bachelor of Engineering in Computer Science",
    abbreviation: "BECS-4",
  },
  {
    department: "junior",
    title: "Fine Arts",
    abbreviation: "FA",
  },
  {
    department: "college",
    title: "Bachelor of Science in Information Technology",
    abbreviation: "BSIT-1",
  },
  {
    department: "college",
    title: "Bachelor of Arts in Psychology",
    abbreviation: "BAPSY-1",
  },
  {
    department: "senior",
    title: "General Academic Strand",
    abbreviation: "GAS",
  },
  {
    department: "senior",
    title: "Science, Technology, Engineering, and Mathematics",
    abbreviation: "STEM",
  },
  {
    department: "senior",
    title: "Master of Science in Economics",
    abbreviation: "MSE",
  },
  {
    department: "college",
    title: "Bachelor of Architecture",
    abbreviation: "BArch-5",
  },
  {
    department: "junior",
    title: "Basic Math and Literacy",
    abbreviation: "BML",
  },
  {
    department: "college",
    title: "Doctor of Philosophy in Chemistry",
    abbreviation: "PhD Chem",
  },
];

export default function Courses() {
  const [courses, setCourses] = useState(_form),
    [orderIndex, setOrderIndex] = useState(0),
    [show, setShow] = useState(false);

  useEffect(() => {
    setCourses(() => {
      if (!orderIndex) return _form;

      const rotateArray = (arr, steps) => {
        const normalizedSteps = steps % arr.length;

        if (normalizedSteps === 0) return arr;

        return [
          ...arr.slice(normalizedSteps),
          ...arr.slice(0, normalizedSteps),
        ];
      };

      const rotatedOrder = rotateArray(
        ["junior", "senior", "college"],
        orderIndex - 1
      );

      const customSort = (a, b) => {
        const prefA = rotatedOrder.indexOf(a.department),
          prefB = rotatedOrder.indexOf(b.department);

        if (prefA === prefB) return a.title.localeCompare(b.title);

        return prefA - prefB;
      };

      return [..._form].sort(customSort);
    });
  }, [orderIndex, _form]);

  return (
    <>
      <MDBCard narrow className="pb-3">
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Courses List</span>

          <form
            id="requirements-inline-search"
            //   onSubmit={handleSearch}
            className="form-inline ml-2"
          >
            <div className="form-group md-form py-0 mt-0">
              <input
                className="form-control w-80 placeholder-white text-white"
                type="text"
                placeholder="Title Search..."
                name="searchKey"
                required
              />
              <MDBBtn
                //   onClick={() => {
                //     if (!didSearch) return;

                //     setDidSearch(false);
                //     document.getElementById("requirements-inline-search").reset();
                //     setRooms(collections);
                //   }}
                type="submit"
                size="sm"
                color="info"
                className="d-inline ml-2 px-2"
              >
                <MDBIcon icon="search" />
              </MDBBtn>
              <MDBBtn
                type="button"
                size="sm"
                color="primary"
                className="d-inline  px-2"
                onClick={() => setShow(true)}
                title="Create a Subject"
              >
                <MDBIcon icon="plus" />
              </MDBBtn>
            </div>
          </form>
        </MDBView>
        <MDBCardBody>
          <MDBTable responsive hover>
            <thead>
              <tr>
                <th className="th-lg">Title</th>
                <th className="th-lg">Abbrevation</th>

                <th
                  className="th-lg cursor-pointer"
                  onClick={() =>
                    setOrderIndex((prev) => {
                      if (prev > 2) return 0;

                      return prev + 1;
                    })
                  }
                >
                  Department&nbsp;
                  <MDBIcon
                    icon="sort"
                    title="Sort by Name"
                    className="text-primary"
                  />
                </th>

                <th />
              </tr>
            </thead>
            <tbody>
              {courses?.map((course, index) => {
                const { department, title, abbreviation } = course;
                return (
                  <tr key={index}>
                    <td>{title}</td>
                    <td>{abbreviation}</td>
                    <td>{department}</td>

                    <td className="py-2 text-center">
                      <MDBBtnGroup>
                        <MDBBtn
                          className="m-0"
                          size="sm"
                          color="info"
                          rounded
                          title="Update"
                          onClick={() => {
                            setShow(true);
                          }}
                        >
                          <MDBIcon icon="pen" />
                        </MDBBtn>
                        <MDBBtn
                          className="m-0"
                          size="sm"
                          rounded
                          color="danger"
                          title="Delete"
                          // onClick={() => handleDelete(_id)}
                        >
                          <MDBIcon icon="trash-alt" />
                        </MDBBtn>
                      </MDBBtnGroup>
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
