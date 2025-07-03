const db = require('../database');

const InvestmentModel = {
    getAll: (callback) => {
        db.all('SELECT * FROM investments', [], callback);
    },
    create: (data, callback) => {
        const { name, amount, date } = data;
        db.run('INSERT INTO investments (name, amount, date) VALUES (?, ?, ?)', [name, amount, date], callback);
    }
};

module.exports = InvestmentModel;
