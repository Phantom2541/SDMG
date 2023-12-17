import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import users from "./slices/users";
import violations from "./slices/violations";
import announcements from "./slices/announcements";
import rooms from "./slices/resources/rooms";
import subjects from "./slices/resources/subjects";
import schools from "./slices/resources/schools";
import sections from "./slices/resources/sections";
import adviser from "./slices/adviser";
import courses from "./slices/resources/courses";
import students from "./slices/resources/students";

const store = configureStore({
  reducer: {
    students,
    adviser,
    auth,
    users,
    violations,
    announcements,
    rooms,
    subjects,
    sections,
    courses,
    schools,
  },
});

export default store;
