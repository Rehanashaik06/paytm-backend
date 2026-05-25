const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());


// SAMPLE BOOKINGS DATA

let bookings = [

  {
    id: 1,
    type: "Flight Ticket",
    name: "Hyderabad to Delhi"
  }

];


// GET ALL BOOKINGS

app.get("/api/bookings", (req, res) => {

  res.json(bookings);

});


// CREATE BOOKING

app.post("/api/bookings", (req, res) => {

  const newBooking = {

    id: Date.now(),

    type: req.body.type,

    name: req.body.name

  };

  bookings.push(newBooking);

  res.status(201).json(newBooking);

});


// UPDATE BOOKING

app.put("/api/bookings/:id", (req, res) => {

  const id = parseInt(req.params.id);

  bookings = bookings.map((booking) =>

    booking.id === id

      ? { ...booking, name: req.body.name }

      : booking

  );

  res.json({

    message: "Booking Updated Successfully"

  });

});


// DELETE BOOKING

app.delete("/api/bookings/:id", (req, res) => {

  const id = parseInt(req.params.id);

  bookings = bookings.filter(

    (booking) => booking.id !== id

  );

  res.json({

    message: "Booking Deleted Successfully"

  });

});


// SERVER

app.listen(5000, () => {

  console.log("Server running on port 5000");

});
