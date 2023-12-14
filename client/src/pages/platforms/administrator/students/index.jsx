import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTable,
  MDBView,
} from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { BROWSE } from "../../../../services/redux/slices/resources/students";
import Swal from "sweetalert2";

export default function Students() {
  const [students, setStudents] = useState([]),
    { token } = useSelector(({ auth }) => auth),
    { collections, isSuccess, message } = useSelector(
      ({ students }) => students
    ),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }
  }, [isSuccess, message, addToast]);

  useEffect(() => {
    if (token) {
      dispatch(
        BROWSE({
          data: {
            year: 8,
            course: "HUMSS",
            section: "venus",
          },
          token,
        })
      );
    }
    if (collections) {
      const { value: file } = Swal.fire({
        icon: "warning",
        title: "Section Venus has no Students",
        input: "file",
      });

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          Swal.fire({
            title: "Your uploaded picture",
            imageUrl: e.target.result,
            imageAlt: "The uploaded picture",
          });
        };

        reader.readAsDataURL(file);
      }
    }
  }, [collections, token, dispatch]);

  return (
    <>
      <MDBCard narrow className="pb-3">
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">List</span>

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
                <th className="th-lg cursor-pointer">
                  Grade Level&nbsp;
                  <MDBIcon
                    icon="sort"
                    title="Sort by Name"
                    className="text-primary"
                  />
                </th>
                <th className="th-lg">Strand</th>

                <th className="th-lg">Section</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
