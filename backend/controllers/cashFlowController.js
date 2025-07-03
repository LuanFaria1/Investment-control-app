const CashFlowModel = require('../models/cashFlowModel');

const CashFlowController = {
    getAll: (req, res) => {
        CashFlowModel.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },
    create: (req, res) => {
        CashFlowModel.create(req.body, function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Registro de fluxo de caixa adicionado com sucesso!' });
        });
    }
};

module.exports = CashFlowController;
