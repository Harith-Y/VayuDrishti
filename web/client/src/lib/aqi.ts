export function getAQICategory(aqi: number): string {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-500';
  return 'bg-red-800';
}

export function getHealthMessage(aqi: number): string {
  if (aqi <= 50) {
    return 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
  }
  if (aqi <= 100) {
    return 'Air quality is acceptable for most people. However, sensitive groups may experience minor to moderate symptoms from long-term exposure.';
  }
  if (aqi <= 150) {
    return 'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.';
  }
  if (aqi <= 200) {
    return 'Active children and adults, and people with respiratory disease should avoid prolonged outdoor exertion; everyone else should limit prolonged outdoor exertion.';
  }
  if (aqi <= 300) {
    return 'Active children and adults, and people with respiratory disease should avoid all outdoor exertion; everyone else should limit outdoor exertion.';
  }
  return 'Everyone should avoid all outdoor exertion.';
}