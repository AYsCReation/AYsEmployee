import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mb-6">Manage your application effortlessly.</p>
        <div className="flex justify-center">
        <Link to='/employee-list'><button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
            Get Started
          </button></Link>  
        </div>
      </div>
    </div>
  );
};

export default Home;
