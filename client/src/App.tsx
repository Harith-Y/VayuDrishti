import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { HistoricalTrends } from './pages/HistoricalTrends';
import { Forecast } from './pages/Forecast';
import { HealthDashboard } from './pages/HealthDashboard';
import { Settings } from './pages/Settings';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trends" element={<HistoricalTrends />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/health" element={<HealthDashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;