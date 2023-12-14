import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBIcon,
  MDBModalBody,
  MDBTabContent,
  MDBTabPane,
} from "mdbreact";
import CustomSelect from "../../../../../../../components/customSelect";
import { Departments } from "../../../../../../../services/fakeDb";
import Sections from "../../../basic/elem/sections";
import Syllabus from "./syllabus";
import { useDispatch, useSelector } from "react-redux";
import { BROWSE } from "../../../../../../../services/redux/slices/resources/subjects";

const navs = ["sections", "syllabus"];

export default function Tracks({
  course,
  backButton,
  departmentKey = "junior",
}) {
  const [activeTab, setActiveTab] = useState("sections"),
    { token } = useSelector(({ auth }) => auth),
    [gradeLvl, setGradeLvl] = useState(
      Departments.getInitialGrade(departmentKey)
    ),
    dispatch = useDispatch();

  useEffect(() => {
    if (token && course?._id) {
      dispatch(
        BROWSE({
          token,
          key: {
            course: course._id,
            gradeLvl,
          },
        })
      );
    }
  }, [course, gradeLvl, token, dispatch]);

  const { name, _id } = course;

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end" }} className="mt-2">
        <div className="d-flex align-items-center w-75">
          <MDBBtn
            onClick={backButton}
            color="transparent"
            size="sm"
            className="z-depth-0 m-0 pt-1"
          >
            <MDBIcon icon="arrow-left" size="lg" className="p-0" />
          </MDBBtn>
          <span className="h6" title={name}>
            {name}&nbsp; -&nbsp;
          </span>
          <CustomSelect
            choices={Departments.getGradeLevels(departmentKey).map((id) => ({
              value: id,
              str: `Junior High Grade ${id}`,
            }))}
            texts="str"
            values="value"
            className="w-25 my-0 ml-2"
            preValue={gradeLvl}
            onChange={(lvl) => setGradeLvl(lvl)}
            label="Select Grade Levels"
          />
        </div>
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
            <Sections
              key={gradeLvl}
              department={departmentKey}
              gradeLvl={gradeLvl}
              course={_id}
            />
          </MDBModalBody>
        </MDBTabPane>
        <MDBTabPane tabId="syllabus">
          <MDBModalBody className="p-0">
            <Syllabus key={gradeLvl} course={course} gradeLvl={gradeLvl} />
          </MDBModalBody>
        </MDBTabPane>
      </MDBTabContent>
    </>
  );
}
