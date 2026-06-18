require("dotenv").config();

const connectDB =
require("./src/config/db");

const scrapeSSC =
require("./src/scrapers/sscScraper");

const start = async () => {

  await connectDB();

  await scrapeSSC();

  process.exit();

};

start();