const Movie = require("../models/Movie");

/* CREATE */

const createMovieBooking = async (req, res) => {

  try {

    const movie = await Movie.create(req.body);

    res.status(201).json(movie);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

/* GET */

const getMovieBookings = async (req, res) => {

  try {

    const movies = await Movie.find();

    res.status(200).json(movies);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createMovieBooking,
  getMovieBookings
};
      