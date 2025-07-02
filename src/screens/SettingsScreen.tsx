import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type SettingItemProps = {
  icon: string;
  title: string;
  rightComponent?: React.ReactNode;
  onPress?: () => void;
  isLast?: boolean;
  titleClassName?: string;
};

const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const { isDark } = useTheme();
  return (
    <View className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
      <Text className="text-gray-500 dark:text-gray-400 font-medium px-6 pt-4 pb-2">
        {title}
      </Text>
      {children}
    </View>
  );
};

const SettingItem = ({
  icon,
  title,
  rightComponent,
  onPress,
  isLast = false,
  titleClassName = ''
}: SettingItemProps) => {
  const { isDark } = useTheme();
  
  return (
    <TouchableOpacity
      className={`flex-row justify-between items-center py-4 px-6 ${
        !isLast ? 'border-b border-gray-100 dark:border-gray-700' : ''
      } ${!onPress ? 'opacity-60' : ''}`}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <Text className="text-xl mr-3 w-6 text-center text-gray-900 dark:text-gray-100">
          {icon}
        </Text>
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

export function SettingsScreen() {
  const { isDark, toggleTheme } = useTheme();
  // Wi-Fi State
  const [ssid, setSsid] = useState('TC_Garden');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Sensor Settings
  const [moistureThreshold, setMoistureThreshold] = useState(30);
  const [autoMode, setAutoMode] = useState(true);
  const [highTemp, setHighTemp] = useState(35);
  const [lowTemp, setLowTemp] = useState(15);

  // Notification Preferences
  const [moistureAlerts, setMoistureAlerts] = useState(true);
  const [tempAlerts, setTempAlerts] = useState(true);
  const [phAlerts, setPhAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      Alert.alert('Connected', 'Successfully connected to Wi-Fi network');
    }, 1500);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            setMoistureThreshold(30);
            setAutoMode(true);
            setHighTemp(35);
            setLowTemp(15);
            Alert.alert('Success', 'Settings have been reset to default');
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="bg-white dark:bg-gray-800 p-6 pt-12 pb-4 border-b border-gray-100 dark:border-gray-700">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">⚙️ Settings</Text>
        </View>

        {/* Wi-Fi Configuration */}
        <View className="p-4">
          <SettingSection title="📶 Wi-Fi Configuration">
            <View className="px-6 py-4">
              <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">SSID</Text>
              <TextInput
                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 mb-4 text-gray-900 dark:text-white"
                value={ssid}
                onChangeText={setSsid}
                placeholder="Wi-Fi Network Name"
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
              />
              
              <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">Password</Text>
              <View className="flex-row items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg mb-4">
                <TextInput
                  className="flex-1 p-3 text-gray-900 dark:text-white"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                />
                <TouchableOpacity 
                  className="px-3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={20} 
                    color={isDark ? '#9ca3af' : '#6b7280'} 
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                className={`bg-blue-500 dark:bg-blue-600 py-3 rounded-lg items-center ${
                  isConnecting ? 'opacity-70' : ''
                }`}
                onPress={handleConnect}
                disabled={isConnecting}
              >
                <Text className="text-white font-medium">
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </Text>
              </TouchableOpacity>
              
              <Text className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Current: {ssid || 'Not connected'}
              </Text>
            </View>
          </SettingSection>

          {/* Sensor Settings */}
          <SettingSection title="💧 Sensor Settings">
            <View className="px-6">
              <SettingItem
                icon="💧"
                title={`Moisture Threshold: ${moistureThreshold}%`}
                rightComponent={
                  <View className="flex-row items-center">
                    <TouchableOpacity 
                      onPress={() => setMoistureThreshold(Math.max(0, moistureThreshold - 5))}
                      className="p-2"
                    >
                      <Text className="text-xl text-gray-900 dark:text-gray-100">-</Text>
                    </TouchableOpacity>
                    <Text className="mx-2 text-gray-900 dark:text-gray-100">{moistureThreshold}%</Text>
                    <TouchableOpacity 
                      onPress={() => setMoistureThreshold(Math.min(100, moistureThreshold + 5))}
                      className="p-2"
                    >
                      <Text className="text-xl text-gray-900 dark:text-gray-100">+</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
              
              <SettingItem
                icon="🤖"
                title="Auto Mode"
                rightComponent={
                  <Switch
                    value={autoMode}
                    onValueChange={setAutoMode}
                    trackColor={{ false: '#9ca3af', true: '#1e40af' }}
                    thumbColor={isDark ? '#f3f4f6' : '#f9fafb'}
                  />
                }
              />
            </View>
          </SettingSection>

          {/* Temperature Warnings */}
          <SettingSection title="🌡️ Temperature Warnings">
            <View className="px-6">
              <SettingItem
                icon="🔥"
                title="High Temperature Alert"
                rightComponent={
                  <View className="flex-row items-center">
                    <TextInput
                      className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-2 w-16 text-center text-gray-900 dark:text-white"
                      value={highTemp.toString()}
                      onChangeText={(text) => setHighTemp(Number(text) || 0)}
                      keyboardType="numeric"
                    />
                    <Text className="ml-2 text-gray-900 dark:text-gray-100">°C</Text>
                  </View>
                }
              />
              
              <SettingItem
                icon="❄️"
                title="Low Temperature Alert"
                rightComponent={
                  <View className="flex-row items-center">
                    <TextInput
                      className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-2 w-16 text-center text-gray-900 dark:text-white"
                      value={lowTemp.toString()}
                      onChangeText={(text) => setLowTemp(Number(text) || 0)}
                      keyboardType="numeric"
                    />
                    <Text className="ml-2 text-gray-900 dark:text-gray-100">°C</Text>
                  </View>
                }
              />
            </View>
          </SettingSection>

          {/* Notification Preferences */}
          <SettingSection title="🔔 Notification Preferences">
            <View className="px-6">
              <SettingItem
                icon="💧"
                title="Moisture Alerts"
                rightComponent={
                  <Switch
                    value={moistureAlerts}
                    onValueChange={setMoistureAlerts}
                    trackColor={{ false: '#9ca3af', true: '#1e40af' }}
                    thumbColor={isDark ? '#f3f4f6' : '#f9fafb'}
                  />
                }
              />
              
              <SettingItem
                icon="🌡️"
                title="Temperature Alerts"
                rightComponent={
                  <Switch
                    value={tempAlerts}
                    onValueChange={setTempAlerts}
                    trackColor={{ false: '#9ca3af', true: '#1e40af' }}
                    thumbColor={isDark ? '#f3f4f6' : '#f9fafb'}
                  />
                }
              />
              
              <SettingItem
                icon="🧪"
                title="pH Alerts"
                rightComponent={
                  <Switch
                    value={phAlerts}
                    onValueChange={setPhAlerts}
                    trackColor={{ false: '#9ca3af', true: '#1e40af' }}
                    thumbColor={isDark ? '#f3f4f6' : '#f9fafb'}
                  />
                }
              />
              
              <SettingItem
                icon="📱"
                title="Push Notifications"
                rightComponent={
                  <Switch
                    value={pushNotifications}
                    onValueChange={setPushNotifications}
                    trackColor={{ false: '#9ca3af', true: '#1e40af' }}
                    thumbColor={isDark ? '#f3f4f6' : '#f9fafb'}
                  />
                }
              />
            </View>
          </SettingSection>

          {/* App Info */}
          <SettingSection title="ℹ️ App Info">
            <View className="px-6">
              <SettingItem
                icon="📱"
                title="App Version"
                rightComponent={
                  <Text className="text-gray-500 dark:text-gray-400">v1.0.0</Text>
                }
              />
              
              <SettingItem
                icon="👨‍💻"
                title="Developer"
                rightComponent={
                  <Text className="text-gray-500 dark:text-gray-400">TC Drol</Text>
                }
                isLast={true}
              />
            </View>
          </SettingSection>

          {/* Danger Zone */}
          <SettingSection title="🚨 Danger Zone">
            <View className="px-6">
              <SettingItem
                icon="🔄"
                title="Reset to Defaults"
                onPress={handleReset}
                titleClassName="text-red-600 dark:text-red-400"
                isLast={true}
              />
            </View>
          </SettingSection>
        </View>
      </ScrollView>
    </View>
  );
}