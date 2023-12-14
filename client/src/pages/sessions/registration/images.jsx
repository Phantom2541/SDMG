import React, { useState } from "react";
import { MDBCard, MDBCol, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import UserImg from "../../../assets/registration/1x1.jpg";
import Signature from "../../../assets/registration/eSignature.jpg";

const FileInput = ({ label, id, description, errorImg, aspectRatio }) => {
  const [preview, setPreview] = useState(errorImg);
  // canvasRef = useRef(null);

  const handleChange = (e) => {
    const [file] = e.target.files;

    setPreview(URL.createObjectURL(file));
  };

  // const handleCamera = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  //     const imageCapture = new ImageCapture(stream.getVideoTracks()[0]);

  //     const photoBlob = await imageCapture.takePhoto();
  //     const imageUrl = URL.createObjectURL(photoBlob);

  //     setPreview(imageUrl);
  //   } catch (error) {
  //     console.error("Error accessing camera:", error);
  //   }
  // };

  return (
    <>
      <label className="mt-4">
        <b>{label}</b>
      </label>
      <input
        type="file"
        onChange={handleChange}
        className="d-none"
        accept="image/jpeg"
        id={id}
      />
      <MDBRow>
        <MDBCol md="3">
          <MDBCard className="z-depth-0">
            {/* <canvas ref={canvasRef} className="d-none" /> */}
            <img
              src={preview}
              alt={id}
              className="border"
              style={{
                aspectRatio,
                width: "auto",
                height: "150px",
                objectFit: "contain",
              }}
            />
            <label
              className="bg-primary text-white text-center mb-0 w-100 py-2 cursor-pointer my-2"
              htmlFor={id}
            >
              Upload Image <MDBIcon className="ml-2" icon="upload" />
            </label>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <p>{description}</p>
          <MDBIcon icon="info-circle" /> if you dont have an image, you can
          upload again later.
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default function Images() {
  return (
    <>
      <div className="blue darken-3 px-5 py-2 text-white font-weight-bold h5-responsive">
        V. OTHER INFORMATION
      </div>
      <MDBContainer className="px-5" fluid>
        <FileInput
          label="1 x 1 Photo"
          id="1x1"
          aspectRatio="1/1"
          errorImg={UserImg}
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil quo, corporis nesciunt velit consequuntur optio eum harum dolore cum illum aliquam quod fugiat consectetur fuga incidunt, reiciendis saepe soluta facilis!"
        />
        <FileInput
          label="Photo of E-Signature"
          id="eSignature"
          aspectRatio="16/9"
          errorImg={Signature}
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil quo, corporis nesciunt velit consequuntur optio eum harum dolore cum illum aliquam quod fugiat consectetur fuga incidunt, reiciendis saepe soluta facilis!"
        />
      </MDBContainer>
    </>
  );
}
