const express = require('express');
const router = express.Router();
const CashFlowController = require('../controllers/cashFlowController');

router.get('/', CashFlowController.getAll);
router.post('/', CashFlowController.create);

module.exports = router;
