import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBTable,
  MDBView,
} from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import {
  FACULTY,
  RESET,
} from "../../../../../services/redux/slices/admissions/employments";
import { fullName } from "../../../../../services/utilities";

export default function Faculty({ department }) {
  const { faculty } = useSelector(({ employments }) => employments),
    { token } = useSelector(({ auth }) => auth),
    [searchKey, setSearchKey] = useState(""),
    dispatch = useDispatch();

  useEffect(() => {
    if (token && department) {
      dispatch(
        FACULTY({
          token,
          key: {
            department,
          },
        })
      );
    }

    return () => {
      dispatch(RESET());
    };
  }, [department, token, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();

    const { searchKey } = e.target;

    setSearchKey(searchKey.value.toUpperCase());
  };

  return (
    <>
      <MDBRow className="ml-3 my-2 text-white">
        <MDBCol>
          <h4 className="m-0 font-weight-bold">
            {fullName(faculty?.head?.user)}
          </h4>
          <h6>Head Teacher</h6>
        </MDBCol>
        <MDBCol>
          <h4 className="m-0 font-weight-bold">
            {fullName(faculty?.master?.user)}
          </h4>
          <h6>Master Teacher</h6>
        </MDBCol>
      </MDBRow>
      <MDBCard narrow>
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Teacher List</span>

          <form
            onSubmit={handleSearch}
            id="faculty-inline-search"
            className="form-inline ml-2"
          >
            <div className="form-group md-form py-0 mt-0">
              <input
                className="form-control w-80 placeholder-white text-white"
                type="text"
                placeholder="Fullname Search..."
                name="searchKey"
                required
              />
              <MDBBtn
                onClick={() => {
                  if (!searchKey) return;
                  setSearchKey("");
                  document.getElementById("faculty-inline-search").reset();
                }}
                type={searchKey ? "button" : "submit"}
                size="sm"
                color={searchKey ? "warning" : "info"}
                className="d-inline ml-2 px-2"
              >
                <MDBIcon icon={searchKey ? "times" : "search"} />
              </MDBBtn>
            </div>
          </form>
        </MDBView>
        <MDBCardBody>
          <MDBTable responsive hover>
            <thead>
              <tr>
                <th className="th-lg cursor-pointer">
                  Fullname&nbsp;
                  <MDBIcon
                    icon="sort"
                    title="Sort by Name"
                    className="text-primary"
                  />
                </th>
                <th className="th-lg">Section</th>
              </tr>
            </thead>
            <tbody>
              {!faculty?.teachers.length && (
                <tr>
                  <td className="text-center" colSpan="2">
                    No recent records.
                  </td>
                </tr>
              )}
              {faculty?.teachers?.map(({ _id, user = {}, section }) => {
                const fullname = fullName(user);
                let hidden = false;

                if (searchKey && !fullname.includes(searchKey)) hidden = true;

                return (
                  <tr key={_id} className={`${hidden && "d-none"}`}>
                    <td>{fullname}</td>
                    <td>{section}</td>
                  </tr>
                );
              })}
            </tbody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
