import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AQICardProps {
  aqi: number;
  category: string;
}

function getAQIColor(aqi: number) {
  if (aqi <= 50) return '#22c55e'; // green
  if (aqi <= 100) return '#eab308'; // yellow
  if (aqi <= 150) return '#f59e42'; // orange
  if (aqi <= 200) return '#ef4444'; // red
  if (aqi <= 300) return '#a21caf'; // purple
  return '#7f1d1d'; // maroon
}

const AQICard: React.FC<AQICardProps> = ({ aqi, category }) => {
  const color = getAQIColor(aqi);
  return (
    <View style={[styles.card, { borderColor: color }]}> 
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="weather-windy" size={40} color={color} />
      </View>
      <Text style={styles.label}>Air Quality Index</Text>
      <Text style={[styles.aqi, { color }]}>{aqi}</Text>
      <Text style={[styles.category, { backgroundColor: color }]}>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 12,
    borderWidth: 3,
  },
  iconContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  aqi: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
});

export default AQICard;
