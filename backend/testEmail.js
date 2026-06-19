require("dotenv").config();

const sendEmail =
require("./src/services/emailService");

sendEmail(
  "22cs064@gmail.com",
  "Test Email",
  "Testing Gmail SMTP"
);