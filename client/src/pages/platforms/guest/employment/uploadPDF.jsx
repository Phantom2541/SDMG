import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MDBCol, MDBIcon, MDBRow } from "mdbreact";
import "./styles/uploadPDF.css";
import { useSelector } from "react-redux";
import { ENDPOINT, axioKit, isValidLink } from "../../../../services/utilities";

export default function UploadPDF({
  title = "",
  email = "",
  readOnly = false,
}) {
  const [preview, setPreview] = useState(null),
    { token } = useSelector(({ auth }) => auth);

  useEffect(() => {
    let isMounted = true;

    if (title && email) {
      const url = `${ENDPOINT}/assets/employments/${email}/${title}.pdf`;
      isValidLink(url, (valid) => {
        if (valid && isMounted) setPreview(url);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [title, email]);

  const handleUpload = (e) => {
    const [file] = e.target.files;

    if (file.type !== "application/pdf")
      return Swal.fire({
        icon: "error",
        title: "Invalid File Format",
        text: "File must be PDF format",
        showConfirmButton: false,
      });

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();

    reader.onload = (e) => {
      const { result } = e.target;

      axioKit.upload(
        {
          name: `${title}.pdf`,
          base64: result.split(",")[1],
          path: `employments/${email}`,
        },
        token
      );
    };

    reader.readAsDataURL(file);
  };

  return (
    <MDBRow className="mb-4">
      <MDBCol md="4">
        <div>
          <input
            className="d-none"
            id={title}
            type="file"
            onChange={handleUpload}
            accept="application/pdf"
          />

          <div
            className="card"
            style={{
              width: "300px",
              height: "auto",
            }}
          >
            <div className="pdf-container">
              {preview ? (
                <iframe title={title} src={preview} width="317px" />
              ) : (
                <div style={{ color: "grey" }} className="text-center p-2">
                  {title}
                </div>
              )}
            </div>
            <label
              htmlFor={readOnly ? "" : title}
              className="cursor-pointer text-center btn-primary p-1"
              style={{
                margin: "auto",
                width: "300px",
              }}
              onClick={() => {
                if (!readOnly || !preview) return;

                window.open(preview, "_blank");
              }}
            >
              {readOnly ? (
                title
              ) : (
                <>
                  Upload PDF <MDBIcon className="ml-2" icon="upload" />
                </>
              )}
            </label>
          </div>
        </div>
      </MDBCol>
    </MDBRow>
  );
}
