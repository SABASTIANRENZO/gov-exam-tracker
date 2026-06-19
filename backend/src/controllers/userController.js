const User = require("../models/User");
const Notification = require("../models/Notification");
const sendEmail = require("../services/emailService");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const exists = await User.findOne({
      email,
    });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      preferences: [],
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// LOGIN
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences:
          user.preferences,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET PROFILE
const getProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// UPDATE PREFERENCES
const updatePreferences = async (
  req,
  res
) => {

  try {

    const user =
      await User.findByIdAndUpdate(
        req.user.id,
        {
          preferences:
            req.body.preferences,
        },
        {
          returnDocument: "after",
        }
      );

    const notifications =
      await Notification.find();

    const matchedNotifications =
      notifications.filter(
        (notification) =>
          user.preferences.some(
            (pref) =>
              notification.examName
                .toUpperCase()
                .includes(
                  pref.toUpperCase()
                )
          )
      );

    if (
      matchedNotifications.length > 0
    ) {

      let emailContent =
        "Matching Notifications:\n\n";

      matchedNotifications.forEach(
        (notification) => {

          emailContent +=
            `Exam: ${notification.examName}\n`;

          emailContent +=
            `Organization: ${notification.organization}\n`;

          emailContent +=
            `Link: ${notification.officialLink}\n\n`;

        }
      );

      try {

        await sendEmail(
          user.email,
          "Your Selected Exam Notifications",
          emailContent
        );

        console.log(
          `Preference email sent to ${user.email}`
        );

      } catch (emailError) {

        console.error(
          "Email Error:",
          emailError.message
        );

        // Continue even if email fails

      }

    }

    res.json({
      message:
        "Preferences updated successfully",
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  register,
  login,
  getProfile,
  updatePreferences,
};