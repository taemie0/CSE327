import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import CheckBox from "@react-native-community/checkbox"; // Import checkbox

const AlertPreferences = ({ route }) => {
  // Retrieve email and location from the route params passed from Dashboard
  const { email, location } = route.params;

  const [weather, setWeather] = useState(null); // Weather data
  const [error, setError] = useState(null); // Error handling
  const [alerts, setAlerts] = useState({
    // Weather alert preferences
    weatherChange: false,
    highTemp: false,
    rain: false,
  });

  const apiKey = "YOUR_API_KEY"; // Replace with your WeatherAPI key

  // Fetch weather data for the given location when component mounts or location changes
  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) {
        Alert.alert("Please enter a location");
        return;
      }

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
        );
        const data = await response.json();

        if (response.ok) {
          setWeather(data);
        } else {
          setError(data.error.message || "Error fetching weather data");
        }
      } catch (err) {
        setError("Failed to fetch weather data");
      }
    };

    fetchWeather();
  }, [location]); // Re-fetch weather data if location changes

  // Handle change in alert preferences
  const handleAlertChange = (alertType) => {
    setAlerts((prevState) => ({
      ...prevState,
      [alertType]: !prevState[alertType],
    }));
  };

  // Handle form submission and show selected preferences
  const handleSavePreferences = () => {
    if (!weather) {
      Alert.alert("Please fetch weather data first.");
      return;
    }

    const selectedAlerts = [];
    if (alerts.weatherChange) selectedAlerts.push("Weather Change");
    if (alerts.highTemp) selectedAlerts.push("High Temperature Alert");
    if (alerts.rain) selectedAlerts.push("Rain Alert");

    if (selectedAlerts.length === 0) {
      Alert.alert("No alerts selected");
      return;
    }

    // For demonstration, alert the selected preferences
    Alert.alert(
      "Alert Preferences Saved",
      `Alerts: ${selectedAlerts.join(", ")}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome {email}</Text>{" "}
      {/* Show the user's email */}
      {/* Location Input */}
      <Text style={styles.locationText}>Location: {location}</Text>
      {/* Weather data */}
      {error && <Text style={styles.error}>{error}</Text>}
      {weather && (
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherText}>
            Location: {weather.location.name}
          </Text>
          <Text style={styles.weatherText}>
            Temperature: {weather.current.temp_c}°C
          </Text>
          <Text style={styles.weatherText}>
            Condition: {weather.current.condition.text}
          </Text>
        </View>
      )}
      {/* Alert Preferences */}
      <View style={styles.alertSection}>
        <Text style={styles.alertTitle}>Alert Preferences</Text>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={alerts.weatherChange}
            onValueChange={() => handleAlertChange("weatherChange")}
          />
          <Text style={styles.checkboxText}>Weather Change</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={alerts.highTemp}
            onValueChange={() => handleAlertChange("highTemp")}
          />
          <Text style={styles.checkboxText}>High Temperature Alert</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={alerts.rain}
            onValueChange={() => handleAlertChange("rain")}
          />
          <Text style={styles.checkboxText}>Rain Alert</Text>
        </View>

        <Button title="Save Preferences" onPress={handleSavePreferences} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "red",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  locationText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
  },
  weatherInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  weatherText: {
    fontSize: 18,
    color: "#333",
  },
  alertSection: {
    marginTop: 30,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  alertTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 18,
  },
});

export default AlertPreferences;
