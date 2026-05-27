const express = require("express");

const router = express.Router();

const Booking = require("../models/Booking");


// GET ALL BOOKINGS
router.get("/", async (req, res) => {
  const bookings = await Booking.find();

  res.json(bookings);
});


// CREATE BOOKING
router.post("/", async (req, res) => {
  const newBooking = new Booking({
    type: req.body.type,
    name: req.body.name,
  });

  const savedBooking = await newBooking.save();

  res.status(201).json(savedBooking);
});


// UPDATE BOOKING
router.put("/:id", async (req, res) => {
  const updatedBooking =
    await Booking.findByIdAndUpdate(
      req.params.id,
      {
        type: req.body.type,
        name: req.body.name,
      },
      { new: true }
    );

  res.json(updatedBooking);
});


// DELETE BOOKING
router.delete("/:id", async (req, res) => {
  await Booking.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Booking Deleted Successfully",
  });
});

module.exports = router;