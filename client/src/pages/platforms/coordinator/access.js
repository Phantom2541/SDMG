import Dashboard from "./dashboard";
import Employees from "./employees";
import Sections from "./sections";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Sections",
    icon: "sitemap",
    path: "/sections",
    component: Sections,
  },
  {
    name: "Employees",
    icon: "users",
    path: "/employees",
    component: Employees,
  },
  {
    name: "Students",
    icon: "users",
    path: "/students",
    // component: Sections,
  },
];

export default access;
