// src/screens/EditProductScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const EditProductScreen = ({ route, navigation }) => {
  const { productId } = route.params;

  // Fetch product details using productId
  useEffect(() => {
    // Simulated fetch - replace with real fetch logic
    const fetchedProduct = { name: 'Sample Product', price: '10', description: 'Sample description' };
    setProductName(fetchedProduct.name);
    setProductPrice(fetchedProduct.price);
    setProductDescription(fetchedProduct.description);
  }, [productId]);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleEditProduct = () => {
    // Logic to update the product
    console.log('Product updated:', { productName, productPrice, productDescription });
    navigation.goBack(); // Navigate back to the Product List after editing
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        value={productDescription}
        onChangeText={setProductDescription}
      />
      <Button title="Save Changes" onPress={handleEditProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default EditProductScreen;
