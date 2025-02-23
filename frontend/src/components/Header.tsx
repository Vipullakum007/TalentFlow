// import { useState } from 'react';
// import { Bell, Menu, Search } from 'lucide-react';
// import { Modal } from './Modal';
// import { LoginForm } from './Loginform';
// import { SignupForm } from './SignupForm';
// import { useAuth } from '../context/authContext';
// import { Link, useNavigate } from 'react-router-dom';

// export function Header() {
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
//   const token = localStorage.getItem('token'); // Check if the user is logged in
//   const { user , logout } = useAuth();
//   const navigate = useNavigate();
//   const userId = user?.id;
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove the token
//     logout();
//     navigate('/');
//   };

//   return (
//     <header className="bg-white border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <h1 className="text-xl font-bold text-indigo-600 cursor-pointer" onClick={() => { navigate('/') }}>TalentFlow</h1>
//             </div>
//             <nav className="hidden md:ml-6 md:flex md:space-x-8">
//               <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
//                 Find Work
//               </Link>
//               <Link to="/freelancers" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
//                 Browse Freelancers
//               </Link>
//               {token ?
//                 (
//                   <Link to="/client-projects" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
//                     My Projects
//                   </Link>
//                 ) :
//                 (<>
//                 </>)
//               }

//             </nav>
//           </div>
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="relative rounded-full">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="search"
//                   placeholder="Search jobs..."
//                   className="block w-full rounded-full border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//             <button type="button" className="ml-6 relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500">
//               <Bell className="h-6 w-6" />
//               <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
//             </button>
//             <div className="ml-6 flex items-center">
//               <img
//                 className="h-8 w-8 rounded-full cursor-pointer"
//                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                 alt="User avatar"
//                 onClick={() => {navigate(`/profile/${userId}`)}}
//               />
//             </div>

//             {/* Conditionally render Login/Signup or Logout button */}
//             {!token ? (
//               <div className="ml-6 flex space-x-4">
//                 <Modal
//                   title="Login"
//                   triggerText="Login"
//                   isOpen={isLoginModalOpen}
//                   onOpenChange={setIsLoginModalOpen}
//                 >
//                   <LoginForm onSuccess={() => setIsLoginModalOpen(false)} />
//                 </Modal>
//                 <Modal
//                   title="Signup"
//                   triggerText="Signup"
//                   isOpen={isSignupModalOpen}
//                   onOpenChange={setIsSignupModalOpen}
//                 >
//                   <SignupForm onSuccess={() => setIsSignupModalOpen(false)} />
//                 </Modal>
//               </div>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="ml-6 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 Logout
//               </button>
//             )}

//             <button type="button" className="ml-6 md:hidden relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500">
//               <Menu className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

import { useState, useEffect } from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { Modal } from './Modal';
import { LoginForm } from './Loginform';
import { SignupForm } from './SignupForm';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const token = localStorage.getItem('token');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id;

  const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    if (userId && token) {
      fetchUserProfile();
    }
  }, [userId, token]);

  const fetchUserProfile = async () => {
    try {
      // First get user role
      const roleResponse = await fetch(`${API_BASE_URL}api/user/${userId}/role`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!roleResponse.ok) throw new Error('Failed to fetch user role');
      
      const { role } = await roleResponse.json();
      console.log('Role :', role);

      // Then fetch profile based on role
      const profileEndpoint = role === 'freelancer'
        ? `${API_BASE_URL}freelancer/user/${userId}`
        : `${API_BASE_URL}client/user/${userId}`;

      const profileResponse = await fetch(profileEndpoint, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!profileResponse.ok) throw new Error('Failed to fetch profile');

      const profileData = await profileResponse.json();
      // Use the appropriate image field based on role
      const image = role === 'freelancer' ? profileData.profileImage : profileData.ProfileImage;
      setProfileImage(image);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  const defaultProfileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                className="text-xl font-bold text-indigo-600 cursor-pointer"
                onClick={() => { navigate('/') }}
              >
                TalentFlow
              </h1>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Find Work
              </Link>
              <Link
                to="/freelancers"
                className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Browse Freelancers
              </Link>
              {token && (
                <Link
                  to="/client-projects"
                  className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  My Projects
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="relative rounded-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search jobs..."
                  className="block w-full rounded-full border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              type="button"
              className="ml-6 relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>

            {token && (
              <div className="ml-6 flex items-center">
                <img
                  className="h-8 w-8 rounded-full cursor-pointer object-cover transition-transform hover:scale-105"
                  src={profileImage || defaultProfileImage}
                  alt="User avatar"
                  onClick={handleProfileClick}
                  onError={(e) => {
                    e.currentTarget.src = defaultProfileImage;
                  }}
                />
              </div>
            )}

            {!token ? (
              <div className="ml-6 flex space-x-4">
                <Modal
                  title="Login"
                  triggerText="Login"
                  isOpen={isLoginModalOpen}
                  onOpenChange={setIsLoginModalOpen}
                >
                  <LoginForm onSuccess={() => setIsLoginModalOpen(false)} />
                </Modal>
                <Modal
                  title="Signup"
                  triggerText="Signup"
                  isOpen={isSignupModalOpen}
                  onOpenChange={setIsSignupModalOpen}
                >
                  <SignupForm onSuccess={() => setIsSignupModalOpen(false)} />
                </Modal>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-6 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            )}

            <button
              type="button"
              className="ml-6 md:hidden relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}