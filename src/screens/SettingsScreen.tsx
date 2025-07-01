import { View, Text } from 'react-native';

export function SettingsScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50 p-4">
      <Text className="text-2xl font-bold mb-4">Settings</Text>
      <Text className="text-center text-gray-600">
        App settings will appear here.
      </Text>
    </View>
  );
}
