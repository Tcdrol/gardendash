import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type AppLogoProps = {
  size?: number;
  showText?: boolean;
};

export const AppLogo: React.FC<AppLogoProps> = ({ size = 40, showText = true }) => {
  const { isDark } = useTheme();
  
  const leafColor = isDark ? '#4ade80' : '#22c55e';
  const potColor = isDark ? '#a16207' : '#a16207';
  const textColor = isDark ? 'text-white' : 'text-gray-900';

  return (
    <View className="items-center">
      <View style={[styles.logoContainer, { width: size, height: size }]}>
        {/* Plant pot */}
        <View 
          style={[
            styles.potTop, 
            { 
              backgroundColor: potColor,
              width: size * 0.7,
              height: size * 0.15,
              borderTopLeftRadius: size * 0.1,
              borderTopRightRadius: size * 0.1,
            }
          ]} 
        />
        <View 
          style={[
            styles.pot, 
            { 
              backgroundColor: potColor,
              width: size * 0.6,
              height: size * 0.3,
              borderBottomLeftRadius: size * 0.1,
              borderBottomRightRadius: size * 0.1,
            }
          ]} 
        />
        
        {/* Plant */}
        <View style={styles.plant}>
          <View 
            style={[
              styles.leaf, 
              { 
                backgroundColor: leafColor,
                width: size * 0.5,
                height: size * 0.4,
                borderTopLeftRadius: size * 0.4,
                borderBottomRightRadius: size * 0.4,
                transform: [{ rotate: '-20deg' }],
                right: size * 0.1,
                bottom: size * 0.2,
              }
            ]} 
          />
          <View 
            style={[
              styles.leaf, 
              { 
                backgroundColor: leafColor,
                width: size * 0.5,
                height: size * 0.4,
                borderTopRightRadius: size * 0.4,
                borderBottomLeftRadius: size * 0.4,
                transform: [{ rotate: '20deg' }],
                left: size * 0.1,
                bottom: size * 0.2,
              }
            ]} 
          />
          <View 
            style={[
              styles.stem, 
              { 
                backgroundColor: leafColor,
                width: size * 0.1,
                height: size * 0.4,
                bottom: size * 0.6,
              }
            ]} 
          />
        </View>
      </View>
      
      {showText && (
        <Text 
          className={`font-bold text-lg mt-2 ${textColor}`}
          style={{ fontSize: size * 0.35 }}
        >
          GardenDash
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  potTop: {
    position: 'absolute',
    bottom: 0,
  },
  pot: {
    position: 'absolute',
    bottom: 0,
  },
  plant: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaf: {
    position: 'absolute',
  },
  stem: {
    position: 'absolute',
    borderRadius: 10,
  },
});
