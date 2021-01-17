const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
//   const token = req.header("token");
const token = req.headers.authorization.split(" ")[1];
  
  if (!token) return res.status(401).json({ status: false, message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "ridwan");
    req.user = decoded.user;
    req.email = decoded.email;
    req.userId = decoded.userId
    next();
  } catch (e) {
    res.status(500).send({ status: false, message: "Invalid Token" , error: e});
  }
};