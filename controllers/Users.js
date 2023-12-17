const Entity = require("../models/Users"),
  Employments = require("../models/Advisers"),
  handleDuplicate = require("../config/duplicate"),
  handleQuery = require("../config/query"),
  bulkWrite = require("../config/bulkWrite");

const baseUpdate = ({ body }, res, message) =>
  Entity.findByIdAndUpdate(body._id, body, {
    new: true,
  })
    .select("-password -__v")
    .then((payload) => {
      if (payload) {
        res.json({
          success: message,
          payload,
        });
      } else {
        res.status(404).json({
          error: "ID Not Found",
          message: "The provided ID does not exist.",
        });
      }
    })
    .catch((error) => res.status(400).json({ error: handleDuplicate(error) }));

exports.find = ({ query }, res) =>
  Entity.find(handleQuery(query))
    .select("-__v -password")
    .sort({ createdAt: -1 })
    .lean()
    .then((payload) =>
      res.json({
        success: "Users Found Successfully",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));

exports.update = (req, res) => {
  if (Array.isArray(req.body)) {
    bulkWrite(req, res, Entity, "Multiple Users Updated Successfully");
  } else {
    baseUpdate(req, res, "User Updated Successfully");
  }
};

exports.save = ({ body }, res) =>
  Entity.create(body)
    .then(async (payload) => {
      const { role, position } = body;

      if (role) {
        const EntityMap = {
          student: Enrollments,
          employee: Employments,
        };

        await EntityMap[role].create({ user: payload._id, position });
      }

      res.status(201).json({
        success: "Registration Success, Proceed to Login",
      });
    })
    .catch((error) => res.status(400).json({ error: handleDuplicate(error) }));
