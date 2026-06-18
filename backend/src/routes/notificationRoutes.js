const express = require("express");

const router =
express.Router();

const {
getNotifications,
getNotificationById,
createNotification,
} =
require(
"../controllers/notificationController"
);

router.get(
"/",
getNotifications
);

router.get(
"/:id",
getNotificationById
);

router.post(
"/",
createNotification
);

module.exports = router;
