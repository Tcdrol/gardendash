import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

export function ChangePasswordScreen({ navigation }) {
  const { isDark } = useTheme();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword) {
      Alert.alert('Error', 'Please enter your current password');
      return;
    }

    if (!newPassword) {
      Alert.alert('Error', 'Please enter a new password');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Implement actual password change logic with your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success', 
        'Your password has been changed successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Password change error:', error);
      Alert.alert('Error', 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: isDark ? '#111827' : '#f9fafb' }}
      contentContainerStyle={{ padding: 20 }}
    >
      <View className="mb-6">
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Password</Text>
        <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <TextInput
            className="flex-1 text-base text-gray-900 dark:text-white"
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
            placeholderTextColor={isDark ? '#9ca3af' : '#9ca3af'}
          />
          <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
            <MaterialIcons 
              name={showCurrentPassword ? 'visibility-off' : 'visibility'} 
              size={22} 
              color={isDark ? '#9ca3af' : '#6b7280'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">New Password</Text>
        <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <TextInput
            className="flex-1 text-base text-gray-900 dark:text-white"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            placeholderTextColor={isDark ? '#9ca3af' : '#9ca3af'}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
            <MaterialIcons 
              name={showNewPassword ? 'visibility-off' : 'visibility'} 
              size={22} 
              color={isDark ? '#9ca3af' : '#6b7280'} 
            />
          </TouchableOpacity>
        </View>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Must be at least 6 characters long
        </Text>
      </View>

      <View className="mb-8">
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">Confirm New Password</Text>
        <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <TextInput
            className="flex-1 text-base text-gray-900 dark:text-white"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            placeholderTextColor={isDark ? '#9ca3af' : '#9ca3af'}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <MaterialIcons 
              name={showConfirmPassword ? 'visibility-off' : 'visibility'} 
              size={22} 
              color={isDark ? '#9ca3af' : '#6b7280'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className={`py-3 rounded-lg items-center ${isLoading ? 'bg-blue-400' : 'bg-blue-500'}`}
        onPress={handleChangePassword}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold">Change Password</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
