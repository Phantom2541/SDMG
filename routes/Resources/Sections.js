const router = require("express").Router(),
  {
    browse,
    save,
    update,
    destroy,
    getAll,
  } = require("../../controllers/Resources/Sections"),
  { validate } = require("../../middleware/jwt");

router
  .get("/browse", validate, browse)
  .get("/getAll", validate, getAll)
  .post("/save", validate, save)
  .put("/update", validate, update)
  .delete("/destroy", validate, destroy);

module.exports = router;
