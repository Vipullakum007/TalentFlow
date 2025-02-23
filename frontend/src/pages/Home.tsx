import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { JobList } from '../components/JobList';
import { PostJobForm } from '../components/PostJobForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Job } from '../types/Job';

export function Home() {
  const [showPostJobForm, setShowPostJobForm] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}api/project`);
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleJobSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}api/project/add`, data);
      toast.success('Job posted successfully!');
      setShowPostJobForm(false);
      console.log("Response  : ", response);
      fetchJobs();
    } catch (error) {
      toast.error('Error posting job.');
      console.error('Error posting job:', error);
    }
  };

  const handleCancel = () => {
    setShowPostJobForm(false);
  };

  const handleFilter = (min, max) => {
    console.log(`Filtering jobs between ${min} and ${max}`);
    const filtered = jobs.filter(job => job.budgetRange.min >= min && job.budgetRange.max <= max);
    console.log('Filtered jobs:', filtered);
    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar onFilter={handleFilter} />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Jobs</h2>
              <button
                onClick={() => setShowPostJobForm(!showPostJobForm)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {showPostJobForm ? 'Hide Form' : 'Post a Job'}
              </button>
            </div>
            {showPostJobForm && <PostJobForm onSubmit={handleJobSubmit} onCancel={handleCancel} />}
            <JobList jobs={filteredJobs} />
          </div>
        </main>
      </div>
    </div>
  );
}