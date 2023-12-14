// import Announcements from "../principal/socials/announcements";
// import Enrollments from "../principal/admissions/enrollments";
// import OrgCharts from "../principal/orgCharts/orgchart";
// import Requirements from "../principal/accounts/requirements";
// import Rooms from "../principal/resources/rooms";
// import Sections from "../principal/resources/sections";
// import Subjects from "../principal/resources/subjects";
// import Violations from "../principal/socials/violations";
import Dashboard from "./dashboard";
// import DND from "../administrator/dnd";
// import Courses from "../principal/resources/courses";
// import EmploymentLists from "../principal/admissions/employments";

const access = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
    component: Dashboard,
  },
  // {
  //   name: "DND",
  //   path: "/dnd",
  //   component: DND,
  // },
  // {
  //   name: "Resources",
  //   icon: "boxes",
  //   path: "/resources",
  //   children: [
  //     {
  //       name: "Courses",
  //       path: "/courses",
  //       // component: Courses,
  //     },
  //     {
  //       name: "Subjects",
  //       icon: "book-open",
  //       path: "/subjects",
  //       component: Subjects,
  //     },
  //     {
  //       name: "Rooms",
  //       path: "/rooms",
  //       component: Rooms,
  //     },
  //     {
  //       name: "Sections",
  //       path: "/sections",
  //       component: Sections,
  //     },
  //   ],
  // },
  // {
  //   name: "Admissions",
  //   icon: "user-tie",
  //   path: "/lists",
  //   children: [
  //     {
  //       name: "Enrollment Requirements",
  //       path: "/requirements",
  //       component: Requirements,
  //     },
  //     {
  //       name: "Enrollments",
  //       path: "/enrollmentLists",
  //       component: Enrollments,
  //     },
  //     {
  //       name: "Employments",
  //       path: "/employments",
  //       component: EmploymentLists,
  //     },
  //   ],
  // },
  // {
  //   name: "Socials",
  //   icon: "bullhorn",
  //   path: "/socials",
  //   children: [
  //     {
  //       name: "Violations",
  //       path: "/violations",
  //       component: Violations,
  //     },
  //     {
  //       name: "Announcements",
  //       path: "/announcements",
  //       component: Announcements,
  //     },
  //   ],
  // },
  // {
  //   name: "Org Chart",
  //   icon: "sitemap",
  //   path: "/orgCharts",
  //   // component: OrgCharts,
  // },
  // {
  //   name: "Accounts",
  //   icon: "id-card-alt",
  //   path: "/accounts",
  //   children: [
  //     {
  //       name: "Employees",
  //       path: "/employees",
  //     },
  //     {
  //       name: "Students",
  //       path: "/students",
  //     },
  //   ],
  // },
];

export default access;
