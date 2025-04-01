
const express = require('express');
const { getLoans, addLoan, updateLoan, deleteLoan } = require('../controllers/LoanController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getLoans).post(protect, addLoan);
router.route('/:id').put(protect, updateLoan);
router.route('/:id').delete(protect, deleteLoan);

module.exports = router;