import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let label;

          if (route.name === 'Home') {
            iconName = '🏠';
            label = 'Home';
          } else if (route.name === 'Analytics') {
            iconName = '📊';
            label = 'Analytics';
          } else if (route.name === 'Profile') {
            iconName = '👤';
            label = 'Profile';
          } else if (route.name === 'Settings') {
            iconName = '⚙️';
            label = 'Settings';
          }

          return (
            <View className={`items-center  pt-5 ${focused ? 'opacity-100' : 'opacity-50'}`}>
              <Text className="text-xl">{iconName}</Text>
              <Text className="text-[7px]">{label}</Text>
            </View>
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 75,
          paddingTop: 5,
          paddingBottom: 5,
          zIndex: 10,
          position: 'relative',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
