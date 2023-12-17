import Dashboard from "./dashboard";
import Advisers from "./advisers";
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
    name: "Advisers",
    icon: "users",
    path: "/advisers",
    component: Advisers,
  },
  {
    name: "Students",
    icon: "users",
    path: "/students",
    // component: Sections,
  },
];

export default access;
