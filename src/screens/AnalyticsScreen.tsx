import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width: screenWidth } = Dimensions.get('window');

// Time range options
const timeRanges = ['Today', 'This Week', 'This Month'] as const;
type TimeRange = typeof timeRanges[number];

// Helper function to generate time labels
const getLabels = (range: TimeRange) => {
  switch (range) {
    case 'Today':
      return Array(24).fill(0).map((_, i) => `${i}:00`);
    case 'This Week':
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    case 'This Month':
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  }
};

// Helper function to generate random data within a range
const generateRandomData = (count: number, min: number, max: number) => 
  Array(count).fill(0).map(() => Math.floor(Math.random() * (max - min + 1)) + min);

// Mock data for different time ranges
const mockData: Record<TimeRange, { labels: string[]; moisture: number[]; temperature: number[]; ph: number[]; light: number[] }> = {
  'Today': {
    labels: ['00:00', '06:00', '12:00', '18:00'],
    moisture: generateRandomData(4, 40, 90).sort((a, b) => a - b).reverse(),
    temperature: generateRandomData(4, 15, 35),
    ph: generateRandomData(4, 60, 80).map(n => (n / 10).toFixed(1)).map(Number),
    light: [0, 300, 800, 500] // Simulating light levels (lux) throughout the day
  },
  'This Week': {
    labels: getLabels('This Week'),
    moisture: [65, 59, 80, 81, 56, 55, 40],
    temperature: [22, 25, 26, 28, 24, 23, 25],
    ph: [6.5, 6.8, 7.0, 7.2, 7.1, 6.9, 6.8],
    light: [450, 600, 750, 800, 700, 500, 400] // Average daily light levels
  },
  'This Month': {
    labels: getLabels('This Month'),
    moisture: [72, 68, 75, 80],
    temperature: [23, 25, 26, 24],
    ph: [6.7, 6.9, 7.0, 6.8],
    light: [500, 600, 650, 700] // Weekly average light levels
  }
};

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
    stroke: '#fff',
  },
  fillShadowGradient: '#fff',
  fillShadowGradientOpacity: 0,
  useShadowColorFromDataset: false,
};

export function AnalyticsScreen() {
  const [selectedRange, setSelectedRange] = useState('This Week');
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const renderChart = (title: string, data: number[], color: string, ySuffix: string = '', highlightCondition?: (value: number) => boolean) => {
    const currentLabels = mockData[selectedRange as TimeRange].labels;
    const dotColors = data.map((_, index) => 
      highlightCondition && highlightCondition(data[index]) ? '#ff0000' : color
    );

    return (
      <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
        <Text className="text-lg font-semibold mb-3">{title}</Text>
        <View style={{ height: 200 }}>
          <LineChart
            data={{
              labels: currentLabels,
              datasets: [{
                data,
                color: (opacity = 1) => color,
                strokeWidth: 2,
              }]
            }}
            width={screenWidth - 48}
            height={180}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
              propsForDots: {
                ...chartConfig.propsForDots,
                fill: dotColors[Math.min(Math.floor(0.5 * (data.length - 1)), data.length - 1)] || color,
              } as any,
              useShadowColorFromDataset: false,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            bezier
            withDots={true}
            withShadow={false}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLines={false}
            withHorizontalLines={true}
            onDataPointClick={({ index }: { index: number }) => setActiveTooltip(index === activeTooltip ? null : index)}
            decorator={() => {
              if (activeTooltip === null) return null;
              return (
                <View 
                  className="absolute p-2 bg-white rounded-md shadow-md"
                  style={{
                    left: (screenWidth - 48) * (activeTooltip / (data.length - 1)) - 30,
                    top: 30,
                  }}
                >
                  <Text className="text-xs font-medium">{data[activeTooltip]}{ySuffix}</Text>
                </View>
              );
            }}
          />
        </View>
        <View className="flex-row justify-between mt-2">
          {currentLabels.map((label, index) => (
            <Text key={index} className="text-xs text-gray-500">
              {label}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-2xl font-bold">  </Text>
          <Text className="text-sm text-gray-500">Last Updated: Today at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
        </View>
      </View>

      {/* Time Range Selector */}
      <View className="flex-row justify-between mb-6 bg-white p-1 rounded-lg">
        {timeRanges.map((range) => (
          <TouchableOpacity
            key={range}
            className={`py-2 px-4 rounded-md ${selectedRange === range ? 'bg-blue-500' : ''}`}
            onPress={() => setSelectedRange(range)}
          >
            <Text className={`font-medium ${selectedRange === range ? 'text-white' : 'text-gray-600'}`}>
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Charts */}
      {renderChart(
        'Moisture Level',
        mockData[selectedRange as TimeRange].moisture,
        '#4D96FF',
        '%',
        (value) => value < 50 // Highlight values below 50%
      )}

      {renderChart(
        'Temperature',
        mockData[selectedRange as TimeRange].temperature,
        '#FF6B6B',
        '°C'
      )}

      {renderChart(
        'pH Level',
        mockData[selectedRange as TimeRange].ph,
        '#4ECDC4',
        '',
        (value) => value < 5.5 || value > 7 // Highlight values outside ideal range
      )}

      {renderChart(
        'Light Level',
        mockData[selectedRange as TimeRange].light,
        '#FFD166',
        ' lux',
        (value) => value < 200 // Highlight low light levels
      )}
    </ScrollView>
  );
}
