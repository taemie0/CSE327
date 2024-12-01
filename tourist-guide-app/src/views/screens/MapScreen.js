import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDirections, geocodeLocation } from '../services/mapService';  // Import from mapService
import tailwind from 'tailwind-rn';  // Import tailwind

const MapScreen = () => {
  const [location, setLocation] = useState(null); // User's current location
  const [destination, setDestination] = useState(''); // Destination input
  const [route, setRoute] = useState([]); // Directions/steps route
  const [routesList, setRoutesList] = useState([]); // Store multiple routes

  // Request user location permission and get current position
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

  // Get Directions from mapService
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

  // Convert the destination address to coordinates
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
