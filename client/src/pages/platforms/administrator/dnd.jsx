import React, { useState } from "react";

export default function DND() {
  const [listItems, setListItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
  ]);

  const [tableItems, setTableItems] = useState([
    { id: 6, name: "Initial Item" }, // Add an initial item here
  ]);

  const handleDragStart = (e, item, source) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ item, source }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const { item, source } = JSON.parse(data);

    if (source === "list") {
      // Add the dragged item to the tableItems
      setTableItems((prevItems) => [...prevItems, item]);

      // Remove the dragged item from listItems
      setListItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    } else if (source === "table") {
      // Add the dragged item to the listItems
      setListItems((prevItems) => [...prevItems, item]);

      // Remove the dragged item from tableItems
      setTableItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    }
  };

  return (
    <div>
      <ul
        className="list-group"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e)}
      >
        {listItems.map((item) => (
          <li
            key={item.id}
            onDragStart={(e) => handleDragStart(e, item, "list")}
            draggable
          >
            {item.name}
          </li>
        ))}
      </ul>

      <table
        className="table"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e)}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td style={{ whiteSpace: "pre" }}>{whiteSpace("CORE SUBJECTS")}</td> */}
          </tr>
          {tableItems.map((item) => (
            <tr
              key={item.id}
              onDragStart={(e) => handleDragStart(e, item, "table")}
              draggable
            >
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
