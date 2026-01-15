const express = require("express");
const { body } = require("express-validator");
const driverController = require("../controllers/driver.controller");
const { authDriver } = require("../middlewares/auth.middleware");


const router = express.Router();

router.post("/register", [
  body("fullname.firstname").isLength(3).withMessage("firstname must be atleast 3 character long"),
  body("password").isLength(6).withMessage("Password must be atleast 6 character long "),
  body("email").isEmail().withMessage("use an valid email"),
  body("vehicle.vehicleType").notEmpty().withMessage("Vehicle type is required"),
  body("vehicle.vehicleColor").notEmpty().withMessage("Vehicle color is required"),
  body("vehicle.vehicleModel").notEmpty().withMessage("Vehicle Model is required"),
  body("vehicle.vehicleNumber").isLength({ min: 3 }).withMessage("Vehicle plate must be at least 3 characters"),
  body("vehicle.vehicleCapacity").isInt({ min: 1 }).withMessage("Vehicle capacity must be at least 1"),
],driverController.registerDriver);

router.post("/login",[
  body("email").isEmail().withMessage("use an valid email"),
  body("password").isLength(6).withMessage("Password must be atleast 6 character long "),
], driverController.loginDriver
)

router.get("/profile", authDriver ,driverController.getDriverProfile);
router.get("/logout", authDriver ,driverController.logoutDriver);

module.exports = router;
