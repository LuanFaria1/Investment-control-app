const InvestmentModel = require('../models/investmentModel');

const InvestmentController = {
    getAll: (req, res) => {
        InvestmentModel.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },
    create: (req, res) => {
        InvestmentModel.create(req.body, function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Investimento adicionado com sucesso!' });
        });
    }
};

module.exports = InvestmentController;
