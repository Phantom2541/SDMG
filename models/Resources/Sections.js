const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: Number,
      min: 1,
      max: 17,
      required: true,
    },
    course: {
      type: String,
    },
    adviser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schools",
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Sections", modelSchema);

module.exports = Entity;
