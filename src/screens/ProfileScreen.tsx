import { View, Text } from 'react-native';

export function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50 p-4">
      <Text className="text-2xl font-bold mb-4">Profile</Text>
      <Text className="text-center text-gray-600">
        Your profile information will be displayed here.
      </Text>
    </View>
  );
}
