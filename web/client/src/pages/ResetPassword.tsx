import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Lock } from 'lucide-react';

// Store tokens globally to prevent them from being lost during redirects
let storedTokens: { access_token: string; refresh_token: string; type: string } | null = null;

// Function to extract and store tokens immediately when the script loads
const extractTokensFromURL = () => {
  if (typeof window !== 'undefined' && !storedTokens) {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const hashParams = new URLSearchParams(hash);
      const access_token = hashParams.get("access_token");
      const refresh_token = hashParams.get("refresh_token");
      const type = hashParams.get("type");
      
      if (access_token && type === "recovery") {
        storedTokens = { access_token, refresh_token: refresh_token || "", type };
        console.log("Tokens extracted and stored:", { access_token: !!access_token, type });
        // Clean the URL immediately
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }
};

// Extract tokens immediately when this module loads
extractTokensFromURL();

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

  useEffect(() => {
    const handleRecoveryAndCheck = async () => {
      try {
        console.log("Component mounted, checking for tokens...");
        
        // Try to extract tokens one more time in case they weren't caught initially
        if (!storedTokens) {
          extractTokensFromURL();
        }

        // Also check current URL in case tokens are still there
        const hash = window.location.hash.replace(/^#/, "");
        const hashParams = new URLSearchParams(hash);
        const urlParams = new URLSearchParams(location.search);
        
        const currentTokens = {
          access_token: hashParams.get("access_token") || urlParams.get("access_token"),
          refresh_token: hashParams.get("refresh_token") || urlParams.get("refresh_token"),
          type: hashParams.get("type") || urlParams.get("type")
        };

        // Use stored tokens or current tokens
        const tokens = storedTokens || (currentTokens.access_token ? currentTokens : null);
        
        console.log("Available tokens:", {
          stored: !!storedTokens,
          current: !!currentTokens.access_token,
          final: !!tokens
        });

        if (tokens && tokens.access_token && tokens.type === "recovery") {
          // Clean the URL if tokens are still in hash
          if (window.location.hash) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
          
          console.log("Setting session with recovery tokens...");
          
          // Set the session using the tokens
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token || "",
          });

          if (sessionError) {
            console.error("Session error:", sessionError);
            setValidRecovery(false);
            setError("Invalid or expired reset link. " + sessionError.message);
          } else if (data.session && data.session.user) {
            console.log("Session set successfully for user:", data.session.user.id);
            setValidRecovery(true);
            setError("");
            // Clear stored tokens after successful use
            storedTokens = null;
          } else {
            console.log("Session data:", data);
            setValidRecovery(false);
            setError("Unable to establish session with the provided tokens.");
          }
        } else {
          console.log("No valid recovery tokens found");
          setValidRecovery(false);
          setError("No valid reset link found. Please request a new password reset email.");
        }
      } catch (e) {
        console.error("Recovery error:", e);
        setValidRecovery(false);
        setError("Error processing reset link: " + (e instanceof Error ? e.message : String(e)));
      }
      setChecking(false);
    };

    handleRecoveryAndCheck();
  }, []); // Remove location dependency to prevent re-runs

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        setError(error.message);
      } else {
        setMessage("Password updated successfully! You can now log in.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (e) {
      setError("Error updating password: " + (e instanceof Error ? e.message : String(e)));
    }
    
    setLoading(false);
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