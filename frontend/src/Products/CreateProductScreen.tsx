import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';

import { useAuth } from '../Auth/Authcontext'; 
import api from '../Axios/Axios'; 
import Message from '../components/Message'; 

export default function CreateProduct({ navigation }: { navigation: any }) {
  const { user, token } = useAuth(); // Get the current user context (farmer)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [imageUrl, setImageUrl] = useState(null); // Store the image URI
  const [message, setMessage] = useState(''); // Message to display
  const [messageType, setMessageType] = useState(''); // Type of message ('success' or 'error')
  const [loading, setLoading] = useState(false);

  // Function to request image picker permissions and pick an image from the device
  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri;
        console.log('Selected photo URI:', source);
        setImageUrl(source); // Set URI directly
      }
    });
  };
  
  

  const handleSubmit = async () => {
    if (!name || !category || !price || !details) {
      setMessage('All fields are required!');
      setMessageType('error');
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('details', details);
    formData.append('farmer', user._id);
  
    if (imageUrl) {
      formData.append('imageUrl', {
        uri: imageUrl,
        name: 'product.jpg', // Adjust filename and extension as needed
        type: 'image/jpeg',  // Adjust MIME type if using a different format
      });
    }
  
    try {
      const response = await api.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        setMessage('Product created successfully');
        setMessageType('success');
        setTimeout(() => {
          navigation.navigate('Home');
        }, 1000);
      } else {
        setMessage(response.data.message || 'Failed to create product');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Create product error:', error);
      setMessage('An error occurred while creating the product');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <View style={styles.container}>
      {message ? <Message message={message} type={messageType} /> : null}

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter product name"
      />

      <Text style={styles.label}>Category:</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
        placeholder="Enter price"
      />

      <Text style={styles.label}>Details:</Text>
      <TextInput
        style={styles.input}
        value={details}
        onChangeText={setDetails}
        placeholder="Enter product details"
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Image:</Text>
      <TouchableOpacity onPress={handleChoosePhoto} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Pick an image</Text>
      </TouchableOpacity>

      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : null}
      

      <Button title="Create Product" onPress={handleSubmit} disabled={loading} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  imagePicker: {
    width: '80%',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 16,
    borderRadius: 4,
  },
});
