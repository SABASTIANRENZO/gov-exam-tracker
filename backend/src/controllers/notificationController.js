const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {

  try {

    const notifications =
      await Notification.find({});

    res.json(notifications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const getNotificationById =
async (req, res) => {

  try {

    const notification =
      await Notification.findById(
        req.params.id
      );

    if (!notification) {

      return res.status(404).json({
        message:
          "Notification not found",
      });

    }

    res.json(notification);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const createNotification =
async (req, res) => {

  try {

    const notification =
      await Notification.create(
        req.body
      );

    res.status(201).json(
      notification
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getNotifications,
  getNotificationById,
  createNotification,
};