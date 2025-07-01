import { motion } from 'framer-motion';
import { Heart, AlertTriangle, CheckCircle, Info, Shield, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const currentAQI = 78;
const category = 'Moderate';

const healthRecommendations = [
  {
    icon: Shield,
    title: 'General Population',
    recommendations: [
      'Reduce prolonged outdoor exertion',
      'Keep windows closed during high pollution hours',
      'Consider air purifiers for indoor spaces',
      'Stay hydrated and maintain a healthy diet'
    ],
    severity: 'moderate'
  },
  {
    icon: Heart,
    title: 'Sensitive Groups',
    recommendations: [
      'Limit outdoor activities, especially during peak hours',
      'Wear N95 masks when going outside',
      'Use prescribed medications as directed',
      'Monitor symptoms closely and consult doctor if needed'
    ],
    severity: 'high'
  },
  {
    icon: Activity,
    title: 'Active Individuals',
    recommendations: [
      'Reschedule outdoor workouts to early morning',
      'Choose indoor exercise alternatives',
      'Reduce intensity of outdoor activities',
      'Monitor breathing and take breaks frequently'
    ],
    severity: 'moderate'
  }
];

const healthMetrics = [
  {
    name: 'Respiratory Risk',
    value: 65,
    color: 'bg-yellow-500',
    description: 'Moderate risk for respiratory issues'
  },
  {
    name: 'Cardiovascular Risk',
    value: 45,
    color: 'bg-green-500',
    description: 'Low to moderate risk for heart conditions'
  },
  {
    name: 'Visibility Impact',
    value: 30,
    color: 'bg-green-500',
    description: 'Slight reduction in visibility'
  },
  {
    name: 'Overall Health Impact',
    value: 55,
    color: 'bg-yellow-500',
    description: 'Moderate impact on general health'
  }
];

const symptoms = [
  { name: 'Eye Irritation', risk: 'moderate' },
  { name: 'Throat Irritation', risk: 'moderate' },
  { name: 'Coughing', risk: 'low' },
  { name: 'Shortness of Breath', risk: 'low' },
  { name: 'Chest Discomfort', risk: 'low' }
];

export function HealthDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Health Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Personalized health recommendations based on current air quality
        </p>
      </motion.div>

      {/* Current Status Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Current AQI: {currentAQI} ({category})</strong> - Air quality is acceptable for most people. 
            Sensitive individuals should consider limiting prolonged outdoor exertion.
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Health Risk Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {healthMetrics.map((metric, index) => (
          <Card key={metric.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {metric.name}
                </h3>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}%
                </span>
              </div>
              <Progress value={metric.value} className="mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Health Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
      >
        {healthRecommendations.map((group, index) => {
          const Icon = group.icon;
          return (
            <Card key={group.title} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-blue-600" />
                  <span>{group.title}</span>
                  <Badge 
                    variant={group.severity === 'high' ? 'destructive' : 'secondary'}
                    className="ml-auto"
                  >
                    {group.severity === 'high' ? 'High Priority' : 'Moderate'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {group.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {rec}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Potential Symptoms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600" />
              Potential Symptoms at Current AQI Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {symptoms.map((symptom) => (
                <div 
                  key={symptom.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {symptom.name}
                  </span>
                  <Badge 
                    variant={symptom.risk === 'moderate' ? 'secondary' : 'outline'}
                    className={symptom.risk === 'moderate' ? 'bg-yellow-100 text-yellow-800' : ''}
                  >
                    {symptom.risk}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Emergency Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center text-red-900 dark:text-red-100">
              <AlertTriangle className="h-5 w-5 mr-2" />
              When to Seek Medical Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Immediate Symptoms
                </h4>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>• Severe shortness of breath</li>
                  <li>• Chest pain or tightness</li>
                  <li>• Persistent coughing with blood</li>
                  <li>• Rapid heartbeat or dizziness</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  High-Risk Groups
                </h4>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>• Children and elderly (65+)</li>
                  <li>• People with asthma or COPD</li>
                  <li>• Heart disease patients</li>
                  <li>• Pregnant women</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}