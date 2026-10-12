const db = require("../config/database");

const getAllUser = (callback) => {
    db.query("SELECT * FROM users", callback);
};

module.exports = {
    getAllUser,
};