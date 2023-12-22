const router = require("express").Router(),
  { browse, update } = require("../controllers/affiliated"),
  { validate } = require("../middleware/jwt");

router.put("/update", validate, update).get("/browse", browse);

module.exports = router;
