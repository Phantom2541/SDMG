const Entity = require("../models/Advisers");
const Schools = require("../models/Resources/Schools");
exports.save = (req, res) => {
  const { name, gradeLvl, department } = req.body;

  if (!name || !gradeLvl || !department)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "Department, Name and Grade level are required.",
    });

  Entity.findOne({ gradeLvl, department, name }).then((existing) => {
    if (existing)
      return res.status(409).json({
        error: "Duplicate Entry",
        message: `${name} is already used by ${department} ${gradeLvl}`,
      });

    Entity.create(req.body)
      .then(async (payload) => {
        let affectedSection = undefined;

        res.status(201).json({
          success: "Section Added Successfully.",
          payload: { ...payload._doc },
          affectedSection,
        });
      })
      .catch((error) => res.status(400).json({ error: error.message }));
  });
};

exports.browse = (req, res) => {
  // gawa ni darrel
  Entity.find({ user: req.query.adviser })
    .populate({ path: "schools" })
    .then((payload) => {
      const adviser = payload[0];
      // para icheck kung may school naba siya
      if (adviser.schools) {
        res.json({
          payload: {
            schools: adviser.schools,
            hasSchool: true,
          },
        });
      } else {
        Schools.find()
          .then((schools) =>
            res.json({ payload: { schools, hasSchool: false } })
          )
          .catch((error) => res.status(400).json({ error: error.message }));
      }
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.update = (req, res) => {
  Entity.findOneAndUpdate({ user: req.body.adviser }, req.body, {
    new: true,
  })
    .then(async (payload) => {
      if (!payload)
        return res.status(404).json({
          error: "Invalid ID.",
          message: "ID Not Found.",
        });

      res.json({
        success: "School Saved Successfully.",
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};
exports.destroy = (req, res) =>
  Entity.findByIdAndDelete(req.body._id)
    .then((payload) => {
      if (!payload)
        return res.status(404).json({
          error: "Invalid ID.",
          message: "ID Not Found.",
        });

      res.json({
        success: "Section Deleted Successfully.",
        payload,
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));

exports.getAll = (req, res) => {
  const { batch } = req.query;

  if (!batch)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "Batch is required.",
    });

  Entity.find()
    .select("-createdAt -updatedAt -__v")
    .sort({ createdAt: -1 })
    .lean()
    .then(async (sections) => {
      const payload = sections;

      res.json({
        success: "All Sections Fetched Successfully.",
        payload,
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};
