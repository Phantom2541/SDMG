import { Departments } from "../../fakeDb";

const formatGradeLvl = (department, id, isShort = false) => {
  const { name, abbreviation } = Departments.find(department);

  if (department !== "college") return `${isShort ? abbreviation : name} ${id}`;

  const level = id - 13;

  const sup = ["st", "nd", "rd"];

  return `${level + 1}${sup[level] || "th"} Year ${name}`;
};

export default formatGradeLvl;
