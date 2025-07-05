import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { ChangePasswordScreen } from '../screens/profile/ChangePasswordScreen';
import { HelpSupportScreen } from '../screens/HelpSupportScreen';
import { TermsPrivacyScreen } from '../screens/TermsPrivacyScreen';

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

// Profile Stack Navigator
function ProfileStackNavigator() {
  const { isDark } = useTheme();
  
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
        },
        headerTintColor: isDark ? '#f9fafb' : '#111827',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerBackTitle: 'Back',
      }}
    >
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: 'Edit Profile' }}
      />
      <ProfileStack.Screen 
        name="ChangePassword" 
        component={ChangePasswordScreen} 
        options={{ title: 'Change Password' }}
      />
      <ProfileStack.Screen 
        name="HelpSupport" 
        component={HelpSupportScreen} 
        options={{ title: 'Help & Support' }}
      />
      <ProfileStack.Screen 
        name="TermsPrivacy" 
        component={TermsPrivacyScreen} 
        options={{ title: 'Terms & Privacy' }}
      />
    </ProfileStack.Navigator>
  );
}

export function AppNavigator() {
  const { isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        contentStyle: {
          backgroundColor: isDark ? '#111827' : '#f9fafb',
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let label;

          if (route.name === 'Home') {
            iconName = '🏠';
            label = 'Home';
          } else if (route.name === 'Analytics') {
            iconName = '📊';
            label = 'Analytics';
          } else if (route.name === 'ProfileStack') {
            iconName = '👤';
            label = 'Profile';
          } else if (route.name === 'Settings') {
            iconName = '⚙️';
            label = 'Settings';
          }

          return (
            <View className={`items-center pt-5 ${focused ? 'opacity-100' : 'opacity-50'}`}>
              <Text className="text-xl">{iconName}</Text>
              <Text className={`text-[7px] ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {label}
              </Text>
            </View>
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#374151' : '#e5e7eb',
          height: 75,
        },
        tabBarActiveTintColor: isDark ? '#60a5fa' : '#3b82f6',
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen 
        name="ProfileStack" 
        component={ProfileStackNavigator} 
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
