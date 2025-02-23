import React from 'react';
import { JobCard } from './JobCard';
import { Job } from '../types/Job';

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  if (jobs.length === 0) {
    return <div className="text-center py-6">No jobs available.</div>;
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}