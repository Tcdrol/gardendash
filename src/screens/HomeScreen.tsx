import { View, Text, ScrollView } from 'react-native';

export function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold mb-4">Dashboard</Text>
      
      {/* Row 1 */}
      <View className="flex-row justify-between mb-4">
        <View className="w-[48%] bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-bold">Account Information</Text>
          <Text className="text-sm text-gray-600 mt-1">sample@example.com</Text>
          <Text className="text-sm text-gray-600">123-456-7890</Text>
        </View>
        <View className="w-[48%] bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-bold">Orders</Text>
          <Text className="text-sm text-gray-600 mt-1">You have 3 orders.</Text>
        </View>
      </View>

      {/* Row 2 */}
      <View className="flex-row justify-between mb-4">
        <View className="w-full bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-bold">Address</Text>
          <Text className="text-sm text-gray-600 mt-1">123 Example St, New York, NY 10001</Text>
        </View>
      </View>

      {/* Row 3 */}
      <View className="flex-row justify-between">
        <View className="w-full bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-bold text-center text-red-500">Logout</Text>
        </View>
      </View>
    </ScrollView>
  );
}
