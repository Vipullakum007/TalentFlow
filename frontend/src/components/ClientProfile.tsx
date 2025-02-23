
import React from "react";
import UserProfile from "@/types/UserProfile";

interface ClientProfileProps {
    profile: UserProfile;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ profile }) => {
    return (
        <div className="p-6 border rounded-lg shadow-lg bg-white">
            {/* Profile Image */}
            {profile.profileImage && (
                <img src={profile.profileImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
            )}

            {/* Company Name & Industry */}
            <h2 className="text-2xl font-bold text-gray-900 text-center">
                {profile.companyName ?? "No Company Name"}
            </h2>
            <p className="text-gray-600 text-center">Client</p>

            {/* Industry & Jobs Posted */}
            <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                    <strong>Industry:</strong> {profile.industry ?? "Not specified"}
                </p>
                <p className="text-gray-700">
                    <strong>Jobs Posted:</strong> {profile.jobsPosted?.length ?? 0}
                </p>
            </div>

            {/* Job Listings */}
            {profile.jobsPosted && profile.jobsPosted.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">Posted Jobs:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        {profile.jobsPosted.map((job, index) => (
                            <li key={index}>{job.title ?? "Untitled Job"}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ClientProfile;
