// services/PlaceModel.js
import GlobalApi from '../views/services/GlobalApi';

/**
 * Fetches nearby places based on the provided latitude, longitude, and place type.
 * @function getNearbyPlaces
 * @param {number} latitude - The latitude of the user's location.
 * @param {number} longitude - The longitude of the user's location.
 * @param {string} type - The type of places to search for (e.g., restaurants, parks).
 * @returns {Array} An array of nearby places (from the API response), or an empty array if an error occurs.
 * @throws {Error} Logs an error to the console if the API call fails.
 */
export const getNearbyPlaces = async (latitude, longitude, type) => {
  try {
    const response = await GlobalApi.nearByPlace(latitude, longitude, type);
    if (!response || !response.data || !response.data.results) {
      throw new Error('Invalid API response structure');
    }
    return response.data.results;
  } catch (error) {
    // Log the error with more detailed information
    // console.error("Error fetching places: ", error.message);

    // Optionally, you can implement retry logic here
    // Or return a fallback message/data for the UI (e.g., empty array or a default message)
    return [];
  }
};
