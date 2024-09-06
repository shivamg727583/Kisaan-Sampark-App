// src/screens/ProductListScreen.js
import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ProductListScreen = ({ navigation }) => {
  // Sample data for products
  const products = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana' },
  ];

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EditProduct', { productId: item.id })}>
      <Text style={styles.productItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={products} 
        renderItem={renderProduct} 
        keyExtractor={(item) => item.id} 
      />
      <Button title="Create Product" onPress={() => navigation.navigate('CreateProduct')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productItem: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default ProductListScreen;
