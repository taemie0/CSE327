import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

// --- VIEW ---

/**
 * View component for setting weather alert preferences.
 * Allows users to input their email, location, and preferences for weather alerts.
 * Displays loading indicators and error messages as needed.
 * @returns {JSX.Element} - A React component to manage alert preferences input.
 */
const SetAlertPreferences = () => {
  // State variables for user input and app status
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState(""); // Example: "Sudden weather changes"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- CONTROLLER ---

  /**
   * Handles the saving of user preferences. Sends a POST request to the backend API
   * to save email, location, and preferences. Displays error or success alerts.
   * @returns {Promise<void>} - A promise that resolves when the preferences are saved.
   */
  const handleSavePreferences = async () => {
    if (!email || !location || !preferences) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Call the backend API to save preferences
      const response = await fetch("http://localhost:3000/savePreferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, location, preferences }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Your preferences have been saved.");
        setEmail("");
        setLocation("");
        setPreferences("");
      } else {
        throw new Error(data.error || "Failed to save preferences.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Weather Alert Preferences</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Location Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter location (e.g., city name)"
        value={location}
        onChangeText={setLocation}
      />

      {/* Preferences Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your alert preferences (e.g., sudden weather changes)"
        value={preferences}
        onChangeText={setPreferences}
      />

      {/* Save Preferences Button */}
      <Button title="Save Preferences" onPress={handleSavePreferences} />

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Error Message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default SetAlertPreferences;
