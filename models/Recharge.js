const mongoose = require("mongoose");

const rechargeSchema = new mongoose.Schema({
  mobileNumber: String,
  operator: String,
  amount: Number,
  status: {
    type: String,
    default: "Success",
  },
});

module.exports = mongoose.model("Recharge", rechargeSchema);