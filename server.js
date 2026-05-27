const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const Booking = require("./models/Booking");
const Recharge = require("./models/Recharge");
const Wallet = require("./models/Wallet");
const Transaction = require("./models/Transaction");
const MovieBooking = require("./models/MovieBooking");
const TrainBooking = require("./models/TrainBooking");

dotenv.config();

connectDB();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());



/* =========================
      BOOKINGS APIs
========================= */


// GET ALL BOOKINGS
app.get("/api/bookings", async (req, res) => {
  const bookings = await Booking.find();

  res.json(bookings);
});


// CREATE BOOKING
app.post("/api/bookings", async (req, res) => {
  const newBooking = new Booking({
    type: req.body.type,
    name: req.body.name,
  });

  const savedBooking = await newBooking.save();

  res.status(201).json(savedBooking);
});


// UPDATE BOOKING
app.put("/api/bookings/:id", async (req, res) => {
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
app.delete("/api/bookings/:id", async (req, res) => {
  await Booking.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Booking Deleted Successfully",
  });
});



/* =========================
      RECHARGE APIs
========================= */


// GET ALL RECHARGES
app.get("/api/recharges", async (req, res) => {
  const recharges = await Recharge.find();

  res.json(recharges);
});


// CREATE RECHARGE
app.post("/api/recharges", async (req, res) => {
  const newRecharge = new Recharge({
    mobileNumber: req.body.mobileNumber,
    operator: req.body.operator,
    amount: req.body.amount,
  });

  const savedRecharge =
    await newRecharge.save();

  res.status(201).json(savedRecharge);
});


// UPDATE RECHARGE
app.put("/api/recharges/:id", async (req, res) => {
  const updatedRecharge =
    await Recharge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updatedRecharge);
});


// DELETE RECHARGE
app.delete("/api/recharges/:id", async (req, res) => {
  await Recharge.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Recharge Deleted Successfully",
  });
});



/* =========================
        WALLET APIs
========================= */


// GET ALL WALLETS
app.get("/api/wallets", async (req, res) => {
  const wallets = await Wallet.find();

  res.json(wallets);
});


// CREATE WALLET
app.post("/api/wallets", async (req, res) => {
  const newWallet = new Wallet({
    userName: req.body.userName,
    balance: req.body.balance,
  });

  const savedWallet =
    await newWallet.save();

  res.status(201).json(savedWallet);
});


// ADD MONEY
app.put(
  "/api/wallets/add/:id",
  async (req, res) => {

    const wallet =
      await Wallet.findById(req.params.id);

    wallet.balance += req.body.amount;

    await wallet.save();

    res.json(wallet);
  }
);


// DEDUCT MONEY
app.put(
  "/api/wallets/deduct/:id",
  async (req, res) => {

    const wallet =
      await Wallet.findById(req.params.id);

    wallet.balance -= req.body.amount;

    await wallet.save();

    res.json(wallet);
  }
);



/* =========================
      TRANSACTION APIs
========================= */


// GET ALL TRANSACTIONS
app.get(
  "/api/transactions",
  async (req, res) => {

    const transactions =
      await Transaction.find();

    res.json(transactions);
  }
);


// CREATE TRANSACTION
app.post(
  "/api/transactions",
  async (req, res) => {

    const newTransaction =
      new Transaction(req.body);

    const savedTransaction =
      await newTransaction.save();

    res.status(201).json(savedTransaction);
  }
);



/* =========================
      MOVIE BOOKING APIs
========================= */


// GET MOVIE BOOKINGS
app.get(
  "/api/movie-bookings",
  async (req, res) => {

    const movies =
      await MovieBooking.find();

    res.json(movies);
  }
);


// CREATE MOVIE BOOKING
app.post(
  "/api/movie-bookings",
  async (req, res) => {

    const newMovie =
      new MovieBooking(req.body);

    const savedMovie =
      await newMovie.save();

    res.status(201).json(savedMovie);
  }
);



/* =========================
      TRAIN BOOKING APIs
========================= */


// GET TRAIN BOOKINGS
app.get(
  "/api/train-bookings",
  async (req, res) => {

    const trains =
      await TrainBooking.find();

    res.json(trains);
  }
);


// CREATE TRAIN BOOKING
app.post(
  "/api/train-bookings",
  async (req, res) => {

    const newTrain =
      new TrainBooking(req.body);

    const savedTrain =
      await newTrain.save();

    res.status(201).json(savedTrain);
  }
);



// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});