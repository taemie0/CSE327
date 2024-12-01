// src/models/locationModel.js
import * as Location from 'expo-location';

// Helper function to get the current location
export async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return null;
  }

  let location = await Location.getCurrentPositionAsync({});
  return location; // Return the location object
}
