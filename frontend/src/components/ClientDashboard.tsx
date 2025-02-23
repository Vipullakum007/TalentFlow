
import { useEffect, useState } from 'react';
import axios from 'axios';
import { JobList } from './JobList';
import { useAuth } from '../context/authContext';
import { Sidebar } from '../components/Sidebar';
import { PostJobForm } from '../components/PostJobForm';
import { Job } from '../types/Job';

export function ClientDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPostJobForm, setShowPostJobForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized: Please log in.');
        setLoading(false);
        return;
      }
      console.log(token);
      try {
        const response = await axios.get<Job[]>(`${import.meta.env.VITE_BACKEND_API}api/project/client/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error: any) {
        setError('Error fetching jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user?.id]);

  const handlePostJob = async (newJob: Job) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}api/project/add`, { ...newJob, clientId: user?.id });
      setShowPostJobForm(false);
      setJobs([...jobs, newJob]);
      setFilteredJobs([...jobs, newJob]);
      setError('');
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  const handleFilter = (min: number, max: number) => {
    const filtered = jobs.filter(job => job.budgetRange.min >= min && job.budgetRange.max <= max);
    setFilteredJobs(filtered);
  };

  if (loading) return <div className="text-center py-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onFilter={handleFilter} />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Posted Jobs</h2>
          <button
            onClick={() => setShowPostJobForm(!showPostJobForm)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {showPostJobForm ? 'Hide Form' : 'Post a Job'}
          </button>
        </div>

        {showPostJobForm && <PostJobForm onSubmit={handlePostJob} />}

        {error ? (
          <div className="text-center py-6 text-red-600 font-semibold">{error}</div>
        ) : (
          <JobList jobs={filteredJobs} showApplyButton={false}/>
        )}
      </div>
    </div>
  );
}
