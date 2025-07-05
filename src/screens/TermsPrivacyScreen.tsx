import React from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type SectionProps = {
  title: string;
  content: string;
};

const Section = ({ title, content }: SectionProps) => {
  const { isDark } = useTheme();
  
  return (
    <View className="mb-6">
      <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </Text>
      <Text className="text-base text-gray-700 dark:text-gray-300">
        {content}
      </Text>
    </View>
  );
};

export function TermsPrivacyScreen() {
  const { isDark } = useTheme();

  const termsSections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using the GardenDash app, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.'
    },
    {
      title: '2. Description of Service',
      content: 'GardenDash provides a platform for tracking and managing your garden, including plant care, watering schedules, and growth monitoring.'
    },
    {
      title: '3. User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.'
    },
    {
      title: '4. Privacy Policy',
      content: 'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information.'
    },
    {
      title: '5. User Content',
      content: 'You retain all rights to the content you submit, post, or display on or through the service.'
    },
    {
      title: '6. Prohibited Uses',
      content: 'You agree not to use the service for any unlawful purpose or in any way that could damage, disable, or impair the service.'
    },
    {
      title: '7. Termination',
      content: 'We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever.'
    },
    {
      title: '8. Changes to Terms',
      content: 'We reserve the right to modify or replace these terms at any time. Your continued use of the service after any such changes constitutes your acceptance of the new terms.'
    },
    {
      title: '9. Contact Us',
      content: 'If you have any questions about these terms, please contact us at support@gardendash.com.'
    }
  ];

  const privacySections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, such as your name, email address, and garden data when you register for an account or use our services.'
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, communicate with you, and develop new features.'
    },
    {
      title: '3. Sharing of Information',
      content: 'We do not sell your personal information to third parties. We may share information with service providers who assist us in operating our services.'
    },
    {
      title: '4. Data Security',
      content: 'We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.'
    },
    {
      title: '5. Your Choices',
      content: 'You may update, correct, or delete your account information at any time by accessing your account settings.'
    },
    {
      title: '6. Children\'s Privacy',
      content: 'Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.'
    },
    {
      title: '7. Changes to This Policy',
      content: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.'
    },
    {
      title: '8. Contact Us',
      content: 'If you have any questions about this Privacy Policy, please contact us at privacy@gardendash.com.'
    }
  ];

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: isDark ? '#111827' : '#f9fafb' }}
      contentContainerStyle={{ padding: 20 }}
    >
      <View className="mb-8">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Terms of Service & Privacy Policy
        </Text>
        <Text className="text-gray-600 dark:text-gray-300 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </Text>

        <View className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </Text>
          
          {termsSections.map((section, index) => (
            <Section 
              key={`terms-${index}`}
              title={section.title}
              content={section.content}
            />
          ))}
        </View>

        <View className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </Text>
          
          {privacySections.map((section, index) => (
            <Section 
              key={`privacy-${index}`}
              title={section.title}
              content={section.content}
            />
          ))}
        </View>

        <View className="mt-8 mb-12">
          <Text className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} GardenDash. All rights reserved.
          </Text>
          <View className="flex-row justify-center mt-2">
            <Text 
              className="text-blue-500 text-sm mr-4"
              onPress={() => Linking.openURL('mailto:contact@gardendash.com')}
            >
              Contact Us
            </Text>
            <Text 
              className="text-blue-500 text-sm"
              onPress={() => Linking.openURL('https://gardendash.com')}
            >
              Visit Our Website
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
