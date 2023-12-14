const router = require("express").Router(),
  { browse, save, destroy } = require("../../controllers/Resources/Courses"),
  { validate } = require("../../middleware/jwt");

router
  .get("/browse", validate, browse)
  .post("/save", validate, save)
  .delete("/destroy", validate, destroy);

module.exports = router;
