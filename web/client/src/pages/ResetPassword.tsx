import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Lock } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validRecovery, setValidRecovery] = useState(false);
  const [checking, setChecking] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // On mount, if query contains code and type=recovery, set recovery session, then check session
  useEffect(() => {
    const handleRecoveryAndCheck = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const type = params.get("type");
      let exchangeError = null;

      if (code && type === "recovery") {
        const { error: exchangeErr } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (exchangeErr) {
          exchangeError = exchangeErr.message;
        }
      }

      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (exchangeError) {
        setValidRecovery(false);
        setError("Invalid or expired reset link. " + exchangeError);
      } else if (session && session.user && type === "recovery") {
        setValidRecovery(true);
        setError("");
      } else {
        setValidRecovery(false);
        setError("Invalid or expired reset link.");
      }
      setChecking(false);
    };
    handleRecoveryAndCheck();
    // eslint-disable-next-line
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated! You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-blue-700 dark:text-blue-300 font-semibold text-lg">Checking reset link...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">Set New Password</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {message && <div className="text-green-600 mb-4 text-center">{message}</div>}
        {validRecovery ? (
          <>
            <div className="mb-6 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 dark:text-blue-300" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-300 text-sm focus:outline-none"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
            <div className="flex justify-between mt-6 text-sm">
              <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-300">Back to Login</Link>
            </div>
          </>
        ) : null}
      </form>
    </div>
  );
}