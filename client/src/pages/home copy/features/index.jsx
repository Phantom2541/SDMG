import React, { useState } from "react";
import { MDBAnimation, MDBCol, MDBContainer, MDBIcon, MDBRow } from "mdbreact";

const Card = ({ feature }) => {
  const [didHover, setDidhover] = useState(false);

  const { icon, title, description, type } = feature;

  return (
    <MDBCol
      lg="3"
      size="6"
      className="my-md-0 my-3"
      onMouseOver={() => setDidhover(true)}
      onMouseOut={() => setDidhover(false)}
      style={{ height: "250px" }}
    >
      <MDBAnimation reveal type={type}>
        <div>
          <div
            style={{
              margin: "auto",
              width: "100px",
              height: "100px",
              border: didHover && "solid 5px #4285F4",
              transform: "rotate(45deg)",
              display: "grid",
              placeItems: "center",
              transition: "all 0.25s",
            }}
          >
            <MDBIcon
              icon={icon}
              size="4x"
              style={{
                transform: "rotate(-45deg)",
                color: didHover ? "#4285F4" : "black",
                transition: "all 0.25s",
              }}
            />
          </div>
        </div>
        <div className={`mt-${didHover ? "5" : "1"} transition-all`}>
          <h5 className="font-weight-bold">{title}</h5>
          <p>{description}</p>
        </div>
      </MDBAnimation>
    </MDBCol>
  );
};

export default function Features() {
  const features = [
    {
      icon: "shield-alt",
      title: "Secure",
      type: "slideInLeft",
      description:
        "We prioritize data and system security, implementing robust measures to ensure confidentiality, integrity, and availability.",
    },
    {
      icon: "bolt",
      title: "Rapid",
      type: "slideInDown",
      description:
        "Our agile approach and streamlined processes enable us to deliver solutions quickly, ensuring timely results for our clients.",
    },
    {
      icon: "flask",
      title: "Experimental",
      type: "slideInUp",
      description:
        "We embrace experimentation and innovation to push boundaries and discover cutting-edge solutions for our clients' unique challenges.",
    },
    {
      icon: "heart",
      title: "Beloved",
      type: "slideInRight",
      description:
        "We strive to earn the trust and loyalty of our clients by delivering exceptional solutions and personalized service.",
    },
  ];

  return (
    <section id="features" className="px-5">
      <MDBContainer className="mb-5">
        <h1 className="font-weight-bold section-heading text-center mt-4 mb-3">
          Features
        </h1>
        <p className="section-description mb-5 mb-3 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
          inventore expedita esse dolor illo similique possimus voluptatibus
          vitae non at tenetur quas dolores earum harum obcaecati animi.
          Praesentium, optio tenetur.
        </p>

        <MDBRow>
          {features.map((feature, index) => (
            <Card feature={feature} key={`feature-${index}`} />
          ))}
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
