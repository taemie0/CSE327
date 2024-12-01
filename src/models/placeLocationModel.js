import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCVcp7SogP99WTUNxw3aaHBV86qge96fAU';

/**
 * Fetches location coordinates (latitude and longitude) based on a place name using the Google Maps Geocoding API.
 * @async
 * @function fetchLocationByName
 * @param {string} placeName - The name of the place (address) to fetch coordinates for.
 * @returns {Object|null} The location object containing latitude and longitude, or null if the location could not be fetched.
 * @throws {Error} Throws an error if the request to the Google Maps API fails.
 */
export async function fetchLocationByName(placeName) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await axios.get(url);
  
      // Check if response has results
      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return location; // Return the coordinates (latitude, longitude)
      } else {
        console.log('No results found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching location by name:', error);
      return null;
    }
}
