export interface Job {
  _id: string;
  title: string;
  description: string;
  budgetRange: {
    min: number;
    max: number;
  };
  requiredLanguages: string[];
  dueDate: string;
  clientId: string;
  status: string;
  createdAt: string;
  category: string; // Add category field
}
