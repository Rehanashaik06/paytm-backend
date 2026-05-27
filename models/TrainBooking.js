const mongoose = require("mongoose");

const trainBookingSchema =
  new mongoose.Schema({
    from: String,

    to: String,

    passengers: Number,

    amount: Number,
  });

module.exports = mongoose.model(
  "TrainBooking",
  trainBookingSchema
);