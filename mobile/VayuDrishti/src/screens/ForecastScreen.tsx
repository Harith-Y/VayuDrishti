import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ForecastChart from '../components/ForecastChart';

const mockForecast = [
  { date: 'Mon', aqi: 65, category: 'Moderate', conditions: 'Partly cloudy, light winds' },
  { date: 'Tue', aqi: 45, category: 'Good', conditions: 'Sunny, moderate winds' },
  { date: 'Wed', aqi: 78, category: 'Moderate', conditions: 'Overcast, calm winds' },
];

const ForecastScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Air Quality Forecast</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity onPress={() => setViewMode('list')} style={[styles.toggleBtn, viewMode === 'list' && styles.toggleActive]}>
            <Text style={viewMode === 'list' ? styles.toggleTextActive : styles.toggleText}>List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setViewMode('chart')} style={[styles.toggleBtn, viewMode === 'chart' && styles.toggleActive]}>
            <Text style={viewMode === 'chart' ? styles.toggleTextActive : styles.toggleText}>Chart</Text>
          </TouchableOpacity>
        </View>
      </View>
      {viewMode === 'chart' ? (
        <ForecastChart data={mockForecast} />
      ) : (
        <View style={styles.listContainer}>
          {mockForecast.map((item, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardDate}>{item.date}</Text>
              <Text style={styles.cardAQI}>{item.aqi}</Text>
              <Text style={styles.cardCategory}>{item.category}</Text>
              <Text style={styles.cardCond}>{item.conditions}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3f4f6',
    flexGrow: 1,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  toggleText: {
    color: '#1e293b',
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  listContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  cardDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  cardAQI: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  cardCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e42',
  },
  cardCond: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
});

export default ForecastScreen;
