const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service")

module.exports.registerUser = async function (req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res
      .json({
        error: error.array(),
      })
      .status(400);
  }
  const { fullname, email, password } = req.body;
  console.log(req.body)
  const firstname = fullname.firstname;
  const lastname = fullname.lastname;
  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({
    token,
    user,
  });
};
