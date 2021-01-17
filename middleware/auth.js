const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //   const token = req.header("token");
  if (req.headers.authorization) {
    
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({ status: false, message: "Auth Error" });

    try {
      const decoded = jwt.verify(token, "ridwan");
      req.user = decoded.user;
      req.email = decoded.email;
      req.userId = decoded.userId;
      next();
    } catch (err) {
      res
        .status(500)
        .json({ status: false, message: "Invalid Token", error: err });
    }
  } else {
    res
      .status(500)
      .json({ status: false, message: "Add authorization header"});
  }
};
