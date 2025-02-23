import { JobCard } from './JobCard';
import { Job } from '../types/Job';
import { ShowerHead } from 'lucide-react';

interface JobListProps {
  jobs: Job[];
  showApplyButton: boolean;
}

export function JobList({ jobs, showApplyButton = false }: JobListProps) {
  if (jobs.length === 0) {
    return <div className="text-center py-6">No jobs available.</div>;
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} showApplyButton={showApplyButton}/>
      ))}
    </div>
  );
}