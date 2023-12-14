import React, { useEffect, useState } from "react";
import Tracks from "./tracks";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";
import Modal from "./modal";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  BROWSE,
  DESTROY,
  RESET,
} from "../../../../../../services/redux/slices/resources/courses";
import { Courses as COURSES } from "../../../../../../services/fakeDb";
import Swal from "sweetalert2";

export default function Courses({ departmentKey }) {
  const [selectedCourse, setSelectedCourse] = useState(null),
    [courses, setCourses] = useState([]),
    [show, setShow] = useState(false),
    { collections, isSuccess, message } = useSelector(({ courses }) => courses),
    { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }
  }, [isSuccess, message, addToast, dispatch]);

  useEffect(() => {
    if (token && departmentKey) {
      dispatch(BROWSE({ token, key: { department: departmentKey } }));
    }

    return () => {
      dispatch(RESET());
    };
  }, [dispatch, token, departmentKey]);

  useEffect(() => {
    setCourses(collections);
  }, [collections]);

  const backButton = () => {
    setSelectedCourse(null);
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          DESTROY({
            data: { _id },
            token,
          })
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (selectedCourse)
    return (
      <Tracks
        course={selectedCourse}
        backButton={backButton}
        departmentKey={departmentKey}
      />
    );

  return (
    <>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th className="p-0">
              <div className="d-flex align-items-center">
                <MDBBtn
                  className=" px-3 mx-auto"
                  size="sm"
                  color="info"
                  title="Add a Course"
                  onClick={() => setShow(true)}
                >
                  <MDBIcon icon="plus" />
                </MDBBtn>
              </div>
            </th>
            <th className="th-lg">Name</th>
            <th className="th-lg">Abbreviation</th>
            <th />
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {!courses.length && (
            <tr>
              <td colSpan="4" className="text-center">
                No recent records.
              </td>
            </tr>
          )}
          {courses?.map((course, index) => {
            const { pk, _id } = course,
              populate = COURSES.find(pk),
              { name, abbreviation } = populate;
            return (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{abbreviation}</td>
                <td className="py-2 text-center">
                  <MDBBtnGroup>
                    <MDBBtn
                      onClick={() =>
                        setSelectedCourse({ ...course, ...populate })
                      }
                      color="primary"
                      size="sm"
                      rounded
                    >
                      <MDBIcon icon="cog" />
                    </MDBBtn>
                    <MDBBtn
                      color="danger"
                      size="sm"
                      rounded
                      onClick={() => handleDelete(_id)}
                    >
                      <MDBIcon icon="trash-alt" />
                    </MDBBtn>
                  </MDBBtnGroup>
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
      <Modal
        show={show}
        toggle={() => setShow(false)}
        departmentKey={departmentKey}
      />
    </>
  );
}
