const mongoose = require("mongoose");

const movieBookingSchema =
  new mongoose.Schema({
    movieName: String,

    theatre: String,

    seats: Number,

    amount: Number,
  });

module.exports = mongoose.model(
  "MovieBooking",
  movieBookingSchema
);