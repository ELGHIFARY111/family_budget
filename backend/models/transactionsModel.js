const db = require("../config/database.js");

const getAllTransactions = (callback) => {
    db.query(
        "select t.id, u.name as name,c.name as category,t.description ,t.amount ,t.transaction_date ,t.created_at   from transactions t left join categories c on t.category_id =c.id left join users u on u.id = t.user_id ;",
        callback,
    );
};
const addTransaction = (transactionData, callback) => {
    const { user_id, category_id, amount, description, transaction_date } =
        transactionData;

    const sql = `
        INSERT INTO transactions
        (user_id, category_id, amount, description, transaction_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        user_id,
        category_id,
        amount,
        description,
        transaction_date,
    ];

    db.query(sql, values, callback);
};
const deleteTransaction = (transactionData, callback) => {
    const { id } = transactionData;
    const sql = `DELETE FROM transactions where transactions.id = ?`;
    db.query(sql, [id], callback);
};

module.exports = {
    getAllTransactions,
    addTransaction,
    deleteTransaction,
};
