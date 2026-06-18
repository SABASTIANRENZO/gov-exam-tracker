const axios = require("axios");
const cheerio = require("cheerio");

const Notification = require("../models/Notification");
const User = require("../models/User");
const sendEmail = require("../services/emailService");

const scrapeUPSC = async () => {
  try {

    const url = "https://www.upsc.gov.in";

    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const notifications = [];

    $("a").each((index, element) => {

      const text = $(element).text().trim();

      const link = $(element).attr("href");

      if (
        text &&
        text.length > 20
      ) {

        notifications.push({
          examName: text,
          organization: "UPSC",
          officialLink:
            link
              ? (
                  link.startsWith("http")
                    ? link
                    : `https://www.upsc.gov.in${link}`
                )
              : "https://www.upsc.gov.in",
        });

      }

    });

    console.log(
      `UPSC Found ${notifications.length} notifications`
    );

    for (const item of notifications) {

      const exists = await Notification.findOne({
        examName: item.examName,
      });

      if (!exists) {

        await Notification.create(item);

        console.log(
          `UPSC Saved: ${item.examName}`
        );

        const users =
          await User.find({});

        for (const user of users) {

          const matched =
            user.preferences &&
            user.preferences.some(
              (pref) =>
                item.examName
                  .toUpperCase()
                  .includes(
                    pref.toUpperCase()
                  )
            );

          if (matched) {

            await sendEmail(
              user.email,
              "New UPSC Notification",
              `Exam Name:
${item.examName}

Organization:
UPSC

Link:
${item.officialLink}`
            );

            console.log(
              `Email sent to ${user.email}`
            );

          }

        }

      }

    }

    console.log(
      "UPSC Scraping Completed"
    );

  } catch (error) {

    console.error(
      "UPSC Error:",
      error.message
    );

  }
};

module.exports = scrapeUPSC;