/**
 * App.js
 * 
 * This is the main entry point for the app. It handles the following:
 * - Fetching the user's location when the app is first loaded.
 * - Showing a loading screen while fetching the location.
 * - Handling the state of the location and updating it in the context.
 * - Rendering the navigation container with a bottom tab navigator once the location is loaded.
 * 
 * Dependencies:
 * - React, React Native components
 * - Navigation components from `@react-navigation/native`
 * - Custom context for managing user location (`UserLocationContext`)
 * - Controller for fetching user location (`fetchUserLocation`)
 * 
 * @component
 */

import "./global.css"; // Global styles
import { Text, View, ActivityIndicator } from "react-native"; // React Native UI components
import { NavigationContainer } from '@react-navigation/native'; // For navigation
import TabNavigation from './src/views/Navigations/TabNavigation'; // Main Tab Navigation
import { useState, useEffect, useContext } from 'react'; // React hooks
import { UserLocationContext } from './src/views/context/userLocationContext'; // Custom context for location
import { fetchUserLocation } from './src/controllers/userLocationController';  // Controller to fetch location

/**
 * Main App component
 * 
 * This component fetches the user's location and provides it via context. It shows a loading spinner
 * while the location is being fetched, and renders the main app navigation once the location is ready.
 * 
 * @returns {JSX.Element} - App Component
 */
export default function App() {
  const [location, setLocation] = useState(null);  // Local state to store user's location
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);  // Track if location is loaded

  /**
   * useEffect hook to fetch the user's location when the component is mounted.
   * Once the location is fetched, it updates the state and triggers the re-render.
   */
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

  /**
   * If the location is not yet loaded, show a loading spinner and message.
   * Otherwise, show the app's main navigation.
   */
  if (!isLocationLoaded || !location) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#00f" />
        <Text className="text-xl font-semibold text-gray-700 mt-4">Loading...</Text>
      </View>
    );  // Center the loading text with spinner while waiting for the location
  }

  /**
   * Once location is loaded, render the main navigation wrapped inside the context provider
   * to share the user's location across the app.
   */
  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </UserLocationContext.Provider>
  );
}
