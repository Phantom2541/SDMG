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
import { EMPLOYEES } from "../../../../../services/redux/slices/admissions/employments";
import { fullName } from "../../../../../services/utilities";
import { useToasts } from "react-toast-notifications";
import Modal from "./modal";
import Disable from "./disable";

export default function Employees() {
  const [employees, setEmployees] = useState([]),
    [show, setShow] = useState(false),
    [showDisable, setShowDisable] = useState(false),
    [selected, setSelected] = useState({}),
    { collections } = useSelector(({ employments }) => employments),
    { token } = useSelector(({ auth }) => auth),
    { isSuccess, message } = useSelector(({ employments }) => employments),
    { addToast } = useToasts(),
    dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }
  }, [isSuccess, message, addToast]);

  useEffect(() => {
    if (token) {
      dispatch(EMPLOYEES({ token }));
    }
  }, [dispatch, token]);

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
          <span className="ml-3">Employee List</span>

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
                <th />
              </tr>
            </thead>
            <tbody>
              {!employees?.length && (
                <tr>
                  <td className="text-center" colSpan="4">
                    No recent records.
                  </td>
                </tr>
              )}
              {employees?.map((employee) => {
                const { user, position, access, _id } = employee;
                return (
                  <tr key={_id}>
                    <td>{fullName(user?.fullName)}</td>
                    <td>{position}</td>
                    <td>{access}</td>
                    <td className="py-2 text-center">
                      <MDBBtnGroup>
                        <MDBBtn
                          title="Settings"
                          color="primary"
                          size="sm"
                          rounded
                          onClick={() => {
                            setSelected(employee);
                            setShow(true);
                          }}
                        >
                          <MDBIcon icon="cogs" />
                        </MDBBtn>
                        <MDBBtn
                          title="Disable Account"
                          color="danger"
                          size="sm"
                          rounded
                          onClick={() => setShowDisable(true)}
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
      <Modal
        show={show}
        toggle={() => {
          setShow(false);
        }}
        selected={selected}
      />
      <Disable showDisable={showDisable} toggle={() => setShowDisable(false)} />
    </>
  );
}
