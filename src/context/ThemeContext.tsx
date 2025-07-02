import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useColorScheme, ColorSchemeName, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'system';
type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  systemTheme: ColorSchemeName;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // Determine the actual theme to use (accounting for system preference)
  const resolvedTheme = theme === 'system' 
    ? systemColorScheme || 'light' 
    : theme;

  const isDark = resolvedTheme === 'dark';

  // Load saved theme or use system preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeState(savedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTheme();
  }, []);

  // Update document class for web and save theme
  useEffect(() => {
    if (!isLoaded) return;

    // For web
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    }

    // For native, update appearance
    if (isLoaded) {
      Appearance.setColorScheme(isDark ? 'dark' : 'light');
    }

    // Save theme preference
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (error) {
        console.error('Failed to save theme', error);
      }
    };

    saveTheme();
  }, [theme, isLoaded, isDark]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      if (prev === 'system') return 'dark';
      if (prev === 'dark') return 'light';
      return 'system';
    });
  }, []);

  const value = {
    theme,
    isDark,
    systemTheme: systemColorScheme,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
