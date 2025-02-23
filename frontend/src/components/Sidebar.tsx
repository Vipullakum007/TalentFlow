import React, { useEffect, useState } from 'react';
import { Briefcase, Code, Layout, PenTool } from 'lucide-react';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
  icon: string;
}

interface SidebarProps {
  onFilter: (min: number, max: number) => void;
}

export function Sidebar({ onFilter }: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [minBudget, setMinBudget] = useState<number | "">("");
  const [maxBudget, setMaxBudget] = useState<number | "">("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(`${import.meta.env.VITE_BACKEND_API}api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const applyFilters = () => {
    const min = minBudget === "" ? 0 : Number(minBudget);
    const max = maxBudget === "" ? Number.MAX_VALUE : Number(maxBudget);
    onFilter(min, max);
  };

  return (
    <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Categories</h2>
          <div className="mt-4 space-y-2">
            {categories.length === 0 ? (
              <p>No categories</p>
            ) : (
              categories.map((category) => {
                const IconComponent = getIconComponent(category.icon);
                return (
                  <button
                    key={category._id}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center">
                      <IconComponent className="h-5 w-5 mr-3 text-gray-400" />
                      <span>{category.name}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">Budget</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="min" className="block text-sm font-medium text-gray-700">
                Minimum ($)
              </label>
              <input
                type="number"
                id="min"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label htmlFor="max" className="block text-sm font-medium text-gray-700">
                Maximum ($)
              </label>
              <input
                type="number"
                id="max"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="10000"
              />
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={applyFilters}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

function getIconComponent(iconName: string) {
  switch (iconName) {
    case 'Briefcase':
      return Briefcase;
    case 'Code':
      return Code;
    case 'Layout':
      return Layout;
    case 'PenTool':
      return PenTool;
    default:
      return Briefcase;
  }
}