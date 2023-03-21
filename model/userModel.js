const mongoose = require("mongoose");
// const crypto = require('crypto');
const validator = require("validator");
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true,
    required: [true, "Please fill a first Name"],
  },
  lastName: {
    type: String,
    lowercase: true,
    required: [true, "Please fill a last Name"],
  },
  login: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please fill a name"],
  },
  phone: {
    type: Number,
    unique: true,
    required: [true, "Phone number required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please input an Email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  address: {
    type: String,
    required: [true, "Please input an Address"],
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 5,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same!",
    },
  },
  pin: {
    type: Number,
    required: [true, "Transaction Pin Required"],
    minlength: 4,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  accountType: {
    type: String,
    required: [true, "Please Choose an account"],
    lowercase: true,
  },
  accountNumber: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
  dateJoined: {
    type: String,
    default: new Date().toUTCString(),
  },
  transactions: {
    type: Number,
    default: 0,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  accountStatus: {
    type: String,
    enum: ["active", "unactive"],
    default: "unactive",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
