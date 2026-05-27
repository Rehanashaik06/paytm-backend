const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  userName: String,
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Wallet", walletSchema);