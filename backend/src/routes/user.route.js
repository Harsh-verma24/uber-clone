const express = require("express");
const {body} = require("express-validator")
const userController = require("../controllers/user.controller")

const router = express.Router();

router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname").isLength({min:3}).withMessage("first name should be atleast 3 character long"),
    body("password").isLength({min:6}).withMessage("password must be atleast 6 character long")
], userController.registerUser)

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("password must be atleast 6 character long")
], userController.loginUser)

module.exports = router;