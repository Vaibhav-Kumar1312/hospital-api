const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    createdByDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Negative",
        "Travelled-Quarantine",
        "Symptoms-Quarantine",
        "Positive-admit",
      ],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
