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

export const getNearbyPlaces = (latitude, longitude, type) => {
  return GlobalApi.nearByPlace(latitude, longitude, type)
    .then(response => response.data.results)
    .catch(error => {
      console.error("Error fetching places: ", error);
      return [];
    });
};
