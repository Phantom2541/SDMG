const fullName = (fullname, isComplete = false) => {
  if (typeof fullname !== "object" || !fullname.fname || !fullname.lname)
    return "N/A";

  const { fname, mname = "", lname, suffix = "" } = fullname;

  let middleName = mname;

  if (mname && !isComplete) {
    middleName = `${mname
      .split(" ")
      .map((middle) => middle.charAt(0).toUpperCase())
      .join("")}.`;
  }

  return `${lname}, ${fname}${suffix && ` ${suffix}`}${
    mname && `, ${middleName}`
  }`.replace(/^\s+|\s+$/gm, "");
};

export default fullName;
