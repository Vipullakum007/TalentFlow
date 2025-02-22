import React, { useState } from 'react';
import axios from 'axios';

export function PostJobForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState({ min: 0, max: 0 });
  const [requiredLanguages, setRequiredLanguages] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3000/api/projects', {
        title,
        description,
        budgetRange: {
          min: budgetRange.min,
          max: budgetRange.max,
        },
        requiredLanguages: requiredLanguages.split(',').map((lang) => lang.trim()),
        dueDate,
        clientId: 'client1', // Replace with actual client ID from authentication
      });

      setSuccess('Job posted successfully!');
      console.log(response.data);
    } catch (error) {
      setError('Error posting job. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Post a Job</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="budgetMin" className="block text-sm font-medium text-gray-700">
            Budget Range (Min)
          </label>
          <input
            type="number"
            id="budgetMin"
            value={budgetRange.min}
            onChange={(e) =>
              setBudgetRange({ ...budgetRange, min: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="budgetMax" className="block text-sm font-medium text-gray-700">
            Budget Range (Max)
          </label>
          <input
            type="number"
            id="budgetMax"
            value={budgetRange.max}
            onChange={(e) =>
              setBudgetRange({ ...budgetRange, max: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="requiredLanguages" className="block text-sm font-medium text-gray-700">
            Required Languages (comma-separated)
          </label>
          <input
            type="text"
            id="requiredLanguages"
            value={requiredLanguages}
            onChange={(e) => setRequiredLanguages(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}