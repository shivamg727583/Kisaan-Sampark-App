import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "../Axios/Axios"; // Import axios for making API requests
import Message from './Message'; // Import the Message component
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../Auth/Authcontext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to handle loading
  const [message, setMessage] = useState(""); // For displaying messages
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const navigation = useNavigation();

  const handleLogin = async () => {
    setMessage(""); // Clear previous messages
    setMessageType("");

    // Check for empty fields
    if (!email || !password) {
      setMessageType("error");
      setMessage("Please fill in all fields");
      return;
    }

    // Basic email format validation
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setMessageType("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setLoading(true); // Set loading to true before making the request

    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
      });

      if (response) {
        setEmail('');
        setPassword('');
        setMessageType("success");
        setMessage("Login successful");
        const userData = response.data.user;
        const token = response.data.token;
    
        login(userData,token); // Call the login function from the auth context

        navigation.navigate('Home');
      }

    } catch (error) {
      console.error("Login error:", error);
      setMessageType("error");
      setMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  return (
    <View style={styles.container}>
      {/* Display message if exists */}
      {message ? <Message message={message} type={messageType} /> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        accessible={true}
        accessibilityLabel="Email input field"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessible={true}
        accessibilityLabel="Password input field"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#f5f5f5", // Light background color for better readability
  },
  input: {
    width: "80%",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 15,
  },
  button: {
    width: "80%",
    backgroundColor: "#4CAF50", // Changed to a more vibrant color
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
