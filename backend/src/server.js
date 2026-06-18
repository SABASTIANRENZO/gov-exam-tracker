require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB =
require("./config/db");

const notificationRoutes =
require("./routes/notificationRoutes");

const userRoutes =
require("./routes/userRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const startScraperJob =
require("./jobs/scraperJob");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.get("/", (req, res) => {

  res.send(
    "Government Exam Tracker API"
  );

});

const PORT =
process.env.PORT || 5000;

const startServer =
async () => {

  try {

    await connectDB();

    startScraperJob();

    app.listen(
      PORT,
      () => {

        console.log(
          `Server running on port ${PORT}`
        );

      }
    );

  } catch (error) {

    console.error(
      "Server Error:",
      error.message
    );

  }

};

startServer();