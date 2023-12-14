import React, { useEffect, useState } from "react";
import {
  MDBAnimation,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdbreact";

const boxes = new Array(102).fill();

const animations = [
    "shake",
    "bounce",
    "zoomIn",
    "slideInUp",
    "slideInDown",
    "slideInRight",
    "slideInLeft",
    "wobble",
    "tada",
    "bounce",
    "hinge",
    "flipInX",
    "flipInY",
    "rollIn",
    "swing",
  ],
  colors = ["deep-purple", "teal", "orange"];

export default function Core() {
  const [containerHeight, setContainerHeight] = useState(0),
    [sectionWidth, setSectionWidth] = useState(0);

  useEffect(() => {
    const section = document.getElementById("core");

    if (section) {
      setSectionWidth(section.offsetWidth);
      setTimeout(() => {
        const puzzleBox = document.getElementById("puzzle-box");

        if (puzzleBox) setContainerHeight(puzzleBox.offsetHeight);
      }, 1000);
    }
  }, []);

  return (
    <section id="core">
      <div
        style={{
          position: "relative",
          height: `${containerHeight}px`,
        }}
      >
        <div
          id="puzzle-box"
          style={{
            position: "absolute",
            display: "flex",
            flexWrap: "wrap",
            zIndex: 0,
          }}
        >
          {boxes.map((box, index) => {
            const type = Math.floor(Math.random() * 15),
              color = Math.floor(Math.random() * 3),
              size = `${sectionWidth / 20}px`;

            return (
              <MDBAnimation
                key={`box-${index}`}
                // reveal
                type={animations[type]}
                // delay={`${1000 + index + 100}ms`}
              >
                <div
                  className={`${colors[color]} lighten-4`}
                  style={{ height: size, width: size }}
                />
              </MDBAnimation>
            );
          })}
        </div>
        <div className="pt-4" style={{ zIndex: 1, position: "inherit" }}>
          <MDBCard
            className="mx-5"
            style={{ backgroundColor: "rgba(240, 240, 240, 0.7)" }}
          >
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="7" className="mt-3">
                  <h2 className="font-weight-bold">User's Agreement</h2>
                  <h5>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Maiores eius et sit soluta repudiandae quae aut quaerat
                    ducimus perspiciatis sequi, deleniti at tempore quasi
                    voluptatem consequatur magnam ex! Earum, eos?
                  </h5>
                </MDBCol>

                <MDBCol md="5">
                  <form>
                    <h4 className="font-weight-bold">Register here!</h4>
                    <MDBInput label="Enter e-mail" />
                    <MDBInput label="Enter Password" />
                    <MDBInput label="Confirm Password" />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="agreement"
                      />
                      <label className="form-check-label" htmlFor="agreement">
                        I have read and agree to{" "}
                        <label className="text-primary">
                          The User's Agreement.
                        </label>
                      </label>
                    </div>
                    <MDBBtn color="primary" className="float-right">
                      Register
                    </MDBBtn>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </section>
  );
}
