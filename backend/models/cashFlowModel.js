const db = require('../database');

const CashFlowModel = {
    getAll: (callback) => {
        db.all('SELECT * FROM cash_flow', [], callback);
    },
    create: (data, callback) => {
        const { type, description, amount, date } = data;
        db.run('INSERT INTO cash_flow (type, description, amount, date) VALUES (?, ?, ?, ?)', [type, description, amount, date], callback);
    }
};

module.exports = CashFlowModel;
