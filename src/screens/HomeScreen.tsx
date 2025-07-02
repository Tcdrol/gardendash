import React from 'react';
import { View, Text, ScrollView, Dimensions, useColorScheme } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

const getChartConfig = (isDark: boolean) => ({
  backgroundColor: isDark ? '#1f2937' : '#ffffff',
  backgroundGradientFrom: isDark ? '#1f2937' : '#ffffff',
  backgroundGradientTo: isDark ? '#1f2937' : '#ffffff',
  decimalPlaces: 1,
  color: (opacity = 1) => isDark 
    ? `rgba(255, 255, 255, ${opacity})` 
    : `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => isDark 
    ? `rgba(255, 255, 255, ${opacity})` 
    : `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: isDark ? '#1f2937' : '#ffffff',
  },
  propsForBackgroundLines: {
    stroke: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  },
});

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
  const { isDark } = useTheme();
  const chartConfig = getChartConfig(isDark);
  const colorScheme = useColorScheme();

  // Chart colors that work well in both light and dark modes
  const chartColors = {
    temperature: isDark ? '#60a5fa' : '#3b82f6',
    ph: isDark ? '#f472b6' : '#ec4899',
    humidity: isDark ? '#34d399' : '#10b981',
    light: isDark ? '#fbbf24' : '#f59e0b',
  };
  const renderChart = (data: number[], color: string, ySuffix: string = '') => {
    return (
      <View className="mb-6">
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
          withDots={true}
          withShadow={false}
          withInnerLines={true}
          fromZero={false}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => color,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Text className="text-center text-sm font-semibold mt-1">
          {data[data.length - 1]}{ySuffix}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900 p-4">
      <Text className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🌱 Garden Dashboard</Text>
      
      <View className="flex-row flex-wrap justify-between mb-6">
        <View className="w-[48%] bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-4 border border-gray-100 dark:border-gray-700">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">Temperature</Text>
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">24°C</Text>
          {renderChart(chartData.temperature, chartColors.temperature, '°C')}
        </View>
        
        <View className="w-[48%] bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-4 border border-gray-100 dark:border-gray-700">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">pH Level</Text>
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">7.2</Text>
          {renderChart(chartData.ph, chartColors.ph, '')}
        </View>
        
        <View className="w-[48%] bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">Humidity</Text>
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">65%</Text>
          {renderChart(chartData.humidity, chartColors.humidity, '%')}
        </View>
        
        <View className="w-[48%] bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">Light</Text>
          <View className="flex-row items-baseline">
            <Text className="text-3xl font-bold text-gray-900 dark:text-white">850</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm ml-1">lux</Text>
          </View>
          {renderChart(chartData.light, chartColors.light, '')}
        </View>
      </View>
      
      <View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6 border border-gray-100 dark:border-gray-700">
        <Text className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">🌧️ Watering Schedule</Text>
        <View className="flex-row justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
          <Text className="text-gray-800 dark:text-gray-200">Morning</Text>
          <Text className="text-gray-500 dark:text-gray-400">6:00 AM</Text>
        </View>
        <View className="flex-row justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
          <Text className="text-gray-800 dark:text-gray-200">Afternoon</Text>
          <Text className="text-gray-500 dark:text-gray-400">2:00 PM</Text>
        </View>
        <View className="flex-row justify-between items-center py-3">
          <Text className="text-gray-800 dark:text-gray-200">Evening</Text>
          <Text className="text-gray-500 dark:text-gray-400">7:00 PM</Text>
        </View>
      </View>
      
      <View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <Text className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">📊 Weekly Summary</Text>
        <View className="flex-row justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
          <Text className="text-gray-800 dark:text-gray-200">Avg. Temperature</Text>
          <Text className="font-medium text-gray-900 dark:text-white">22°C</Text>
        </View>
        <View className="flex-row justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
          <Text className="text-gray-800 dark:text-gray-200">Water Used</Text>
          <Text className="font-medium text-gray-900 dark:text-white">45L</Text>
        </View>
        <View className="flex-row justify-between items-center py-3">
          <Text className="text-gray-800 dark:text-gray-200">Growth</Text>
          <Text className="text-green-500 font-medium">+2.5cm</Text>
        </View>
      </View>
    </ScrollView>
  );
}