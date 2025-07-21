import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { validateEmail, validateName } from '../utils/validation.js'
import { useAuth } from '../contexts/AuthContext';
import colors from '../constants/colors';
import { fonts } from '../constants/fonts';

const Onboarding = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const { authActions } = useAuth();

  const handleNameChange = text => {
    setName(text);
    setIsValid(validateName(text) && validateEmail(email));
  };

  const handleEmailChange = text => {
    setEmail(text);
    setIsValid(validateName(name) && validateEmail(text));
  };

  const handlePress = async () => {
    // call onboard function from AUthContext with name and email
    await authActions.onboard({ name, email });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
          <Image
            source={require('../assets/Logo.png')}
            style={styles.logo}
            accessible={true}
            accessibilityLabel={"Little Lemon Logo"}
          />

          <Image
            source={require('../assets/restaurant.jpg')}
            style={styles.restaurantImage}
            accessible={true}
            accessibilityLabel={"Restaurant Logo"}
          />

<Text style={styles.welcomeText}>
              Welcome to Little Lemon Restaurant !
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput
                placeholder="Enter your name"
                value={name}
                onChangeText={handleNameChange}
                style={styles.input}
            />

            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize='none'
                style={styles.input}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handlePress}
                disabled={!isValid}
                style={isValid ? styles.enabled : styles.disabled}
            >
                <Text style={isValid ? styles.textEnabled : styles.textDisabled}>Next</Text>
            </TouchableOpacity >
          </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
    backgroundColor: colors.background,
  },
  logo: {
    width: "70%",
    height: 80,
    resizeMode: 'contain',
    marginTop: 10,
  },
  restaurantImage: {
    width: "100%",
      height: 300,
      borderRadius: 20,
      marginBottom: 20,
      marginTop: 20,
  },
  welcomeText: {
    fontSize: 25,
      textAlign: 'center',
      marginBottom: 25,
      fontFamily: fonts.karla.bold,
      color: colors.textDark,
  },
  inputContainer: {
    width: '100%',
  },
  inputTitle: {
    fontSize: 16,
    fontFamily: fonts.karla.extraBoldItalic,
    color: colors.textDark,
  },
  input: {
    fontSize: 16,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom: 20,
    borderColor: colors.primaryYellow,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  enabled: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.backgroundOnboarding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.backgroundOnboarding,
    borderColor: colors.backgroundOnboarding,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEnabled: {
    fontSize: 18,
    fontFamily: fonts.karla.bold,
    color: colors.background,
  },
  textDisabled: {
    fontSize: 18,
    fontFamily: fonts.karla.bold,
    color: colors.text, 
  },
});

export default Onboarding;
