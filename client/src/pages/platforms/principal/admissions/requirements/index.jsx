import React, { useState, useEffect } from "react";
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
import { Departments } from "../../../../../services/fakeDb";
import Modal from "./modal";
import Swal from "sweetalert2";
import {
  BROWSE,
  DESTROY,
} from "../../../../../services/redux/slices/admissions/requirements";
import { useToasts } from "react-toast-notifications";

export default function Requirements() {
  const [show, setShow] = useState(false),
    { token } = useSelector(({ auth }) => auth),
    [requirements, setRequirements] = useState([]),
    [orderIndex, setOrderIndex] = useState(0),
    [selected, setSelected] = useState({}),
    [willCreate, setWillCreate] = useState(true),
    [didSearch, setDidSearch] = useState(false),
    { collections, message, isSuccess } = useSelector(
      ({ requirements }) => requirements
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
    dispatch(BROWSE({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    setRequirements(() => {
      if (!orderIndex) return collections;

      const rotateArray = (arr, steps) => {
        const normalizedSteps = steps % arr.length;

        if (normalizedSteps === 0) return arr;

        return [
          ...arr.slice(normalizedSteps),
          ...arr.slice(0, normalizedSteps),
        ];
      };

      const rotatedOrder = rotateArray(
        ["grade", "junior", "senior", "college"],
        orderIndex - 1
      );

      const customSort = (a, b) => {
        const prefA = rotatedOrder.indexOf(a.department),
          prefB = rotatedOrder.indexOf(b.department);

        if (prefA === prefB) return a.title.localeCompare(b.title);

        return prefA - prefB;
      };

      return [...collections].sort(customSort);
    });
  }, [orderIndex, collections]);

  const handleDelete = (_id) =>
    Swal.fire({
      focusDeny: true,
      icon: "question",
      title: "Are you sure?",
      text: "This action is irreversible.",
      confirmButtonText: `<span class="text-dark">Cancel</span>`,
      confirmButtonColor: "#fff",

      showDenyButton: true,
      denyButtonText: `Proceed`,
      denyButtonColor: "#3B71CA",
    }).then((res) => {
      if (res.isDenied) {
        dispatch(
          DESTROY({
            data: { _id },
          })
        );
      } else {
        Swal.fire({
          title: "Changes are not Saved!",
          icon: "warning",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      }
    });

  const handleSearch = (e) => {
    e.preventDefault();

    const key = e.target.searchKey.value.toUpperCase();

    setRequirements(
      collections.filter(({ title }) => title.toUpperCase().includes(key))
    );

    setDidSearch(true);
  };

  return (
    <>
      <MDBCard narrow className="pb-3">
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Requirement List</span>

          <form
            id="requirements-inline-search"
            onSubmit={handleSearch}
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
                onClick={() => {
                  if (!didSearch) return;

                  setDidSearch(false);
                  document.getElementById("requirements-inline-search").reset();
                  setRequirements(collections);
                }}
                type={didSearch ? "button" : "submit"}
                size="sm"
                color="info"
                className="d-inline ml-2 px-2"
              >
                <MDBIcon icon={didSearch ? "times" : "search"} />
              </MDBBtn>
              <MDBBtn
                type="button"
                size="sm"
                color="primary"
                className="d-inline  px-2"
                onClick={() => setShow(true)}
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
                <th className="th-lg">Title</th>
                <th
                  className="th-lg cursor-pointer"
                  onClick={() =>
                    setOrderIndex((prev) => {
                      if (prev > 3) return 0;

                      return prev + 1;
                    })
                  }
                >
                  Department&nbsp;
                  <MDBIcon
                    icon="sort"
                    title="Sort by Departments"
                    className={`${!!orderIndex && "text-primary"}`}
                  />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {requirements?.map((requirement) => {
                const { _id, title, department } = requirement;
                return (
                  <tr key={_id}>
                    <td>{title}</td>
                    <td>{Departments.getName(department)}</td>

                    <td className="py-2 text-center">
                      <MDBBtnGroup>
                        <MDBBtn
                          className="m-0"
                          size="sm"
                          color="info"
                          rounded
                          title="Update"
                          onClick={() => {
                            setWillCreate(false);
                            setSelected(requirement);
                            setShow(true);
                          }}
                        >
                          <MDBIcon icon="pen" />
                        </MDBBtn>
                        <MDBBtn
                          className="m-0"
                          size="sm"
                          rounded
                          color="danger"
                          title="Delete"
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
      />
    </>
  );
}
