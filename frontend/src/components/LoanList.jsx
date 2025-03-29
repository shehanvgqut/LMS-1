import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const LoanList = ({ loans, setLoans, setEditingLoan }) => {
  const { user } = useAuth();

  const handleDelete = async (loan_Id) => {
    try {
      await axiosInstance.delete(`/api/loans/${loan_Id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setLoans(loans.filter((loan) => loan.loanId !== loan_Id));
    } catch (error) {
      alert('Failed to delete loan.');
    }
  };

  return (
    <div>
      {loans.map((loan) => (
        <div key={loan.loanId} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{loan.loanType}</h2>
          <p>{loan.borrowerName}</p>
          <p>{loan.loanType}</p>
          <p className="text-sm text-gray-500">Start date: {new Date(loan.loanStartDate).toLocaleDateString()}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingLoan(loan)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(loan.loanId)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanList;
