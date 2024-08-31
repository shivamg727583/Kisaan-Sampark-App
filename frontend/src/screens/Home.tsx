import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import categoriesData from "../data/categoriesData";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Nav from "../components/Nav";
import { useAuth } from "../Auth/Authcontext";

export default function Home({ navigation }) {
  const [search, setSearch] = useState("");
  const { user, logout } = useAuth(); 
  console.log(user)

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.subTitle}>Categories</Text>
        <View style={styles.body}>
          {categoriesData.map((data) => (
            <CategoryItem key={data.id} data={data} navigation={navigation} />
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Products")}
        >
          <Text style={styles.buttonText}>View All</Text>
        </TouchableOpacity>
      </View>
      <Nav navigation={navigation} />
    </View>
  );
}

function CategoryItem({ data, navigation }) {
  return (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => navigation.navigate("Products")}
    >
      <Image style={styles.categoryIcon} source={data.image} />
      <Text style={styles.categoryText}>{data.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderColor: "#ccc",
    borderRadius: 50,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    width: "80%",
  },
  body: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#35C759",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "85%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
