const transactionsModel = require("../models/transactionsModel.js");

const getTransactions = (req, res) => {
    transactionsModel.getAllTransactions((error, results) => {
        if (error) {
            return res.status(500).json({
                error: error.message,
            });
        }
        res.json(results);
    });
};
const addTransactions = (req, res) => {
    transactionsModel.addTransaction(req.body, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: error.message,
            });
        }
        res.json(results);
    });
};
const deleteTransactions = (req, res) => {
    transactionsModel.deleteTransaction(req.body, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: error.message,
            });
        }
        res.json(results);
    });
};
module.exports = {
    getTransactions,
    addTransactions,
    deleteTransactions,
};
