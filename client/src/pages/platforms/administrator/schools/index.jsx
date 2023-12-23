import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTable,
  MDBView,
  MDBBtnGroup,
} from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { fullAddress, fullName } from "../../../../services/utilities"; // fullName
import {
  BROWSE,
  RESET,
} from "../../../../services/redux/slices/resources/schools";
import { useToasts } from "react-toast-notifications";
import Modal from "./modal";
import Coordinator from "./coordinator";

export default function Schools() {
  const [schools, setSchools] = useState([]),
    [showModal, setShowModal] = useState(false),
    [willCreate, setWillCreate] = useState(true),
    { token } = useSelector(({ auth }) => auth),
    [selected, setSelected] = useState(""),
    [showCoordinator, setShowCoordinator] = useState(false),
    { collections, message, isSuccess } = useSelector(({ schools }) => schools),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if (token) dispatch(BROWSE({ token }));

    return () => dispatch(RESET());
  }, [dispatch, token]);

  useEffect(() => {
    setSchools(collections);
  }, [collections]);

  useEffect(() => {
    console.log(message);
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }

    return () => dispatch(RESET());
  }, [isSuccess, message, addToast, dispatch]);

  const toggleModal = (data) => {
    setWillCreate(data);
    setShowModal(!showModal);
  };

  const toggleCoordinator = (data) => {
    setSelected(data);
    setShowCoordinator(!showCoordinator);
  };
  return (
    <>
      <MDBCard narrow>
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Schools</span>

          <form
            //   onSubmit={handleSearch}
            id="faculty-inline-search"
            className="form-inline ml-2"
          >
            <div className="form-group md-form py-0 mt-0">
              <input
                className="form-control w-80 placeholder-white text-white"
                type="text"
                placeholder="School Search..."
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
              <MDBBtn
                onClick={() => toggleModal(true)}
                type="button"
                size="sm"
                color="success"
                className="d-inline ml-2 px-2"
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
                <th className="th-lg cursor-pointer">Logo&nbsp;</th>
                <th className="th-lg">
                  Name
                  <MDBIcon
                    icon="sort"
                    title="Sort by Name"
                    className="text-primary"
                  />
                </th>
                <th className="th-lg">Category</th>
                <th className="th-lg">Coordinator</th>
                {/* <th /> */}
              </tr>
            </thead>
            <tbody>
              {!schools?.length && (
                <tr>
                  <td className="text-center" colSpan="5">
                    No recent records.
                  </td>
                </tr>
              )}
              {schools?.map((school) => {
                const { logo, name, category, address, _id, coordinator } =
                  school;

                return (
                  <tr key={_id}>
                    <td>{logo}</td>
                    <td>
                      <h4>{name}</h4>
                      {fullAddress(address)}
                    </td>
                    <td>{category?.join(", ")}</td>
                    <td className="text-uppercase">
                      {fullName(coordinator?.fullName) || "None"}
                    </td>
                    <td className="py-2 text-center">
                      <MDBBtnGroup>
                        <MDBBtn
                          title="Settings"
                          color="primary"
                          size="sm"
                          type="button"
                          rounded
                          onClick={() => toggleCoordinator(_id)}
                        >
                          <MDBIcon icon="tag" />
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
      {showModal && (
        <Modal show={showModal} toggle={toggleModal} willCreate={willCreate} />
      )}
      {showCoordinator && (
        <Coordinator
          show={showCoordinator}
          toggle={toggleCoordinator}
          selected={selected}
        />
      )}
    </>
  );
}
