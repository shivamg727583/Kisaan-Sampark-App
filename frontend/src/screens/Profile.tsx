import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Nav from "../components/Nav";
import { useAuth } from "../Auth/Authcontext";
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  console.log(user)
  // Check if user is available
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User data is not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <MaterialIcons name="person" size={130} color={"white"} style={styles.profileImage} />
        <Text style={styles.profileName}>{user.name || "No Name"}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Email</Text>
          <Text style={styles.detailsValue}>{user.email || "No Email"}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Location</Text>
          <Text style={styles.detailsValue}>{user.farmLocation || "No Address"}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Phone</Text>
          <Text style={styles.detailsValue}>(+91){user.mobile || 'NA'}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={()=>{
            navigation.navigate('ProfileUpdate')
          }} >Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={async () => {
  try {
    await logout(); // Assuming logout is an async function
    navigation.navigate('Welcome'); 
  } catch (error) {
    console.error("Logout failed:", error);
  }
}}>
  <Text style={styles.buttonText}>Logout</Text>
</TouchableOpacity>

      </View>
      <Nav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#444',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  detailsValue: {
    fontSize: 16,
    color: "#444",
  },
  button: {
    backgroundColor: "#33c37d",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  logoutBtn: {
    backgroundColor: "red",
    marginTop: 30,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
