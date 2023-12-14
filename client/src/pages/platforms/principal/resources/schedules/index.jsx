import {
  MDBBtn,
  MDBBtnGroup,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTable,
  MDBView,
} from "mdbreact";
import React, { useState } from "react";
import Modal from "./modal";

export default function Schedules() {
  const [show, setShow] = useState(false);

  return (
    <>
      <MDBCard narrow className="pb-3">
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Section List</span>

          <form
            id="requirements-inline-search"
            // onSubmit={handleSearch}
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
                // onClick={() => {
                //   if (!didSearch) return;

                //   setDidSearch(false);
                //   document.getElementById("requirements-inline-search").reset();
                //   setSections(collections);
                // }}
                // type={didSearch ? "button" : "submit"}
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
                <th
                  className="th-lg cursor-pointer"
                  // onClick={() =>
                  //   setOrderIndex((prev) => {
                  //     if (prev > 1) return 0;

                  //     return prev + 1;
                  //   })
                  // }
                >
                  Subject&nbsp;
                  <MDBIcon
                    icon="sort"
                    title="Sort by Name"
                    className="text-primary"
                  />
                </th>
                <th className="th-lg">Hours per day</th>

                <th className="th-lg">Teacher</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>

                <td className="py-2 text-center">
                  <MDBBtnGroup>
                    <MDBBtn
                      className="m-0"
                      size="sm"
                      color="info"
                      rounded
                      title="Update"
                      // onClick={() => {
                      //   setWillCreate(false);
                      //   setSelected(section);
                      //   setShow(true);
                      // }}
                    >
                      <MDBIcon icon="pen" />
                    </MDBBtn>
                    <MDBBtn
                      className="m-0"
                      size="sm"
                      rounded
                      color="danger"
                      title="Delete"
                      // onClick={() => handleDelete(index)}
                    >
                      <MDBIcon icon="trash-alt" />
                    </MDBBtn>
                  </MDBBtnGroup>
                </td>
              </tr>
            </tbody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
      <Modal show={show} toggle={() => setShow(false)} />
    </>
  );
}
