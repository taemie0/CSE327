// src/controllers/userLocationController.js
import { getCurrentLocation } from '../models/userLocationModel';  // Import the Model

/**
 * Fetches the user's current location using the `getCurrentLocation` model function.
 * @async
 * @function fetchUserLocation
 * @returns {Object|null} The user's location object (latitude and longitude), or null if the location cannot be fetched.
 */
export async function fetchUserLocation() {
  const location = await getCurrentLocation();  // Get location from Model
  if (location) {
    return location; // Update the state in the View (via Context)
  } else {
    console.log("Unable to fetch location.");
  }
}
