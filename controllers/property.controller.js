const Property = require("../models/property.model");


exports.addProperty = async (req, res) => {
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

exports.property = async (req, res) => {
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

