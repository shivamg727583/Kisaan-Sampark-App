import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedToken = await AsyncStorage.getItem('token');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to load auth data from AsyncStorage", error);
      }
    };

    loadAuthData();
  }, []);

  // Derive userType from user object
  const userType = user?.userType;

  const login = async (userData, token) => {
    try {
      setUser(userData);
      setToken(token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error("Failed to save auth data to AsyncStorage", error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error("Failed to remove auth data from AsyncStorage", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, userType, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
