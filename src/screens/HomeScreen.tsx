import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Dimensions, 
  useColorScheme, 
  RefreshControl,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

// Chart configuration
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

// Sample chart data
const chartData = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  temperature: [20, 45, 28, 8, 11, 15, 22],
  ph: [7, 7.5, 7.8, 8.2, 8.5, 8.8, 9.2],
  humidity: [60, 70, 65, 75, 80, 85, 90],
  light: [100, 150, 200, 250, 300, 350, 400],
};

export function HomeScreen() {
  const { isDark } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [activeMetric, setActiveMetric] = useState('temperature');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const chartConfig = useMemo(() => getChartConfig(isDark), [isDark]);

  const metrics = [
    { id: 'temperature', label: 'Temperature', value: '24°C', icon: 'thermostat', color: isDark ? '#60a5fa' : '#3b82f6' },
    { id: 'ph', label: 'pH Level', value: '7.2', icon: 'opacity', color: isDark ? '#f472b6' : '#ec4899' },
    { id: 'humidity', label: 'Humidity', value: '65%', icon: 'water-drop', color: isDark ? '#34d399' : '#10b981' },
    { id: 'light', label: 'Light', value: '850 lux', icon: 'wb-sunny', color: isDark ? '#fbbf24' : '#f59e0b' },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const toggleCard = useCallback((cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [expandedCard]);

  return (
    <ScrollView 
      className="flex-1 bg-gray-50 dark:bg-gray-900"
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          colors={[isDark ? '#3b82f6' : '#2563eb']}
          tintColor={isDark ? '#3b82f6' : '#2563eb'}
        />
      }
    >
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">🌱 Garden Dashboard</Text>
          <TouchableOpacity className="p-2">
            <MaterialIcons 
              name="notifications-none" 
              size={24} 
              color={isDark ? 'white' : 'black'} 
            />
          </TouchableOpacity>
        </View>

        {/* Metrics Grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {metrics.map((metric) => (
            <TouchableOpacity
              key={metric.id}
              activeOpacity={0.8}
              onPress={() => setActiveMetric(metric.id)}
              className={`w-[48%] p-4 rounded-xl mb-4 ${
                activeMetric === metric.id 
                  ? 'bg-blue-500' 
                  : 'bg-white dark:bg-gray-800'
              }`}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                borderWidth: 1,
                borderColor: isDark ? '#374151' : '#e5e7eb',
              }}
            >
              <View className="flex-row items-center">
                <View 
                  className="p-2 rounded-full mr-3"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <MaterialIcons 
                    name={metric.icon as any} 
                    size={20} 
                    color={metric.color} 
                  />
                </View>
                <View>
                  <Text 
                    className={`text-sm ${
                      activeMetric === metric.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {metric.label}
                  </Text>
                  <Text 
                    className={`text-2xl font-bold ${
                      activeMetric === metric.id ? 'text-white' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {metric.value}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Chart */}
        <View className="bg-white dark:bg-gray-800 p-4 rounded-xl mb-6" style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          borderWidth: 1,
          borderColor: isDark ? '#374151' : '#e5e7eb',
        }}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">
              {metrics.find(m => m.id === activeMetric)?.label} Overview
            </Text>
            <TouchableOpacity className="p-1">
              <Text className="text-blue-500 text-sm font-medium">View Details</Text>
            </TouchableOpacity>
          </View>
          
          {activeMetric && (
            <LineChart
              data={{
                labels: chartData.labels,
                datasets: [{
                  data: chartData[activeMetric as keyof typeof chartData] as number[],
                  color: (opacity = 1) => metrics.find(m => m.id === activeMetric)?.color || '#3b82f6',
                  strokeWidth: 2
                }]
              }}
              width={screenWidth - 48}
              height={220}
              withDots={true}
              withShadow={false}
              withInnerLines={true}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
        </View>

        {/* Expandable Cards */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity 
            onPress={() => toggleCard('schedule')}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl mb-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              borderWidth: 1,
              borderColor: isDark ? '#374151' : '#e5e7eb',
            }}
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                🌧️ Watering Schedule
              </Text>
              <MaterialIcons 
                name={expandedCard === 'schedule' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                size={24} 
                color={isDark ? '#9ca3af' : '#6b7280'} 
              />
            </View>
            
            {expandedCard === 'schedule' && (
              <View className="mt-3">
                {['Morning', 'Afternoon', 'Evening'].map((time, index) => (
                  <View 
                    key={time}
                    className={`flex-row justify-between items-center py-3 ${
                      index < 2 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                    }`}
                  >
                    <Text className="text-gray-800 dark:text-gray-200">{time}</Text>
                    <Text className="text-gray-500 dark:text-gray-400">
                      {time === 'Morning' ? '6:00 AM' : time === 'Afternoon' ? '2:00 PM' : '7:00 PM'}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleCard('summary')}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              borderWidth: 1,
              borderColor: isDark ? '#374151' : '#e5e7eb',
            }}
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                📊 Weekly Summary
              </Text>
              <MaterialIcons 
                name={expandedCard === 'summary' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                size={24} 
                color={isDark ? '#9ca3af' : '#6b7280'} 
              />
            </View>
            
            {expandedCard === 'summary' && (
              <View className="mt-3">
                {[
                  { label: 'Avg. Temperature', value: '22°C' },
                  { label: 'Water Used', value: '45L' },
                  { label: 'Growth', value: '+2.5cm', isPositive: true }
                ].map((item, index) => (
                  <View 
                    key={item.label}
                    className={`flex-row justify-between items-center py-3 ${
                      index < 2 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                    }`}
                  >
                    <Text className="text-gray-800 dark:text-gray-200">{item.label}</Text>
                    <Text 
                      className={`font-medium ${
                        item.isPositive 
                          ? 'text-green-500' 
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
