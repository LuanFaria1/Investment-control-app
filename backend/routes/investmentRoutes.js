const express = require('express');
const router = express.Router();
const InvestmentController = require('../controllers/investmentController');

router.get('/', InvestmentController.getAll);
router.post('/', InvestmentController.create);

module.exports = router;
