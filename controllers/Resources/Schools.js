const Entity = require("../../models/Resources/Schools");
const Advisers = require("../../models/Advisers");
exports.save = (req, res) => {
  // gawa ni darrel
  Entity.create(req.body)
    .then((payload) =>
      res.status(200).json({
        success: "Successfully Saved School",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));

  // eto yung dati
  // const { name, gradeLvl, department } = req.body;

  // if (!name || !gradeLvl || !department)
  //   return res.status(400).json({
  //     error: "Invalid Parameters",
  //     message: "Department, Name and Grade level are required.",
  //   });

  // Entity.findOne({ gradeLvl, department, name }).then((existing) => {
  //   if (existing)
  //     return res.status(409).json({
  //       error: "Duplicate Entry",
  //       message: `${name} is already used by ${department} ${gradeLvl}`,
  //     });

  //   Entity.create(req.body)
  //     .then(async (payload) => {
  //       let affectedSection = undefined;

  //       res.status(201).json({
  //         success: "Section Added Successfully.",
  //         payload: { ...payload._doc },
  //         affectedSection,
  //       });
  //     })
  //     .catch((error) => res.status(400).json({ error: error.message }));
  // });
};

exports.coordinator = (_, res) => {
  Advisers.find({ position: "COORDINATOR", status: "approved" })
    .populate({ path: "user" })
    .then((payload) => {
      const coordinator = payload.map((p) => p.user);
      res.json({ payload: coordinator });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.browse = (req, res) => {
  Entity.find()
    .select("-createdAt -updatedAt -__v")
    .populate({
      path: "coordinator",
      select: "fullName",
    })
    .sort({ createdAt: -1 })
    .lean()
    .then((payload) =>
      res.json({
        success: "Sections Fetched Successfully.",
        payload: payload.map((section) => ({
          ...section,
        })),
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.update = (req, res) => {
  // gawa ni darrel
  const { coordinator, school } = req.body;
  if (!coordinator || !school)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "coordinator, school are required.",
    });

  Entity.findByIdAndUpdate(school, req.body, {
    new: true,
  })
    .populate({ path: "coordinator" })
    .then((payload) =>
      res.json({ success: "Successfully Assign Coordinator", payload })
    )
    .catch((error) => res.status(400).json({ error: error.message }));

  // Entity.findByIdAndUpdate(req.body._id, req.body, {
  //   new: true,
  // })
  //   .populate({
  //     path: "adviser",
  //     select: "user",
  //     populate: {
  //       path: "user",
  //       select: "fullName",
  //     },
  //   })
  //   .then(async (payload) => {
  //     if (!payload)
  //       return res.status(404).json({
  //         error: "Invalid ID.",
  //         message: "ID Not Found.",
  //       });
  //     let adviser = undefined,
  //       affectedSection = undefined;
  //     if (payload.adviser) {
  //       const { adviser: _adviser } = payload;
  //       const duplicateAdviser = await Entity.findOne({
  //         adviser: _adviser._id,
  //         _id: { $ne: payload._id },
  //       });
  //       if (duplicateAdviser) {
  //         affectedSection = await Entity.findByIdAndUpdate(
  //           duplicateAdviser._id,
  //           { adviser: null },
  //           { new: true }
  //         );
  //       }
  //       adviser = {
  //         _id: _adviser._id,
  //         fullName: _adviser?.user?.fullName,
  //       };
  //     }
  //     res.json({
  //       success: "Section Updated Successfully.",
  //       payload: { ...payload._doc, adviser },
  //       affectedSection,
  //     });
  //   })
  //   .catch((error) => res.status(400).json({ error: error.message }));
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
