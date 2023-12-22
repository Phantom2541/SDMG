import Students from "./students";
import Dashboard from "./dashboard";
import Affiliated from "./affiliated";

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
  {
    name: "Affailiated",
    icon: "users",
    path: "/affiliated",
    component: Affiliated,
  },
];

export default access;
