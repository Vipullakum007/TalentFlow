// src/App.jsx
import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome to the Auth App
        </h1>
        <div className="flex justify-between">
          <Link
            to="/signup"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
