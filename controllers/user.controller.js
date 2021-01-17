const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Sign up and Save a new User

exports.signup = async (req, res) => {
  if (
    !req.body.fullname ||
    !req.body.username ||
    !req.body.email ||
    !req.body.accountType ||
    !req.body.password
  ) {
    res.status(400).json({
      msg: "Please pass fullname ,username, email, user type and password.",
    });
  } else {
    try {
      const { fullname, username, email, password, accountType } = req.body;
      //Check if the email already exist in the database
      let user = await User.findOne({
        email,
      });
      if (user) {
        //If user exists, send a message back
        return res.status(400).json({
          data: "User Already Exists",
        });
      }
      //If user doesn't exist, create a new user
      user = new User({
        username,
        fullname,
        email,
        password,
        accountType,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      const savedUser = await user.save();
      const sendUser = {
        username: savedUser.username,
        fullname: savedUser.fullname,
        email: savedUser.email,
        accountType: savedUser.accountType,
        id: savedUser.id,
      };

      res.status(201).json({
        message: "User successfully registered!",
        data: sendUser,
      });
      const payload = {
        user: {
          id: user.id,
          email: user.email,
        },
      };
      jwt.sign(
        payload,
        "ridwan",
        {
          expiresIn: 86400 * 30,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (error) {
      return res.status(500).json({
        message: "something went wrong",
        data: error,
      });
    }
  }
};

// Sign in an existing User
exports.signin = async (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res
      .status(400)
      .send({ status: false, message: "Please pass username and password." });
  } else {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          status: false,
          message: "Authentication failed. User not found.",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          status: false,
          message: "Incorrect Login Credentials!",
        });
      let token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        "ridwan",
        {
          expiresIn: 86400 * 30,
        }
      );
      const loggedInUser = {
        id: user.id,
        username: user.test,
        fullname: user.fullname,
        email: user.email,
        accountType: user.accountType,
      };
      return res.status(200).json({
        status: true,
        token: token,
        data: loggedInUser,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Server Error",
        data: error,
      });
    }
  }
};

exports.me = async (req, res) => {
  res.status(200).send({ msg: "This is me", email: req.email });
};
