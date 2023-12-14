import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBMedia,
  MDBView,
  MDBMask,
  MDBBtnGroup,
  MDBBtn,
  // MDBInput,
} from "mdbreact";
import React from "react";
import "./gallery.css";

export default function Cards() {
  return (
    <MDBCard>
      <MDBCardBody>
        <MDBMedia className="mb-1">
          <MDBMedia left>
            <MDBView waves>
              <img
                style={{ height: "50px" }}
                className="rounded-circle"
                src="https://mdbootstrap.com/img/Photos/Avatars/avatar-13.jpg"
                alt="Generic placeholder"
              />
            </MDBView>
          </MDBMedia>
          <MDBMedia body className="ml-1">
            <MDBMedia className="media-heading font-weight-bold">
              Jhon Kevin P. Magtalas
            </MDBMedia>
            <MDBMedia className="small mb-3">5:30pm</MDBMedia>
          </MDBMedia>
          <MDBIcon title="Options" icon="ellipsis-h mr-3"></MDBIcon>
          <MDBIcon title="Close" icon="times"></MDBIcon>
        </MDBMedia>
        <MDBMedia>If you like this photo the color will change.</MDBMedia>
      </MDBCardBody>
      <div className="file-container">
        <div className="file-row">
          <div className="file-column">
            <img
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(134).jpg"
              alt="Sample test"
              className="file-img"
            />
          </div>
          <div className="file-column">
            <img
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(134).jpg"
              alt="Sample test"
              className="file-img"
            />
          </div>
        </div>
        <div className="file-row">
          <div className="file-column">
            <img
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(134).jpg"
              alt="Sample test"
              className="file-img"
            />
          </div>
          <div className="file-column">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/fluid/city/055.webp"
              alt="Sample test"
              className="file-img"
            />
          </div>
          <div className="file-column">
            <MDBView>
              <img
                src="https://mdbootstrap.com/img/Photos/Others/nature-sm.webp"
                className="file-img"
                alt="sample test"
              />
              <MDBMask className="flex-center" overlay="black-strong">
                <p className="white-text">+6</p>
              </MDBMask>
            </MDBView>
          </div>
        </div>
      </div>
      <MDBView className="ml-3 p-1">
        <i
          className="far fa-thumbs-up"
          title="Like"
          style={{ fontSize: "11px" }}
        ></i>
        <i
          className="far fa-heart"
          title="Love"
          style={{ fontSize: "12px" }}
        ></i>
        <i
          class="far fa-grin-tears"
          title="Haha"
          style={{ fontSize: "12px" }}
        ></i>
        <span
          className="ml-2"
          title="kevin magtalas"
          style={{ fontSize: "12px" }}
        >
          28
        </span>
        <span
          className="mr-3"
          title="Comments"
          style={{ float: "right", fontSize: "11px" }}
        >
          5 Comments
        </span>
      </MDBView>
      <hr className="mt-0 mb-0" />
      <MDBBtnGroup size="sm">
        <MDBBtn className="hoverable" color="none">
          <i class="far fa-thumbs-up mr-2" style={{ fontSize: "17px" }}></i>Like
        </MDBBtn>
        <MDBBtn className="hoverable" color="none">
          <i className="far fa-comment mr-2" style={{ fontSize: "17px" }}></i>
          Comment
        </MDBBtn>
      </MDBBtnGroup>
      <hr className="mt-0" />
      <MDBView>
        <div class="d-flex justify-content">
          <div class="d-flex flex-row align-items">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
              alt="avatar"
              width="50"
              height="50"
              className="rounded-circle"
            />
            <input placeholder="Write a comment..." className="form-control" />
          </div>
        </div>
      </MDBView>
    </MDBCard>
  );
}
