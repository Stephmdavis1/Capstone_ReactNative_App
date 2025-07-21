import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import colors from '../constants/colors';
import { fonts } from '../constants/fonts';


const Profile = () => {
  const { state, authActions } = useAuth();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    isNotiChecked: false
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (name, value) => {
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await AsyncStorage.getItem('profile');
      const storedImage = await AsyncStorage.getItem('imageUri');

      if (storedProfile) { 
        setProfile(JSON.parse(storedProfile))
        
      };

      if (storedImage) {
        setImage(storedImage)
      };

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert("Sorry, we need camera roll permissions to make this work!");
      }

    };
    loadProfile();
  }, []);

  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : '';
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {

        const uri = result.assets[0].uri; // Access URI from the first asset
        setImage(uri);
        
    } else {
        // Log different scenarios for debugging
        if (result.cancelled) {
            console.log("Image picking was canceled.");
        } else if (!result.assets || result.assets.length === 0) {
            console.log("No assets found in the result.");
        } else {
            console.log("An unexpected scenario occurred.");
        }
    }
  };

  const saveProfile = async () => {
    await AsyncStorage.setItem('profile', JSON.stringify(profile));
    await AsyncStorage.setItem('imageUri', image);
    alert('Profile saved successfully!');
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        {image ? 
          (<Image source={{ uri: image }} style={styles.image} />) : (
          (<View style={styles.initialsPlaceholder}>
            <Text style={styles.initialsText}>{getInitials(profile.name)}</Text>
          </View>)
        )}
        <TouchableOpacity style={[styles.button, styles.pickImageButton]} onPress={pickImage}>
          <Text style={styles.buttonImageText}>Pick an Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          value={profile.name}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholder="Enter name"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          value={profile.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholder="Enter email"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Phone Number</Text>
        <MaskedTextInput
          mask="(999) 999-9999"
          value={profile.phoneNumber}
          onChangeText={(text) => handleInputChange('phoneNumber', text)}
          style={styles.input}
          placeholder="(123) 456 7890"
          keyboardType="numeric"
        />
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Subscribe to Notifications </Text>
          <Checkbox
            style={styles.checkbox}
            value={profile.isNotiChecked}
            onValueChange={(value) => handleInputChange('isNotiChecked', value)}
            color={profile.isNotiChecked ? colors.primaryGreen : undefined}
          />
        </View>
      </View>  

        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={saveProfile}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={authActions.logout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    backgroundColor: colors.backgroundOnboarding,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  initialsPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 50,
    color: '#000',
    fontFamily: fonts.bold,
  },
  section: {
    marginTop: 0,
  },
  inputLabel: {
    fontSize: 20,
    fontFamily: fonts.karla.bold,
    color: colors.textLight,
  },
  input: {
    fontSize: 16,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom: 20,
    backgroundColor: colors.background,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginLeft: 10,
    borderColor: "#ccc"
  },
  checkboxLabel: {
    fontSize: 18,
    fontFamily: fonts.karla.bold,
    color: "#ccc",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: colors.backgroundOnboarding,
    fontFamily: fonts.karla.bold,
    fontSize: 18,
  },
  buttonImageText: {
    color: colors.text,
    fontFamily: fonts.karla.bold,
    fontSize: 18,
  },
  pickImageButton: {
    backgroundColor: colors.primaryYellow,
  },
  saveButton: {
    backgroundColor: colors.primaryYellow,
  },
  logoutButton: {
    backgroundColor: colors.background,
  },

});


export default Profile;
