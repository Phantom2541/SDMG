import Dashboard from "./dashboard";
import Employees from "./accounts/employees";
import Schools from "./schools";
const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Accounts",
    icon: "users",
    path: "/accounts",
    children: [
      {
        name: "Employees",
        path: "/employees",
        component: Employees,
        props: {
          query: {
            access: JSON.stringify({ $nin: ["ADMINISTRATOR"] }),
            isPublished: true,
          },
        },
      },
      {
        name: "Students",
        path: "/students",
      },
    ],
  },
  {
    name: "School",
    icon: "tachometer-alt",
    path: "/school",
    component: Schools,
  },
];

export default access;
