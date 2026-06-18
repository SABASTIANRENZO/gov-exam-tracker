const axios = require("axios");
const Notification = require("../models/Notification");
const User = require("../models/User");
const sendEmail = require("../services/emailService");

const scrapeSSC = async () => {
  try {

    const url =
      "https://ssc.gov.in/api/general-website/portal/notice-boards?page=1&limit=50&contentType=notice-boards&key=createdAt&order=DESC&isAttachment=true&language=english&attributes=id,headline,examId,contentType,redirectUrl,startDate,endDate,language,createdAt";

    const response = await axios.get(url);

    const notices =
      response.data?.data ||
      response.data ||
      [];

    console.log(
      `SSC API returned ${notices.length} notices`
    );

    for (const notice of notices) {

      const examName =
        notice.headline?.trim();

      if (!examName) continue;

      const notificationData = {
        examName,
        organization: "SSC",
        officialLink:
          notice.redirectUrl
            ? (
                notice.redirectUrl.startsWith("http")
                  ? notice.redirectUrl
                  : `https://ssc.gov.in${notice.redirectUrl}`
              )
            : "https://ssc.gov.in",
      };

      const exists =
        await Notification.findOne({
          examName,
        });

      if (!exists) {

        await Notification.create(
          notificationData
        );

        console.log(
          `SSC Saved: ${examName}`
        );

        const users =
          await User.find({});

        console.log(
          `Checking ${users.length} users`
        );

        for (const user of users) {

          const matched =
            user.preferences &&
            user.preferences.some(
              (pref) =>
                notificationData.examName
                  .toUpperCase()
                  .includes(
                    pref.toUpperCase()
                  )
            );

          if (matched) {

            await sendEmail(
              user.email,
              "New SSC Notification",
              `Exam Name:
${notificationData.examName}

Organization:
SSC

Link:
${notificationData.officialLink}`
            );

            console.log(
              `Email sent to ${user.email}`
            );

          }

        }

      }

    }

    console.log(
      "SSC Scraping Completed"
    );

  } catch (error) {

    console.error(
      "SSC Error:",
      error.response?.data ||
      error.message
    );

  }
};

module.exports = scrapeSSC;