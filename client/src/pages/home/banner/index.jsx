import React, { useState, useEffect } from "react";
import { MDBContainer, MDBMask, MDBView } from "mdbreact";
import BG1 from "../../../assets/landing/bg1.jpg";
import BG2 from "../../../assets/landing/bg2.jpg";
import BG3 from "../../../assets/landing/bg3.jpg";
import BG4 from "../../../assets/landing/bg4.jpg";
import BG5 from "../../../assets/landing/bg5.jpg";
import { School } from "../../../services/fakeDb";

const backgrounds = [BG1, BG2, BG3, BG4, BG5].sort(() => Math.random() - 0.5);

export default function Banner() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setImageIndex((prev) => {
        if (prev > 3) return 0;

        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <section id="banner">
      <MDBView src={backgrounds[imageIndex]} fixed>
        <MDBMask
          overlay="stylish-light"
          className="rgba-white-light d-flex justify-content-centr align-items-center"
        >
          <MDBContainer className="h-100 d-flex align-items-center">
            <div className="pt-5">
              <h1 className="display-4 white-text font-weight-bold mb-0">
                WHAT
              </h1>
              <h1 className="display-4 white-text font-weight-bold mb-0">
                ARE YOU
              </h1>
              <h1 className="display-4 white-text font-weight-bold mb-0">
                WAITING FOR?
              </h1>
              <h5 className="text-uppercase white-text mt-3">
                Give your future a boost at&nbsp;
                <strong>{School.abbreviation}!</strong>
              </h5>
            </div>
          </MDBContainer>
        </MDBMask>
      </MDBView>
    </section>
  );
}
