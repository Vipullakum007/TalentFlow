import React from 'react';

interface Job {
  id: string;
  title: string;
  description: string;
  budgetRange: {
    min: number;
    max: number;
  };
  requiredLanguages: string[];
  dueDate: string;
  clientId: string;
  status: string;
  createdAt: string;
}

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
      <p className="mt-2 text-gray-600">{job.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {job.requiredLanguages.map((language, index) => (
          <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
            {language}
          </span>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-700">
          <span className="font-semibold">Budget:</span> ${job.budgetRange.min} - ${job.budgetRange.max}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Deadline:</span> {new Date(job.dueDate).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-700">
          <span className="font-semibold">Status:</span> {job.status}
        </p>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Apply
        </button>
      </div>
    </div>
  );
}