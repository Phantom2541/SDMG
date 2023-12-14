import Enrollees from "../../../components/enrollees";
import Dashboard from "./dashboard";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Enrollees",
    icon: "users",
    path: "/cashier-enrollees",
    component: Enrollees,
    props: { status: "validated" },
  },
];

export default access;
