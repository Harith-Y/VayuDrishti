import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BarChart3, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ForecastChart } from '@/components/ForecastChart';
import { getAQIColor, getAQICategory } from '@/lib/aqi';

// Mock forecast data
const forecastData = [
  {
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    aqi: 65,
    category: 'Moderate',
    conditions: 'Partly cloudy, light winds',
    pollutants: {
      pm25: 38,
      pm10: 55,
      no2: 25,
      so2: 8,
      co: 1.1,
      o3: 60
    }
  },
  {
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    aqi: 45,
    category: 'Good',
    conditions: 'Sunny, moderate winds',
    pollutants: {
      pm25: 25,
      pm10: 42,
      no2: 18,
      so2: 6,
      co: 0.8,
      o3: 48
    }
  },
  {
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    aqi: 78,
    category: 'Moderate',
    conditions: 'Overcast, calm winds',
    pollutants: {
      pm25: 45,
      pm10: 68,
      no2: 32,
      so2: 12,
      co: 1.4,
      o3: 72
    }
  }
];

export function Forecast() {
  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Air Quality Forecast
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              3-day air quality predictions for your location
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-2" />
              List View
            </Button>
            <Button
              variant={viewMode === 'chart' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('chart')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Chart View
            </Button>
          </div>
        </div>
      </motion.div>

      {viewMode === 'list' ? (
        /* List View */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          {forecastData.map((forecast, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {forecast.date.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <Badge 
                        className={`${getAQIColor(forecast.aqi)} text-white`}
                      >
                        {forecast.category}
                      </Badge>
                    </div>
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {forecast.aqi}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Air Quality Index
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {forecast.conditions}
                    </p>
                  </div>
                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {forecast.pollutants.pm25}
                        </div>
                        <div className="text-xs text-gray-500">PM2.5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {forecast.pollutants.pm10}
                        </div>
                        <div className="text-xs text-gray-500">PM10</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {forecast.pollutants.no2}
                        </div>
                        <div className="text-xs text-gray-500">NO₂</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      ) : (
        /* Chart View */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                AQI Forecast Chart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ForecastChart data={forecastData} />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Forecast Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8"
      >
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Forecast Summary
            </h3>
            <p className="text-blue-800 dark:text-blue-200">
              Air quality is expected to remain in the moderate to good range over the next 3 days. 
              Tomorrow shows the best conditions with good air quality, while Thursday may see a 
              slight increase in pollution levels due to reduced wind speeds.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}