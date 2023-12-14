import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBDatePicker,
} from "mdbreact";
import { isEqual } from "lodash";
import {
  SAVE,
  TOGGLEMODAL,
  UPDATE,
} from "../../../../../services/redux/slices/announcements";
import { useToasts } from "react-toast-notifications";
import CustomSelect from "../../../../../components/customSelect";
import { capitalize } from "../../../../../services/utilities";
import { EditorState, convertToRaw } from "draft-js";
import Swal from "sweetalert2";
import Docx from "../../../../../components/docx";

// declare your expected items
const today = new Date();

today.setDate(today.getDate() + 1);

const _form = {
  title: "",
  location: "",
  isPrivate: false,
  start: new Date(),
  end: new Date(today.toISOString()),
  files: [],
  text: {},
  priority: "normal",
};

export default function Modal({ selected, willCreate }) {
  const { token, auth } = useSelector(({ auth }) => auth),
    { showModal } = useSelector(({ announcements }) => announcements),
    [editorState, setEditorState] = useState(EditorState.createEmpty()),
    [form, setForm] = useState(_form),
    [minDate, setMinDate] = useState(today.toISOString()),
    { addToast } = useToasts(),
    dispatch = useDispatch();

  useEffect(() => {
    if (showModal && selected._id && !willCreate) {
      setForm(selected);
      const start = new Date(selected.start);

      start.setDate(start.getDate() + 1);

      setMinDate(start.toISOString());
    }

    return () => setForm(_form);
  }, [selected, willCreate, showModal]);

  const handleCreate = (form) =>
    dispatch(
      SAVE({
        data: { ...form, createdBy: auth._id },
        token,
      })
    );

  const handleSubmit = (e) => {
    e.preventDefault();

    handleValidation();
  };

  const handleValidation = (isPublished = false) => {
    var _text = convertToRaw(editorState.getCurrentContent());

    if (!Object.keys(_text[Object.keys(_text)[1]]).length)
      delete _text.entityMap;

    const parsedForm = {
      ...form,
      start: form.start.toDateString(),
      end: form.end.toDateString(),
      text: _text,
      isPublished,
    };

    if (willCreate) return handleCreate(parsedForm);

    if (
      isEqual(parsedForm, {
        ...selected,
        start: selected.start.toDateString(),
        end: selected.end.toDateString(),
      })
    ) {
      dispatch(TOGGLEMODAL());

      return addToast("No changes found, skipping update.", {
        appearance: "info",
      });
    }

    dispatch(
      UPDATE({
        data: parsedForm,
        token,
      })
    );

    setTimeout(() => setForm(_form), 1000);
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleError = (title, text) =>
    Swal.fire({
      title,
      text,
      icon: "error",
      showConfirmButton: false,
    });

  const handleFileChange = ({ target }) => {
    const file = target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "video/mp4"];

    if (!allowedTypes.includes(file.type))
      return handleError(
        "Invalid File",
        "Only JPG, PNG and MP4 formats are allowed"
      );

    const _file = {
      preview: URL.createObjectURL(file),
      value: file,
    };

    const existing = form.files.find(({ value }) => value.name === file.name);

    if (existing)
      return handleError("Duplicate File", "This file is already uploaded");

    const { size } = file;

    if (size / 1024 / 1024 > 25)
      return handleError(
        "File is too big!",
        "File size must be 25MB or below."
      );

    handleChange("files", [...form.files, _file]);
  };

  const {
    title,
    location,
    start,
    isPrivate,
    end,
    files,
    priority,
    isPublished,
  } = form;

  return (
    <MDBModal isOpen={showModal} toggle={() => {}} backdrop size="lg">
      <MDBModalHeader
        toggle={() => dispatch(TOGGLEMODAL())}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="bullhorn" className="mr-2" />
        {willCreate ? "Add Announcement" : `Update ${selected?.title}`}
      </MDBModalHeader>
      <form id="announcementForm" onSubmit={handleSubmit}>
        <MDBModalBody className="mb-0">
          <MDBRow>
            <MDBCol md="4">
              <MDBInput
                type="text"
                label="Title"
                value={title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                type="text"
                label="Location"
                value={location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </MDBCol>
            <MDBCol md="4">
              <CustomSelect
                choices={[
                  {
                    str: "Urgent",
                  },
                  {
                    str: "Special",
                  },
                  {
                    str: "Normal",
                  },
                ]}
                label="Priority Level"
                preValue={capitalize(priority)}
                values="str"
                texts="str"
                onChange={(e) => handleChange("priority", e.toLowerCase())}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
              <strong className="mb-0">Start Date</strong>
              <MDBDatePicker
                className="m-0 pt-md-2"
                disablePast
                autoOk
                value={start}
                getValue={(d) => {
                  const tomorrow = new Date(d);

                  tomorrow.setDate(tomorrow.getDate() + 1);

                  const tomorrowStr = tomorrow.toISOString();

                  setForm({
                    ...form,
                    start: d,
                    end: new Date(tomorrowStr),
                  });
                  setMinDate(tomorrowStr);
                }}
              />
            </MDBCol>
            <MDBCol className="pt-md-2">
              <strong className="mb-0">End Date</strong>
              <MDBDatePicker
                className="m-0"
                disablePast
                autoOk
                value={end}
                minDate={minDate}
                minDateMessage="End date should at least be 1 day ahead."
                getValue={(d) => handleChange("end", d)}
              />
            </MDBCol>
            <MDBCol className="d-flex align-items-center">
              <div>
                <MDBInput
                  onClick={() => handleChange("isPrivate", false)}
                  checked={!isPrivate}
                  label="Public"
                  type="radio"
                  id="isPrivate"
                  name="isPrivate"
                />
                <MDBInput
                  onClick={() => handleChange("isPrivate", true)}
                  checked={isPrivate}
                  label="Private"
                  type="radio"
                  id="isPublic"
                  name="isPrivate"
                />
              </div>
            </MDBCol>
          </MDBRow>

          <Docx
            editorState={editorState}
            _className="mt-5 border"
            setEditorState={setEditorState}
            _style={{ minHeight: "200px" }}
          />

          <div className="mdb-lightbox mt-4">
            <MDBRow>
              {files.map(({ preview }, index) => (
                <MDBCol
                  md="3"
                  key={`file-${index}`}
                  className="border shadow text-center"
                  style={{ position: "relative" }}
                >
                  <div
                    style={{ position: "absolute", right: "0px", top: "0px" }}
                  >
                    <MDBBtn
                      onClick={() => {
                        const _files = [...form.files];
                        _files.splice(index, 1);
                        handleChange("files", _files);
                      }}
                      title="Remove File"
                      color="light"
                      size="sm"
                      className="px-2 py-1"
                    >
                      <MDBIcon icon="times" />
                    </MDBBtn>
                  </div>
                  <img
                    src={preview}
                    alt={preview}
                    className="img-fluid"
                    // onClick={() =>
                    //   this.setState({ photoIndex: 0, isOpen: true })
                    // }
                    style={{ height: "100px" }}
                  />
                </MDBCol>
              ))}
            </MDBRow>
          </div>

          <div className="text-center mt-3">
            <label
              htmlFor="announcementFile"
              className="btn btn-sm btn-primary"
            >
              <MDBIcon icon="upload" className="mr-2" /> Upload Photo/Video
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              id="announcementFile"
              className="d-none"
            />
          </div>
        </MDBModalBody>
        <MDBModalFooter className="py-0">
          {!isPublished && (
            <MDBBtn type="submit" color="info">
              {willCreate ? "draft" : "update"}
            </MDBBtn>
          )}
          <MDBBtn
            onClick={() => handleValidation(true)}
            type="button"
            color="primary"
          >
            publish
          </MDBBtn>
        </MDBModalFooter>
      </form>
    </MDBModal>
  );
}
