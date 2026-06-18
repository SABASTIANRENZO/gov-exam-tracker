require("dotenv").config();

const connectDB =
  require("./src/config/db");

const scrapeTNPSC =
  require("./src/scrapers/tnpscScraper");

const start = async () => {
  try {
    await connectDB();

    await scrapeTNPSC();

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

start();