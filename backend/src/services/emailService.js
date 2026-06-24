const nodemailer =
require("nodemailer");

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

});

const sendEmail = async (
  to,
  subject,
  text
) => {

  try {

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

  } catch (error) {

    console.error(
      "Email Error:",
      error.message
    );

    throw error;

  }

};

module.exports =
sendEmail;