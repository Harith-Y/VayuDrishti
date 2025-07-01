import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Wind, Activity, TrendingUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Geocoding function using OpenStreetMap Nominatim
async function geocode(query: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    headers: {
      'Accept-Language': 'en',
    },
  });
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      display_name: data[0].display_name,
    };
  }
  throw new Error('Location not found');
}

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setLoading(true);
      setError(null);
      try {
        // 1. Geocode the input
        const location = await geocode(searchQuery);
        // 2. Navigate to dashboard with location info
        navigate('/dashboard', { state: { location } });
      } catch (err: any) {
        setError(err.message || 'Error fetching location');
      } finally {
        setLoading(false);
      }
    }
  };

  const features = [
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Get live AQI data and pollutant levels for your location'
    },
    {
      icon: TrendingUp,
      title: 'Historical Trends',
      description: 'Analyze air quality patterns and trends over time'
    },
    {
      icon: Wind,
      title: 'Forecast Predictions',
      description: 'Plan ahead with 3-day air quality forecasts'
    },
    {
      icon: Heart,
      title: 'Health Recommendations',
      description: 'Personalized health tips based on current air quality'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Breathe <span className="text-blue-600">Smarter</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Monitor air quality in real-time, track trends, and get personalized health 
              recommendations to protect yourself and your loved ones.
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto mb-4"
          >
            <div className="relative">
              <div className="flex">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Enter city name or PIN code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 pr-4 py-3 text-lg rounded-l-lg border-r-0 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-r-lg rounded-l-none"
                  disabled={loading}
                >
                  {loading ? <span>...</span> : <Search className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            {/* Error */}
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            <Card className="border-0 shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">Good</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Delhi AQI</div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">45</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">Moderate</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Mumbai AQI</div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">78</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">Good</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Bangalore AQI</div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">52</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Stay Informed
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive air quality monitoring with advanced features to keep you and your family safe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Start Monitoring Today
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Take control of your air quality with real-time data and actionable insights.
          </p>
          <Button 
            size="lg" 
            className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/dashboard')}
          >
            Get Started
          </Button>
        </motion.div>
      </section>
    </div>
  );
}