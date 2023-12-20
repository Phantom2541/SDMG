const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    schools: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schools",
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sections",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byUser = function (user) {
  return this.where({ user });
};
modelSchema.query.bySchool = function (school) {
  return this.where({ school });
};
modelSchema.query.bySection = function (section) {
  return this.where({ section });
};

const Entity = mongoose.model("Students", modelSchema);

module.exports = Entity;
