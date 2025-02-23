import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ClientProjects } from './components/ClientProjects';
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './context/authContext';
import { Profile } from './components/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/client-projects" element={<ClientProjects />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;