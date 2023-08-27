const jwt = require("jsonwebtoken");
const User = require("../model/user");

const validation = async (req, res, next) => {
  try {
    var decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    const userExist = await User.findOne({ email: decoded.email });
    if (userExist) {
      req.user = userExist;
      next();
    } else {
      res.status(401).json({ Error: "Authorization Failed" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = validation;
