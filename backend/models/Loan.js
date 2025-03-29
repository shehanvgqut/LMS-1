
const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  borrowerName: { type: String, default: false },
  borrowerAge: { type: Number, default: false },
  loanType: { type: String, required: true },
  principalAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  termInMonths: { type: Number, required: true },
  monthlyPayment: { type: Number },
  totalRepaymentAmount: { type: Number },
  isActive: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  loanStartDate: { type: Date },
  loanEndDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', loanSchema);