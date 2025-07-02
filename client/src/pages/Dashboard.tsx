import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Wind, Eye, Droplets, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AQIIndicator } from '@/components/AQIIndicator';
import { PollutantCard } from '@/components/PollutantCard';
import { AQIMap } from '@/components/AQIMap';
import { useAuth } from '../App';
import { supabase } from '../lib/supabaseClient';

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

export function Dashboard() {
  const { user } = useAuth();
  const locationState = useLocation();
  const passedLocation = locationState.state?.location;
  const defaultLocation = {
    lat: 28.6139,
    lon: 77.2090,
    display_name: 'Delhi, India',
  };
  const locationInfo = passedLocation || defaultLocation;
  const [currentData, setCurrentData] = useState<DashboardData>({
    location: locationInfo.display_name,
    aqi: 0,
    category: 'good',
    lastUpdated: new Date(),
    pollutants: {
      pm25: { value: 0, unit: 'μg/m³', status: 'good' },
      pm10: { value: 0, unit: 'μg/m³', status: 'good' },
      no2: { value: 0, unit: 'ppb', status: 'good' },
      so2: { value: 0, unit: 'ppb', status: 'good' },
      co: { value: 0, unit: 'ppm', status: 'good' },
      o3: { value: 0, unit: 'ppb', status: 'good' }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWAQIByLatLon(lat: number, lon: number) {
      setLoading(true);
      setError(null);
      const token = import.meta.env.VITE_WAQI_TOKEN;
      const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`;
      const res = await fetch(url).catch(() => {
        setError('Failed to fetch WAQI data');
        setLoading(false);
        return null;
      });
      if (!res) return false;
      const data = await res.json();
      if (data.status === 'ok') {
        const iaqi = data.data.iaqi || {};
        setCurrentData({
          location: data.data.city?.name || 'Selected Location',
          aqi: Number(data.data.aqi),
          category: getCategoryFromAQI(Number(data.data.aqi)),
          lastUpdated: new Date((data.data.time?.iso) || Date.now()),
          pollutants: {
            pm25: { value: iaqi.pm25?.v ?? 0, unit: 'μg/m³', status: getCategoryFromPollutant('pm25', iaqi.pm25?.v ?? 0) },
            pm10: { value: iaqi.pm10?.v ?? 0, unit: 'μg/m³', status: getCategoryFromPollutant('pm10', iaqi.pm10?.v ?? 0) },
            no2: { value: iaqi.no2?.v ?? 0, unit: 'ppb', status: getCategoryFromPollutant('no2', iaqi.no2?.v ?? 0) },
            so2: { value: iaqi.so2?.v ?? 0, unit: 'ppb', status: getCategoryFromPollutant('so2', iaqi.so2?.v ?? 0) },
            co: { value: iaqi.co?.v ?? 0, unit: 'ppm', status: getCategoryFromPollutant('co', iaqi.co?.v ?? 0) },
            o3: { value: iaqi.o3?.v ?? 0, unit: 'ppb', status: getCategoryFromPollutant('o3', iaqi.o3?.v ?? 0) }
          }
        });
        setLoading(false);
        return true;
      } else {
        setError('No WAQI data found for this location.');
        setLoading(false);
        return false;
      }
    }

    async function fetchWAQIByCity(cityName: string | null) {
      // Use a geocoding API to get lat/lon for the city
      if (!cityName) return false;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        return await fetchWAQIByLatLon(lat, lon);
      }
      return false;
    }

    async function fetchDataWithLatLonFallbacks() {
      // 1. Try WAQI by lat/lon if available
      if (passedLocation && passedLocation.lat && passedLocation.lon) {
        const tried = await fetchWAQIByLatLon(passedLocation.lat, passedLocation.lon);
        if (tried) return;
      }
      // 2. Try user settings location if logged in
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('location')
          .eq('id', user.id)
          .single();
        if (data && data.location) {
          const tried = await fetchWAQIByCity(data.location);
          if (tried) return;
        }
      }
      // 3. Fallback to Delhi
      await fetchWAQIByCity('Delhi');
    }

    fetchDataWithLatLonFallbacks();

    // Poll every 5 minutes for updates
    const interval = setInterval(fetchDataWithLatLonFallbacks, 300000);
    return () => {
      clearInterval(interval);
    };
  }, [passedLocation, user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

function getCategoryFromAQI(aqi: number): PollutantStatus {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'unhealthy';
  return 'hazardous';
}

// Add pollutant status categorization for Indian standards
function getCategoryFromPollutant(type: string, value: number): PollutantStatus {
  switch (type) {
    case 'pm25':
      if (value <= 30) return 'good';
      if (value <= 60) return 'moderate';
      if (value <= 90) return 'unhealthy';
      return 'hazardous';
    case 'pm10':
      if (value <= 50) return 'good';
      if (value <= 100) return 'moderate';
      if (value <= 250) return 'unhealthy';
      return 'hazardous';
    case 'no2':
      if (value <= 40) return 'good';
      if (value <= 80) return 'moderate';
      if (value <= 180) return 'unhealthy';
      return 'hazardous';
    case 'so2':
      if (value <= 40) return 'good';
      if (value <= 80) return 'moderate';
      if (value <= 380) return 'unhealthy';
      return 'hazardous';
    case 'co':
      if (value <= 1) return 'good';
      if (value <= 2) return 'moderate';
      if (value <= 10) return 'unhealthy';
      return 'hazardous';
    case 'o3':
      if (value <= 50) return 'good';
      if (value <= 100) return 'moderate';
      if (value <= 168) return 'unhealthy';
      return 'hazardous';
    default:
      return 'good';
  }
}