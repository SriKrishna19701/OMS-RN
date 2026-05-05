import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user: userData } = response.data;
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.error('Error response data:', error.response.data);
        return { success: false, message: error.response.data.message || 'Server error' };
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Error request:', error.request);
        return { success: false, message: 'Network error. Please check if the backend is running and ADB reverse is set up.' };
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
        return { success: false, message: error.message || 'An error occurred' };
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};