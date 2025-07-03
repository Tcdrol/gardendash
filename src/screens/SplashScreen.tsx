import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { AppLogo } from '../components/AppLogo';

type SplashScreenProps = {
  onAnimationFinish: () => void;
};

export const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationFinish();
    }, 2000); // Show splash screen for 2 seconds

    return () => clearTimeout(timer);
  }, [onAnimationFinish]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppLogo size={150} showText={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
});
