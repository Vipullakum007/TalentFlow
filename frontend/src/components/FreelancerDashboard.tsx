import { useEffect, useState } from 'react';
import axios from 'axios';
import { JobList } from './JobList';
import { Sidebar } from '../components/Sidebar';
import { Job } from '../types/Job';

export function FreelancerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized: Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<Job[]>(`${import.meta.env.VITE_BACKEND_API}api/project/fun/recomend`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        setError('Error fetching jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleFilter = (min: number, max: number) => {
    const filtered = jobs.filter(job => job.budgetRange.min >= min && job.budgetRange.max <= max);
    setFilteredJobs(filtered);
  };

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-center py-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onFilter={handleFilter} />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Jobs</h2>
        <JobList jobs={filteredJobs} showApplyButton={true} />
      </div>
    </div>
  );
}
