const mongoose = require("mongoose");

// file
// assets/enrollments/email/:batch/

const modelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    type: {
      type: String,
      enum: {
        values: [
          "new",
          "old",
          "transferee",
          "repeater",
          "shifter",
          "returning",
        ],
        message: "Please choose a valid type from the predefined options.",
      },
      default: "new",
    },
    department: {
      type: String,
    },
    gradeLvl: {
      type: Number,
      min: 1,
      max: 17,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sections",
    },
    batch: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "validated", "paid", "approved", "rejected"],
        message: "Please choose a valid type from the predefined options.",
      },
      default: "pending",
    },
    remarks: {
      type: String,
      default: "",
    },
    guardian: {
      relationship: {
        type: String,
      },
      fname: {
        type: String,
        trim: true,
      },
      lname: {
        type: String,
        trim: true,
      },
      mname: {
        type: String,
        trim: true,
      },
      suffix: {
        type: String,
        trim: true,
      },
      mobile: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Enrollments", modelSchema);

module.exports = Entity;
