import { 
  View, 
  Text, 
  TouchableOpacity, 
  Switch, 
  Alert, 
  ScrollView, 
  StyleSheet, 
  Image,
  ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

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

const styles = StyleSheet.create({
  profileImage: {
    width: '100%',
    height: '100%',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 4,
  },
});

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const [notifications, setNotifications] = useState<boolean>(true);
  const [biometrics, setBiometrics] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>('https://via.placeholder.com/100');
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load user profile image when user data changes
  useEffect(() => {
    if (user?.photoURL) {
      setProfileImage(user.photoURL);
    } else {
      // Reset to default if no photo URL is available
      setProfileImage('https://via.placeholder.com/100');
    }
  }, [user?.photoURL]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      Alert.alert('Logout Failed', error?.message || 'An error occurred during logout');
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please allow access to your photos to upload a profile picture.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setIsLoading(true);
        // In a real app, you would upload the image to a server here
        // For now, we'll just set it locally
        setProfileImage(result.assets[0].uri);
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to update profile picture. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="py-8 px-6">
        <View className="items-center mb-8">
          <TouchableOpacity onPress={pickImage} disabled={isLoading}>
            <View className="relative">
              <View className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {profileImage ? (
                  <Image 
                    source={{ uri: profileImage }} 
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View className="flex-1 items-center justify-center">
                    <MaterialIcons name="person" size={40} color="#6b7280" />
                  </View>
                )}
              </View>
              {isLoading ? (
                <ActivityIndicator 
                  size="small" 
                  color="#3b82f6" 
                  style={styles.editIcon} 
                />
              ) : (
                <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5">
                  <MaterialIcons name="edit" size={16} color="white" />
                </View>
              )}
            </View>
          </TouchableOpacity>
          
          <Text className="text-xl font-bold text-gray-900 dark:text-white mt-4">
            {user?.name || 'User'}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400">
            {user?.email || ''}
          </Text>
        </View>
        
        <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Account
        </Text>
        <View className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-6">
          <SettingItem
            icon="📝"
            title="Edit Profile"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <SettingItem
            icon="🔒"
            title="Change Password"
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <SettingItem
            icon="🔔"
            title="Notifications"
            rightComponent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#e5e7eb', true: '#bfdbfe' }}
                thumbColor={notifications ? '#3b82f6' : '#f3f4f6'}
              />
            }
          />
          <SettingItem
            icon="🌓"
            title="Dark Mode"
            rightComponent={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#e5e7eb', true: '#bfdbfe' }}
                thumbColor={isDark ? '#3b82f6' : '#f3f4f6'}
              />
            }
          />
        </View>

        <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Security
        </Text>
        <View className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-6">
          <SettingItem
            icon="👤"
            title="Use Biometrics"
            rightComponent={
              <Switch
                value={biometrics}
                onValueChange={setBiometrics}
                trackColor={{ false: '#e5e7eb', true: '#bfdbfe' }}
                thumbColor={biometrics ? '#3b82f6' : '#f3f4f6'}
              />
            }
          />
          <SettingItem
            icon="🔐"
            title="Two-Factor Authentication"
            rightComponent={
              <Switch
                value={false}
                onValueChange={() => {}}
                trackColor={{ false: '#e5e7eb', true: '#bfdbfe' }}
                thumbColor={false ? '#3b82f6' : '#f3f4f6'}
              />
            }
          />
        </View>

        <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Support
        </Text>
        <View className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-6">
          <SettingItem
            icon="❓"
            title="Help & Support"
            onPress={() => navigation.navigate('HelpSupport')}
          />
          <SettingItem
            icon="📝"
            title="Terms & Privacy"
            onPress={() => navigation.navigate('TermsPrivacy')}
          />
        </View>

        <View className="mt-8 mb-10">
          <TouchableOpacity 
            className="bg-red-50 dark:bg-red-900/30 py-4 rounded-xl items-center"
            onPress={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ef4444" />
            ) : (
              <Text className="text-red-600 dark:text-red-400 font-semibold">
                Sign Out
              </Text>
            )}
          </TouchableOpacity>
          
          <View className="mt-4 items-center">
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              App Version 1.0.0
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
