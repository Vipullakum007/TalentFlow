import React from 'react';
import { Briefcase, Code, Layout, PenTool } from 'lucide-react';

const categories = [
  { name: 'All Categories', icon: Briefcase, count: 150 },
  { name: 'Web Development', icon: Code, count: 64 },
  { name: 'Design', icon: PenTool, count: 42 },
  { name: 'UI/UX', icon: Layout, count: 28 },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Categories</h2>
          <div className="mt-4 space-y-2">
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
              >
                <div className="flex items-center">
                  <category.icon className="h-5 w-5 mr-3 text-gray-400" />
                  <span>{category.name}</span>
                </div>
                <span className="text-gray-400">{category.count}</span>
              </button>
            ))}
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="10000"
              />
            </div>
          </div>
        </div>
        <div>
          <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}