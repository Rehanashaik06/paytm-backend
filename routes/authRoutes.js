const express = require("express");

const router = express.Router();

const {
  register,
  verifyOTP,
  login,
  verifyLoginOTP,
} = require("../controllers/authController");


// REGISTER
router.post("/register", register);

// VERIFY REGISTER OTP
router.post("/verify-otp", verifyOTP);

// LOGIN
router.post("/login", login);

// VERIFY LOGIN OTP
router.post("/verify-login-otp", verifyLoginOTP);

module.exports = router;