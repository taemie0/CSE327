// src/controllers/locationController.js
import { fetchLocationByName } from "../models/placeLocationModel";

/**
 * Controller function to fetch location based on place name.
 * @async
 * @function getLocationFromName
 * @param {string} placeName - The name of the place to fetch the location for.
 * @returns {Object|null} The location object containing latitude and longitude, or null if an error occurs or location is not found.
 * @throws {Error} Throws an error if the location is not found.
 */
export async function getLocationFromName(placeName) {
  try {
    const location = await fetchLocationByName(placeName);
    if (location) {
      return location;  
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Error in controller:', error);
    return null;
  }
}
