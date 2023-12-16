import Dashboard from "./dashboard";
import Schools from "./schools";
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
    icon: "tachometer-alt",
    path: "/school",
    component: Schools,
  },
];

export default access;
