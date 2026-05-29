const express = require("express");

const router = express.Router();

const {
  createMovieBooking,
  getMovieBookings
} = require("../controllers/movieController");

router.post("/", createMovieBooking);

router.get("/", getMovieBookings);

module.exports = router;