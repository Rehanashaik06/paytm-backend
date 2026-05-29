const Booking = require("../models/Booking");

/* CREATE */

const createBooking = async (req, res) => {

  try {

    const booking = await Booking.create(req.body);

    res.status(201).json(booking);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

/* GET */

const getBookings = async (req, res) => {

  try {

    const bookings = await Booking.find();

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

/* DELETE */

const deleteBooking = async (req, res) => {

  try {

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Booking Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  deleteBooking
};