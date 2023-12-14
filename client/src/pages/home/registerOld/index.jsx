import React, { useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import "./styles/box.css";
import { MDBBtn, MDBInput } from "mdbreact";

export default function Register() {
  const [boxes, setBoxes] = useState([]),
    [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 }),
    [boxSize, setBoxSize] = useState({ width: 0, height: 0 }),
    containerRef = useRef();

  useEffect(() => {
    const updatedivDimensions = debounce(() => {
      if (containerRef.current) {
        const { clientHeight, clientWidth } = containerRef.current;
        setDivDimensions({ width: clientWidth, height: clientHeight });
      }
    }, 500);

    // Initial divDimensions
    updatedivDimensions();

    // Event listener for window resize
    window.addEventListener("resize", updatedivDimensions);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updatedivDimensions);
  }, []);

  useEffect(() => {
    const { height, width } = divDimensions,
      //make column adjustable depending on width
      column = 10;

    if (!!height && !!width) {
      const boxSize = {
        width: Math.max(width, 768) / column - 100,
        height: Math.max(height, 768) / column,
      };

      const boxDimension = boxSize.width * boxSize.height,
        divDimension = height * width,
        totalBoxes = Math.floor(divDimension / boxDimension);

      // console.log(totalBoxes);

      setBoxes(new Array(totalBoxes).fill());
      setBoxSize(boxSize);
    }
  }, [divDimensions]);

  return (
    <section id="register">
      <div ref={containerRef} className="register-container">
        <div className="register-card">
          <div className="register-card-head">User's Agreement</div>
          <div className="register-card-body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            voluptatibus tenetur dolorem, quis excepturi nihil necessitatibus
            ipsam voluptates optio soluta odit quae culpa molestiae voluptate,
            dolores, laboriosam iste deleniti animi!
          </div>
        </div>
        <div className="register-card2">
          <div className="register-card2-head">Register Here!</div>
          <div className="register-card2-body">
            <MDBInput label="Enter E-mail address" />
            <MDBInput label="Enter Password" />
            <MDBInput label="Re-enter Password" />
            <MDBInput
              label="I read and agree with the Terms and Conditions"
              type="checkbox"
              id="agreement"
              required
            />
            <MDBBtn
              color="none"
              style={{ backgroundColor: "#660710", color: "white" }}
              className="float-right"
            >
              Submit
            </MDBBtn>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5px",
            flexWrap: "wrap",
            gap: "2.5px",
          }}
        >
          {boxes.map((_, index) => (
            <div
              style={{
                height: `${boxSize.height}px`,
                width: `${boxSize.width}px`,
              }}
              key={`registerBox-${index}`}
              className="box-border"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
