import React, { useEffect, useState } from "react";
import { MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import { School } from "../../../../services/fakeDb";
import { fullAddress } from "../../../../services/utilities";
import Form from "./form";
import View from "./view";
import Agreement from "./agreement";
import { useSelector } from "react-redux";

const { name, address: sAddress, logo, id } = School;

const _form = {
  position: "",
  department: "grade",
  emergencyContact: {
    primary: {
      name: "",
      relationship: "",
      mobile: "",
    },
    secondary: {
      name: "",
      relationship: "",
      mobile: "",
    },
  },
};

export default function Employment() {
  const [form, setForm] = useState(_form),
    [view, setView] = useState(false),
    { credentials } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (credentials._id) {
      setForm((prev) => ({
        ...prev,
        position: credentials.position,
        _id: credentials._id,
      }));
    }
  }, [credentials]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setView(true);
    console.log(form);
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  if (view) return <View goBack={() => setView(false)} form={form} />;

  return (
    <>
      <MDBCard>
        <MDBCardBody className="px-0 py-1">
          <div className="text-center">
            <h1 className="font-weight-bold text-primary mb-0">{name}</h1>
            <p className="mt-0 font-weight-bold">{fullAddress(sAddress)}</p>
          </div>
          <div
            className="d-flex align-items-center justify-content-between mb-5 bg-primary"
            style={{
              height: "80px",
              paddingLeft: "10rem",
              paddingRight: "10rem",
            }}
          >
            <div className="text-white">
              <img
                src={logo}
                alt={id}
                height="150"
                className="bg-white rounded-circle"
              />
            </div>
            <div className="text-white h1">EMPLOYMENT FORM</div>
            <div className="invisible">
              <img
                src={logo}
                alt={id}
                height="150"
                className="bg-white rounded-circle"
              />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <Form form={form} handleChange={handleChange} />
            <Agreement />
            <MDBBtn type="submit" color="primary" className="ml-5 mt-3">
              Proceed to Submit
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
