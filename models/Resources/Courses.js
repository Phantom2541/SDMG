const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    pk: {
      type: Number,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      enum: {
        values: ["junior", "senior", "college"],
        message: "Please choose a valid type from the predefined options.",
      },
      required: true,
    },
    degreeProgram: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Courses", modelSchema);

module.exports = Entity;
