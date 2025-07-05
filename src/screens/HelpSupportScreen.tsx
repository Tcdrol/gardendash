import React from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

type SupportItem = {
  id: string;
  title: string;
  icon: string;
  description: string;
  action?: () => void;
};

export function HelpSupportScreen() {
  const { isDark } = useTheme();

  const supportItems: SupportItem[] = [
    {
      id: 'faq',
      title: 'FAQs',
      icon: 'help-outline',
      description: 'Find answers to common questions',
      action: () => {
        // Navigate to FAQ screen or open web view
        console.log('Navigate to FAQ');
      },
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: 'email',
      description: 'Get in touch with our support team',
      action: () => {
        Linking.openURL('mailto:support@gardendash.com');
      },
    },
    {
      id: 'chat',
      title: 'Live Chat',
      icon: 'chat',
      description: 'Chat with a support agent in real-time',
      action: () => {
        // Implement live chat functionality
        console.log('Start live chat');
      },
    },
    {
      id: 'call',
      title: 'Call Support',
      icon: 'phone',
      description: 'Speak directly with our team',
      action: () => {
        Linking.openURL('tel:+1234567890');
      },
    },
  ];

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: isDark ? '#111827' : '#f9fafb' }}
      contentContainerStyle={{ padding: 16 }}
    >
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          How can we help you?
        </Text>
        <Text className="text-gray-600 dark:text-gray-300">
          We're here to help with any questions or issues you might have.
        </Text>
      </View>

      <View className="mb-6">
        {supportItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row items-center p-4 bg-white dark:bg-gray-800 rounded-lg mb-3"
            onPress={item.action}
            activeOpacity={0.7}
          >
            <View className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-4">
              <MaterialIcons 
                name={item.icon as any} 
                size={24} 
                color={isDark ? '#93c5fd' : '#3b82f6'} 
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {item.description}
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDark ? '#9ca3af' : '#6b7280'} 
            />
          </TouchableOpacity>
        ))}
      </View>

      <View className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Still need help?
        </Text>
        <Text className="text-gray-600 dark:text-gray-300 mb-4">
          Check out our comprehensive help center for more information and guides.
        </Text>
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-lg items-center"
          onPress={() => {
            // Open help center URL
            Linking.openURL('https://help.gardendash.com');
          }}
        >
          <Text className="text-white font-semibold">Visit Help Center</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6 mb-8">
        <Text className="text-sm text-center text-gray-500 dark:text-gray-400">
          App Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}
