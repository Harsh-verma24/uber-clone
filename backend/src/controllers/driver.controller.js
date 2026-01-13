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
