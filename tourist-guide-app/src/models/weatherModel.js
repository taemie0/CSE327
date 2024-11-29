import axios from 'axios';
import { weatherApiKey } from '../utils/index';

const forecastEndpoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationsEndpoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${params.cityName}`;

const alertsEndpoint = (params) =>
  `https://api.weatherapi.com/v1/alerts.json?key=${weatherApiKey}&q=${params.cityName}`;

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

export const fetchWeatherData = (params) => {
  const forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl);
};

export const fetchLocationsData = (params) => {
  const locationUrl = locationsEndpoint(params);
  return apiCall(locationUrl);
};

export const fetchAlertsData = (params) => {
  const alertUrl = alertsEndpoint(params);
  return apiCall(alertUrl);
};
