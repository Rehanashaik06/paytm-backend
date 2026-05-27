const mongoose = require("mongoose");

const transactionSchema =
  new mongoose.Schema({
    sender: String,

    receiver: String,

    amount: Number,

    paymentType: String,

    status: {
      type: String,
      default: "Success",
    },
  });

module.exports = mongoose.model(
  "Transaction",
  transactionSchema
);