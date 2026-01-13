const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const driverSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be atleast 3 character long"],
      },
      lastname: {
        type: String,
        minlength: [3, "last name must be atleast 3 character long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must 6 character long"],
      select: false,
    },
    socketId: {
      type: String,
    },
    vehicle: {
      vehicleNumber: {
        type: String,
        required: true,
      },
      vehicleType: {
        type: String,
        enum: ["car", "bike", "auto"],
        required: true,
      },
      vehicleModel: {
        type: String,
        required: true,
      },
      vehicleColor: {
        type: String,
        required: true,
      },
      vehicleCapacity: {
        type: Number,
        required: true,
      },
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
  },
  {
    timestamps: true,
  }
);

driverSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

driverSchema.methods.comparePassword = async function (password) {
  const isPasswordCorrect = await bcrypt.compare(password, this.password);
  return isPasswordCorrect;
};

driverSchema.statics.hashPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const driverModel = mongoose.model("driver", driverSchema);

module.exports = driverModel;
