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
import { fullName } from "../../../../services/utilities";
import { BROWSE, RESET } from "../../../../services/redux/slices/adviser";

export default function Employees() {
  const [advisers, setAdvisers] = useState([]),
    { token } = useSelector(({ auth }) => auth),
    { collections } = useSelector(({ adviser }) => adviser),
    dispatch = useDispatch();

  useEffect(() => {
    if (token)
      dispatch(BROWSE({ token, key: { school: "657cfa440a085fe7bde80d0d" } }));

    return () => dispatch(RESET());
  }, [dispatch, token]);

  useEffect(() => {
    setAdvisers(collections);
  }, [collections]);

  return (
    <>
      <MDBCard narrow>
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Advisers</span>

          <form
            //   onSubmit={handleSearch}
            id="faculty-inline-search"
            className="form-inline ml-2"
          >
            <div className="form-group md-form py-0 mt-0">
              <input
                className="form-control w-80 placeholder-white text-white"
                type="text"
                placeholder="Employees Search..."
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
                <th className="th-lg">#</th>
                <th className="th-lg">Fullname</th>
                <th className="th-lg">Position</th>
                <th className="th-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {!advisers?.length && (
                <tr>
                  <td className="text-center" colSpan="5">
                    No recent records.
                  </td>
                </tr>
              )}
              {advisers?.map((adviser, index) => {
                const { status, user, position, access, _id } = adviser;
                console.log(advisers);
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{fullName(user.fullName)}</td>
                    <td>{position ? position : access}</td>
                    <td>{status}</td>
                    {status === "pending" && <td />}

                    <td className="py-2 text-center">
                      <MDBBtnGroup>
                        {status === "pending" && (
                          <MDBBtn
                            title="Approve"
                            color="primary"
                            size="sm"
                            rounded
                            //   onClick={() => {
                            //     setSelected(adviser);
                            //     setShow(true);
                            //   }}
                          >
                            <MDBIcon icon="check" />
                          </MDBBtn>
                        )}
                        {status === "approved" && (
                          <MDBBtn
                            title="Deny"
                            color="danger"
                            size="sm"
                            rounded
                            //   onClick={() => {
                            //     setSelected(adviser);
                            //     setShow(true);
                            //   }}
                          >
                            <MDBIcon icon="trash" />
                          </MDBBtn>
                        )}
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
