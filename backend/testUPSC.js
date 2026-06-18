require("dotenv").config();

const connectDB =
require("./src/config/db");

const scrapeUPSC =
require("./src/scrapers/upscScraper");

const start = async () => {

  await connectDB();

  await scrapeUPSC();

  process.exit();

};

start();