import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';

type TimeRange = 'Today' | 'This Week' | 'This Month';

interface ChartData {
  labels: string[];
  temperature: number[];
  ph: number[];
  humidity: number[];
  light: number[];
}

const { width: screenWidth } = Dimensions.get('window');

// Time range options
const timeRanges: TimeRange[] = ['Today', 'This Week', 'This Month'];

// Helper function to generate time labels
const getLabels = (range: TimeRange): string[] => {
  switch (range) {
    case 'Today':
      return Array.from({ length: 24 }, (_, i) => `${i}:00`);
    case 'This Week':
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    case 'This Month':
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    default:
      return [];
  }
};

// Helper function to generate random data within a range
const generateRandomData = (count: number, min: number, max: number): number[] => 
  Array(count).fill(0).map(() => Math.floor(Math.random() * (max - min + 1)) + min);

// Mock data for different time ranges
const mockData: Record<TimeRange, ChartData> = {
  'Today': {
    labels: getLabels('Today'),
    temperature: Array.from({ length: 24 }, () => Math.floor(Math.random() * 20) + 15),
    ph: Array.from({ length: 24 }, () => 6.5 + Math.random() * 1.5),
    humidity: Array.from({ length: 24 }, () => Math.floor(Math.random() * 40) + 40),
    light: Array.from({ length: 24 }, (_, i) => {
      const hour = i % 24;
      return (hour >= 6 && hour <= 18) 
        ? Math.floor(Math.random() * 500) + 500 // Daytime
        : Math.floor(Math.random() * 100); // Nighttime
    }),
  },
  'This Week': {
    labels: getLabels('This Week'),
    temperature: [22, 24, 25, 23, 26, 27, 24],
    ph: [6.8, 6.9, 7.1, 7.0, 7.2, 7.1, 6.9],
    humidity: [60, 62, 65, 63, 64, 61, 63],
    light: [800, 850, 900, 875, 925, 950, 825],
  },
  'This Month': {
    labels: getLabels('This Month'),
    temperature: [22, 24, 26, 25],
    ph: [6.8, 7.0, 7.1, 7.0],
    humidity: [60, 62, 63, 64],
    light: [800, 850, 900, 875],
  },
};

// Get chart configuration based on theme
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
  propsForLabels: {
    fontSize: 10,
    fill: isDark ? '#f3f4f6' : '#1f2937',
  },
});

// Chart colors that work well in both light and dark modes
const getChartColors = (isDark: boolean) => ({
  temperature: isDark ? '#60a5fa' : '#3b82f6',
  ph: isDark ? '#f472b6' : '#ec4899',
  humidity: isDark ? '#34d399' : '#10b981',
  light: isDark ? '#fbbf24' : '#f59e0b',
});

export function AnalyticsScreen() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('This Week');
  const { isDark } = useTheme();
  const chartConfig = getChartConfig(isDark);
  const chartColors = getChartColors(isDark);
  const currentData = mockData[selectedRange];

  const renderChart = (
    title: string, 
    data: number[], 
    color: string, 
    yAxisSuffix: string = '',
    highlightPoint?: (value: number) => boolean
  ) => {
    // Limit the number of x-axis labels for better readability
    const xLabels = currentData.labels.map((label, index) => {
      if (selectedRange === 'Today') {
        return index % 6 === 0 ? label : ''; // Show every 6th hour
      }
      return label;
    });

    return (
      <View key={title} className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <Text className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </Text>
        <View style={{ height: 220 }}>
          <LineChart
            data={{
              labels: xLabels,
              datasets: [{
                data,
                color: () => color,
                strokeWidth: 2,
                withDots: true,
                withInnerLines: false,
                withOuterLines: true,
                withHorizontalLines: true,
                withVerticalLines: false,
                withHorizontalLabels: true,
                withVerticalLabels: true,
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: isDark ? '#1f2937' : '#ffffff',
                  fill: (opacity: number = 1, index: number) => {
                    if (highlightPoint && highlightPoint(data[index])) {
                      return '#EF4444'; // Red for highlighted points
                    }
                    return color;
                  },
                },
              }]
            }}
            width={screenWidth - 48}
            height={200}
            withVerticalLines={false}
            withHorizontalLines={true}
            chartConfig={{
              ...chartConfig,
              propsForHorizontalLabels: {
                ...chartConfig.propsForLabels,
                textAnchor: 'middle',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            yAxisSuffix={yAxisSuffix}
            yAxisInterval={1}
          />
        </View>
      </View>
    );
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ScrollView className="flex-1 p-4">
        <View className="flex-row justify-between mb-6">
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setSelectedRange(range)}
              className={`px-4 py-2 rounded-full ${
                selectedRange === range
                  ? isDark
                    ? 'bg-blue-600'
                    : 'bg-blue-500'
                  : isDark
                  ? 'bg-gray-800'
                  : 'bg-white'
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedRange === range
                    ? 'text-white'
                    : isDark
                    ? 'text-gray-300'
                    : 'text-gray-700'
                }`}
              >
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderChart('Temperature', currentData.temperature, chartColors.temperature, '°C')}
        {renderChart(
          'pH Level', 
          currentData.ph, 
          chartColors.ph, 
          '',
          (value: number) => value < 5.5 || value > 7 // Highlight values outside ideal range
        )}
        {renderChart('Humidity', currentData.humidity, chartColors.humidity, '%')}
        {renderChart(
          'Light Intensity', 
          currentData.light, 
          chartColors.light, 
          ' lux',
          (value: number) => value < 200 // Highlight low light levels
        )}
      </ScrollView>
    </View>
  );
}
