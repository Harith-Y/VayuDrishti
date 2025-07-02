import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface PollutantCardProps {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'moderate' | 'unhealthy' | 'hazardous';
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const statusColors = {
  good: 'bg-green-500',
  moderate: 'bg-yellow-500',
  unhealthy: 'bg-orange-500',
  hazardous: 'bg-red-500'
};

const statusLabels = {
  good: 'Good',
  moderate: 'Moderate',
  unhealthy: 'Unhealthy',
  hazardous: 'Hazardous'
};

const getProgressValue = (status: string) => {
  switch (status) {
    case 'good': return 25;
    case 'moderate': return 50;
    case 'unhealthy': return 75;
    case 'hazardous': return 100;
    default: return 0;
  }
};

export function PollutantCard({ name, value, unit, status, icon: Icon, description }: PollutantCardProps) {
  const progressValue = getProgressValue(status);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {value} {unit}
                </p>
              </div>
            </div>
            <Badge className={`${statusColors[status]} text-white`}>
              {statusLabels[status]}
            </Badge>
          </div>
          
          <Progress value={progressValue} className="mb-3" />
          
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}