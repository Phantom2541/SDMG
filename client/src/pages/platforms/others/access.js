import Dashboard from "./dashboard";
import Employment from "./employment";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Employment",
    icon: "th-list",
    path: "/employment",
    component: Employment,
  },
];

export default access;
