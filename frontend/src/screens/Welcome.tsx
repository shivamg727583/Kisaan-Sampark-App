import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { Logo } from "../../assets"; // Ensure this path is correct
import { useAuth } from "../Auth/Authcontext";

export default function Welcome({ navigation }) {
  const [isLogin, setIsLogin] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    }
  }, [user, navigation]);

  return (
    <View style={styles.wrapper}>
      <Image source={Logo} style={styles.img} />
      <View style={styles.container}>
        {!isLogin ? (
          <View style={styles.signup}>
            <TouchableOpacity onPress={() => setIsLogin(true)}>
              <Text style={styles.signupTitle}>Sign Up</Text>
            </TouchableOpacity>
            <Signup />
          </View>
        ) : (
          <View style={styles.login}>
            <TouchableOpacity onPress={() => setIsLogin(false)}>
              <Text style={styles.loginTitle}>Login</Text>
            </TouchableOpacity>
            <Login />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0", // Add a background color for better visibility
  },
  img: {
    width: 200,
    height: 200,
    marginBottom: 20, // Adds space between the image and the form
  },
  container: {
    width: "100%",
    paddingHorizontal: 20, // Padding on sides for better alignment
    alignItems: "center",
  },
  signup: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  login: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  signupTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
});
