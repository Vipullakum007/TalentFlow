import { useEffect, useState } from "react";
import axios from "axios";

interface Freelancer {
  _id: string;
  userId: { email: string };
  skills: string[];
  profileImage?: string;
  hourlyRate: number;
  bio: string;
  completedJobs: number;
}

export function BrowseFreelancers() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT authentication
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}api/freelancer`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setFreelancers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load freelancers");
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold text-gray-800">Browse Freelancers</h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map((freelancer) => (
          <div key={freelancer._id} className="bg-white p-4 shadow rounded-lg">
            <img
              src={freelancer.profileImage || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?semt=ais_hybrid"}
              alt="Freelancer Profile"
              className="w-16 h-16 rounded-full mx-auto object-cover"
            />
            <h2 className="text-lg font-semibold text-center mt-2">{freelancer.userId.email}</h2> {/* Display email */}
            <p className="text-center text-gray-500">{freelancer.bio || "No bio available."}</p>
            <p className="text-sm text-gray-500 text-center">
              💼 {freelancer.completedJobs} Completed Jobs
            </p>
            <p className="text-sm text-gray-500 text-center">{freelancer.hourlyRate > 0 ? `💲 ${freelancer.hourlyRate} / HR` : "TBA"}</p>

            <div className="flex flex-wrap justify-center mt-2">
              {freelancer.skills.length > 0 ? (
                freelancer.skills.map((skill, index) => (
                  <span key={index} className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full m-1">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full m-1">
                  No skills added
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
