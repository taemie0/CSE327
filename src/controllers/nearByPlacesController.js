// controllers/HomeController.js
import { getNearbyPlaces } from "../models/placeModel";

/**
 * Fetches nearby places based on latitude, longitude, and type, and updates the place list.
 * @function fetchNearbyPlaces
 * @param {number} latitude - The latitude of the user's location.
 * @param {number} longitude - The longitude of the user's location.
 * @param {string} type - The type of places to search for (e.g., restaurants, parks).
 * @param {function} setPlaceList - A function to update the state with the fetched places.
 * @returns {void}
 */
export const fetchNearbyPlaces = (latitude, longitude, type, setPlaceList) => {
  getNearbyPlaces(latitude, longitude, type)
    .then((places) => {
      setPlaceList(places);  // Update state with fetched data
    })
    .catch(() => {
      setPlaceList([]);  // Handle errors, or show fallback data
    });
};
