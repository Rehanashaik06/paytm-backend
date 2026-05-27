const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  type: String,
  name: String,
});

module.exports = mongoose.model("Booking", bookingSchema);