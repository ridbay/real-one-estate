const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: `${errors.errors[errors.errors.length - 1].msg} : ${errors.errors[errors.errors.length - 1].param}`,

    });
  } else next();
};

// module.exports = (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors) {
//     console.log(errors.errors)
//     return res.status(422).json({
//       status: false,
//       message: `${errors.errors[errors.errors.length - 1].message} : ${
//         errors.errors[errors.errors.length - 1].param
//       }`,
//     });
//   } else {
//     next();
//   }
// };
