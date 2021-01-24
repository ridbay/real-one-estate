const Property = require("../models/property.model");
const User = require("../models/user.model");

exports.addProperty = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  } else {
    try {
      const {
        title,
        publishedStatus,
        marketStatus,
        category,
        type,
        location,
        locality,
        state,
        area,
        budget,
        bedroom,
        toilet,
        bathroom,
        parking,
        totalArea,
        video,
        image,
        serviced,
        furnished,
        description,
      } = req.body;
      const userId = req.userId;
      const data = {
        title,
        publishedStatus,
        marketStatus,
        category,
        type,
        location,
        locality,
        state,
        area,
        budget,
        bedroom,
        toilet,
        bathroom,
        parking,
        totalArea,
        video,
        image,
        serviced,
        furnished,
        description,
        user: userId
      };
      const newProperty = new Property(data)
      const savedProperty = await newProperty.save();
      const user = await User.findById(userId).exec();
      user.property.push(savedProperty.id)
      const savedUser = await user.save();
      return res.status(201).json({
        status: true,
        message: "New Property Added",
        data: savedProperty,
      });
    } catch (error) {
      // console.trace(error)
      return res.status(500).json({
        status: false,
        message: "Error adding new property",
        error: error.message
      });
    }
  }
};

// exports.property = async (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!",
//     });
//   } else {
//     try {
//       const userId = req.userId;
//       const user = await User.findById(userId).exec();
//       // const user = query.exec();
//       const sendUser = {
//         username: user.username,
//         fullname: user.fullname,
//         email: user.email,
//         accountType: user.accountType,
//         company: user.company,
//         address: user.address,
//         locality: user.locality,
//         state: user.state,
//         country: user.country,
//         phone1: user.phone1,
//         phone2: user.phone2,
//         services: user.services,
//         facebook: user.facebook,
//         instagram: user.instagram,
//         twitter: user.twitter,
//         linkedin: user.linkedin,
//       };
//       if (!user) {
//         res.status(404).json({
//           status: false,
//           message: "User records not found",
//         });
//       } else {
//         res.status(200).json({
//           status: false,
//           message: "User records found",
//           data: sendUser,
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         status: false,
//         message: "Server Error Getting profile",
//         data: error,
//       });
//     }
//   }
// };
