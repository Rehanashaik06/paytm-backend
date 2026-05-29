const User = require("../models/User");
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const sendOTP = require("../utils/sendMail");
const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req, res) => {
  try {

    const { email, password, confirmPassword } = req.body;

    // PASSWORD MATCH CHECK
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // GENERATE OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // SEND OTP MAIL
    await sendOTP(email, otp);

    // SAVE USER
    const user = await User.create({
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "OTP Sent Successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Registration Failed",
    });
  }
};


// VERIFY REGISTER OTP
exports.verifyOTP = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // INVALID OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP EXPIRY
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    // CLEAR OTP
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "OTP Verification Failed",
    });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // PASSWORD CHECK
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // GENERATE OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    user.otp = otp;

    user.otpExpiry =
      Date.now() + 5 * 60 * 1000;

    await user.save();

    // SEND MAIL
    await sendOTP(email, otp);

    res.status(200).json({
      success: true,
      message: "Login OTP Sent",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
};


// VERIFY LOGIN OTP
exports.verifyLoginOTP = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // INVALID OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP EXPIRY
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    // CREATE JWT TOKEN
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // CLEAR OTP
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "OTP Login Failed",
    });
  }
};