import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import AQICard from '../components/AQICard';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the navigation stack param list
type RootStackParamList = {
  Home: undefined;
  Forecast: undefined;
  Advisory: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const mockAQI = 87;
const mockCategory = 'Moderate';
const mockLocation = 'Delhi, India';

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.location}>{mockLocation}</Text>
      <AQICard aqi={mockAQI} category={mockCategory} />
      {/* TODO: Add pollutant summary cards here */}
      <View style={styles.pollutantsPlaceholder}>
        <Text style={styles.pollutantsText}>Pollutant summary coming soon...</Text>
      </View>
      <View style={styles.buttonRow}>
        <Button title="Go to Forecast" onPress={() => navigation.navigate('Forecast')} />
        <Button title="Go to Advisory" onPress={() => navigation.navigate('Advisory')} />
      </View>
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
  location: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
    marginTop: 10,
  },
  pollutantsPlaceholder: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  pollutantsText: {
    color: '#888',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    width: '100%',
    gap: 12,
  },
});

export default HomeScreen;
