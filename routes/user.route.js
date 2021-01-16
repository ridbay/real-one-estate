const user = require("../controllers/user.controller");
const { check } = require("express-validator");
const validateReqBody = require("../middleware/validateReqBody");
const validateJWT = require("../middleware/auth");
const validateEmailOrUsername = require("../middleware/validateEmailUsername")

module.exports = (app) => {
  //Define the routes
  app.post(
    "/api/v1/signup",
    [
      check("name", "Please Enter a Valid Name").not().isEmpty(),
      check("username", "Please Enter a Valid Username").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 8,
      }),
    ],
    validateReqBody,
    validateEmailOrUsername,
    user.signup
  );
  app.post("/api/v1/signin",user.signin);
  app.get("/api/v1/me", validateJWT,user.me);
};
