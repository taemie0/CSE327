import { fetchWeatherData, fetchLocationsData, fetchAlertsData } from '../models/weatherModel';

// Function to fetch the weather forecast based on the city
export const getWeatherForecast = async (params) => {
  try {
    // Fetch the weather data from the model
    const weatherData = await fetchWeatherData(params);

    if (!weatherData) {
      throw new Error('Failed to retrieve weather data');
    }

    // // Process or transform the data if needed
    // const processedData = {
    //   temperature: weatherData.current.temp_c,  // Example: Current temperature in Celsius
    //   condition: weatherData.current.condition.text, // Weather condition description
    //   city: weatherData.location.name,  // City name
    //   forecast: weatherData.forecast.forecastday,  // Weather forecast for the coming days
    // };

    // return processedData; // Return the processed data to the View
    return weatherData;
  } catch (error) {
    console.error('Error in getWeatherForecast:', error);
    throw error; // Propagate the error to be handled by the View or UI
  }
};

// Function to fetch location details (e.g., based on city name)
export const getLocations = async (params) => {
  try {
    // Fetch the location data from the model
    const locationData = await fetchLocationsData(params);

    if (!locationData) {
      throw new Error('Failed to retrieve location data');
    }

    // // Process or transform the data if needed
    // const locations = locationData.map(location => ({
    //   name: location.name,
    //   region: location.region,
    //   country: location.country,
    //   lat: location.lat,
    //   lon: location.lon,
    // }));

    // return locations; // Return the processed location data to the View
    return locationData;
  } catch (error) {
    console.error('Error in getLocations:', error);
    throw error;
  }
};

// Function to fetch weather alerts for a specific location
export const getAlerts = async (params) => {
  try {
    // Fetch the alerts data from the model
    const alertsData = await fetchAlertsData(params);

    if (!alertsData) {
      throw new Error('Failed to retrieve weather alerts');
    }

    // // Process or transform the alerts data if needed
    // const alerts = alertsData.alerts.map(alert => ({
    //   title: alert.headline,
    //   description: alert.description,
    //   severity: alert.severity,
    //   effectiveDate: alert.effective,
    // }));

    // return alerts; // Return the processed alerts data to the View
    return alertsData;
  } catch (error) {
    console.error('Error in getAlerts:', error);
    throw error;
  }
};
