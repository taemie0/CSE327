import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// --- VIEW ---

/**
 * Login component allowing users to input their email and password to log in.
 * If fields are empty, displays an error message.
 * Upon successful login, an alert is shown.
 * @param {Object} props - The component props.
 * @param {Object} props.navigation - The navigation object to navigate to other screens.
 * @returns {JSX.Element} - A React component rendering the login form and logic.
 */
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- CONTROLLER ---

  /**
   * Handles the login logic. Checks if email and password fields are filled.
   * If so, displays a success alert. Otherwise, shows an error alert.
   * @returns {void}
   */
  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    // Handle login logic (e.g., API call) here
    Alert.alert('Success', 'Login successful!');
  };

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Text, { style: styles.headerText }, 'Tourist Guide App'), // Added the app name here
    React.createElement(Text, { style: styles.title }, 'Login'),
    React.createElement(TextInput, {
      style: styles.input,
      placeholder: 'Email',
      value: email,
      onChangeText: setEmail,
      keyboardType: 'email-address',
    }),
    React.createElement(TextInput, {
      style: styles.input,
      placeholder: 'Password',
      value: password,
      onChangeText: setPassword,
      secureTextEntry: true,
    }),
    React.createElement(
      TouchableOpacity,
      { style: styles.button, onPress: handleLogin },
      React.createElement(Text, { style: styles.buttonText }, 'Login')
    ),
    React.createElement(
      Text,
      { style: styles.signupText },
      "Don't have an account? ",
      React.createElement(
        Text,
        {
          style: styles.link,
          onPress: () => navigation.navigate('Signup'),
        },
        'Sign up'
      )
    )
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'red', // Set background to red
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40, // Spacing from the title
    color: '#fff', // White text for the header
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
  link: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default Login;
