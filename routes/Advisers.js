const router = require("express").Router(),
  {
    browse,
    save,
    update,
    teachers,
    faculty,
    employees,
  } = require("../controllers/Advisers"),
  { validate } = require("../middleware/jwt");

router
  .get("/browse",  browse)
  .get("/employees", validate, employees)
  .get("/faculty", validate, faculty)
  // .get("/teachers", validate, teachers)
  .post("/save", validate, save)
  .put("/update", validate, update);

module.exports = router;
