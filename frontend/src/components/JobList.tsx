import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JobCard } from './JobCard';

interface Job {
  _id: string;
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

export function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/project/');
        console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        setError('Error fetching jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}