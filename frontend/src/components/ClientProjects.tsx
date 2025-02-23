// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/authContext';
// import { PostJobForm } from './PostJobForm';
// import { toast } from 'react-toastify';

// interface Project {
//   _id: string;
//   title: string;
//   description: string;
//   budgetRange: { min: number; max: number };
//   requiredLanguages: string[];
//   dueDate: string;
//   status: string;
// }

// export function ClientProjects() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user) {
//       fetchProjects();
//     }
//   }, [user]);

//   const fetchProjects = async () => {
//     if (user == null) {
//       toast.error('Login Required');
//       return;
//     }
//     try {
//       // console.log(user.id);
//       const response = await axios.get(`http://localhost:3000/api/project/client/${user?.id}`);
//       console.log("respoonse : ", response.data);
//       setProjects(response.data);
//     } catch (error) {
//       toast.error('Error fetching projects. Please try again.');
//       console.error('Fetch Projects Error:', error);
//     }
//   };

//   const handleUpdate = async (projectId: string, updatedData: Partial<Project>) => {
//     try {
//       await axios.put(`http://localhost:3000/api/project/${projectId}`, updatedData);
//       toast.success('Project updated successfully!');
//       fetchProjects(); // Refresh the project list
//       setSelectedProject(null); // Clear the selected project
//     } catch (error) {
//       toast.error('Error updating project. Please try again.');
//       console.error('Update Project Error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Projects</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Project List */}
//           <div className="space-y-4">
//             {projects.map((project) => (
//               <div
//                 key={project._id}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//               >
//                 <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
//                 <p className="mt-2 text-gray-600">{project.description}</p>
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {project.requiredLanguages.map((language, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
//                     >
//                       {language}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="mt-4 flex justify-between items-center">
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Budget:</span> ${project.budgetRange.min} - ${project.budgetRange.max}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Deadline:</span> {new Date(project.dueDate).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="mt-4 flex justify-between items-center">
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Status:</span> {project.status}
//                   </p>
//                   <button
//                     onClick={() => setSelectedProject(project)}
//                     className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                   >
//                     Update
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Update Form */}
//           <div>
//             {selectedProject ? (
//               <PostJobForm
//                 initialData={{
//                   title: selectedProject.title,
//                   description: selectedProject.description,
//                   budgetRange: selectedProject.budgetRange,
//                   requiredLanguages: selectedProject.requiredLanguages.join(', '),
//                   dueDate: selectedProject.dueDate,
//                 }}
//                 onSubmit={(data) => handleUpdate(selectedProject._id, data)}
//                 onCancel={() => setSelectedProject(null)}
//               />
//             ) : (
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <p className="text-gray-600">Select a project to update.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { PostJobForm } from '../components/PostJobForm';
import { ProjectDetails } from '../components/ProjectDetails';
import { toast } from 'react-toastify';

interface Project {
  _id: string;
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

export function ClientProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    if (user == null) {
      toast.error('Login Required');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/api/project/client/${user?.id}`);
      console.log('Response:', response.data);
      setProjects(response.data);
    } catch (error) {
      toast.error('Error fetching projects. Please try again.');
      console.error('Fetch Projects Error:', error);
    }
  };

  const handleUpdate = async (projectId: string, updatedData: Partial<Project>) => {
    try {
      await axios.put(`http://localhost:3000/api/project/${projectId}`, updatedData);
      toast.success('Project updated successfully!');
      fetchProjects(); // Refresh the project list
      setSelectedProject(null); // Clear the selected project
    } catch (error) {
      toast.error('Error updating project. Please try again.');
      console.error('Update Project Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project List */}
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <ProjectDetails project={project} />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Update Form */}
          <div>
            {selectedProject ? (
              <PostJobForm
                initialData={{
                  title: selectedProject.title,
                  description: selectedProject.description,
                  budgetRange: selectedProject.budgetRange,
                  requiredLanguages: selectedProject.requiredLanguages.join(', '),
                  dueDate: selectedProject.dueDate,
                }}
                onSubmit={(data) => handleUpdate(selectedProject._id, data)}
                onCancel={() => setSelectedProject(null)}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600">Select a project to update.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}