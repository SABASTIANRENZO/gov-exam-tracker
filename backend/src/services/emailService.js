const nodemailer =
require("nodemailer");

console.log(
  "EMAIL_USER:",
  process.env.EMAIL_USER
);

const transporter =
nodemailer.createTransport({

  host:
    "smtp-relay.brevo.com",

  port: 587,

  secure: false,

  auth: {

    user:
      process.env.EMAIL_USER,

    pass:
      process.env.EMAIL_PASS,

  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,

});

const sendEmail = async (
  to,
  subject,
  text
) => {

  try {

    const info =
      await transporter.sendMail({

        from:
          "govexamtracker@gmail.com",

        to,

        subject,

        text,

      });

    console.log(
      `Email sent to ${to}`
    );

    console.log(
      "Message ID:",
      info.messageId
    );

  } catch (error) {

    console.error(
      "Email Error:",
      error.message
    );

    if (error.response) {

      console.error(
        "SMTP Response:",
        error.response
      );

    }

  }

};

module.exports =
sendEmail;