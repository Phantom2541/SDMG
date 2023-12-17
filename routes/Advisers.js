const router = require("express").Router(),
  { browse, save, update, advisers } = require("../controllers/Advisers"),
  { validate } = require("../middleware/jwt");

router
  .get("/browse", validate, browse)
  .get("/advisers", validate, advisers)
  .post("/save", validate, save)
  .put("/update", validate, update);

module.exports = router;
