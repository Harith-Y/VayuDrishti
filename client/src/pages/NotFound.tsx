import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';

const NotFound: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-blue-700 dark:text-blue-300 mb-4">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-200 mb-6">Oops! The page you are looking for does not exist.</p>
        <Link
          to={user ? "/" : "/login"}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
        >
          {user ? 'Go to Dashboard' : 'Go to Login'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 