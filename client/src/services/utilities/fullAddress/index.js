import React from "react";

const fullAddress = (address, isComplete = true) => {
  if (typeof address !== "object") return <i>Datatype mismatch</i>;

  const { region, province, city, barangay, street } = address;

  if (isComplete)
    return `${street && `${street},`} ${
      barangay && `${barangay},`
    } ${city}, ${province}, ${region}`.replace(/^\s+|\s+$/gm, "");

  return `${city}, ${province}, ${region}`;
};

export default fullAddress;
