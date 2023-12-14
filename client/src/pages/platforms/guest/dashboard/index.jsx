import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdbreact";
import { School } from "../../../../services/fakeDb";
import { useDispatch } from "react-redux";
import { INJECTROLE } from "../../../../services/redux/slices/auth";

export default function Dashboard() {
  const [showSecret, setShowSecret] = useState(false),
    dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { code } = e.target;

    dispatch(INJECTROLE(code.value));
  };

  useEffect(() => {
    const handleCombination = (e) => {
      if (e.ctrlKey && e.altKey && e.key === "q")
        setShowSecret((prev) => !prev);
    };

    document.addEventListener("keydown", handleCombination);

    return () => document.removeEventListener("keydown", handleCombination);
  }, []);

  return (
    <MDBContainer fluid>
      <div className="mb-5">
        <h4 className="font-weight-bold dark-grey-text">
          Welcome to&nbsp;
          {School.name}
        </h4>
        <p className="grey-text mt-3 mb-0">
          As a Guest, you can choose to be an Employee, Student or Guardian
          through the sidebar.
        </p>
        <hr />
        {showSecret && (
          <form onSubmit={handleSubmit} className="form-inline ml-2">
            <div className="form-group md-form py-0 mt-0">
              <input
                className="form-control w-80"
                type="password"
                placeholder="Try your luck?"
                name="code"
                required
              />
              <MDBBtn
                type="submit"
                size="sm"
                color="primary"
                className="d-inline ml-2 px-2"
              >
                <MDBIcon icon="wpforms" fab />
              </MDBBtn>
            </div>
          </form>
        )}
      </div>

      <section className="mt-2">
        <MDBRow>
          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader color="primary-color">
                <MDBIcon fixed icon="user-secret" className="mr-3" />
                Employee
              </MDBCardHeader>
              <MDBCardBody>
                <p className="font-small grey-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsam, adipisci officia praesentium placeat dolores ad ullam,
                  in amet assumenda rerum, dignissimos quisquam labore. Quod,
                  libero! Illum iusto officiis error debitis!
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader color="warning-color">
                <MDBIcon fixed icon="user-graduate" className="mr-3" />
                Student
              </MDBCardHeader>
              <MDBCardBody>
                <p className="font-small grey-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                  mollitia debitis odio doloribus laudantium nulla distinctio
                  dignissimos quibusdam neque repellat, iure eos at quidem,
                  suscipit, aliquam temporibus! Tempora, beatae repellendus.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" className="mb-4 offset-md-3">
            <MDBCard>
              <MDBCardHeader color="danger-color">
                <MDBIcon fixed icon="user-shield" className="mr-3" />
                Guardian
              </MDBCardHeader>
              <MDBCardBody>
                <p className="font-small grey-text">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Placeat quo beatae veniam sequi necessitatibus iste molestiae
                  illum dignissimos delectus voluptatum natus est, ab sint
                  aliquid ipsum nesciunt quas laborum saepe.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
}
