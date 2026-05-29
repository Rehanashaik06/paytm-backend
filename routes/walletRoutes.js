const express = require("express");

const router = express.Router();

const {
  addMoney,
  getWallets
} = require("../controllers/walletController");

router.post("/", addMoney);

router.get("/", getWallets);

module.exports = router;