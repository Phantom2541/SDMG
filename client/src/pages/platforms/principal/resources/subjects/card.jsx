import React, { useState, useEffect } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBBtnGroup,
  MDBCard,
  MDBCardBody,
  MDBCollapse,
  MDBCollapseHeader,
  MDBIcon,
} from "mdbreact";
import { SubjectForm } from "./modal";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../../../../../services/redux/slices/resources/subjects";

export default function Card({ subject, handleDelete }) {
  const [isOpen, setIsOpen] = useState(false),
    [editState, setEditState] = useState(false),
    [form, setForm] = useState(subject),
    { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  useEffect(() => {
    setIsOpen(Math.random() < 0.5);
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const handleSubmit = () => {
    dispatch(
      UPDATE({
        data: form,
        token,
      })
    );
    setEditState(false);
  };

  const { title, isMajor, units, _id, description, code } = subject,
    color = isMajor ? "indigo" : "blue-grey";

  return (
    <MDBCard className="mb-3 shadow-box-example hoverable">
      <MDBCollapseHeader onClick={toggle}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <MDBBadge
              title="Specification"
              color={color}
              className="mb-0 z-depth-0 mr-1"
            >
              {isMajor ? "MAJOR" : "MINOR"}
            </MDBBadge>
            <MDBBadge title="Code" color={color} className="mb-0 z-depth-0">
              {code}
            </MDBBadge>
          </div>

          <MDBIcon
            icon="angle-down"
            rotate={isOpen ? "0" : "90"}
            style={{
              transition: "all 0.5s",
            }}
          />
        </div>
        {title}
      </MDBCollapseHeader>
      <MDBCollapse id={_id} isOpen={isOpen}>
        <MDBCardBody>
          {editState ? (
            <SubjectForm
              handleFinalSubmit={handleSubmit}
              form={form}
              setForm={setForm}
              submitSize="sm"
              handleCancel={() => setEditState(false)}
            />
          ) : (
            <>
              <MDBBadge color={color} className="mb-2 z-depth-0">
                <span style={{ fontSize: "13px" }}> {units} UNITS</span>
              </MDBBadge>
              <br />
              {description}
              <MDBBtnGroup className="w-100">
                <MDBBtn
                  onClick={() => setEditState(true)}
                  title="Update"
                  className="p-1"
                  color="info"
                >
                  <MDBIcon icon="pen" />
                </MDBBtn>
                <MDBBtn
                  onClick={() => handleDelete(_id)}
                  title="Delete"
                  className="p-1"
                  color="danger"
                >
                  <MDBIcon icon="trash" />
                </MDBBtn>
              </MDBBtnGroup>
            </>
          )}
        </MDBCardBody>
      </MDBCollapse>
    </MDBCard>
  );
}
