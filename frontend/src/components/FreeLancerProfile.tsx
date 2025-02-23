import React from "react";
import UserProfile from "@/types/UserProfile";

interface FreelancerProfileProps {
    profile: UserProfile;
}

const FreelancerProfile: React.FC<FreelancerProfileProps> = ({ profile }) => {
    const averageRating =
        profile.ratings && profile.ratings.length > 0
            ? (profile.ratings.reduce((a, b) => a + b, 0) / profile.ratings.length).toFixed(1)
            : "No ratings yet";

    return (
        <div className="p-6 border rounded-lg shadow-lg bg-white">
            {/* Profile Image */}
            {profile.profileImage && (
                <img src={profile.profileImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
            )}

            {/* Freelancer Name & Role */}
            <h2 className="text-2xl font-bold text-gray-900 text-center">{profile.name}</h2>
            <p className="text-gray-600 text-center">Freelancer</p>

            {/* Personal & Professional Details */}
            <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                    <strong>Hourly Rate:</strong> ${profile.hourlyRate ?? "Not set"}
                </p>
                <p className="text-gray-700">
                    <strong>Completed Jobs:</strong> {profile.completedJobs ?? 0}
                </p>
                <p className="text-gray-700">
                    <strong>Average Rating:</strong> {averageRating}
                </p>
                <p className="text-gray-700">
                    <strong>Skills:</strong> {profile.skills && profile.skills.length > 0 ? profile.skills.join(", ") : "Not specified"}
                </p>
            </div>

            {/* Portfolio & Resume Links */}
            <div className="mt-4 space-y-2">
                {profile.portfolio && (
                    <p className="text-blue-600 underline cursor-pointer">
                        <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">View Portfolio</a>
                    </p>
                )}
                {profile.resume && (
                    <p className="text-blue-600 underline cursor-pointer">
                        <a href={profile.resume} target="_blank" rel="noopener noreferrer">Download Resume</a>
                    </p>
                )}
            </div>
        </div>
    );
};

export default FreelancerProfile;
