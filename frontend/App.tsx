// AppNavigator.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/screens/Welcome';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
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
import ProductCreate from './src/Products/CreateProductScreen';
import ProductUpload from './src/Products/EditProductScreen'; 
import UserProducts from './src/Products/ProductListScreen';
import { AuthProvider, useAuth } from './src/Auth/Authcontext';

const Stack = createStackNavigator();

function AppNavigator() {
  const { user, userType } = useAuth(); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    checkUserAuth();
  }, []);

  if (isLoading) {
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
        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                headerTitle: "किसान Sampark",
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
                    <MaterialIcons name="support-agent" size={24} color={"#fff"} style={styles.contact} />
                  </TouchableOpacity>
                ),
              })}
            />
            {userType === 'farmer' && (
              <>
                <Stack.Screen name="ProductCreate" component={ProductCreate} />
                <Stack.Screen name="ProductUpload" component={ProductUpload} />
                <Stack.Screen name="UserProducts" component={UserProducts} />
                <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
              </>
            )}
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
    <AuthProvider>
      <AppNavigator />
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
