const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: errors.errors[errors.errors.length - 1].msg,
      });
    } else next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};
