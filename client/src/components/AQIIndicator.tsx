import { motion } from 'framer-motion';
import { Wind, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAQIColor } from '@/lib/aqi';

interface AQIIndicatorProps {
  aqi: number;
  category: string;
}

export function AQIIndicator({ aqi, category }: AQIIndicatorProps) {
  const colorClass = getAQIColor(aqi);
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className={`w-24 h-24 rounded-full ${colorClass} flex items-center justify-center`}>
                <Wind className="h-8 w-8 text-white" />
              </div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-2 -right-2"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Clock className="h-4 w-4 text-gray-600" />
                </div>
              </motion.div>
            </motion.div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-6xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {aqi}
              </motion.div>
              <Badge className={`${colorClass} text-white text-lg px-3 py-1`}>
                {category}
              </Badge>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center md:text-right"
          >
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Air Quality Index
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Real-time monitoring • Delhi, India
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}