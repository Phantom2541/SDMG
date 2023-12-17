const Entity = require("../../models/Resources/Sections"),
  Advisers = require("../../models/Advisers");

exports.browse = (req, res) => {
  const { schools } = req.query;

  if (!schools)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "Schools are required.",
    });

  Entity.find({ schools })
    .select("-createdAt -updatedAt -__v")
    .populate({
      path: "adviser",
      select: "user",
      populate: {
        path: "user",
        select: "fullName",
      },
    })
    // .populate({
    //   path: "course",
    //   select: "pk",
    // })
    .sort({ createdAt: -1 })
    .lean()
    .then((payload) =>
      res.json({
        success: "Sections Fetched Successfully.",
        payload: payload.map((section) => ({
          ...section,
          adviser: {
            _id: section.adviser?._id,
            fullName: section?.adviser?.user?.fullName,
          },
        })),
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));
};
exports.save = (req, res) => {
  const { adviser, name, gradeLvl, department } = req.body;

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
        let _adviser = undefined,
          affectedSection = undefined;

        if (adviser) {
          const duplicateAdviser = await Entity.findOne({
            adviser,
            _id: { $ne: payload._id }, //exclude id
          });

          if (duplicateAdviser) {
            affectedSection = await Entity.findByIdAndUpdate(
              duplicateAdviser._id,
              { adviser: null },
              { new: true }
            );
          }

          const employment = await Advisers.findById(adviser).populate({
            path: "user",
            select: "fullName",
          });

          _adviser = {
            _id: employment._id,
            fullName: employment?.user?.fullName,
          };
        }

        res.status(201).json({
          success: "Section Added Successfully.",
          payload: { ...payload._doc, adviser: _adviser },
          affectedSection,
        });
      })
      .catch((error) => res.status(400).json({ error: error.message }));
  });
};
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  })
    .populate({
      path: "adviser",
      select: "user",
      populate: {
        path: "user",
        select: "fullName",
      },
    })
    .then(async (payload) => {
      if (!payload)
        return res.status(404).json({
          error: "Invalid ID.",
          message: "ID Not Found.",
        });

      let adviser = undefined,
        affectedSection = undefined;

      if (payload.adviser) {
        const { adviser: _adviser } = payload;
        const duplicateAdviser = await Entity.findOne({
          adviser: _adviser._id,
          _id: { $ne: payload._id },
        });

        if (duplicateAdviser) {
          affectedSection = await Entity.findByIdAndUpdate(
            duplicateAdviser._id,
            { adviser: null },
            { new: true }
          );
        }

        adviser = {
          _id: _adviser._id,
          fullName: _adviser?.user?.fullName,
        };
      }

      res.json({
        success: "Section Updated Successfully.",
        payload: { ...payload._doc, adviser },
        affectedSection,
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));

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
    .populate({
      path: "adviser",
      select: "user",
      populate: {
        path: "user",
        select: "fullName",
      },
    })
    .sort({ createdAt: -1 })
    .lean()
    .then(async (sections) => {
      const payload = [];

      for (const section of sections) {
        const count = await Enrollments.countDocuments({
          section: section._id,
          status: "approved",
          batch: JSON.parse(batch),
        });

        payload.push({
          ...section,
          adviser: {
            _id: section?.adviser?._id,
            fullName: section?.adviser?.user?.fullName,
          },
          count,
        });
      }

      res.json({
        success: "All Sections Fetched Successfully.",
        payload,
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};
