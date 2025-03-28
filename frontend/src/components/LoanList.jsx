import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const LoanList = ({ loans, setLoans, setEditingLoan }) => {
  const { user } = useAuth();

  const handleDelete = async (loanId) => {
    try {
      await axiosInstance.delete(`/api/loans/${loanId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setLoans(loans.filter((loan) => loan._id !== loanId));
    } catch (error) {
      alert('Failed to delete loan.');
    }
  };

  return (
    <div>
      {loans.map((loan) => (
        <div key={loan._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{loan.title}</h2>
          <p>{loan.description}</p>
          <p className="text-sm text-gray-500">Deadline: {new Date(loan.deadline).toLocaleDateString()}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingLoan(loan)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(loan._id)}
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
