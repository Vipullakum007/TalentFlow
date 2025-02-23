interface Job {
    _id: string;  // Unique identifier for the job
    title: string;
    description: string;
    budgetRange: {
      min: number;
      max: number;
    };
    requiredLanguages: string[]; // Array of required programming languages
    dueDate: string; // Date in ISO format (e.g., "2024-02-23T10:00:00.000Z")
    clientId: string; // ID of the client who posted the job
    status: string; // e.g., "pending" or "completed"
    createdAt: string; // Timestamp of when the job was created
}

export default Job;