const mongoose = require("mongoose");

// files
// assets/employments/email/

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
    position: {
      type: String,
    },
    access: {
      type: String,
      enum: {
        values: ["COORDINATOR", "ADVISER"],
        message: "Please choose a valid type from the predefined options.",
      },
      default: "OTHERS",
    },
    department: {
      type: String,
    },
    emergencyContact: {
      primary: {
        name: {
          type: String,
          trim: true,
        },
        relationship: {
          type: String,
          trim: true,
        },
        mobile: {
          type: String,
          trim: true,
        },
      },
      secondary: {
        name: {
          type: String,
          trim: true,
        },
        relationship: {
          type: String,
          trim: true,
        },
        mobile: {
          type: String,
          trim: true,
        },
      },
    },
    isEnrollmentTeacher: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message: "Please choose a valid type from the predefined options.",
      },
      default: "pending",
    },
    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
modelSchema.query.bySchool = function (school) {
  return this.where({ school });
};

const Entity = mongoose.model("Advisers", modelSchema);

module.exports = Entity;
