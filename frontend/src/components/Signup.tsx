import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from '../Axios/Axios';
import { Picker } from '@react-native-picker/picker';
import Message from './Message';
import { useNavigation } from "@react-navigation/native";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [details, setDetails] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigation = useNavigation();

  const handleSignup = async () => {
    setMessage("");
    setMessageType("");

    if (!name || !email || !password || (userType === 'farmer' && (!details || !address))) {
      setMessageType("error");
      setMessage("Please fill in all fields");
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setMessageType("error");
      setMessage("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setMessageType("error");
      setMessage("Password must be at least 6 characters long");
      return;
    }

    if (userType === 'farmer' && address.length < 10) {
      setMessageType("error");
      setMessage("Address must be at least 10 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/auth/signup', {
        name,
        email,
        password,
        userType,
        ...(userType === 'farmer' && { details, address })
      });

      setMessageType("success");
      setMessage(response.data.message);

      
      // Navigate to the login page after successful signup
      navigation.navigate("Login"); 

    } catch (error) {
      console.error("Signup error:", error);
      setMessageType("error");
      setMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {message ? <Message message={message} type={messageType} /> : null}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        accessible={true}
        accessibilityLabel="Name input field"
      />
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
        placeholder="Enter your password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessible={true}
        accessibilityLabel="Password input field"
      />
      <Picker
        selectedValue={userType}
        style={styles.picker}
        onValueChange={(itemValue) => setUserType(itemValue)}
      >
        <Picker.Item label="User" value="user" />
        <Picker.Item label="Farmer" value="farmer" />
      </Picker>
      {userType === 'farmer' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Farmer details"
            placeholderTextColor="#999"
            value={details}
            onChangeText={setDetails}
            accessible={true}
            accessibilityLabel="Details input field"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            placeholderTextColor="#999"
            value={address}
            onChangeText={setAddress}
            accessible={true}
            accessibilityLabel="Address input field"
          />
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
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
  picker: {
    width: "80%",
    height: 50,
    marginBottom: 15,
  },
  button: {
    width: "80%",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
