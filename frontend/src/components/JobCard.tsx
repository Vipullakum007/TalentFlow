import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { ApplyNowForm } from "./ApplyNowForm";

interface Job {
  _id: string;
  title: string;
  description: string;
  budgetRange: { min: number; max: number };
  requiredLanguages: string[];
  dueDate: string;
  clientId: string;
  status: string;
}

interface JobCardProps {
  job: Job;
  showApplyButton?: boolean;
}

export function JobCard({ job, showApplyButton = false }: JobCardProps) {
  const { user } = useAuth();
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showApplyForm, setShowApplyForm] = useState(false);

  // ✅ Fetch token from localStorage
  const token = localStorage.getItem("token");

  // ✅ Check if the freelancer has already applied
  useEffect(() => {
    if (user && token) {
      axios
        .get(`http://localhost:3000/api/project/${job._id}/check-application?freelancerId=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Include JWT token
        })
        .then((response) => {
          setHasApplied(response.data.applied);
        })
        .catch((error) => console.error("Error checking application status:", error))
        .finally(() => setLoading(false));
    }
  }, [user, job._id, token]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-bold">{job.title}</h3>
      <p className="text-gray-600">{job.description}</p>
      <p className="mt-2 text-sm">Budget: ${job.budgetRange.min} - ${job.budgetRange.max}</p>

      {/* ✅ Display Required Languages */}
      {job.requiredLanguages && job.requiredLanguages.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-600">Languages Required:</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {job.requiredLanguages.map((language, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-md">
                {language}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm">Due Date: {new Date(job.dueDate).toLocaleDateString()}</p>

      {showApplyButton && (
        <>
          {loading ? (
            <p className="text-gray-500 mt-2">Checking application status...</p>
          ) : hasApplied ? (
            <button className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed">
              Already Applied
            </button>
          ) : (
            <button
              onClick={() => setShowApplyForm(!showApplyForm)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {showApplyForm ? "Cancel" : "Apply Now"}
            </button>
          )}

          {showApplyForm && (
            <ApplyNowForm
              projectId={job._id}
              jobTitle={job.title}
              budgetRange={job.budgetRange}
              requiredLanguages={job.requiredLanguages}
              dueDate={job.dueDate}
              onSuccess={() => {
                setHasApplied(true); // ✅ Update UI
                setShowApplyForm(false); // ✅ Close the form
              }}
            />          
          )}
        </>
      )}
    </div>
  );
}
