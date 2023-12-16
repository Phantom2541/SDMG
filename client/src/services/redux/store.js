import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import users from "./slices/users";
import violations from "./slices/violations";
import announcements from "./slices/announcements";
import requirements from "./slices/admissions/requirements";
import rooms from "./slices/resources/rooms";
import subjects from "./slices/resources/subjects";
import schools from "./slices/resources/schools";
import sections from "./slices/resources/sections";
import employments from "./slices/admissions/employments";
import courses from "./slices/resources/courses";
import enrollments from "./slices/admissions/enrollments";

const store = configureStore({
  reducer: {
    employments,
    enrollments,
    auth,
    users,
    violations,
    announcements,
    requirements,
    rooms,
    subjects,
    sections,
    courses,
    schools,
  },
});

export default store;
