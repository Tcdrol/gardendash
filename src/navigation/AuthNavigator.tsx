import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Platform, View, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// Import screen components
const LoginScreen = React.lazy(() => import('../screens/auth/LoginScreen'));
const SignupScreen = React.lazy(() => import('../screens/auth/SignupScreen'));
const ForgotPasswordScreen = React.lazy(() => import('../screens/auth/ForgotPasswordScreen'));

// Loading component
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

// Wrapper for lazy loading
const withSuspense = (Component: React.ComponentType) => (props: any) => (
  <React.Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </React.Suspense>
);

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

// Common header styles
const headerStyles = (isDark: boolean): StackNavigationOptions => ({
  headerStyle: {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#374151' : '#e5e7eb',
  },
  headerTintColor: isDark ? '#f9fafb' : '#111827',
  headerTitleStyle: {
    fontWeight: '600',
    fontSize: 18,
  },
  headerTitleAlign: 'center' as const,
  headerBackTitleVisible: false,
  headerLeftContainerStyle: {
    paddingLeft: Platform.OS === 'ios' ? 8 : 0,
  },
  headerRightContainerStyle: {
    paddingRight: 16,
  },
});

export function AuthNavigator() {
  const { isDark } = useTheme();
  
  const screenOptions: StackNavigationOptions = {
    ...headerStyles(isDark),
    headerShown: false,
    cardStyle: { 
      backgroundColor: isDark ? '#111827' : '#ffffff' 
    },
    animationEnabled: true,
  };

  // Create screen components with Suspense
  const Screens = {
    Login: withSuspense(LoginScreen),
    Signup: withSuspense(SignupScreen),
    ForgotPassword: withSuspense(ForgotPasswordScreen),
  };

  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={screenOptions}
    >
      <Stack.Screen 
        name="Login" 
        component={Screens.Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Signup" 
        component={Screens.Signup}
        options={{
          headerShown: true,
          title: 'Create Account',
          ...headerStyles(isDark),
        }}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={Screens.ForgotPassword}
        options={{
          headerShown: true,
          title: 'Reset Password',
          ...headerStyles(isDark),
        }}
      />
    </Stack.Navigator>
  );
}
