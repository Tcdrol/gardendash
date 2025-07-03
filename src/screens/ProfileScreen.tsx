import { View, Text, TouchableOpacity, Switch, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type SettingItemProps = {
  icon: string;
  title: string;
  rightComponent?: React.ReactNode;
  onPress?: () => void;
  titleClassName?: string;
};

const SettingItem = ({
  icon,
  title,
  rightComponent,
  onPress,
  titleClassName = '',
}: SettingItemProps) => {
  const { isDark } = useTheme();
  
  return (
    <TouchableOpacity
      className={`flex-row justify-between items-center py-4 px-6 border-b border-gray-100 dark:border-gray-700 ${!onPress ? 'opacity-60' : ''}`}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <Text className="text-xl mr-3 w-6 text-center text-gray-900 dark:text-gray-100">{icon}</Text>
        <Text className={`text-base ${titleClassName || 'text-gray-900 dark:text-gray-100'}`}>
          {title}
        </Text>
      </View>
      {rightComponent || (
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={isDark ? '#9ca3af' : '#6b7280'} 
        />
      )}
    </TouchableOpacity>
  );
};

export function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => console.log("User logged out") }
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 p-6 pt-12 pb-4 border-b border-gray-100 dark:border-gray-700">
        <Text className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">👤 Profile</Text>
      </View>

      <ScrollView className="flex-1">
        {/* User Info Card */}
        <View className="bg-white dark:bg-gray-800 p-6 mb-6 mx-4 mt-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full items-center justify-center mr-4">
              <Ionicons name="person" size={32} color={isDark ? '#60a5fa' : '#3B82F6'} />
            </View>
            <View>
              <Text className="text-xl font-bold text-gray-900 dark:text-white">TC Drol</Text>
              <Text className="text-gray-500 dark:text-gray-400">Admin / Farmer</Text>
            </View>
          </View>
          
          <View className="mt-4">
            <View className="flex-row py-2 border-b border-gray-100 dark:border-gray-700">
              <Text className="text-gray-500 dark:text-gray-400 w-24">Email</Text>
              <Text className="text-gray-900 dark:text-gray-100">tc@example.com</Text>
            </View>
            <View className="flex-row py-2 border-b border-gray-100 dark:border-gray-700">
              <Text className="text-gray-500 dark:text-gray-400 w-24">Phone</Text>
              <Text className="text-gray-900 dark:text-gray-100">+260 XXX XXX</Text>
            </View>
            <View className="flex-row py-2">
              <Text className="text-gray-500 dark:text-gray-400 w-24">Joined</Text>
              <Text className="text-gray-900 dark:text-gray-100">June 2023</Text>
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View className="bg-white dark:bg-gray-800 p-6 mb-6 mx-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <Text className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Preferences</Text>
          
          <SettingItem
            icon="🌓"
            title="Dark Mode"
            titleClassName="text-gray-900 dark:text-white"
            rightComponent={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#9ca3af', true: '#1e40af' }}
                thumbColor={isDark ? '#f3f4f6' : '#f9fafb'}
              />
            }
          />
          
          <SettingItem
            icon="🔔"
            title="Notifications"
            titleClassName="text-gray-900 dark:text-white"
            rightComponent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#9ca3af', true: '#1e40af' }}
                thumbColor={isDark ? '#f3f4f6' : '#f9fafb'}
              />
            }
          />
          
          
        </View>

        {/* Security */}
        <View className="bg-white dark:bg-gray-800 p-6 mb-6 mx-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <Text className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Security</Text>
          
          <SettingItem
            icon="🔑"
            title="Change Password"
            titleClassName="text-gray-900 dark:text-white"
            onPress={() => console.log("Change password")}
          />
          
         
        </View>

        {/* Logout */}
        <View className="mx-4 mb-8">
          <TouchableOpacity
            className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl items-center border border-red-100 dark:border-red-900/30"
            onPress={handleLogout}
          >
            <Text className="text-red-600 dark:text-red-400 font-medium">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}