import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View className="mb-6 bg-white rounded-xl shadow-sm overflow-hidden">
    <Text className="text-gray-500 font-medium px-6 pt-4 pb-2">{title}</Text>
    {children}
  </View>
);

const SettingItem = ({ 
  icon, 
  title, 
  rightComponent,
  onPress,
  isLast = false 
}: { 
  icon: string; 
  title: string; 
  rightComponent?: React.ReactNode;
  onPress?: () => void;
  isLast?: boolean;
}) => (
  <TouchableOpacity 
    className={`flex-row items-center justify-between py-4 px-6 ${!isLast ? 'border-b border-gray-100' : ''}`}
    onPress={onPress}
    disabled={!onPress}
  >
    <View className="flex-row items-center">
      <Text className="text-xl mr-3 w-6 text-center">{icon}</Text>
      <Text className="text-base">{title}</Text>
    </View>
    {rightComponent || <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />}
  </TouchableOpacity>
);

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
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header */}
        <View className="bg-white p-6 pt-12 pb-4 border-b border-gray-100">
          <Text className="text-2xl font-bold">⚙️ Settings</Text>
        </View>

        {/* Wi-Fi Configuration */}
        <SettingSection title="📶 Wi-Fi Configuration">
          <View className="px-6 py-3">
            <Text className="text-sm text-gray-500 mb-1">SSID</Text>
            <TextInput
              className="border border-gray-200 rounded-lg p-3 mb-3"
              value={ssid}
              onChangeText={setSsid}
              placeholder="Wi-Fi Network Name"
            />
            
            <Text className="text-sm text-gray-500 mb-1">Password</Text>
            <View className="flex-row items-center border border-gray-200 rounded-lg mb-3">
              <TextInput
                className="flex-1 p-3"
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                className="px-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={20} 
                  color="#6B7280" 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              className={`bg-blue-500 py-3 rounded-lg items-center ${isConnecting ? 'opacity-70' : ''}`}
              onPress={handleConnect}
              disabled={isConnecting}
            >
              <Text className="text-white font-medium">
                {isConnecting ? 'Connecting...' : 'Connect'}
              </Text>
            </TouchableOpacity>
            
            <Text className="text-sm text-gray-500 mt-2">
              Current: {ssid || 'Not connected'}
            </Text>
          </View>
        </SettingSection>

        {/* Sensor Settings */}
        <SettingSection title="💧 Sensor Settings">
          <View className="px-6 py-3">
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <Text>Moisture Threshold: {moistureThreshold}%</Text>
              <View className="w-24">
                <View className="flex-row items-center">
                  <TouchableOpacity 
                    onPress={() => setMoistureThreshold(Math.max(0, moistureThreshold - 5))}
                    className="p-2"
                  >
                    <Text className="text-xl">-</Text>
                  </TouchableOpacity>
                  <Text className="mx-2">{moistureThreshold}%</Text>
                  <TouchableOpacity 
                    onPress={() => setMoistureThreshold(Math.min(100, moistureThreshold + 5))}
                    className="p-2"
                  >
                    <Text className="text-xl">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <View className="flex-row justify-between items-center py-3">
              <Text>Auto Watering</Text>
              <Switch 
                value={autoMode} 
                onValueChange={setAutoMode}
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              />
            </View>
          </View>
        </SettingSection>

        {/* Temperature Warnings */}
        <SettingSection title="🌡️ Temperature Warnings">
          <View className="px-6 py-3">
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <Text>High Temperature Alert</Text>
              <View className="flex-row items-center">
                <TextInput
                  className="border border-gray-200 rounded p-2 w-16 text-center"
                  value={highTemp.toString()}
                  onChangeText={(text) => setHighTemp(Number(text) || 0)}
                  keyboardType="numeric"
                />
                <Text>°C</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between items-center py-3">
              <Text>Low Temperature Alert</Text>
              <View className="flex-row items-center">
                <TextInput
                  className="border border-gray-200 rounded p-2 w-16 text-center"
                  value={lowTemp.toString()}
                  onChangeText={(text) => setLowTemp(Number(text) || 0)}
                  keyboardType="numeric"
                />
                <Text>°C</Text>
              </View>
            </View>
          </View>
        </SettingSection>

        {/* Theme Toggle */}
        <SettingSection title="🎨 Appearance">
          <SettingItem 
            icon="🌓"
            title="Dark Mode"
            rightComponent={
              <Switch 
                value={isDark} 
                onValueChange={toggleTheme}
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              />
            }
            isLast={true}
          />
        </SettingSection>

        {/* Notification Preferences */}
        <SettingSection title="🔔 Notification Preferences">
          <SettingItem 
            icon="💧"
            title="Moisture Alerts"
            rightComponent={
              <Switch 
                value={moistureAlerts} 
                onValueChange={setMoistureAlerts}
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
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
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
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
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              />
            }
          />
          <SettingItem 
            icon="🔔"
            title="Push Notifications"
            rightComponent={
              <Switch 
                value={pushNotifications} 
                onValueChange={setPushNotifications}
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              />
            }
            isLast={true}
          />
        </SettingSection>

        {/* App Info */}
        <SettingSection title="ℹ️ App Info">
          <SettingItem 
            icon="📱"
            title="App Version"
            rightComponent={<Text className="text-gray-500">v1.0.0</Text>}
          />
          <SettingItem 
            icon="👨‍💻"
            title="Developer"
            rightComponent={<Text className="text-gray-500">TC Drol</Text>}
            isLast={true}
          />
        </SettingSection>

        {/* Danger Zone */}
        <SettingSection title="🚨 Danger Zone">
          <SettingItem 
            icon="🔄"
            title="Reset to Defaults"
            onPress={handleReset}
            isLast={true}
          />
        </SettingSection>
      </ScrollView>
    </View>
  );
}
