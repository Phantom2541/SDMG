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
import { DESTROY } from "../../../../../services/redux/slices/resources/sections";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";
import Modal from "./modal";

export default function Sections() {
  const [sections, setSections] = useState([]),
    { collections, message, isSuccess } = useSelector(
      ({ sections }) => sections
    ),
    // { token } = useSelector(({ auth }) => auth),
    [show, setShow] = useState(false),
    [willCreate, setWillCreate] = useState(false),
    [selected, setSelected] = useState({}),
    dispatch = useDispatch(),
    { addToast } = useToasts();
  //   [didSearch, setDidSearch] = useState(false);

  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }
  }, [isSuccess, message, addToast]);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(BROWSE({ token }));
  //   }
  // }, [dispatch, token]);

  useEffect(() => {
    setSections(collections);
  }, [collections]);

  const handleDelete = (index) => {
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
            data: { index },
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
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();

  //   const key = e.target.searchKey.value.toUpperCase();

  //   setSections(
  //     collections.filter(({ name }) => name.toUpperCase().includes(key))
  //   );

  //   setDidSearch(true);
  // };

  return (
    <>
      <MDBCard narrow className="pb-3">
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Section List</span>

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
                <th
                  className="th-lg cursor-pointer"
                  // onClick={() =>
                  //   setOrderIndex((prev) => {
                  //     if (prev > 1) return 0;

                  //     return prev + 1;
                  //   })
                  // }
                >
                  Name&nbsp;
                  <MDBIcon
                    icon="sort"
                    title="Sort by Name"
                    className="text-primary"
                  />
                </th>
                <th className="th-lg">Grade Level</th>

                <th className="th-lg">Advisor</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sections?.map((section, index) => {
                const { name, gradeLvl, advisor } = section;
                return (
                  <tr key={index}>
                    <td>{name}</td>
                    <td>{gradeLvl}</td>
                    <td>{advisor}</td>

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
                            setSelected(section);
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
                          onClick={() => handleDelete(index)}
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
