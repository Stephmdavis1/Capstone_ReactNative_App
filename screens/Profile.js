import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const { state, authActions } = useAuth();

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const loadData = async () => {
    const storedProfile = await AsyncStorage.getItem('profile');
    const storedImage = await AsyncStorage.getItem('imageUri');
    if (storedProfile) setProfile(JSON.parse(storedProfile));
    if (storedImage) setImage(storedImage);
  };

  useEffect(() => {
    loadData();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.cancelled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const saveProfile = async () => {
    await AsyncStorage.setItem('profile', JSON.stringify(profile));
    if (image) await AsyncStorage.setItem('imageUri', image);
    alert('Changes saved!');
  };

  const discardChanges = () => {
    loadData();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Personal information</Text>

      {/* Avatar Section */}
      <View style={styles.avatarRow}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={60} color="#999" />
          </View>
        )}
        <View style={styles.avatarButtons}>
          <TouchableOpacity style={styles.changeButton} onPress={pickImage}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Fields */}
      <Text style={styles.label}>First name</Text>
      <TextInput
        value={profile.firstName}
        style={styles.input}
        onChangeText={(text) => handleInputChange('firstName', text)}
      />

      <Text style={styles.label}>Last name</Text>
      <TextInput
        value={profile.lastName}
        style={styles.input}
        onChangeText={(text) => handleInputChange('lastName', text)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={profile.email}
        style={styles.input}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone number</Text>
      <MaskedTextInput
        style={styles.input}
        mask="(999) 999-9999"
        value={profile.phoneNumber}
        onChangeText={(text) => handleInputChange('phoneNumber', text)}
        keyboardType="phone-pad"
      />

      {/* Email Notifications */}
      <Text style={styles.sectionTitle}>Email notifications</Text>

      {[
        { key: 'orderStatuses', label: 'Order statuses' },
        { key: 'passwordChanges', label: 'Password changes' },
        { key: 'specialOffers', label: 'Special offers' },
        { key: 'newsletter', label: 'Newsletter' },
      ].map(({ key, label }) => (
        <View key={key} style={styles.checkboxRow}>
          <Checkbox
            value={profile[key]}
            onValueChange={(val) => handleInputChange(key, val)}
            color={profile[key] ? colors.primaryGreen : undefined}
          />
          <Text style={styles.checkboxLabel}>{label}</Text>
        </View>
      ))}

      {/* Buttons */}
      <TouchableOpacity style={styles.logoutButton} onPress={authActions.logout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>

      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.discardButton} onPress={discardChanges}>
          <Text style={styles.discardText}>Discard changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarButtons: {
    marginLeft: 20,
  },
  changeButton: {
    backgroundColor: colors.backgroundOnboarding,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  changeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  removeButton: {
    borderColor: '#aaa',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: colors.primaryYellow,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 20,
  },
  logoutButtonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discardButton: {
    borderColor: colors.text,
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  discardText: {
    color: colors.text,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.backgroundOnboarding,
    padding: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Profile;