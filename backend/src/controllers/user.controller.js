const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service")

module.exports.registerUser = async function (req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
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

module.exports.loginUser = async function(req, res, next){
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  const {email, password} = req.body;
  const user = await userModel.findOne({email:email}).select("+password")
  if(!user){
    return res.status(401).json({
      message:"Incorrect email and password"
    });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched){
    return res.status(401).json({
      message:"Incorrect email and password"
    });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token)
  return res.status(200).json({token,user});
}

module.exports.getUserProfile = async function(req, res,next){
  res.status(200).json(req.user);
}

module.exports.logoutUser = async function(req, res,next){
  res.clearCookie("token");
  res.status(200).json({message:"Logged out successfully"});
}