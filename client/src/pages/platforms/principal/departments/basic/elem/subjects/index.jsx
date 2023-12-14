import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

export default function Subjects() {
  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th>Name</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>Math</td>
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
}
