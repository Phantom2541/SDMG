import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTable,
  MDBView,
} from "mdbreact";
import {
  formatGradeLvl,
  fullName,
  generateSY,
  socket,
} from "../../services/utilities";
import { useDispatch, useSelector } from "react-redux";
// import {
//   ADDENROLLMENT,
//   BROWSE,
//   RESET,
//   UPDATE,
// } from "../../services/redux/slices/admissions/enrollments";
import { Courses } from "../../services/fakeDb";
import View from "./view";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";

export default function Enrollees({ status = "pending", setFilter }) {
  const [students, setStudents] = useState([]),
    [selected, setSelected] = useState({}),
    { token } = useSelector(({ auth }) => auth),
    { collections, isSuccess, message } = useSelector(
      ({ enrollments }) => enrollments
    ),
    dispatch = useDispatch(),
    { addToast } = useToasts();

  // useEffect(() => {
  //   socket.on("receive_enrollment", (enrollment) => {
  //     if (enrollment.status === status) {
  //       dispatch(ADDENROLLMENT(enrollment));
  //     }
  //   });

  //   return () => {
  //     socket.off("receive_enrollment");
  //   };
  // }, [dispatch, status]);

  useEffect(() => {
    if (isSuccess) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }
  }, [addToast, isSuccess, message]);

  // useEffect(() => {
  //   if (token && status) {
  //     dispatch(
  //       BROWSE({
  //         token,
  //         key: {
  //           status,
  //           isPublished: true,
  //           batch: JSON.stringify(generateSY()),
  //         },
  //       })
  //     );
  //   }

  //   return () => {
  //     dispatch(RESET());
  //   };
  // }, [dispatch, token, status]);

  useEffect(() => {
    setStudents(collections);
  }, [collections]);

  const handleReject = async (_id) => {
    const { value: remarks } = await Swal.fire({
      icon: "question",
      title: "Reject this person?",
      input: "textarea",
      inputLabel: "Please specify your reason.",
      inputPlaceholder: "Write a reason for rejection...",
      showCancelButton: true,
      cancelButtonColor: "#fff",
      cancelButtonText: `<span class="text-dark">Cancel</span>`,

      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Reject!",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    if (remarks) {
      // dispatch(
      //   UPDATE({
      //     data: {
      //       enrollment: {
      //         status: "rejected",
      //         _id,
      //         remarks,
      //         isPublished: false,
      //       },
      //       isViewing: true,
      //     },
      //     token,
      //   })
      // );
    }
  };

  const handlePayment = (_id, userId) =>
    Swal.fire({
      focusDeny: true,
      icon: "question",
      title: "Are you sure?",
      text: "You are about to mark this enrollee as paid.",
      footer: "This action is irreversible.",
      confirmButtonText: `<span class="text-dark">Cancel</span>`,
      confirmButtonColor: "#fff",
      showDenyButton: true,
      denyButtonText: `Proceed`,
      denyButtonColor: "#3B71CA",
    }).then((res) => {
      // if (res.isDenied) {
      //   // dispatch(
      //   //   UPDATE({
      //   //     token,
      //   //     data: {
      //   //       user: { _id: userId },
      //   //       enrollment: { _id, status: "paid", user: userId },
      //   //       isViewing: true,
      //   //     },
      //   //   })
      //   );
      // } else {
      //   Swal.fire({
      //     title: "Changes are not Saved!",
      //     icon: "warning",
      //     showConfirmButton: false,
      //     timer: 2500,
      //     timerProgressBar: true,
      //   });
      // }
    });

  if (selected?._id)
    return <View enrollment={selected} setSelected={setSelected} />;

  return (
    <MDBCard narrow>
      <MDBView
        cascade
        className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
      >
        <span className="ml-3">Enrollee List</span>

        <form
          //   onSubmit={handleSearch}
          id="faculty-inline-search"
          className="form-inline ml-2"
        >
          <div className="form-group md-form py-0 mt-0">
            <input
              className="form-control w-80 placeholder-white text-white"
              type="text"
              placeholder="Keyword Search..."
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
              <th>LRN</th>
              <th className="th-lg">Fullname</th>
              <th className="th-lg">Grade Level</th>
              <th className="th-lg">Course</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {!students?.length && (
              <tr>
                <td className="text-center" colSpan="5">
                  No recent records.
                </td>
              </tr>
            )}
            {students?.map((student) => {
              const { user, department, gradeLvl, course, _id } = student,
                gradeTxt = formatGradeLvl(department, gradeLvl, true);

              const handleActionBtn = () => {
                if (status === "validated")
                  return (
                    <MDBBtn
                      title="Tag as Paid"
                      color="primary"
                      size="sm"
                      rounded
                      onClick={() => handlePayment(_id, user?._id)}
                    >
                      <MDBIcon icon="receipt" />
                    </MDBBtn>
                  );

                if (status === "pending")
                  return (
                    <MDBBtn
                      title="View Informations"
                      color="info"
                      size="sm"
                      rounded
                      onClick={() => setSelected(student)}
                    >
                      <MDBIcon icon="eye" />
                    </MDBBtn>
                  );

                return (
                  <MDBBtn
                    title="Reject Enrollee"
                    color="danger"
                    size="sm"
                    rounded
                    onClick={() => handleReject(_id)}
                  >
                    <MDBIcon icon="user-times" />
                  </MDBBtn>
                );
              };

              return (
                <tr
                  key={_id}
                  draggable={status === "paid"}
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "text/plain",
                      JSON.stringify({
                        enrollmentId: _id,
                        fullName: fullName(user?.fullName),
                      })
                    );
                    setFilter({
                      course: course._id,
                      gradeLvl,
                    });
                  }}
                >
                  <td>{user?.lrn}</td>
                  <td>{fullName(user?.fullName)}</td>
                  <td>{gradeTxt}</td>
                  <td>{Courses.displayName(course?.pk)}</td>
                  <td className="py-2 text-center">{handleActionBtn()}</td>
                </tr>
              );
            })}
          </tbody>
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
  );
}
