import React from "react";
import { MDBIcon } from "mdbreact";
import "./style/mission.css";

export default function Mission() {
  return (
    <section className="mission-content" id="mission">
      <div className="mission-wrapper">
        <div className="mission-card">
          <div className="mission-cardBody text-center">
            <MDBIcon
              icon="user"
              className="mb-5"
              style={{ fontSize: "70px" }}
            />
            <h2 className="font-weight-bold">MISSIONE</h2>
          </div>
          <div className="mission-dot-1"></div>
          <div className="line-bottom"></div>
        </div>
      </div>
      <div className="mission-wrapper">
        <div className="mission-card">
          <div className="mission-cardBody text-center">
            <MDBIcon
              icon="user"
              className="mb-5"
              style={{ fontSize: "70px" }}
            />
            <h2 className="font-weight-bold">MISSIONE</h2>
          </div>
          <div className="mission-dot-2"></div>
          <div className="mission-circle"></div>
          <div className="line-top"></div>
        </div>
      </div>
      <div className="mission-wrapper">
        <div className="mission-card">
          <div className="line-bottom"></div>
        </div>
      </div>
    </section>
  );
}
