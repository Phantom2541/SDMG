// import DND from "../administrator/dnd";
import Announcements from "./socials/announcements";
// import Courses from "./resources/courses";
import Dashboard from "./dashboard";
import Employments from "./accounts/employments";
// import Enrollments from "./admissions/enrollments";
// import OrgCharts from "./orgCharts/orgchart";
// import Requirements from "./admissions/requirements";
import Rooms from "./resources/rooms";
// import Sections from "./resources/sections";
// import Subjects from "./resources/subjects";
import Violations from "./socials/violations";
import Basic from "./departments/basic";
import Advanced from "./departments/advanced";
import Employees from "./accounts/employees";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "Departments",
    icon: "university",
    path: "/departments",
    children: [
      {
        name: "Elementary",
        path: "/elementary",
        component: Basic,
      },
      {
        name: "Junior High",
        path: "/junior",
        // component: Advanced,
        // props: { departmentKey: "junior" },
      },
      {
        name: "Senior High",
        path: "/senior",
        component: Advanced,
        props: { departmentKey: "senior" },
      },
      {
        name: "College",
        path: "/college",
      },
    ],
  },
  {
    name: "Resources",
    icon: "boxes",
    path: "/resources",
    children: [
      {
        name: "Rooms",
        path: "/rooms",
        component: Rooms,
      },
      {
        name: "Books",
        path: "/books",
      },
    ],
  },
  {
    name: "Socials",
    icon: "bullhorn",
    path: "/socials",
    children: [
      {
        name: "Violations",
        path: "/violations",
        component: Violations,
      },
      {
        name: "Announcements",
        path: "/announcements",
        component: Announcements,
      },
    ],
  },
  {
    name: "Org Chart",
    icon: "sitemap",
    path: "/orgCharts",
    // component: OrgCharts,
  },
  {
    name: "Accounts",
    icon: "id-card-alt",
    path: "/accounts",
    children: [
      {
        name: "Job Seekers",
        path: "/seekers",
        component: Employments,
      },
      {
        name: "Employees",
        path: "/employees",
        component: Employees,
      },
      {
        name: "Students",
        path: "/students",
      },
    ],
  },
];

export default access;
