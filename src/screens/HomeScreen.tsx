import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width: screenWidth } = Dimensions.get('window');

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#fff'
  },
};

const chartData = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  temperature: [20, 45, 28, 8, 11, 15, 22],
  ph: [7, 7.5, 7.8, 8.2, 8.5, 8.8, 9.2],
  humidity: [60, 70, 65, 75, 80, 85, 90],
  light: [100, 150, 200, 250, 300, 350, 400],
};

const chartHeight = 150;
const chartWidth = (screenWidth / 2) - 32;

export function HomeScreen() {
  const renderChart = (data: number[], color: string, ySuffix: string = '') => {
    return (
      <View style={{ alignItems: 'center' }}>
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: [{
              data,
              color: (opacity = 1) => color,
              strokeWidth: 2
            }]
          }}
          width={chartWidth}
          height={chartHeight}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => color,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          withDots={false}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
        />
        <Text className="text-center text-sm font-semibold mt-1">
          {data[data.length - 1]}{ySuffix}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl text-center font-bold mb-4">  </Text>
      
      {/* Row 1 */}
      <View className="flex-row justify-between mb-4">
        <View className="w-[48%] bg-white p-3 rounded-lg shadow-sm">
          <Text className="text-lg font-bold mb-2">Temperature</Text>
          {renderChart(chartData.temperature, '#FF6B6B', '°C')}
        </View>
        <View className="w-[48%] bg-white p-3 rounded-lg shadow-sm">
          <Text className="text-lg font-bold mb-2">pH Level</Text>
          {renderChart(chartData.ph, '#4ECDC4')}
        </View>
      </View>

      {/* Row 2 */}
      <View className="flex-row justify-between mb-4">
        <View className="w-[48%] bg-white p-3 rounded-lg shadow-sm">
          <Text className="text-lg font-bold mb-2">Humidity</Text>
          {renderChart(chartData.humidity, '#4D96FF', '%')}
        </View>
        <View className="w-[48%] bg-white p-3 rounded-lg shadow-sm">
          <Text className="text-lg font-bold mb-2">Light</Text>
          {renderChart(chartData.light, '#FFD93D', 'lux')}
        </View>
      </View>
    </ScrollView>
  );
}