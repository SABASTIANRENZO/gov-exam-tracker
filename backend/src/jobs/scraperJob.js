const cron = require("node-cron");

const scrapeTNPSC =
require("../scrapers/tnpscScraper");

const scrapeUPSC =
require("../scrapers/upscScraper");

const scrapeSSC =
require("../scrapers/sscScraper");

const startScraperJob = () => {

  cron.schedule(
    "0 * * * *",
    async () => {

      console.log(
        "Running Scheduled Scrapers..."
      );

      await scrapeTNPSC();

      await scrapeUPSC();

      await scrapeSSC();

      console.log(
        "Scheduled Scraping Completed"
      );

    }
  );

};

module.exports =
startScraperJob;