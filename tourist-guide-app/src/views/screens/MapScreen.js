// MapScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDirections, geocodeLocation } from '../services/mapService';  // Import from mapService
import tailwind from 'tailwind-rn';  // Import tailwind

/**
 * MapScreen component allows users to view their current location on a map,
 * enter a destination, get directions, and view the route on the map.
 *
 * The component requests location permissions, fetches the user's current location,
 * and provides an interface to either input a destination manually or use the current GPS location.
 *
 * @component
 * @example
 * <MapScreen />
 * @returns {React.Element} The rendered MapScreen component.
 */
const MapScreen = () => {
  const [location, setLocation] = useState(null); // User's current location
  const [destination, setDestination] = useState(''); // Destination input
  const [route, setRoute] = useState([]); // Directions/steps route
  const [routesList, setRoutesList] = useState([]); // Store multiple routes

  /**
   * Requests user location permission and fetches the current position.
   * Sets the location in the component state once it's retrieved.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when location is fetched.
   * @throws {Error} If permission is denied or location fetching fails.
   */
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access location was denied.');
        return;
      }

      // Get current position of the user
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    };
    getLocation();
  }, []);

  /**
   * Fetches directions from the map service and updates the routes list and selected route.
   *
   * @async
   * @function
   * @returns {void}
   * @throws {Error} If either location or destination is missing or the directions fetching fails.
   */
  const getDirectionsHandler = async () => {
    if (!location || !destination) {
      Alert.alert('Missing information', 'Please make sure both location and destination are provided.');
      return;
    }

    try {
      const routes = await getDirections(location, destination);
      setRoutesList(routes);

      // Display the first route by default
      const firstRoute = routes[0].legs[0].steps.map(step => ({
        latitude: step.end_location.lat,
        longitude: step.end_location.lng,
      }));
      setRoute(firstRoute);
    } catch (error) {
      Alert.alert('Error', error.message || 'Unable to fetch directions.');
    }
  };

  /**
   * Converts a manually entered destination address to coordinates using geocoding.
   *
   * @async
   * @function
   * @param {string} manualLocation - The address entered by the user.
   * @returns {void}
   * @throws {Error} If geocoding fails, an error is shown.
   */
  const handleManualLocation = async (manualLocation) => {
    try {
      const coordinates = await geocodeLocation(manualLocation);
      setDestination(manualLocation);  // Store the destination address
      setLocation(coordinates);  // Update user's location with the geocoded coordinates
    } catch (error) {
      Alert.alert('Error', `Unable to find location: ${error.message}`);
    }
  };

  return (
    <View style={tailwind('flex-1')}>
      <MapView
        style={tailwind('flex-1')}
        initialRegion={{
          latitude: location ? location.latitude : 37.78825,
          longitude: location ? location.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Show user’s current location */}
        {location && <Marker coordinate={location} title="Your Location" />}

        {/* Show route polyline if available */}
        {route.length > 0 && <Polyline coordinates={route} strokeWidth={6} strokeColor="blue" />}
      </MapView>

      {/* Input for destination */}
      <TextInput
        value={destination}
        onChangeText={setDestination}
        placeholder="Enter destination"
        style={tailwind('h-10 border border-gray-300 m-4 p-2 rounded')}
      />

      {/* Button to fetch directions */}
      <Button title="Get Directions" onPress={getDirectionsHandler} />

      {/* Display Route Options */}
      {routesList.length > 0 && (
        <View style={tailwind('m-4')}>
          <Text style={tailwind('text-lg font-bold mb-2')}>Choose a Route:</Text>
          {routesList.map((route, index) => (
            <Button
              key={index}
              title={`Route ${index + 1}`}
              onPress={() => {
                const routeCoordinates = route.legs[0].steps.map(step => ({
                  latitude: step.end_location.lat,
                  longitude: step.end_location.lng,
                }));
                setRoute(routeCoordinates); // Update map with the selected route
              }}
            />
          ))}
        </View>
      )}

      {/* Show Step-by-Step Directions */}
      {routesList.length > 0 && (
        <View style={tailwind('m-4')}>
          <Text style={tailwind('text-lg font-bold mb-2')}>Step-by-Step Directions:</Text>
          {routesList[0].legs[0].steps.map((step, index) => (
            <View key={index} style={tailwind('mb-2')}>
              <Text>{step.html_instructions.replace(/<[^>]+>/g, '')}</Text> {/* Remove HTML tags */}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default MapScreen;
