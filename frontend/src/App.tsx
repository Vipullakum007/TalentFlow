import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { LoginForm } from './components/Loginform';
import { SignupForm } from './components/SignupForm';
import { ToastContainer } from "react-toastify";

function App() {
  return (
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

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;