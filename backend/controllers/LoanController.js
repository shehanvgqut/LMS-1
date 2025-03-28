const Loan = require('../models/Loan'); 
const getLoans = async (req, res) =>
     { 
        try { 
            const loans = await Loan.find({ loanId: req.loanId.id }); 
            res.json(loans); 
        } catch (error) 
        { 
            res.status(500).json({ message: error.message });
        }
    }
    const addLoan = async (req, res) => 
        { 
            const { title, description, deadline } = req.body; 
            try { 
                const loan = await Loan.create({ userId: req.user.id, title, description, deadline });
                 res.status(201).json(loan);
                 } 
                 catch (error) { 
                    res.status(500).json({ message: error.message }); 
                } 
        };

        const updateLoan = async (req, res) => 
            { 
                const { title, description, completed, deadline } = req.body;
                 try 
                 { 
                    const loan = await Loan.findById(req.params.id);
                     if (!loan) return res.status(404).json({ message: 'Loan not found' });
                     loan.title = title || loan.title; loan.description = description 
                     || loan.description; loan.completed = completed ?? loan.completed; loan.deadline = deadline 
                     || loan.deadline; const updatedLoan = await loan.save(); res.json(updatedLoan); 
                    } catch (error) 
                    { res.status(500).json({ message: error.message }); 
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
