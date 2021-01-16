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
      message: error,
    });
  }
};

//     // Username
// User.findOne({
//     username: username
// })

//     User.findOne({
//       username: req.body.username
//     }).exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (user) {
//         res.status(400).send({ message: "Failed! Username is already in use!" });
//         return;
//       }

//       // Email
//       User.findOne({
//         email: req.body.email
//       }).exec((err, user) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }

//         if (user) {
//           res.status(400).send({ message: "Failed! Email is already in use!" });
//           return;
//         }

//         next();
//       });
//     });
//   };
