import Dashboard from "./dashboard";
import Schools from "./schools";
import Sections from "./sections";
// import Employees from "./accounts/employees";
import Students from "./students";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Students",
    icon: "user",
    path: "/students",
    component: Students,
  },
  {
    name: "School",
    icon: "school",
    path: "/school",
    component: Schools,
  },
  {
    name: "Sections",
    icon: "newspaper",
    path: "/sections",
    component: Sections,
  },
];

export default access;
