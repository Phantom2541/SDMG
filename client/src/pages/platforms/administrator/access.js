import Dashboard from "./dashboard";
import Schools from "./schools";
import Students from "./students";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "School",
    icon: "school",
    path: "/school",
    component: Schools,
  },
  {
    name: "Students",
    icon: "user",
    path: "/students",
    component: Students,
  },
];

export default access;
