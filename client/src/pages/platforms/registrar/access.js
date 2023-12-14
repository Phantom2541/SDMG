import Dashboard from "./dashboard";
import Registrar from "./enrollees";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Enrollees",
    icon: "user",
    path: "/enrolless",
    component: Registrar,
  },
];

export default access;
