import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';

export function EditProfileScreen({ navigation }) {
  const { isDark } = useTheme();
  const { user, updateUser } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      await updateUser({ 
        name, 
        email,
        phone: phone || undefined
      });
      
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
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
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">Full Name</Text>
        <View className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <TextInput
            className="text-base text-gray-900 dark:text-white"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor={isDark ? '#9ca3af' : '#9ca3af'}
          />
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</Text>
        <View className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <TextInput
            className="text-base text-gray-900 dark:text-white"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email"
            placeholderTextColor={isDark ? '#9ca3af' : '#9ca3af'}
          />
        </View>
      </View>

      <View className="mb-8">
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone Number (Optional)</Text>
        <View className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <TextInput
            className="text-base text-gray-900 dark:text-white"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="Enter your phone number"
            placeholderTextColor={isDark ? '#9ca3af' : '#9ca3af'}
          />
        </View>
      </View>

      <TouchableOpacity
        className={`py-3 rounded-lg items-center ${isLoading ? 'bg-blue-400' : 'bg-blue-500'}`}
        onPress={handleSave}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold">Save Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
