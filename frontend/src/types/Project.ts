export interface Project {
  title: string;
  description: string;
  budgetRange: { min: number; max: number };
  requiredLanguages: string[];
  dueDate: string;
  status: string;
  createdAt: string;
  isAssigned: boolean;
  reviewStars: number;
}
