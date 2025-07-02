import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getHealthAdvisory } from '../utils/getHealthAdvisory';

interface HealthAdvisoryCardProps {
  aqi: number;
  healthCondition?: string;
}

const colorMap: Record<string, string> = {
  green: '#bbf7d0',
  lime: '#f7fee7',
  yellow: '#fef9c3',
  orange: '#ffedd5',
  red: '#fee2e2',
  maroon: '#ffe4e6',
};
const borderColorMap: Record<string, string> = {
  green: '#22c55e',
  lime: '#84cc16',
  yellow: '#eab308',
  orange: '#f59e42',
  red: '#ef4444',
  maroon: '#be123c',
};

const HealthAdvisoryCard: React.FC<HealthAdvisoryCardProps> = ({ aqi, healthCondition }) => {
  const advisory = getHealthAdvisory(aqi, healthCondition || '');
  const bgColor = colorMap[advisory.color] || '#f3f4f6';
  const borderColor = borderColorMap[advisory.color] || '#d1d5db';

  return (
    <View style={[styles.card, { backgroundColor: bgColor, borderLeftColor: borderColor }]}> 
      <View style={styles.headerRow}>
        <MaterialCommunityIcons name="alert-circle" size={28} color={borderColor} style={{ marginRight: 8 }} />
        <Text style={styles.title}>{advisory.category} Air Quality ({aqi})</Text>
      </View>
      <Text style={styles.message}>{advisory.message}</Text>
      {advisory.warning && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>⚠️ {advisory.warning}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    marginVertical: 12,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  message: {
    fontSize: 16,
    color: '#374151',
    marginTop: 4,
  },
  warningBox: {
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  warningText: {
    color: '#b91c1c',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default HealthAdvisoryCard;
