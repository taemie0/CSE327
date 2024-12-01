import "./global.css";
import { Text ,View,ActivityIndicator} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/views/Navigations/TabNavigation';
import { useState, useEffect, useContext, lazy } from 'react';
import { UserLocationContext } from './src/views/context/userLocationContext';
import { fetchUserLocation } from './src/controllers/userLocationController';  // Import Controller

export default function App() {
  const [location, setLocation] = useState(null);  // Local state for location
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);  // Track if location is loaded

  useEffect(() => {
    const getLocation = async () => {
      const loc = await fetchUserLocation();  // Fetch the location from the controller
      if (loc) {
        setLocation(loc);  // Set the location in local state
        setIsLocationLoaded(true);  // Set loading state to true once location is fetched
      } else {
        console.log("Unable to fetch location");
      }
    };
    getLocation();  // Fetch location once when the component mounts
  }, []);  // Empty dependency array ensures the effect runs only once


  // Show loading until location is fetched
  if (!isLocationLoaded || !location) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#00f" />
        <Text className="text-xl font-semibold text-gray-700 mt-4">Loading...</Text>
      </View>
    );  // Center the loading text with spinner // Show a loading message while waiting for the location
  }

  // View renders Navigation container
  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </UserLocationContext.Provider>
  );
}
