const property = require("../controllers/property.controller");
const { check } = require("express-validator");
const validateReqBody = require("../middleware/validateReqBody");
const validateJWT = require("../middleware/auth");

module.exports = (app) => {
  app.post(
    "/api/v1/property",
    [
      check("fullname", "Please Enter a Valid Full Name").not().isEmpty(),
      check("username", "Please Enter a Valid Username").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
      check("accountType", "Please enter a valid account Type").not().isEmpty(),
      check("password", "Please enter a valid password").isLength({
        min: 8,
      }),
    ],
    validateReqBody,
    property.addProperty
  );
  // app.post("/api/v1/signin",user.signin);
  // app.get("/api/v1/me", validateJWT,user.profile);
  // app.put("/api/v1/me", validateJWT,user.updateProfile);
};
