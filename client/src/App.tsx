import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { HistoricalTrends } from './pages/HistoricalTrends';
import { Forecast } from './pages/Forecast';
import { HealthDashboard } from './pages/HealthDashboard';
import { Settings } from './pages/Settings';
import { Toaster } from '@/components/ui/toaster';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from './lib/supabaseClient';

// Session context
export const AuthContext = createContext<any>(null);
export const useAuth = () => useContext(AuthContext);

function PrivateRoute({ user, children }: { user: any, children: JSX.Element }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/" element={<LandingPage user={user} />} />
              <Route path="/dashboard" element={<PrivateRoute user={user}><Dashboard /></PrivateRoute>} />
              <Route path="/trends" element={<PrivateRoute user={user}><HistoricalTrends /></PrivateRoute>} />
              <Route path="/forecast" element={<PrivateRoute user={user}><Forecast /></PrivateRoute>} />
              <Route path="/health" element={<PrivateRoute user={user}><HealthDashboard /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute user={user}><Settings /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;