require("dotenv").config();

const sendEmail =
require("./src/services/emailService");

sendEmail(
  "marcian@gmail.com",
  "Test Notification",
  "Government Exam Tracker Working"
);