const driverModel = require("../models/driver.model");

module.exports.createDriver = async function (
  firstname,
  lastname,
  email,
  password,
  vehicleNumber,
  vehicleType,
  vehicleModel,
  vehicleColor,
  vehicleCapacity
) {
  if (
    !firstname ||
    !email ||
    !password ||
    !vehicleNumber ||
    !vehicleType ||
    !vehicleModel ||
    !vehicleColor ||
    !vehicleCapacity
  ) {
    throw new Error("All fields are required");
  }
  const driver = await driverModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      vehicleNumber,
      vehicleType,
      vehicleModel,
      vehicleColor,
      vehicleCapacity,
    },
  });
  return driver;
};
