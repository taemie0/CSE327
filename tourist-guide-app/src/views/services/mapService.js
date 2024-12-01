// src/services/mapService.js
import axios from 'axios';

// Google Maps API URL and API Key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';  // Replace with your actual API key
const BASE_URL = 'https://maps.googleapis.com/maps/api/directions/json';

/**
 * Fetches directions between an origin and a destination
 * @param {Object} origin - {latitude, longitude} of the starting point
 * @param {string} destination - The destination address or coordinates
 * @param {string} mode - The travel mode: 'driving', 'walking', 'bicycling', or 'transit'
 * @param {boolean} alternatives - Whether to show alternative routes
 * @returns {Promise<Object>} - The response containing route data from Google Maps API
 */
export const getDirections = async (origin, destination, mode = 'driving', alternatives = true) => {
  try {
    const directionsUrl = `${BASE_URL}?origin=${origin.latitude},${origin.longitude}&destination=${destination}&mode=${mode}&alternatives=${alternatives}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(directionsUrl);

    if (response.data.status !== 'OK') {
      throw new Error('Unable to fetch directions.');
    }

    return response.data.routes; // Return the routes data (array)
  } catch (error) {
    throw new Error(`Error fetching directions: ${error.message}`);
  }
};

/**
 * Fetches geocode data for a location (e.g., address or place name)
 * @param {string} location - The location address or name
 * @returns {Promise<Object>} - The geocode result with latitude and longitude
 */
export const geocodeLocation = async (location) => {
  try {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(geocodeUrl);

    if (response.data.status !== 'OK') {
      throw new Error('Unable to geocode location.');
    }

    const { lat, lng } = response.data.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  } catch (error) {
    throw new Error(`Error geocoding location: ${error.message}`);
  }
};
