// src/models/locationModel.js
import * as Location from 'expo-location';

/**
 * Helper function to get the current location of the user.
 * Requests permission to access the device's location and returns the location if granted.
 * @async
 * @function getCurrentLocation
 * @returns {Object|null} The location object containing coordinates if permission is granted, or null if permission is denied.
 * @throws {Error} Logs an error message to the console if the location permission is denied or fetching the location fails.
 */

export async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return null;
  }

  let location = await Location.getCurrentPositionAsync({});
  return location; // Return the location object
}
