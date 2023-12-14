import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Card from "./card";
import { MDBBtn, MDBIcon } from "mdbreact";
import Modal from "./modal";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  BROWSE,
  DESTROY,
} from "../../../../../services/redux/slices/resources/subjects";

export default function Subjects() {
  const [show, setShow] = useState(false),
    [subjects, setSubjects] = useState([]),
    [didSearch, setDidSearch] = useState(false),
    { token } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess } = useSelector(
      ({ subjects }) => subjects
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
      dispatch(BROWSE({ token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    setSubjects(collections);
  }, [collections]);

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

    setSubjects(
      collections.filter(({ title }) => title.toUpperCase().includes(key))
    );

    setDidSearch(true);
  };

  return (
    <div className="md-accordion">
      <Modal show={show} toggle={() => setShow(false)} />
      <h4 className="text-left font-weight-bold dark-grey-text mb-0 d-flex justify-content-between align-items-center">
        <>Subjects</>
        <form
          id="subject-inline-search"
          onSubmit={handleSearch}
          className="form-inline ml-2"
        >
          <div className="form-group md-form py-0 mt-0">
            <input
              className="form-control w-80"
              type="text"
              placeholder="Title Search..."
              name="searchKey"
              required
            />
            <MDBBtn
              onClick={() => {
                if (!didSearch) return;

                setDidSearch(false);
                document.getElementById("subject-inline-search").reset();
                setSubjects(collections);
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
      </h4>
      <hr />
      {/* <div className="text-center mt-5"> */}
      {/* <div className="alert alert-info">Records are empty</div> */}
      {/* <MDBSpinner /> */}
      {/* </div> */}

      <ResponsiveMasonry columnsCountBreakPoints={{ 800: 1, 900: 2, 1200: 3 }}>
        <Masonry style={{ gap: "15px" }}>
          {subjects.map((subject) => (
            <Card
              key={subject._id}
              subject={subject}
              handleDelete={handleDelete}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
