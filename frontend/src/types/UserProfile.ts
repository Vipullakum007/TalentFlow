export default interface UserProfile {
  _id: string;
  profileImage?: string;
  hourlyRate?: number;
  completedJobs?: number;
  ratings?: number[];
  skills?: string[];
  bio?: string;
  portfolio?: string[];
  companyName?: string;
  industry?: string;
  jobsPosted?: string[];
}
