const Entity = require("../../models/Resources/Courses"),
  handleDuplicate = require("../../config/duplicate");

exports.save = (req, res) =>
  Entity.create(req.body)
    .then((payload) =>
      res.status(201).json({
        success: `${
          payload.department === "college" ? "Course" : "Strand"
        } Added Successfully.`,
        payload,
      })
    )
    .catch((error) =>
      res
        .status(400)
        .json({
          error: handleDuplicate(
            error,
            `Duplicate ${
              req.body.department === "college" ? "Course" : "Strand"
            } Entry`
          ),
        })
    );

exports.browse = (req, res) => {
  const { department } = req.query;

  if (!department)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "Department is required.",
    });

  Entity.find(req.query)
    .select("-createdAt -updatedAt -__v")
    .sort({ createdAt: -1 })
    .lean()
    .then((payload) =>
      res.json({
        success: `${
          department === "college" ? "Courses" : "Strands"
        } Fetched Successfully.`,
        payload,
      })
    )
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
        success: `${
          payload.department === "college" ? "Course" : "Strand"
        } Deleted Successfully.`,
        payload,
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
