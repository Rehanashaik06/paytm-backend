const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Paytm Clone OTP",
      html: `<h2>Your OTP is ${otp}</h2>`,
    });

    console.log("OTP Sent Successfully");

    return info;

  } catch (error) {

    console.log(error);
  }
};

module.exports = sendOTP;