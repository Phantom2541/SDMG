import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBView,
} from "mdbreact";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

import {
  BROWSE,
  RESET,
  UPDATE,
} from "../../../../services/redux/slices/affiliated";

export default function Affiliated() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { information, message, isSuccess } = useSelector(
    ({ affiliated }) => affiliated
  );
  const { auth, token } = useSelector(({ auth }) => auth);
  const [school, setSchool] = useState({});
  const [schools, setSchools] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [hasSchool, setHasSchool] = useState(false);
  const dispatch = useDispatch(),
    { addToast } = useToasts();

  useEffect(() => {
    if ((token, auth._id)) {
      dispatch(BROWSE({ token, key: { adviser: auth._id } }));
    }
    return () => dispatch(RESET());
  }, [auth]);

  useEffect(() => {
    const { schools, hasSchool } = information;
    if (hasSchool) {
      setSchool(schools);
      setHasSchool(hasSchool);
    } else {
      setSchools(schools);
      setHasSchool(hasSchool);
    }
  }, [information]);

  const handleChange = (index, school) => {
    setSelectedIndex(index);
    setSchool(school);
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    dispatch(
      UPDATE({
        data: {
          adviser: auth._id,
          schools: school._id,
        },
        token,
      })
    );
  };

  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }

    return () => dispatch(RESET());
  }, [isSuccess, message, addToast, dispatch]);

  return (
    <>
      {isSubmit || hasSchool ? (
        <MDBCard narrow className="pb-3">
          <MDBView
            cascade
            className="gradient-card-header blue-gradient py-2 mx-4 "
          >
            <h2 className="font-weight-bold">
              {school.name} {school.id}
            </h2>
            <h5 className="font-weight-bold ">{school.abbreviation}</h5>
          </MDBView>
          <MDBCardBody>
            <MDBTable>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Province</th>
                  <th>Baranggay</th>
                  <th>Zip Code</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-weight-bold">{school.address?.region}</td>
                  <td className="font-weight-bold">
                    {school.address?.province}
                  </td>
                  <td className="font-weight-bold">
                    {school.address?.barangay}
                  </td>
                  <td className="font-weight-bold">{school.address?.zip}</td>
                </tr>
              </tbody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      ) : (
        <MDBCard narrow className="pb-3">
          <MDBView
            cascade
            className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
          >
            <h4 className="ml-3 font-weight-bold">Select Your School</h4>
          </MDBView>
          <MDBCardBody>
            <MDBTable responsive hover>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>Name&nbsp;</th>
                  <th>ID&nbsp;</th>
                  <th className="th-lg">Region</th>
                  <th className="th-lg">Province</th>
                  <th className="th-lg">Baranggay</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {schools?.map((school, index) => {
                  const { name, id } = school;
                  const { province, baranggay, region } = school.address;
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={index}
                          checked={selectedIndex === index}
                          onChange={() => handleChange(index, school)}
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor={index}
                        ></label>
                      </td>
                      <td className="font-weight-bold">{name}</td>
                      <td className="font-weight-bold">{id}</td>
                      <td className="font-weight-bold">{region}</td>
                      <td className="font-weight-bold">{province}</td>
                      <td className="font-weight-bold">{baranggay}</td>
                    </tr>
                  );
                })}
              </tbody>
            </MDBTable>
            <MDBRow className="text-center">
              <MDBCol md="12">
                <MDBBtn
                  color="primary"
                  type="button"
                  onClick={handleSubmit}
                  disabled={selectedIndex === -1}
                >
                  Submit
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      )}
    </>
  );
}
