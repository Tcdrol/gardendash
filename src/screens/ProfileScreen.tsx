import { View, Text } from 'react-native';

export function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50 p-4">
      <Text className="text-2xl font-bold mb-4">Profile</Text>
      <Text className="text-center text-gray-600">
        This is your profile page. You can edit your profile information here.
      </Text>
      <Text className="text-lg font-bold mt-4">Name</Text>
      <Text className="text-lg mt-2">John Doe</Text>
      <Text className="text-lg font-bold mt-4">Email</Text>
      <Text className="text-lg mt-2">john.doe@example.com</Text>
    </View>
  );
}
