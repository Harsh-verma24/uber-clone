const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const driverModel = require("../models/driver.model");
const driverService = require("../services/driver.service")

module.exports.registerDriver = async function (req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(401).json({
      error: error.array(),
    });
  }
  const { fullname, email, password, vehicle } = req.body;
  const isDriverAlreadyExist = await driverModel.findOne({ email: email });
  if (isDriverAlreadyExist) {
    return res.status(401).json({
      message: "User already exist with this email",
    });
  }
  const hashedPassword = await driverModel.hashPassword(password);

  const driver = await driverService.createDriver(
    fullname.firstname,
    fullname.lastname,
    email,
    hashedPassword,
    vehicle.vehicleNumber,
    vehicle.vehicleType,
    vehicle.vehicleModel,
    vehicle.vehicleColor,
    vehicle.vehicleCapacity
  );
  const token = driver.generateAuthToken();
  res.status(201).json({
    token,
    driver,
  });
};

module.exports.loginDriver = async function (req, res, next) {
  const error = validationResult(req);  
  if (!error.isEmpty()) {
    return res.status(401).json({
      error: error.array(),
    });
  } 
  const { email, password } = req.body;
  const driver = await driverModel.findOne({ email: email }).select("+password");
  if (!driver) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  } 
  const isPasswordMatched = await driver.comparePassword(
    password,
    driver.password 
  );
  if (!isPasswordMatched) {
    return res.status(401).json({   
      message: "Invalid email or password",
    });
  } 
  const token = await driver.generateAuthToken();
  res.cookie("token" ,token)
  res.status(200).json({
    token,
    driver,
  });
}

module.exports.getDriverProfile = async function (req, res, next) {
  res.status(200).json(req.driver);
}

module.exports.logoutDriver = async function (req, res, next) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
}