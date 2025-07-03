const db = require('../database');

const InvestmentModel = {
    getAll: (callback) => {
        db.all('SELECT * FROM investments', [], callback);
    },
    create: (data, callback) => {
        const { name, amount, date } = data;
        db.run('INSERT INTO investments (name, amount, date) VALUES (?, ?, ?)', [name, amount, date], callback);
    },
    createOperation: (data, callback) => {
        const { investment_id, ticker, quantity, price, date } = data;
        db.run('INSERT INTO investment_operations (investment_id, ticker, quantity, price, date) VALUES (?, ?, ?, ?, ?)', [investment_id, ticker, quantity, price, date], callback);
    },
    createProvent: (data, callback) => {
        const { investment_id, amount, date } = data;
        db.run('INSERT INTO investment_provents (investment_id, amount, date) VALUES (?, ?, ?)', [investment_id, amount, date], callback);
    },
    getOperationsByInvestment: (investment_id, callback) => {
        db.all('SELECT * FROM investment_operations WHERE investment_id = ?', [investment_id], callback);
    },
    getProventsByInvestment: (investment_id, callback) => {
        db.all('SELECT * FROM investment_provents WHERE investment_id = ?', [investment_id], callback);
    }
};

module.exports = InvestmentModel;
