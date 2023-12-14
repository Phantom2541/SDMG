import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTable,
  MDBView,
} from "mdbreact";
import Modal from "./modal";
import { useSelector, useDispatch } from "react-redux";
import {
  BROWSE,
  RESET,
  ADDEMPLOYMENT,
} from "../../../../../services/redux/slices/admissions/employments";
import { fullName, socket } from "../../../../../services/utilities";
import { useToasts } from "react-toast-notifications";

export default function Employments() {
  const [employments, setEmployments] = useState([]),
    [selected, setSelected] = useState({}),
    [show, setShow] = useState(false),
    { token } = useSelector(({ auth }) => auth),
    { collections, isSuccess, message } = useSelector(
      ({ employments }) => employments
    ),
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
    socket.on("receive_employment", (employment) =>
      dispatch(ADDEMPLOYMENT(employment))
    );

    return () => socket.off("receive_employment");
  }, [dispatch]);

  useEffect(() => {
    if (token) dispatch(BROWSE({ token }));

    return () => dispatch(RESET());
  }, [dispatch, token]);

  useEffect(() => {
    setEmployments(collections);
  }, [collections]);

  return (
    <>
      <MDBCard narrow className="pb-3">
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Job Seekers</span>

          <form
            id="requirements-inline-search"
            // onSubmit={handleSearch}
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
                // onClick={() => {
                //   if (!didSearch) return;

                //   setDidSearch(false);
                //   document.getElementById("requirements-inline-search").reset();
                //   setRooms(collections);
                // }}
                // type={didSearch ? "button" : "submit"}
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
                <th className="th-lg cursor-pointer">Fullname</th>
                <th className="th-lg">Position</th>
                <th className="th-lg">Created At</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {!employments.length && (
                <tr>
                  <td colSpan={4} className="text-center">
                    <i>No recent records.</i>
                  </td>
                </tr>
              )}
              {employments?.map((employment) => {
                const { user, position, createdAt, _id } = employment;
                return (
                  <tr key={_id}>
                    <td>{fullName(user?.fullName)}</td>
                    <td>{position}</td>
                    <td>{new Date(createdAt).toDateString()}</td>

                    <td className="py-2 text-center">
                      <MDBBtn
                        className="m-0"
                        size="sm"
                        rounded
                        color="info"
                        title="View"
                        onClick={() => {
                          setSelected(employment);
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
      <Modal
        show={show}
        toggle={() => {
          setSelected({});
          setShow(false);
        }}
        selected={selected}
      />
    </>
  );
}
