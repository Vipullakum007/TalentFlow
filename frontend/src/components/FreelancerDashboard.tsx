import { useEffect, useState } from 'react';
import axios from 'axios';
import { JobCard } from '../components/JobCard';
import { useAuth } from '../context/authContext';
import Job from '../types/Job';

export function FreelancerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>('http://localhost:3000/api/project/');
        setJobs(response.data);
      } catch (error) {                                                                             
        setError('Error fetching jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-center py-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Jobs</h2>
        <div className="space-y-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} showApplyButton={user?.role === 'freelancer'} />
          ))}
        </div>
      </div>
    </div>
  );
}
