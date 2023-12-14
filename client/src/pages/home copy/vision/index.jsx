import React from "react";
import { MDBAnimation, MDBCol } from "mdbreact";

export default function Vision() {
  return (
    <section id="vision">
      <MDBCol
        lg="8"
        md="10"
        size="12"
        className="offset-md-2 offset-lg-4 text-right"
      >
        <MDBAnimation reveal type="slideInRight" duration="750ms">
          <h2 className="font-weight-bold">Vision</h2>
        </MDBAnimation>
        <MDBAnimation reveal type="slideInRight">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta quas
          quos aperiam illum at iure optio numquam earum corrupti, rem assumenda
          ratione aliquid ullam natus facere placeat. Laborum, voluptatibus
          fugiat?
        </MDBAnimation>
      </MDBCol>
    </section>
  );
}
