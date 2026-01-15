const userModel = require("../models/user.model");
const blackListTokenModel = require("../models/blacklistToken.model");
const jwt = require("jsonwebtoken");
const driverModel = require("../models/driver.model");

module.exports.authUser = async function (req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
    const isBlacklisted = await blackListTokenModel.findOne({ token: token });  
    if(isBlacklisted){
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decoded._id });
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports.authDriver = async function (req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];  
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
    const isBlacklisted = await blackListTokenModel.findOne
    ({ token: token });
    if(isBlacklisted){
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const driver = await driverModel.findOne({ _id: decoded._id });
    req.driver = driver;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};  