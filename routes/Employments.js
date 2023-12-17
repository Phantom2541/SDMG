const router = require("express").Router(),
  {
    save,
    update,
    teachers,
    faculty,
    employees,
  } = require("../controllers/Employments"),
  { validate } = require("../middleware/jwt");

router
  .get("/browse", validate, browse)
  .get("/employees", validate, employees)
  .get("/faculty", validate, faculty)
  .get("/teachers", validate, teachers)
  .post("/save", validate, save)
  .put("/update", validate, update);

module.exports = router;
