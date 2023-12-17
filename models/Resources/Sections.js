const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gradeLvl: {
      type: Number,
      min: 1,
      max: 17,
      required: true,
    },
    department: {
      type: String,
    },
    // course: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Courses",
    // },
    adviser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Advisers",
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Sections", modelSchema);

module.exports = Entity;
