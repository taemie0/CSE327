import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

// Dashboard Screen
const Dashboard = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const handleAlertPreferences = () => {
    if (email === "" || location === "") {
      Alert.alert("Error", "Please fill in both email and location");
      return;
    }
    // Navigate to Alert Preferences screen
    navigation.navigate("AlertPreferences", { email, location });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Travel Dashboard</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      {/* Location Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={location}
        onChangeText={setLocation}
      />

      {/* Button to configure alert preferences */}
      <TouchableOpacity style={styles.button} onPress={handleAlertPreferences}>
        <Text style={styles.buttonText}>Alert Preferences</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24, // Adjust font size for smaller screens
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
    textAlign: "center", // Center the text
  },
  input: {
    width: "90%", // Use percentage instead of fixed width
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    width: "90%", // Use percentage for button width
    padding: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Dashboard;
