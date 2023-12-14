const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },
    gradeLvl: {
      type: Number,
      required: true,
    },
    hours: {
      type: Number,
    },
    semester: {
      type: Number,
    },
    position: {
      type: Number,
      required: true,
    },

    // for shs
    curriculum: {
      type: String,
      enum: {
        values: ["core", "contextualized", "specialization"],
        message: "Please choose a valid type from the predefined options.",
      },
    },

    // for college
    abbreviation: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    code: {
      type: String,
    },
    isMajor: {
      type: Boolean,
    },
    units: {
      type: Number,
      min: 1,
      max: 5,
    },
    lab: {
      type: Number,
    },
    lec: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Subjects", modelSchema);

module.exports = Entity;
