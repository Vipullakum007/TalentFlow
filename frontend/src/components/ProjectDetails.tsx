interface Project {
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

interface ProjectDetailsProps {
    project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Budget Range */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Budget Range</h3>
                    <p className="text-gray-700">
                        ${project.budgetRange.min} - ${project.budgetRange.max}
                    </p>
                </div>

                {/* Required Languages */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Required Languages</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.requiredLanguages.map((language, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                            >
                                {language}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Due Date */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Due Date</h3>
                    <p className="text-gray-700">
                        {new Date(project.dueDate).toLocaleDateString()}
                    </p>
                </div>

                {/* Status */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Status</h3>
                    <p className="text-gray-700">{project.status}</p>
                </div>

                {/* Created At */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Created At</h3>
                    <p className="text-gray-700">
                        {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                </div>

                {/* Assigned Status */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Assigned</h3>
                    <p className="text-gray-700">
                        {project.isAssigned ? 'Yes' : 'No'}
                    </p>
                </div>

                {/* Review Stars */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Review Stars</h3>
                    <p className="text-gray-700">{project.reviewStars} / 5</p>
                </div>

            </div>
        </div>
    );
}