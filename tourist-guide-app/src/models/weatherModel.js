import axios from 'axios';
import { weatherApiKey } from '../utils/index.js';

/**
 * Constructs the endpoint URL for fetching weather forecast data.
 * 
 * @param {Object} params - The parameters used to generate the forecast URL.
 * @param {string} params.cityName - The name of the city for which the weather forecast is requested.
 * @param {number} params.days - The number of days for the forecast.
 * @returns {string} The URL string for the weather forecast API.
 */
const forecastEndpoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

/**
 * Constructs the endpoint URL for searching locations by city name.
 * 
 * @param {Object} params - The parameters used to generate the locations search URL.
 * @param {string} params.cityName - The name of the city to search for.
 * @returns {string} The URL string for the locations search API.
 */
const locationsEndpoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${params.cityName}`;

/**
 * Constructs the endpoint URL for fetching weather alerts for a city.
 * 
 * @param {Object} params - The parameters used to generate the alerts URL.
 * @param {string} params.cityName - The name of the city for which the weather alerts are requested.
 * @returns {string} The URL string for the weather alerts API.
 */
const alertsEndpoint = (params) =>
  `https://api.weatherapi.com/v1/alerts.json?key=${weatherApiKey}&q=${params.cityName}`;

/**
 * Makes an API call to a specified endpoint and returns the response data.
 * 
 * @param {string} endpoint - The URL endpoint to which the GET request will be made.
 * @returns {Object|null} The response data from the API or null if the request fails.
 * @throws {Error} Throws an error if the API request fails.
 */
const apiCall = async (endpoint) => {
  const options = {
    method: 'GET',
    url: endpoint,
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error in apiCall:', error);
    return null;
  }
};

/**
 * Fetches weather forecast data for a given city.
 * 
 * @param {Object} params - The parameters for the weather forecast request.
 * @param {string} params.cityName - The city for which the forecast data is fetched.
 * @param {number} params.days - The number of days of forecast to fetch.
 * @returns {Object|null} The weather forecast data or null if the request fails.
 */
export const fetchWeatherData = (params) => {
  const forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl);
};

/**
 * Fetches location data for a given city.
 * 
 * @param {Object} params - The parameters for the location search request.
 * @param {string} params.cityName - The city name for the location search.
 * @returns {Object|null} The location data or null if the request fails.
 */
export const fetchLocationsData = (params) => {
  const locationUrl = locationsEndpoint(params);
  return apiCall(locationUrl);
};

/**
 * Fetches weather alerts for a given city.
 * 
 * @param {Object} params - The parameters for the weather alerts request.
 * @param {string} params.cityName - The city name for the weather alerts.
 * @returns {Object|null} The weather alerts data or null if the request fails.
 */
export const fetchAlertsData = (params) => {
  const alertUrl = alertsEndpoint(params);
  return apiCall(alertUrl);
};


