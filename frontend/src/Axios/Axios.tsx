import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage to manage token storage

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token to every request
instance.interceptors.request.use(
  async (config) => {
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the token in the Authorization header
    }
    return config;
  },
  (error) => {
    // Handle errors in the request setup
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors in the response
    if (error.response && error.response.status === 401) {
      // Token might be invalid or expired, handle re-authentication here
      console.log('Unauthorized - Please login again.');
      // Optionally, you could redirect to a login page or trigger logout logic
    }
    return Promise.reject(error);
  }
);

export default instance;
