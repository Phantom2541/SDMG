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
import { useDispatch, useSelector } from "react-redux";
import { fullName } from "../../../../../services/utilities";
import { EMPLOYEES, RESET } from "../../../../../services/redux/slices/adviser";

export default function Employees({ query = undefined }) {
  const [employees, setEmployees] = useState([]),
    { token } = useSelector(({ auth }) => auth),
    { collections } = useSelector(({ employments }) => employments),
    dispatch = useDispatch();

  useEffect(() => {
    if (token && query) dispatch(EMPLOYEES({ token, key: query }));

    return () => dispatch(RESET());
  }, [dispatch, token, query]);

  useEffect(() => {
    setEmployees(collections);
  }, [collections]);

  return (
    <>
      <MDBCard narrow>
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Employees</span>

          <form
            //   onSubmit={handleSearch}
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
                //   onClick={() => {
                //     if (!searchKey) return;
                //     setSearchKey("");
                //     document.getElementById("faculty-inline-search").reset();
                //   }}
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
                <th className="th-lg cursor-pointer">
                  Fullname&nbsp;
                  <MDBIcon
                    icon="sort"
                    title="Sort by Name"
                    className="text-primary"
                  />
                </th>
                <th className="th-lg">Position</th>
                <th className="th-lg">Access</th>
                <th className="th-lg">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {!employees?.length && (
                <tr>
                  <td className="text-center" colSpan="5">
                    No recent records.
                  </td>
                </tr>
              )}
              {employees?.map((employee) => {
                const { user, position, access, _id, status } = employee;
                return (
                  <tr key={_id}>
                    <td>{fullName(user?.fullName)}</td>
                    <td>{position}</td>
                    <td>{access}</td>
                    <td className="text-uppercase">{status}</td>
                    <td className="py-2 text-center">
                      <MDBBtnGroup>
                        <MDBBtn
                          title="Settings"
                          color="primary"
                          size="sm"
                          rounded
                          //   onClick={() => {
                          //     setSelected(employee);
                          //     setShow(true);
                          //   }}
                        >
                          <MDBIcon icon="cogs" />
                        </MDBBtn>
                        <MDBBtn
                          title="Disable Account"
                          color="danger"
                          size="sm"
                          rounded
                          //   onClick={() => setShowDisable(true)}
                        >
                          <MDBIcon icon="user-slash" />
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
    </>
  );
}
