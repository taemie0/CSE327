// src/controllers/locationController.js
import { fetchLocationByName } from "../models/placeLocationModel";

// Controller function to fetch location based on place name
export async function getLocationFromName(placeName) {
  try {
    const location = await fetchLocationByName(placeName);
    if (location) {
      return location;  // Return the fetched location (latitude, longitude)
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Error in controller:', error);
    return null;
  }
}
