import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HealthAdvisoryCard from '../components/HealthAdvisoryCard';

const mockAQI = 78;
const mockHealthCondition = 'asthma';

const recommendations = [
  {
    title: 'General Population',
    tips: [
      'Reduce prolonged outdoor exertion',
      'Keep windows closed during high pollution hours',
      'Consider air purifiers for indoor spaces',
      'Stay hydrated and maintain a healthy diet',
    ],
  },
  {
    title: 'Sensitive Groups',
    tips: [
      'Limit outdoor activities, especially during peak hours',
      'Wear N95 masks when going outside',
      'Use prescribed medications as directed',
      'Monitor symptoms closely and consult doctor if needed',
    ],
  },
  {
    title: 'Active Individuals',
    tips: [
      'Reschedule outdoor workouts to early morning',
      'Choose indoor exercise alternatives',
      'Reduce intensity of outdoor activities',
      'Monitor breathing and take breaks frequently',
    ],
  },
];

const AdvisoryScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Health Advisory</Text>
      <HealthAdvisoryCard aqi={mockAQI} healthCondition={mockHealthCondition} />
      <Text style={styles.subtitle}>Recommendations</Text>
      {recommendations.map((rec, idx) => (
        <View key={idx} style={styles.recCard}>
          <Text style={styles.recTitle}>{rec.title}</Text>
          {rec.tips.map((tip, tipIdx) => (
            <Text key={tipIdx} style={styles.tip}>• {tip}</Text>
          ))}
        </View>
      ))}
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3B82F6',
    marginTop: 18,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  recCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  recTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 6,
  },
  tip: {
    fontSize: 15,
    color: '#64748b',
    marginLeft: 8,
    marginBottom: 2,
  },
});

export default AdvisoryScreen;
