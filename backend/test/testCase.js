
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const app = require('../server'); 
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const sinon = require('sinon');
const Loan = require('../models/Loan');
const { addLoan } = require('../controllers/LoanController');
const { expect } = chai;

chai.use(chaiHttp);
let server;
let port;

describe('addLoan Function Test', () => {
  let createStub;

  afterEach(() => {
    if (createStub && createStub.restore) {
      createStub.restore();
    }
  });

  it('should create a new loan successfully', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: {
        loanType: 'Personal',
        principalAmount: 10000,
        interestRate: 7.5,
        termInMonths: 12,
        loanStartDate: '2025-01-01',
        loanEndDate: '2026-01-01',
        isActive: true,
        isApproved: false,
        borrowerName: 'John Doe',
        borrowerAge: 35
      }
    };

    const createdLoan = {
      _id: new mongoose.Types.ObjectId(),
      //borrowerId: req.user.id,
      ...req.body
    };

    createStub = sinon.stub(Loan, 'create').resolves(createdLoan);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addLoan(req, res);

    expect(createStub.calledOnceWith({
      //borrowerId: req.user.id,
      ...req.body
    })).to.be.true;

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdLoan)).to.be.true;
  });

  it('should return 500 if Loan.create throws an error', async () => {
    const error = new Error('DB error');
    createStub = sinon.stub(Loan, 'create').throws(error);

    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: {
        loanType: 'Auto',
        principalAmount: 8000,
        interestRate: 6.2,
        termInMonths: 24,
        borrowerName: 'Jane Doe',
        borrowerAge: 40
      }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addLoan(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB error' })).to.be.true;
  });
});