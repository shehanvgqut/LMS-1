import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const LoanForm = ({ loans, setLoans, editingLoan, setEditingLoan }) => {
   const { user } = useAuth();
  const [formData, setFormData] = useState({
    loanType: '',
    principalAmount: '',
    interestRate: '',
    termInMonths: '',
    loanStartDate: '',
    loanEndDate: '',
    isActive: false,
    isApproved: false,
  });

   useEffect(() => {
    if (editingLoan) {
      setFormData({
        loanType: editingLoan.loanType || '',
        principalAmount: editingLoan.principalAmount || '',
        interestRate: editingLoan.interestRate || '',
        termInMonths: editingLoan.termInMonths || '',
        loanStartDate: editingLoan.loanStartDate?.slice(0, 10) || '',
        loanEndDate: editingLoan.loanEndDate?.slice(0, 10) || '',
        isActive: editingLoan.isActive || false,
        isApproved: editingLoan.isApproved || false,
      });
    } else {
      setFormData({
        loanType: '',
        principalAmount: '',
        interestRate: '',
        termInMonths: '',
        loanStartDate: '',
        loanEndDate: '',
        isActive: false,
        isApproved: false,
      });
    }
  }, [editingLoan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const payload = {
        ...formData,
        borrowerId: user.id, // or user._id depending on your backend
      };

      if (editingLoan) {
        const response = await axiosInstance.put(`/api/loans/${editingLoan._id}`, payload, config);
        setLoans(loans.map((loan) => (loan._id === response.data._id ? response.data : loan)));
      } else {
        const response = await axiosInstance.post('/api/loans', payload, config);
        setLoans([...loans, response.data]);
      }

      setEditingLoan(null);
      setFormData({
        loanType: '',
        principalAmount: '',
        interestRate: '',
        termInMonths: '',
        loanStartDate: '',
        loanEndDate: '',
        isActive: false,
        isApproved: false,
      });
    } catch (error) {
      alert('Failed to save loan.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingLoan ? 'Step 2 : Edit Loan Details' : 'Step 1: Add Loan Details'}
      </h1>

     <select
        value={formData.loanType}
        onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
        >
        <option value="">Select Loan Type</option>
        <option value="Home">Home loan facility</option>
        <option value="Auto">Vehicle loan facility </option>
        <option value="Personal">Personal loan facility</option>
        <option value="Education">Education loan facility</option>
        <option value="Business">Business loan facility</option>
      </select>

      <input
        type="number"
        placeholder="Principal Amount"
        value={formData.principalAmount}
        onChange={(e) => setFormData({ ...formData, principalAmount: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="number"
        step="0.01"
        placeholder="Interest Rate"
        value={formData.interestRate}
        onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="number"
        placeholder="Term in Months"
        value={formData.termInMonths}
        onChange={(e) => setFormData({ ...formData, termInMonths: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="date"
        value={formData.loanStartDate}
        onChange={(e) => setFormData({ ...formData, loanStartDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="date"
        value={formData.loanEndDate}
        onChange={(e) => setFormData({ ...formData, loanEndDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          />
          Is Active
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isApproved}
            onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
          />
          Is Approved
        </label>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingLoan ? 'Update Loan' : 'Create Loan'}
      </button>
    </form>
  );
};
export default LoanForm;
