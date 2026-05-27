const express = require("express");

const router = express.Router();

const Recharge = require("../models/Recharge");


// GET ALL RECHARGES
router.get("/", async (req, res) => {
  const recharges = await Recharge.find();

  res.json(recharges);
});


// CREATE RECHARGE
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  const updatedRecharge =
    await Recharge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updatedRecharge);
});


// DELETE RECHARGE
router.delete("/:id", async (req, res) => {
  await Recharge.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Recharge Deleted Successfully",
  });
});

module.exports = router;