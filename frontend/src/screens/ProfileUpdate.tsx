import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../Axios/Axios'; // Ensure this imports your updated Axios instance
import * as ImagePicker from 'react-native-image-picker';
import { useAuth } from '../Auth/Authcontext';

const EditProfile = ({ navigation }: any) => {
  const { user, token, setUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [details, setDetails] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [profilePic, setProfilePic] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setMobile(user.mobile || '');
      setDetails(user.details || '');
      setFarmLocation(user.farmLocation || '');
      setProfilePic(user.profilePic && `data:image/jpeg;base64,${user.profilePic}`); // Convert base64 to uri
    }
  }, [user]);

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setProfilePic(source);
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('details', details);
    formData.append('farmLocation', farmLocation);

    if (profilePic) {
      formData.append('profilePic', {
        uri: profilePic.uri,
        name: 'profile.jpg', // You can use a more dynamic name if available
        type: 'image/jpeg',  // Adjust if using different image formats
      });
    }

    try {
      const response = await axios.put(`/auth/profile/update/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Ensure this is the correct token
        },
      });
      console.log('Profile updated:', response.data);
      setUser(response.data.user); // Update user in context
      navigation.goBack(); // Navigate back after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />

      <Text style={styles.label}>Mobile</Text>
      <TextInput style={styles.input} value={mobile} onChangeText={setMobile} placeholder="Enter your mobile number" keyboardType="phone-pad" />

      <Text style={styles.label}>Details</Text>
      <TextInput style={styles.input} value={details} onChangeText={setDetails} placeholder="Enter details" />

      <Text style={styles.label}>Farm Location</Text>
      <TextInput style={styles.input} value={farmLocation} onChangeText={setFarmLocation} placeholder="Enter farm location" />

      <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
        <Text style={styles.buttonText}>Choose Photo</Text>
      </TouchableOpacity>

      {profilePic && <Image source={{ uri: profilePic }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update Profile'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default EditProfile;
