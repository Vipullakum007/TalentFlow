import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { JobList } from '../components/JobList';

export function Home() {
  return (
    
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Jobs</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Post a Job
              </button>
            </div>
            <JobList />
          </div>
        </main>
      </div>
    </div>
  );
}