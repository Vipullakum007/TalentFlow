import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserProfile from '../types/UserProfile';
import FreelancerProfile from './FreeLancerProfile';
import ClientProfile from './ClientProfile';

export function Profile() {
    const { userId } = useParams<{ userId: string }>();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

    useEffect(() => {
        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    const fetchUserProfile = async () => {
        try {
            if (!token) {
                throw new Error('Token is missing. User must be logged in.');
            }

            const roleResponse = await fetch(`${API_BASE_URL}api/user/${userId}/role`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!roleResponse.ok) throw new Error(`Error fetching role: ${roleResponse.status}`);

            const { role } = await roleResponse.json();
            setUserRole(role);

            const profileEndpoint = role === 'freelancer'
                ? `${API_BASE_URL}api/freelancer/user/${userId}`
                : `${API_BASE_URL}api/client/user/${userId}`;

            const profileResponse = await fetch(profileEndpoint, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!profileResponse.ok) throw new Error(`Error fetching profile: ${profileResponse.status}`);

            const data: UserProfile = await profileResponse.json();
            console.log('ProfileResponse : ', data);
            setProfile(data);
        } catch (error: any) {
            console.error('Error fetching profile:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = () => {
        if (profile) {
            const path = userRole === 'freelancer'
                ? `/freelancer/update/${profile._id}`
                : `/client/update/${profile._id}`;
            navigate(path);
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="bg-white shadow rounded-lg p-6">
                {userRole === 'freelancer' ? <FreelancerProfile profile={profile!} /> : <ClientProfile profile={profile!} />}
                <div className="mt-8">
                    <button
                        onClick={handleUpdateProfile}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
}



