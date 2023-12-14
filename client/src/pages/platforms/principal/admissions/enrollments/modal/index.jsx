import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBNavItem,
  MDBTabContent,
  MDBNav,
  MDBTabPane,
  MDBModalFooter,
} from "mdbreact";
import Basic from "./basic";
import Learner from "./learner";
import Address from "./address";
import Guardian from "./guardian";

const navs = ["Learners", "Personal", "Address", "Guardian"],
  tabs = [Learner, Basic, Address, Guardian];

export default function Modal({ show, toggle, selected }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <MDBModal className="mt-5 pt-5" isOpen={show} toggle={() => {}} size="xl">
      <MDBNav
        tabs
        className="md-tabs nav-justified tabs-2 light-blue darken-3"
        style={{ margin: "-1.5rem 1rem 0 1rem" }}
      >
        {navs?.map((nav, index) => {
          const isActive = index === activeTab;

          return (
            <MDBNavItem key={`nav-${index}`}>
              <MDBBtn
                color="fb"
                className={`w-100 z-depth-0 ${
                  !isActive && "light-blue darken-3"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {nav}
              </MDBBtn>
            </MDBNavItem>
          );
        })}
      </MDBNav>
      <MDBTabContent activeItem={activeTab} className="pb-0">
        {tabs?.map((Tab, index) => (
          <MDBTabPane key={`Tab-${index}`} tabId={index}>
            <MDBModalBody className="mx-0">
              <Tab />
            </MDBModalBody>
          </MDBTabPane>
        ))}
      </MDBTabContent>
      <MDBModalFooter between>
        <MDBBtn color="none" className="z-depth-0" onClick={toggle}>
          Cancel
        </MDBBtn>
        <div>
          <MDBBtn color="red darken-4">Reject</MDBBtn>
          <MDBBtn color="green darken-3">Approve</MDBBtn>
        </div>
      </MDBModalFooter>
    </MDBModal>
  );
}
