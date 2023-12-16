const router = require("express").Router(),
  {
    browse,
    save,
    update,
    destroy,
  } = require("../../controllers/Resources/Schools"),
  { validate } = require("../../middleware/jwt");

router
  .get("/browse", validate, browse)
  .post("/save", validate, save)
  .put("/update", validate, update)
  .delete("/destroy", validate, destroy);

module.exports = router;
