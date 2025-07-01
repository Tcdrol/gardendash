import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView } from 'react-native';

import './global.css';

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
    <View className="px-6 py-3 bg-white shadow-sm">
      <View className="flex-row justify-between items-center">
        <Text className="text-4xl font-bold mt-12 ml-6">Dashboard</Text>
        <View className="w-10 h-10 bg-gray-200 rounded-full"/>
      </View>
    </View>
     {/* Main Content */}
     <ScrollView className="flex-1">
        {/* Stats Cards Row */}
        <View className="flex-row flex-wrap justify-between px-4 py-6">
          {/* Stat Card 1 */}
          <View className="w-[48%] bg-white p-4 rounded-xl shadow-sm mb-4">
            <Text className="text-gray-500 text-sm">Total Users</Text>
            <Text className="text-2xl font-bold mt-1">1,234</Text>
            <Text className="text-green-500 text-xs mt-1">↑ 12% from last month</Text>
          </View>
          
          {/* Stat Card 2 */}
          <View className="w-[48%] bg-white p-4 rounded-xl shadow-sm mb-4">
            <Text className="text-gray-500 text-sm">Revenue</Text>
            <Text className="text-2xl font-bold mt-1">$12,345</Text>
            <Text className="text-green-500 text-xs mt-1">↑ 8% from last month</Text>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View className="mx-4 mb-6 bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-semibold mb-3">Recent Activity</Text>
          {[1, 2, 3].map((item) => (
            <View key={item} className="py-3 border-b border-gray-100">
              <View className="flex-row justify-between">
                <Text className="font-medium">Activity {item}</Text>
                <Text className="text-gray-500 text-sm">2h ago</Text>
              </View>
              <Text className="text-gray-500 text-sm mt-1">Details about this activity...</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View className="mx-4 mb-6">
          <Text className="text-lg font-semibold mb-3">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            {['Add User', 'Generate Report', 'Settings', 'Help'].map((action) => (
              <View key={action} className="w-[48%] bg-white p-4 rounded-xl shadow-sm mb-4 items-center">
                <View className="w-12 h-12 bg-blue-100 rounded-full mb-2" />
                <Text className="text-center">{action}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row justify-around items-center py-3 bg-white border-t border-gray-200">
        {['Home', 'Analytics', 'Profile', 'Menu'].map((item) => (
          <View key={item} className="items-center">
            <View className="w-6 h-6 bg-gray-200 rounded-full mb-1" />
            <Text className="text-xs">{item}</Text>
          </View>
        ))}
      </View>

      <StatusBar style="auto" />







    </SafeAreaView>
  );

}
