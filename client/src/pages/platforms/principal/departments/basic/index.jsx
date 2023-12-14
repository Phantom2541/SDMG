import React, { useState } from "react";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBModalBody,
  MDBTabContent,
  MDBTabPane,
} from "mdbreact";
import Faculty from "../faculty";
import Elem from "./elem";
import Requirements from "../requirements";

const navs = ["faculty", "grade levels", "enrollment requirements"];

export default function Basic() {
  const [activeTab, setActiveTab] = useState("faculty");

  return (
    <>
      <h2>Elementary Department</h2>
      <MDBBtnGroup>
        {navs.map((nav) => (
          <MDBBtn
            style={{ borderBottom: "none" }}
            className="m-0 rounded-top"
            color="primary z-depth-0"
            onClick={() => setActiveTab(nav)}
            outline={nav !== activeTab}
            key={nav}
          >
            {nav}
          </MDBBtn>
        ))}
      </MDBBtnGroup>
      <MDBTabContent
        activeItem={activeTab}
        style={{
          border: "2px solid",
          borderBottomRadius: "5px",
        }}
        className="p-0 border-primary z-depth-1"
      >
        <MDBTabPane tabId="faculty">
          <MDBModalBody className="pt-1 p-0 bg-primary">
            <Faculty department="grade" />
          </MDBModalBody>
        </MDBTabPane>
        <MDBTabPane tabId="grade levels">
          <MDBModalBody className="mx-0">
            <Elem />
          </MDBModalBody>
        </MDBTabPane>
        <MDBTabPane tabId="enrollment requirements">
          <MDBModalBody className="mx-0">
            <Requirements department="grade" />
          </MDBModalBody>
        </MDBTabPane>
      </MDBTabContent>
    </>
  );
}
