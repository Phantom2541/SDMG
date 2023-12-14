import Dashboard from "./dashboard";
import Employment from "./employment";
import Enrollment from "./enrollment";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Employee",
    icon: "user-secret",
    path: "/employee",
    component: Employment,
  },
  {
    name: "Student",
    icon: "user-graduate",
    path: "/student",
    component: Enrollment,
  },
  {
    name: "Guardian",
    icon: "user-shield",
    path: "/guardian",
  },
];

export default access;
