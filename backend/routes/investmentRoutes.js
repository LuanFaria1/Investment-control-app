const express = require('express');
const router = express.Router();
const InvestmentController = require('../controllers/investmentController');

router.get('/', InvestmentController.getAll);
router.post('/', InvestmentController.create);
router.get('/quote/:ticker', InvestmentController.getQuote); 

module.exports = router;