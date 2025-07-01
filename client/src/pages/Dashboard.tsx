import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Wind, Eye, Droplets, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AQIIndicator } from '@/components/AQIIndicator';
import { PollutantCard } from '@/components/PollutantCard';
import { AQIMap } from '@/components/AQIMap';

type PollutantStatus = 'good' | 'moderate' | 'unhealthy' | 'hazardous';

type Pollutant = {
  value: number;
  unit: string;
  status: PollutantStatus;
};

type DashboardData = {
  location: string;
  aqi: number;
  category: PollutantStatus;
  lastUpdated: Date;
  pollutants: {
    pm25: Pollutant;
    pm10: Pollutant;
    no2: Pollutant;
    so2: Pollutant;
    co: Pollutant;
    o3: Pollutant;
  };
};

// Mock data - in real app, this would come from an API
const mockData: DashboardData = {
  location: 'Delhi, India',
  aqi: 78,
  category: 'moderate',
  lastUpdated: new Date(),
  pollutants: {
    pm25: { value: 45, unit: 'μg/m³', status: 'moderate' },
    pm10: { value: 72, unit: 'μg/m³', status: 'moderate' },
    no2: { value: 28, unit: 'ppb', status: 'good' },
    so2: { value: 8, unit: 'ppb', status: 'good' },
    co: { value: 1.2, unit: 'ppm', status: 'good' },
    o3: { value: 65, unit: 'ppb', status: 'moderate' }
  }
};

export function Dashboard() {
  const locationState = useLocation();
  // Try to get location from navigation state
  const passedLocation = locationState.state?.location;

  // Use the display_name from geocoding if available, else fallback to mock
  const [currentData, setCurrentData] = useState<DashboardData>({
    ...mockData,
    location: passedLocation?.display_name || mockData.location,
  });

  useEffect(() => {
    // If the location changes (e.g., user navigates with a new search), update the location
    if (passedLocation?.display_name) {
      setCurrentData(prev => ({ ...prev, location: passedLocation.display_name }));
    }
  }, [passedLocation]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCurrentData(prev => ({
        ...prev,
        aqi: prev.aqi + Math.floor(Math.random() * 10 - 5),
        lastUpdated: new Date(),
        pollutants: {
          ...prev.pollutants,
          pm25: {
            ...prev.pollutants.pm25,
            value: Math.max(0, prev.pollutants.pm25.value + Math.floor(Math.random() * 6 - 3))
          }
        }
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{currentData.location}</span>
              <span className="ml-4 text-sm">
                Last updated: {currentData.lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main AQI Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <AQIIndicator aqi={currentData.aqi} category={currentData.category} />
      </motion.div>

      {/* Pollutants Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <PollutantCard
          name="PM2.5"
          value={currentData.pollutants.pm25.value}
          unit={currentData.pollutants.pm25.unit}
          status={currentData.pollutants.pm25.status}
          icon={Droplets}
          description="Fine particles that can penetrate deep into lungs"
        />
        <PollutantCard
          name="PM10"
          value={currentData.pollutants.pm10.value}
          unit={currentData.pollutants.pm10.unit}
          status={currentData.pollutants.pm10.status}
          icon={Wind}
          description="Coarse particles from dust and pollen"
        />
        <PollutantCard
          name="NO₂"
          value={currentData.pollutants.no2.value}
          unit={currentData.pollutants.no2.unit}
          status={currentData.pollutants.no2.status}
          icon={Zap}
          description="Nitrogen dioxide from vehicle emissions"
        />
        <PollutantCard
          name="SO₂"
          value={currentData.pollutants.so2.value}
          unit={currentData.pollutants.so2.unit}
          status={currentData.pollutants.so2.status}
          icon={Eye}
          description="Sulfur dioxide from industrial sources"
        />
        <PollutantCard
          name="CO"
          value={currentData.pollutants.co.value}
          unit={currentData.pollutants.co.unit}
          status={currentData.pollutants.co.status}
          icon={Wind}
          description="Carbon monoxide from combustion"
        />
        <PollutantCard
          name="O₃"
          value={currentData.pollutants.o3.value}
          unit={currentData.pollutants.o3.unit}
          status={currentData.pollutants.o3.status}
          icon={Zap}
          description="Ground-level ozone from chemical reactions"
        />
      </motion.div>

      {/* AQI Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Regional Air Quality Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AQIMap />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}