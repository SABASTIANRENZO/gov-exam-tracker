const Notification = require("../models/Notification");

const getDashboard = async (req, res) => {
  try {

    const totalNotifications =
      await Notification.countDocuments();

    const tnpsc =
      await Notification.countDocuments({
        organization: "TNPSC",
      });

    const upsc =
      await Notification.countDocuments({
        organization: "UPSC",
      });

    const ssc =
      await Notification.countDocuments({
        organization: "SSC",
      });

    res.json({
      totalNotifications,
      tnpsc,
      upsc,
      ssc,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getDashboard,
};