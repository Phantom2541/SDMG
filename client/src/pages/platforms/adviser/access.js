import Students from "./students";
import Dashboard from "./dashboard";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Advisory",
    icon: "users",
    path: "/advisory",
    component: Students,
  },
];

export default access;
