export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  skills: string[];
  deadline: string;
  clientId: string;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: string;
}

export interface Profile {
  id: string;
  name: string;
  role: 'freelancer' | 'client';
  avatar: string;
  hourlyRate?: number;
  skills?: string[];
  bio?: string;
  rating: number;
  completedProjects: number;
}

export interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  coverLetter: string;
  bidAmount: number;
  estimatedTime: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}