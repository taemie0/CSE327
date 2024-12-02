import axios from "axios";

// Base URL for Google Places API
const BASE_URL = "https://maps.googleapis.com/maps/api/place";
// Your API Key (should ideally be stored securely, not hard-coded)
const API_KEY = "AIzaSyCVcp7SogP99WTUNxw3aaHBV86qge96fAU";

/**
 * Fetches nearby places based on latitude, longitude, and place type.
 *
 * @param {number} lat - Latitude of the user's location.
 * @param {number} lng - Longitude of the user's location.
 * @param {string} type - Type of places to search for (e.g., 'restaurant', 'cafe').
 * @returns {Promise} Axios promise with the response data of nearby places.
 */
const nearByPlace = (lat, lng, type) => {
  const url = `${BASE_URL}/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=${API_KEY}`;
  return axios.get(url);
};



/**
 * Fetches places based on a search query (text search).
 *
 * @param {string} searchText - The text to search for (e.g., 'restaurants in New York').
 * @returns {Promise} Axios promise with the response data of the searched places.
 */
const searchByText = (searchText) => {
  const url = `${BASE_URL}/textsearch/json?query=${searchText}&key=${API_KEY}`;
  return axios.get(url);
};

export default {
  nearByPlace,
  searchByText
};
