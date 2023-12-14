const router = require("express").Router(),
  {
    browse,
    save,
    update,
    teachers,
    faculty,
    employees,
  } = require("../../controllers/Admissions/Employments"),
  { validate } = require("../../middleware/jwt");

router
  .get("/browse", validate, browse)
  .get("/employees", validate, employees)
  .get("/faculty", validate, faculty)
  .get("/teachers", validate, teachers)
  .post("/save", validate, save)
  .put("/update", validate, update);

module.exports = router;
