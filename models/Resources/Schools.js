const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    abbreviation: {
      type: String,
    },
    logo: {
      type: String,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      barangay: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
      },
      province: {
        type: String,
      },
      region: {
        type: String,
      },
      zip: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Schools", modelSchema);

module.exports = Entity;
