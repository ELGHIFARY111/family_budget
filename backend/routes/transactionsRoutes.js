const express = require("express");

const router = express.Router();

const transactionsController = require("../controllers/transactionsController");

router.get("/", transactionsController.getTransactions);
router.post("/add", transactionsController.addTransactions);
router.post("/delete", transactionsController.deleteTransactions);

module.exports = router;
