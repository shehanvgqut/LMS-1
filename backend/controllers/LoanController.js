const Loan = require('../models/Loan'); 

    const getLoans = async (req, res) =>
     { 
        try { 
            console.log("Get loans");
            const loans = await Loan.find({ isActive: true }); 
            res.json(loans); 
        } catch (error) 
        { 
            res.status(500).json({ message: error.message });
        }
     }
     
    const addLoan = async (req, res) => 
            { 
                    const {
                    loanType,
                    borrowerName,
                    borrowerAge,
                    principalAmount,
                    interestRate,
                    termInMonths,
                    loanStartDate,
                    loanEndDate,
                    isActive,
                    isApproved
                 } = req.body;

                 try {
                        const loan = await Loan.create({
                        loanType,
                        borrowerName,
                        borrowerAge,
                        principalAmount,
                        interestRate,
                        termInMonths,
                        loanStartDate,
                        loanEndDate,
                        isActive,
                        isApproved,
                        });

                        res.status(201).json(loan);
                    } catch (error) {
                        console.error('Add Loan Error:', error);
                        res.status(500).json({ message: error.message });
                    }
             };

        const updateLoan = async (req, res) => {
                try {
                        const loan = await Loan.findById(req.params.id);
                        console.log("Updateeeeeeee");
                        if (!loan) {
                            return res.status(404).json({ message: 'Loan not found' });
                        }
                        console.log("Update step 2");

                        // Update fields
                        loan.loanType = req.body.loanType || loan.loanType;
                        loan.principalAmount = req.body.principalAmount ?? loan.principalAmount;
                        loan.interestRate = req.body.interestRate ?? loan.interestRate;
                        loan.termInMonths = req.body.termInMonths ?? loan.termInMonths;
                        loan.loanStartDate = req.body.loanStartDate || loan.loanStartDate;
                        loan.loanEndDate = req.body.loanEndDate || loan.loanEndDate;
                        loan.borrowerName = req.body.borrowerName || loan.borrowerName;
                        loan.borrowerAge = req.body.borrowerAge ?? loan.borrowerAge;
                        loan.isActive = req.body.isActive ?? loan.isActive;
                        loan.isApproved = req.body.isApproved ?? loan.isApproved;

                        const updatedLoan = await loan.save();
                        res.json(updatedLoan);
                    } catch (error) {
                    console.error('Update error:', error);
                    res.status(500).json({ message: error.message });
                }
            };

            const deleteLoan = async (req, res) => 
                  { 
                    try{
                         const loan = await Loan.findById(req.params.id);
                            if (!loan) return res.status(404).json({ message: 'Loan not found' });
                            await loan.remove(); res.json({ message: 'Loan deleted' });
                         } catch (error) 
                         { 
                            res.status(500).json({ message: error.message }); 
                        } 
                    }; module.exports = { getLoans, addLoan, updateLoan, deleteLoan };
