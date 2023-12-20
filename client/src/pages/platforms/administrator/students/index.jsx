import React, { useState } from "react";
import * as XLSL from "xlsx";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBInput,
  MDBTable,
  MDBView,
  MDBBtn,
} from "mdbreact";

export default function Students() {
  const [data, setData] = useState([]);

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

      setData(updatedData);
    };
  };
  console.log(data);

  return (
    <>
      <MDBCard narrow className="pb-3">
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Student Population</span>

          <form
            id="requirements-inline-search"
            // onSubmit={handleSearch}
            className="form-inline ml-2"
          >
            <div className="form-group py-0 mt-0">
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
                title="Upload File"
                htmlFor="uploadExcel"
              >
                <MDBIcon icon="upload" />
              </label>
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
            </div>
          </form>
        </MDBView>
        <MDBCardBody>
          <MDBTable responsive hover>
            {data.length > 0 ? (
              <>
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th className="th-lg" key={key}>
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, innerIndex) => (
                        <td key={innerIndex}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <tbody>
                <tr>
                  <td className="text-center">No file is uploaded yet!</td>
                </tr>
              </tbody>
            )}
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
