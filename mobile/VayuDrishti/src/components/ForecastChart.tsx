import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
// Fix : Not functional even after 'victory-native' and 'react-native-svg' installation

interface ForecastData {
  date: string;
  aqi: number;
}

interface ForecastChartProps {
  data: ForecastData[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <Text style={styles.noData}>No forecast data available.</Text>;
  }
  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        height={220}
        width={340}
      >
        <VictoryAxis
          tickFormat={data.map(d => d.date)}
          style={{ tickLabels: { fontSize: 12, angle: -30, padding: 15 } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x: number) => `${x}`}
          style={{ tickLabels: { fontSize: 12 } }}
        />
        <VictoryBar
          data={data}
          x="date"
          y="aqi"
          style={{ data: { fill: '#3B82F6', borderRadius: 6 } }}
          barWidth={28}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  noData: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
});

export default ForecastChart;
