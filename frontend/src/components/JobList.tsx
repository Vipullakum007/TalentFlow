import React from 'react';
import { JobCard } from './JobCard';
import type { Job } from '../types';

const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    title: 'Full Stack Developer for E-commerce Platform',
    description: 'Looking for an experienced developer to build a modern e-commerce platform using React and Node.js.',
    budget: 5000,
    category: 'Web Development',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    deadline: '2024-04-30',
    clientId: 'client1',
    status: 'open',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'UI/UX Designer for Mobile App',
    description: 'Need a talented designer to create beautiful and intuitive interfaces for our mobile application.',
    budget: 3000,
    category: 'Design',
    skills: ['Figma', 'UI Design', 'Mobile Design', 'User Research'],
    deadline: '2024-04-15',
    clientId: 'client2',
    status: 'open',
    createdAt: '2024-03-14',
  },
  {
    id: '3',
    title: 'WordPress Developer for Blog Customization',
    description: 'Seeking a WordPress expert to customize and optimize our blog with custom features and improved performance.',
    budget: 1500,
    category: 'WordPress',
    skills: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
    deadline: '2024-04-10',
    clientId: 'client3',
    status: 'open',
    createdAt: '2024-03-13',
  },
];

export function JobList() {
  return (
    <div className="space-y-6">
      {SAMPLE_JOBS.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}