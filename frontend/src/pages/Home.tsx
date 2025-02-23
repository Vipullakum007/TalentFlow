import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/authContext';
import { ClientDashboard } from '../components/ClientDashboard';
import { FreelancerDashboard } from '../components/FreelancerDashboard';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {user?.role === 'client' ? <ClientDashboard /> : <FreelancerDashboard />}
        </main>
      </div>
    </div>
  );
}
