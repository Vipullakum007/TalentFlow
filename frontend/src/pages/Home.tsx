// import React, { useState, useEffect } from 'react';
// import { Sidebar } from '../components/Sidebar';
// import { useAuth } from '../context/authContext';
// import { ClientDashboard } from '../components/ClientDashboard';
// import { FreelancerDashboard } from '../components/FreelancerDashboard';
// import { Job } from '../types/Job';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// // import { JobList } from '../components/JobList';
// // import { PostJobForm } from '../components/PostJobForm';

// // export function Home() {

// export function Home() {
//   // const [showPostJobForm, setShowPostJobForm] = useState(false);
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const { user } = useAuth();
  
//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}api/project`);
//       setJobs(response.data);
//       setFilteredJobs(response.data);
//     } catch (error) {
//       console.error('Error fetching jobs:', error);
//     }
//   };

//   // const handleJobSubmit = async (data) => {
//   //   console.log(data);
//   //   try {
//   //     const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}api/project/add`, data);
//   //     toast.success('Job posted successfully!');
//   //     setShowPostJobForm(false);
//   //     console.log("Response  : ", response);
//   //     fetchJobs();
//   //   } catch (error) {
//   //     toast.error('Error posting job.');
//   //     console.error('Error posting job:', error);
//   //   }
//   // };

//   // const handleCancel = () => {
//   //   setShowPostJobForm(false);
//   // };

//   const handleFilter = (min, max) => {
//     console.log(`Filtering jobs between ${min} and ${max}`);
//     const filtered = jobs.filter(job => job.budgetRange.min >= min && job.budgetRange.max <= max);
//     console.log('Filtered jobs:', filtered);
//     setFilteredJobs(filtered);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex">
//         <Sidebar onFilter={handleFilter} />
//         <main className="flex-1 p-6">
//           {user?.role === 'client' ? <ClientDashboard /> : <FreelancerDashboard />}
//           {/* <div className="max-w-4xl mx-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">Available Jobs</h2>
//               <button
//                 onClick={() => setShowPostJobForm(!showPostJobForm)}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 {showPostJobForm ? 'Hide Form' : 'Post a Job'}
//               </button>
//             </div>
//             {showPostJobForm && <PostJobForm onSubmit={handleJobSubmit} onCancel={handleCancel} />}
//             <JobList jobs={filteredJobs} />
//           </div> */}
//         </main>
//       </div>
//     </div>
//   );
// }
// import React from 'react';
// import { useAuth } from '../context/authContext';
// import { ClientDashboard } from '../components/ClientDashboard';
// import { FreelancerDashboard } from '../components/FreelancerDashboard';

// export function Home() {
//   const { user } = useAuth();

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {user?.role === 'client' ? <ClientDashboard /> : <FreelancerDashboard />}
//     </div>
//   );
// }
import { useAuth } from '../context/authContext';
import { ClientDashboard } from '../components/ClientDashboard';
import { FreelancerDashboard } from '../components/FreelancerDashboard';
import { ArrowRight, Users, Briefcase, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Connect with Top Talent & <br />
              <span className="text-blue-600">Find Amazing Projects</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
              Whether you're looking to hire skilled professionals or find your next opportunity,
              our platform connects talented freelancers with exciting projects worldwide.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get Started
                <ArrowRight className="ml-2 inline-block h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Our Platform?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We provide a secure and efficient way to connect talent with opportunities
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Users className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Top Talent Pool
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Access a curated network of skilled professionals ready to bring your projects to life.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Briefcase className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Quality Projects
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Find meaningful projects that match your skills and career goals.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Secure Platform
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Work with confidence using our secure payment and communication systems.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {user?.role === 'client' ? <ClientDashboard /> : <FreelancerDashboard />}
    </div>
  );
}