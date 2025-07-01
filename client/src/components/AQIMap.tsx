import { motion } from 'framer-motion';

// Mock map component - in a real app, this would use a proper mapping library
const mapLocations = [
  { name: 'Delhi', aqi: 78, x: 45, y: 35, status: 'moderate' },
  { name: 'Mumbai', aqi: 65, x: 25, y: 55, status: 'moderate' },
  { name: 'Bangalore', aqi: 42, x: 35, y: 70, status: 'good' },
  { name: 'Chennai', aqi: 58, x: 45, y: 75, status: 'moderate' },
  { name: 'Kolkata', aqi: 89, x: 65, y: 45, status: 'moderate' },
  { name: 'Hyderabad', aqi: 71, x: 45, y: 65, status: 'moderate' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'good': return 'bg-green-500';
    case 'moderate': return 'bg-yellow-500';
    case 'unhealthy': return 'bg-orange-500';
    case 'hazardous': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export function AQIMap() {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-700 dark:to-gray-600 rounded-lg overflow-hidden">
      {/* Simplified India outline */}
      <div className="absolute inset-4 bg-green-50 dark:bg-gray-800 rounded-lg opacity-70"></div>
      
      {/* Location markers */}
      {mapLocations.map((location, index) => (
        <motion.div
          key={location.name}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${location.x}%`, top: `${location.y}%` }}
        >
          <div className="relative group cursor-pointer">
            <div className={`w-6 h-6 rounded-full ${getStatusColor(location.status)} shadow-lg flex items-center justify-center`}>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {location.name}: AQI {location.aqi}
            </div>
            
            {/* Pulse animation */}
            <div className={`absolute inset-0 rounded-full ${getStatusColor(location.status)} animate-ping opacity-20`}></div>
          </div>
        </motion.div>
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
        <div className="text-xs font-medium text-gray-900 dark:text-white mb-2">AQI Status</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-300">Good</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-300">Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-300">Unhealthy</span>
          </div>
        </div>
      </div>
    </div>
  );
}