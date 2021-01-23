const User = require("../models/user.model");

module.exports = checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const findUsername = await User.findOne({ username });
    if (findUsername) {
      return res.status(400).json({
        status: false,
        message: "Failed! Username is already in use!",
      });
    } else {
      const findEmail = await User.findOne({
        email: email,
      });
      if (findEmail) {
        return res.status(400).json({
          status: false,
          message: "Failed, Email is already in use",
        });
      }
      next();
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error validating username or email"
    });
  }
};