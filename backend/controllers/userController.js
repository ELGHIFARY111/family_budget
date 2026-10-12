const userModel = require("../models/userModel");

const getUsers = (req, res) => {
    userModel.getAllUser((error, results) => {
        if (error) {
            return res.status(500).json({
                error: error.message,
            });
        }

        res.json(results);
    });
};

module.exports = {
    getUsers,
};