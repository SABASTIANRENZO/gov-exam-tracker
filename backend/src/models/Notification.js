const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: true,
      unique: true
    },

    organization: String,

    notificationDate: String,

    registrationStart: String,

    registrationEnd: String,

    examDate: String,

    resultDate: String,

    qualification: String,

    ageLimit: String,

    fees: String,

    pdfLink: String,

    officialLink: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);