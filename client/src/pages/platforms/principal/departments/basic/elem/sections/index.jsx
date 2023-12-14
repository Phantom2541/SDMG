import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTable,
} from "mdbreact";
import Modal from "./modal";
import { useDispatch, useSelector } from "react-redux";
import {
  BROWSE,
  DESTROY,
  RESET,
} from "../../../../../../../services/redux/slices/resources/sections";
import { fullName } from "../../../../../../../services/utilities";
import {
  TEACHERS,
  RESET as TEACHERRESET,
} from "../../../../../../../services/redux/slices/admissions/employments";
import Swal from "sweetalert2";

export default function Sections({ gradeLvl, department, course = undefined }) {
  const [show, setShow] = useState(false),
    [sections, setSetctions] = useState([]),
    [selected, setSelected] = useState({}),
    [willCreate, setWillCreate] = useState(true),
    { token } = useSelector(({ auth }) => auth),
    { collections, isLoading } = useSelector(({ sections }) => sections),
    dispatch = useDispatch();

  useEffect(() => {
    if (gradeLvl && token) {
      const query = {
        gradeLvl,
        department,
      };
      if (course) query.course = course;
      dispatch(BROWSE({ token, key: query }));
      dispatch(TEACHERS({ token, key: { department } }));
    }
    return () => {
      dispatch(RESET());
      dispatch(TEACHERRESET());
    };
  }, [gradeLvl, department, course, token, dispatch]);

  useEffect(() => {
    setSetctions(collections);
  }, [collections]);

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
          icon: "success",
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <>
      <MDBCard>
        <MDBCardBody className="p-0">
          <MDBTable hover responsive>
            <thead>
              <tr>
                <th className="p-0">
                  <div className="d-flex align-items-center">
                    <MDBBtn
                      className=" px-3 mx-auto"
                      size="sm"
                      color="info"
                      title="Add a Section"
                      onClick={() => {
                        if (!willCreate) setWillCreate(true);
                        setShow(true);
                      }}
                    >
                      <MDBIcon icon="plus" />
                    </MDBBtn>
                  </div>
                </th>
                <th className="th-lg">Name</th>
                <th className="th-lg">Adviser</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {!sections.length && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No recent records.
                  </td>
                </tr>
              )}
              {!isLoading &&
                sections?.map((section, index) => {
                  const { name, adviser = {}, _id } = section;
                  return (
                    <tr key={_id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{name}</td>
                      <td>
                        {adviser?.fullName ? (
                          fullName(adviser.fullName)
                        ) : (
                          <i className="text-black-50">None</i>
                        )}
                      </td>
                      <td className="py-2 text-center">
                        <MDBBtnGroup>
                          <MDBBtn
                            className="m-0"
                            title="Schedule"
                            color="purple"
                            size="sm"
                            rounded
                            // onClick={() => {
                            //   setSelected(section);
                            //   setWillCreate(false);
                            //   setShow(true);
                            // }}
                          >
                            <MDBIcon icon="calendar" />
                          </MDBBtn>
                          <MDBBtn
                            className="m-0"
                            title="Edit"
                            color="info"
                            size="sm"
                            rounded
                            onClick={() => {
                              setSelected(section);
                              setWillCreate(false);
                              setShow(true);
                            }}
                          >
                            <MDBIcon icon="pen" />
                          </MDBBtn>
                          <MDBBtn
                            className="m-0"
                            size="sm"
                            color="danger"
                            title="Delete"
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
            </tbody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
      <Modal
        show={show}
        toggle={() => {
          if (!willCreate) {
            setWillCreate(true);
            setSelected({});
          }
          setShow(false);
        }}
        selected={selected}
        willCreate={willCreate}
        gradeLvl={gradeLvl}
        department={department}
        course={course}
      />
    </>
  );
}
