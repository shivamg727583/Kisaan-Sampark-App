import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Function to initialize auth state from AsyncStorage
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user'); // Retrieve stored user data
        const storedToken = await AsyncStorage.getItem('token'); // Retrieve stored token
        
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Parse and set user data
        }
        if (storedToken) {
          setToken(storedToken); // Set token in state
        }
      } catch (error) {
        console.error("Failed to load auth data from AsyncStorage", error);
      }
    };

    loadAuthData();
  }, []);

  // Login function
  const login = async (userData, token) => {
    try {
      setUser(userData); // Set user data in state
      setToken(token); // Set token in state
      await AsyncStorage.setItem('user', JSON.stringify(userData)); // Save user data to AsyncStorage
      await AsyncStorage.setItem('token', token); // Save token to AsyncStorage
    } catch (error) {
      console.error("Failed to save auth data to AsyncStorage", error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setUser(null); // Clear user data from state
      setToken(null); // Clear token from state
      await AsyncStorage.removeItem('user'); // Remove user data from AsyncStorage
      await AsyncStorage.removeItem('token'); // Remove token from AsyncStorage
    } catch (error) {
      console.error("Failed to remove auth data from AsyncStorage", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
