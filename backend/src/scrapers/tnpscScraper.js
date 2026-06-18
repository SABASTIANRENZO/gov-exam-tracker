const axios = require("axios");
const cheerio = require("cheerio");

const Notification = require("../models/Notification");
const User = require("../models/User");
const sendEmail = require("../services/emailService");

const scrapeTNPSC = async () => {
  try {

    console.log("TNPSC SCRAPER RUNNING");

    const url = "https://www.tnpsc.gov.in";

    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const notifications = [];

    $("a").each((index, element) => {

      const text = $(element).text().trim();

      const link = $(element).attr("href");

      if (
        text &&
        text.length > 30 &&
        (
          text.includes("EXAMINATION") ||
          text.includes("RECRUITMENT") ||
          text.includes("RESULT") ||
          text.includes("NOTIFICATION") ||
          text.includes("Press Release")
        )
      ) {

        notifications.push({
          examName: text,
          organization: "TNPSC",
          officialLink: link
            ? `https://www.tnpsc.gov.in/${link.replace("../", "")}`
            : "https://www.tnpsc.gov.in",
        });

      }

    });

    console.log(
      `Found ${notifications.length} notifications`
    );

    for (const item of notifications) {

      const exists =
        await Notification.findOne({
          examName: item.examName,
        });

      if (!exists) {

        await Notification.create(item);

        console.log(
          `Saved: ${item.examName}`
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
              "New TNPSC Notification",
              `Exam Name:
${item.examName}

Organization:
TNPSC

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
      "TNPSC Scraping Completed"
    );

  } catch (error) {

    console.error(
      "TNPSC Error:",
      error.message
    );

  }
};

module.exports = scrapeTNPSC;