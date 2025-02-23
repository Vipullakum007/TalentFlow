import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';

interface ApplyNowFormProps {
  projectId: string;
  jobTitle: string;
  budgetRange: { min: number; max: number };
  requiredLanguages: string[];
  dueDate: string;
  onSuccess: () => void;  // Callback to update the UI
}

export const ApplyNowForm: React.FC<ApplyNowFormProps> = ({
  projectId,
  jobTitle,
  budgetRange,
  requiredLanguages,
  dueDate,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [proposedBudget, setProposedBudget] = useState(budgetRange.min);

  if (!user) return <p className="text-red-500">You must be logged in to apply.</p>;

  const handleApply = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    const token = localStorage.getItem('token'); // Get JWT token from localStorage
  
    try {
      // Create application record first
      const applicationResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}projects/createapplication`,
        {
          projectId,
          freelancerId: user.id,
          proposedBudget: proposedBudget, // Use user-selected budget
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in the request
          },
        }
      );
  
      if (!applicationResponse.data) {
        throw new Error('Application creation failed');
      }
  
      // Assign freelancer to the project
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_API}api/project/${projectId}/assign-freelancer`,
        {
          freelancerId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in the request
          },
        }
      );
  
      setSuccess('You have successfully applied for this project!');
      onSuccess(); // Update UI
      setShowConfirmation(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error applying for the project.');
    } finally {
      setLoading(false);
    }
  };    

  return (
    <div className="p-4 border rounded-lg bg-gray-100">
      <h3 className="text-lg font-semibold">Apply for this Project</h3>

      {!showConfirmation ? (
        <button
          onClick={() => setShowConfirmation(true)}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply Now
        </button>
      ) : (
        <div className="mt-3 p-4 bg-white border rounded">
          <h4 className="text-md font-semibold">Confirm Your Application</h4>
          <p className="text-gray-600 mt-2">
            <strong>Job Title:</strong> {jobTitle}
          </p>
          <p className="text-gray-600">
            <strong>Budget:</strong> ${budgetRange.min} - ${budgetRange.max}
          </p>
          <p className="text-gray-600">
            <strong>Languages Required:</strong> {requiredLanguages.join(', ')}
          </p>
          <p className="text-gray-600">
            <strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}
          </p>

          {/* Budget Input */}
          <div className="mt-2">
            <label className="text-gray-600">Proposed Budget:</label>
            <input
              type="number"
              value={proposedBudget}
              onChange={(e) => setProposedBudget(Number(e.target.value))}
              min={budgetRange.min}
              max={budgetRange.max}
              className="ml-2 border p-1"
            />
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Applying...' : 'Confirm Apply'}
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default ApplyNowForm;