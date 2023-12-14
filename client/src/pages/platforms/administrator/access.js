import Dashboard from "./dashboard";
// import Employees from "./accounts/employees";
import Students from "./students";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Students",
    icon: "user",
    path: "/students",
    component: Students,
  },
  // {
  //   name: "Accounts",
  //   icon: "users",
  //   path: "/accounts",
  //   children: [
  //     {
  //       name: "Employees",
  //       path: "/employees",
  //       component: Employees,
  //       props: {
  //         query: {
  //           access: JSON.stringify({ $nin: ["ADMINISTRATOR"] }),
  //           isPublished: true,
  //         },
  //       },
  //     },
  //     {
  //       name: "Students",
  //       path: "/students",
  //     },
  //   ],
  // },
];

export default access;
