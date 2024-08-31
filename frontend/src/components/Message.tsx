import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the message after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3000 milliseconds = 3 seconds

    // Clean up the timer if the component unmounts before 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <View style={[styles.container, type === 'success' ? styles.success : styles.error]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  success: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
  },
  error: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default Message;
