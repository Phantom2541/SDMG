import React, { useState } from "react";
import CustomSelect from "../../../../../../components/customSelect";
import { Departments } from "../../../../../../services/fakeDb";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBModalBody,
  MDBTabContent,
  MDBTabPane,
} from "mdbreact";
import Sections from "./sections";
import Subjects from "./subjects";

const navs = ["sections", "subjects"];

export default function Elem() {
  const [gradeLvl, setGradeLvl] = useState(1),
    [activeTab, setActiveTab] = useState("sections");

  return (
    <>
      <div className="d-flex align-items-bottom justify-content-between mt-2">
        <CustomSelect
          choices={Departments.getGradeLevels("grade").map((id) => ({
            value: id,
            str: `Grade ${id}`,
          }))}
          texts="str"
          values="value"
          className="w-25 ml-3 my-0"
          preValue={gradeLvl}
          onChange={(lvl) => setGradeLvl(lvl)}
          label="Select Grade Levels"
        />
        <MDBBtnGroup className="z-depth-1">
          {navs.map((nav) => (
            <MDBBtn
              className="m-0 rounded-top z-depth-0"
              color="primary"
              onClick={() => setActiveTab(nav)}
              outline={nav !== activeTab}
              key={nav}
            >
              {nav}
            </MDBBtn>
          ))}
        </MDBBtnGroup>
      </div>

      <MDBTabContent activeItem={activeTab} className="p-0 z-depth-1">
        <MDBTabPane tabId="sections">
          <MDBModalBody className="pt-1 p-0 bg-white">
            <Sections gradeLvl={gradeLvl} department="grade" />
          </MDBModalBody>
        </MDBTabPane>
        <MDBTabPane tabId="subjects">
          <MDBModalBody className="mx-0">
            <Subjects />
          </MDBModalBody>
        </MDBTabPane>
      </MDBTabContent>
    </>
  );
}
