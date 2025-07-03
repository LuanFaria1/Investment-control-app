const InvestmentModel = require('../models/investmentModel');
const axios = require('axios');

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
    },

    createOperation: (req, res) => {
        InvestmentModel.createOperation(req.body, function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Operação adicionada com sucesso!' });
        });
    },

    createProvent: (req, res) => {
        InvestmentModel.createProvent(req.body, function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Provento adicionado com sucesso!' });
        });
    },

    getProfitability: async (req, res) => {
        try {
            const { investment_id, ticker } = req.params;

            InvestmentModel.getOperationsByInvestment(investment_id, async (err, operations) => {
                if (err) return res.status(500).json({ error: err.message });

                if (operations.length === 0) return res.status(404).json({ error: 'Nenhuma operação encontrada.' });

                const totalQuantity = operations.reduce((sum, op) => sum + op.quantity, 0);
                const totalInvested = operations.reduce((sum, op) => sum + (op.quantity * op.price), 0);
                const averagePrice = totalInvested / totalQuantity;

                const { data } = await axios.get(`https://brapi.dev/api/quote/${ticker}?token=${process.env.BRAPI_TOKEN}`);
                const currentPrice = data.results[0].regularMarketPrice;

                InvestmentModel.getProventsByInvestment(investment_id, (err, provents) => {
                    if (err) return res.status(500).json({ error: err.message });

                    const totalProvents = provents.reduce((sum, p) => sum + p.amount, 0);
                    const profitability = (((currentPrice - averagePrice) * totalQuantity + totalProvents) / totalInvested) * 100;

                    res.json({ profitability: profitability.toFixed(2) + '%' });
                });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = InvestmentController;
