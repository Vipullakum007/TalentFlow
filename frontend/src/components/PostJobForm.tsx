import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';
import axios from 'axios';

interface PostJobFormProps {
  initialData?: {
    title: string;
    clientId: string;
    description: string;
    budgetRange: { min: number; max: number };
    requiredLanguages: string;
    dueDate: string; // Expects a string in "yyyy-MM-dd" format
    status: string;
    isAssigned: boolean;
    category: string;
  };
  onSubmit: (data: any) => void;
  onCancel?: () => void;
}

interface Category {
  _id: string;
  name: string;
}

export function PostJobForm({ initialData, onSubmit, onCancel }: PostJobFormProps) {

  const { user } = useAuth();

  const clientId = user?.id;
  const [formData, setFormData] = useState({
    title: '',
    clientId: clientId,
    description: '',
    budgetRange: { min: 0, max: 0 },
    requiredLanguages: '',
    dueDate: '',
    status: 'pending',
    isAssigned: false,
    category: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://localhost:3000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      const formattedDueDate = initialData.dueDate.includes('T')
        ? initialData.dueDate.split('T')[0]
        : initialData.dueDate;

      setFormData({
        ...initialData,
        dueDate: formattedDueDate,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'budgetMin' || name === 'budgetMax') {
      setFormData((prev) => ({
        ...prev,
        budgetRange: {
          ...prev.budgetRange,
          [name === 'budgetMin' ? 'min' : 'max']: Number(value),
        },
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to perform this action.');
      return;
    }

    const updatedData = {
      ...formData,
      dueDate: new Date(formData.dueDate).toISOString(),
      requiredLanguages: formData.requiredLanguages.split(',').map((lang) => lang.trim()),
    };

    onSubmit(updatedData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{initialData ? 'Update Job' : 'Post a Job'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'requiredLanguages'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Budget Range (Min)</label>
          <input
            type="number"
            name="budgetMin"
            value={formData.budgetRange.min}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Budget Range (Max)</label>
          <input
            type="number"
            name="budgetMax"
            value={formData.budgetRange.max}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>

          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isAssigned"
            checked={formData.isAssigned}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">Is Assigned</label>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {initialData ? 'Update Job' : 'Post Job'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
