import Dashboard from "./dashboard";
import Enrollment from "./enrollment";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Enrollment",
    icon: "th-list",
    path: "/enrollment",
    component: Enrollment,
  },
];

export default access;
