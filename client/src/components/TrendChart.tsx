import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
  pollutant: string;
  period: string;
  startDate?: Date;
  endDate?: Date;
}

// Mock data generator
const generateMockData = (pollutant: string, period: string) => {
  const days = period === '7d' ? 7 : period === '30d' ? 30 : period === '3m' ? 90 : 365;
  const data = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    let value;
    switch (pollutant) {
      case 'aqi':
        value = Math.floor(Math.random() * 100) + 20;
        break;
      case 'pm25':
        value = Math.floor(Math.random() * 50) + 10;
        break;
      case 'pm10':
        value = Math.floor(Math.random() * 80) + 15;
        break;
      case 'no2':
        value = Math.floor(Math.random() * 40) + 5;
        break;
      case 'so2':
        value = Math.floor(Math.random() * 20) + 2;
        break;
      case 'co':
        value = Math.random() * 2 + 0.5;
        break;
      case 'o3':
        value = Math.floor(Math.random() * 60) + 20;
        break;
      default:
        value = Math.floor(Math.random() * 100);
    }
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Number(value.toFixed(1))
    });
  }
  
  return data;
};

export function TrendChart({ pollutant, period }: TrendChartProps) {
  const data = generateMockData(pollutant, period);
  
  const getLineColor = (pollutant: string) => {
    switch (pollutant) {
      case 'aqi': return '#3B82F6';
      case 'pm25': return '#EF4444';
      case 'pm10': return '#F97316';
      case 'no2': return '#8B5CF6';
      case 'so2': return '#10B981';
      case 'co': return '#F59E0B';
      case 'o3': return '#EC4899';
      default: return '#3B82F6';
    }
  };
  
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis 
            dataKey="date" 
            className="text-gray-600 dark:text-gray-300"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            className="text-gray-600 dark:text-gray-300"
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={getLineColor(pollutant)}
            strokeWidth={3}
            dot={{ fill: getLineColor(pollutant), strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: getLineColor(pollutant), strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}