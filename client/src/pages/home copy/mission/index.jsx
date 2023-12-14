import { MDBAnimation, MDBCol } from "mdbreact";
import React from "react";

export default function Mission() {
  return (
    <section id="mission">
      <MDBCol lg="8" md="10" size="12" className="mb-3">
        <MDBAnimation reveal type="slideInLeft" duration="750ms">
          <h2 className="font-weight-bold">Mission</h2>
        </MDBAnimation>
        <MDBAnimation reveal type="slideInLeft">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
          dicta eum quam in eius quasi incidunt obcaecati doloremque nobis.
          Soluta quos, aperiam deserunt alias recusandae animi molestias cumque
          laborum sapiente?
        </MDBAnimation>
      </MDBCol>
    </section>
  );
}
