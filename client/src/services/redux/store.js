import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import users from "./slices/users";
import violations from "./slices/violations";
import announcements from "./slices/announcements";
import requirements from "./slices/admissions/requirements";
import rooms from "./slices/resources/rooms";
import subjects from "./slices/resources/subjects";
import sections from "./slices/resources/sections";
import employments from "./slices/admissions/employments";
import courses from "./slices/resources/courses";
import enrollments from "./slices/admissions/enrollments";
import students from "./slices/resources/students";

const store = configureStore({
  reducer: {
    students,
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
  },
});

export default store;
