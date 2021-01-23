const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { cookie } = require("express-validator");

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
      const user = await User.findOne({
        email,
      }).exec();
      if (user) {
        //If user exists, send a message back
        return res.status(200).json({
          data: "User Already Exists",
        });
      }
      //If user doesn't exist, create a new user
     const newUser = new User({
        username,
        fullname,
        email,
        password,
        accountType,
      });
      const salt = await bcrypt.genSalt(10);
     newUser.password = await bcrypt.hash(password, salt);
      const savedUser = await newUser.save();
      const sendUser = {
        username: savedUser.username,
        fullname: savedUser.fullname,
        email: savedUser.email,
        accountType: savedUser.accountType,
        id: savedUser.id,
      };
      const payload = {
        user: {
          id: savedUser.id,
          email: savedUser.email,
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
          res.status(201).json({
            message: "User successfully registered!",
            data: sendUser,
            token,
          });
        }
      );
     
    } catch (error) {
      console.log(error)
      return res.json({
        message: "something went wrong",
        data: error.message,
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
      const user = await User.findOne({
        email,
      }).exec();

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
        message: "Server Error Signin In",
        data: error,
      });
    }
  }
};

exports.profile = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  } else {
    try {
      const userId = req.userId;
      const user = await User.findById(userId).exec();
      // const user = query.exec();
      const sendUser = {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        accountType: user.accountType,
        company: user.company,
        address: user.address,
        locality: user.locality,
        state: user.state,
        country: user.country,
        phone1: user.phone1,
        phone2: user.phone2,
        services: user.services,
        facebook: user.facebook,
        instagram: user.instagram,
        twitter: user.twitter,
        linkedin: user.linkedin,
      };
      if (!user) {
        res.status(404).json({
          status: false,
          message: "User records not found",
        });
      } else {
        res.status(200).json({
          status: false,
          message: "User records found",
          data: sendUser,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Server Error Getting profile",
        data: error,
      });
    }
  }
};

exports.updateProfile = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  } else {
   
    try {
      const {
        fullname,
        accountType,
        company,
        address,
        locality,
        state,
        country,
        phone1,
        phone2,
        services,
        facebook,
        instagram,
        twitter,
        linkedin,
      } = req.body;
      const data = {
        fullname,
        accountType,
        company,
        address,
        locality,
        state,
        country,
        phone1,
        phone2,
        services,
        facebook,
        instagram,
        twitter,
        linkedin,
      };
      const userId = req.userId;
      const user = await User.findByIdAndUpdate(userId, data);
      const sendUser = {
        username:user.username,
        fullname: user.fullname,
        accountType: user.accountType,
        company: user.company,
        address: user.address,
        locality: user.locality,
        state: user.state,
        country: user.country,
        phone1: user.phone1,
        phone2: user.phone2,
        services: user.services,
        facebook: user.facebook,
        instagram: user.instagram,
        twitter: user.twitter,
        linkedin: user.linkedin,
      };
      return res.status(201).json({
        status: true,
        message: "User profile updated successfully",
        data: sendUser,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Error Updating user profile",
      });
    }
  }
};
