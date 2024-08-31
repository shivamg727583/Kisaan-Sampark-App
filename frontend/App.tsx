import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/screens/Welcome';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash'; // Import the Splash screen
import ProductDetail from './src/screens/ProductDetail';
import ProfileUpdate from './src/screens/ProfileUpdate';
import Cart from './src/screens/Cart';
import Payment from './src/screens/Payment';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Contact from './src/screens/Contact';
import Products from './src/screens/Products';
import Profile from './src/screens/Profile';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import { AuthProvider, useAuth } from './src/Auth/Authcontext'; // Ensure useAuth is imported correctly

const Stack = createStackNavigator();

function AppNavigator() {
  const { user } = useAuth(); // Move the useAuth hook inside a component that is a child of AuthProvider
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Simulate a loading process, e.g., fetching user status or checking async storage
    const checkUserAuth = async () => {
      setTimeout(() => { // Simulate a delay for loading the splash screen
        setIsLoading(false); // Set loading to false after checking user auth
      }, 2000); // Change this time as per your requirement or actual loading process
    };

    checkUserAuth();
  }, []);

  if (isLoading) {
    // Show Splash screen while loading
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#ddd" barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#EFEFEF",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {!user ? ( // If user is not logged in, show Welcome
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : ( // If user is logged in, show Home and other screens
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                headerTitle: "किसान Sampark",
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
                    <MaterialIcons
                      name="support-agent"
                      size={24}
                      color={"#fff"}
                      style={styles.contact}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider> {/* AuthProvider is now the top-level provider */}
      <AppNavigator /> {/* AppNavigator is wrapped by AuthProvider */}
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  contact: {
    marginRight: 20,
    padding: 4,
    backgroundColor: "#35C759",
    borderRadius: 9999,
  },
});
