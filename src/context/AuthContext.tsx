import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this should be a hashed password
};

type AuthContextData = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem('@currentUser');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user from storage', error);
      } finally {
        setIsLoading(false);
        setIsAppReady(true);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Get all users
      const usersData = await AsyncStorage.getItem('@users');
      console.log('Stored users data:', usersData); // Debug log
      
      const users: User[] = usersData ? JSON.parse(usersData) : [];
      console.log('Parsed users:', users); // Debug log
      
      // Find user by email (case-insensitive comparison)
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
      
      if (!foundUser) {
        throw new Error('No user found with this email. Please sign up first.');
      }
      
      // In a real app, you would verify the hashed password here
      if (foundUser.password === password) {
        // Set as current user
        await AsyncStorage.setItem('@currentUser', JSON.stringify(foundUser));
        setUser(foundUser);
        console.log('Login successful, user set:', foundUser); // Debug log
      } else {
        throw new Error('Invalid password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Get existing users
      const usersData = await AsyncStorage.getItem('@users');
      console.log('Existing users data:', usersData); // Debug log
      
      const users: User[] = usersData ? JSON.parse(usersData) : [];
      
      // Check if user already exists (case-insensitive comparison)
      const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase().trim());
      if (userExists) {
        throw new Error('A user with this email already exists');
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        email: email.trim().toLowerCase(), // Store email in lowercase
        password, // In a real app, hash this password before storing
      };
      
      // Add new user to users array
      const updatedUsers = [...users, newUser];
      
      // Save users and set as current user
      await AsyncStorage.setItem('@users', JSON.stringify(updatedUsers));
      await AsyncStorage.setItem('@currentUser', JSON.stringify(newUser));
      
      console.log('New user created and logged in:', newUser); // Debug log
      setUser(newUser);
      return Promise.resolve();
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('@currentUser');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!user) return;
      
      const updatedUser = { ...user, ...userData };
      
      // Update current user
      await AsyncStorage.setItem('@currentUser', JSON.stringify(updatedUser));
      
      // Also update in users array
      const usersData = await AsyncStorage.getItem('@users');
      if (usersData) {
        const users: User[] = JSON.parse(usersData);
        const updatedUsers = users.map(u => 
          u.id === user.id ? { ...u, ...userData } : u
        );
        await AsyncStorage.setItem('@users', JSON.stringify(updatedUsers));
      }
      
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
