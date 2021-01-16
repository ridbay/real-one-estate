const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Sign up and Save a new User

exports.signup = async (req, res) => {
    if (!req.body.name || !req.body.name || !req.body.password) {
      res.status(400).send({ msg: "Please pass name,email and password." });
    } else {
      try {
        const { name, email, password } = req.body;
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
          name,
          email,
          password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        const savedUser = await user.save();
  
        res.status(201).json({
          message: "User successfully created!",
          data: savedUser,
        });
        const payload = {
          user: {
            id: user.id,
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
      res.status(400).send({ msg: "Please pass username and password." });
    } else {
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email,
        });
        if (!user)
          return res.status(400).json({
            message: "Authentication failed. User not found.",
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Login Credentials!",
          });
        let token = jwt.sign(JSON.parse(JSON.stringify(user)), "ridwan", {
          expiresIn: 86400 * 30,
        });
  
        return res.status(200).json({
          token: token,
          data: user,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Server Error",
          data: error,
        });
      }
    }
  };