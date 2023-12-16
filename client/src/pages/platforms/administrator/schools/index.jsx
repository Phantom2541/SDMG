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
import { fullAddress, fullName } from "../../../../services/utilities";
import {
  BROWSE,
  RESET,
} from "../../../../services/redux/slices/resources/schools";
import { Modal } from "./modal";

export default function Employees({}) {
  const [employees, setEmployees] = useState([]),
    { token } = useSelector(({ auth }) => auth),
    { collections } = useSelector(({ schools }) => schools),
    dispatch = useDispatch();

  useEffect(() => {
    if (token) dispatch(BROWSE({ token }));

    return () => dispatch(RESET());
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
                //   onClick={() => {
                //     if (!searchKey) return;
                //     setSearchKey("");
                //     document.getElementById("faculty-inline-search").reset();
                //   }}
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
                <th className="th-lg">Abbr</th>
                <th className="th-lg">Address</th>
                {/* <th /> */}
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
                const { logo, name, abbreviation, address, _id } = employee;
                return (
                  <tr key={_id}>
                    <td>{logo}</td>
                    <td>{name}</td>
                    <td>{abbreviation}</td>
                    <td className="text-uppercase">{fullAddress(address)}</td>
                    {/* <td className="py-2 text-center">
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
                          <MDBIcon icon="pencil-alt" />
                        </MDBBtn>
                        <MDBBtn
                          title="Disable Account"
                          color="danger"
                          size="sm"
                          rounded
                          //   onClick={() => setShowDisable(true)}
                        >
                          <MDBIcon icon="trash" />
                        </MDBBtn>
                      </MDBBtnGroup>
                    </td> */}
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
