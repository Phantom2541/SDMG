import React, { useEffect, useState } from "react";
import * as XLSL from "xlsx";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBInput,
  MDBTable,
  MDBView,
  MDBBtn,
  MDBCollapseHeader,
  MDBCollapse,
} from "mdbreact";
import {
  BROWSE,
  RESET,
} from "../../../../services/redux/slices/resources/students";
import { useDispatch, useSelector } from "react-redux";
import { fullAddress, fullName } from "../../../../services/utilities";

export default function Students() {
  const [students, setStudents] = useState([]),
    [excel, setExcel] = useState([]),
    [activeId, setActiveId] = useState(-1),
    { token, section, auth } = useSelector(({ auth }) => auth),
    { collections } = useSelector(({ students }) => students),
    dispatch = useDispatch();

  useEffect(() => {
    if (token && section != undefined) {
      dispatch(BROWSE({ token, key: { section: section._id } }));

      return () => dispatch(RESET());
    }
  }, [dispatch, token, section]);
  console.log(auth);
  useEffect(() => {
    setStudents(collections);
  }, [collections]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSL.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSL.utils.sheet_to_json(sheet, { defval: "N/A" });

      // Iterate through the rows and replace empty values with "n/a"
      const updatedData = parsedData.map((row) => {
        Object.keys(row).forEach((key) => {
          if (row[key] === undefined || row[key] === null || row[key] === "") {
            row[key] = "n/a";
          }
        });
        return row;
      });

      setExcel(updatedData);
    };
  };
  console.log(students);

  return (
    <>
      <MDBCard narrow className="pb-3">
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Advisory Class</span>

          <form
            id="requirements-inline-search"
            // onSubmit={handleSearch}
            className="form-inline ml-2"
          >
            <div className="form-group py-0 mt-0">
              {excel ? (
                <>
                  <MDBInput
                    type="file"
                    className="d-none"
                    accept=".xlsx, .xls"
                    id="uploadExcel"
                    onChange={handleFileUpload}
                  />
                  <label
                    type="button"
                    style={{ borderRadius: "5px", marginRight: "10px" }}
                    className="p-2 bg-primary "
                    title="Upload Students excel File"
                    htmlFor="uploadExcel"
                  >
                    <MDBIcon icon="upload" />
                  </label>
                </>
              ) : (
                <MDBBtn
                  //   onClick={() => {
                  //     if (!searchKey) return;
                  //     setSearchKey("");
                  //     document.getElementById("faculty-inline-search").reset();
                  //   }}
                  type="button"
                  size="sm"
                  color="success"
                  className="d-inline ml-2 px-2"
                >
                  <MDBIcon icon="plus" />
                </MDBBtn>
              )}
            </div>
          </form>
        </MDBView>
        <MDBCardBody>
          {excel.length > 0 ? (
            <MDBTable responsive hover>
              <>
                <thead>
                  <tr>
                    {Object.keys(students[0]).map((key) => (
                      <th className="th-lg" key={key}>
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, innerIndex) => (
                        <td key={innerIndex}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                {/* <>
                  <thead>
                    <tr>
                      <th className="th-lg">#</th>
                      <th className="th-lg">LRN</th>
                      <th className="th-lg">Fullname</th>
                      <th className="th-lg">Gender</th>
                      <th className="th-lg">DOB</th>
                      <th className="th-lg">Address</th>
                      <th className="th-lg">Guardian</th>
                      <th className="th-lg">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => {
                      const { guardians, lrn, dob, isMale } = student.user;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{lrn}</td>
                          <td>{fullName(student.user?.fullName)}</td>
                          <td>{isMale ? "Male" : "Female"}</td>
                          <td>{dob}</td>
                          <td>{fullAddress(student.user?.address)}</td>
                          <td>{fullName(guardians?.mother)}</td>
                          <td>{guardians?.mother?.mobile}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </> */}
              </>
            </MDBTable>
          ) : (
            <>
              {students.map((student, index) => {
                const { guardians, lrn, dob, isMale } = student.user;
                return (
                  <>
                    <MDBCollapseHeader
                      onClick={() =>
                        setActiveId((prev) => (prev === index ? -1 : index))
                      }
                    >
                      <div className="d-flex justify-content-between">
                        {/* Your header content, e.g., display course and level */}
                        <label>{fullName(student.user?.fullName)}</label>
                        <i
                          style={{
                            rotate: `${activeId === index ? 0 : 90}deg`,
                          }}
                          className="fa fa-angle-down transition-all"
                        />
                      </div>
                    </MDBCollapseHeader>
                    <MDBCollapse
                      id={`collapse-${index}`}
                      isOpen={index === activeId}
                    >
                      <MDBCardBody className="pt-0">
                        {/* <CollapseTable items={items} /> */}
                      </MDBCardBody>
                    </MDBCollapse>
                  </>
                );
              })}
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
