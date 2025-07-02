import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password reset email sent! Please check your inbox.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <form onSubmit={handleForgotPassword} className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-blue-300 text-center">Forgot Password</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 dark:text-green-400 mb-2">{success}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded bg-background text-foreground dark:bg-gray-800 dark:text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Email'}
        </button>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">Back to Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword; 