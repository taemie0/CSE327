import { fetchWeatherData, fetchLocationsData, fetchAlertsData } from '../models/weatherModel';

/**
 * Fetches the weather forecast for a specific city or location.
 * 
 * This function retrieves the weather data from the weather model, processes it (if needed),
 * and returns the data to be used in the View.
 *
 * @async
 * @function getWeatherForecast
 * @param {Object} params - Parameters for fetching weather data (e.g., city name).
 * @returns {Object} The weather data object returned from the model.
 * @throws {Error} Throws an error if the weather data retrieval fails.
 * 
 * @example
 * // Usage example
 * const weatherData = await getWeatherForecast({ city: 'New York' });
 */
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
    return weatherData; // Return raw weather data (or processed data if needed)
  } catch (error) {
    console.error('Error in getWeatherForecast:', error);
    throw error; // Propagate the error to be handled by the View or UI
  }
};

/**
 * Fetches location details based on parameters (e.g., city name).
 * 
 * This function retrieves location data from the model and returns it, optionally processed
 * to return relevant details like city, region, country, etc.
 *
 * @async
 * @function getLocations
 * @param {Object} params - Parameters for fetching location data (e.g., city name).
 * @returns {Array} An array of location objects, each containing details such as name, region, country, etc.
 * @throws {Error} Throws an error if the location data retrieval fails.
 * 
 * @example
 * // Usage example
 * const locations = await getLocations({ city: 'New York' });
 */
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
    return locationData; // Return raw location data (or processed data if needed)
  } catch (error) {
    console.error('Error in getLocations:', error);
    throw error;
  }
};


/**
 * Fetches weather alerts for a specific city.
 * 
 * This function retrieves weather alerts from an external source for a given city.
 * It returns an array of alerts, each containing details such as headline, severity,
 * description, etc.
 *
 * @async
 * @function getWeatherAlerts
 * @param {string} cityName - The name of the city for which weather alerts are to be fetched.
 * @returns {Array|null} An array of weather alerts or null if no alerts are found.
 * @throws {Error} Throws an error if fetching weather alerts fails.
 * 
 * @example
 * // Usage example
 * const alerts = await getWeatherAlerts('New York');
 */
export const getWeatherAlerts = async (params) => {
  try {
    // const response = await axios.get(alertsEndpoint({ params }));
    const response = await fetchAlertsData(params);

    const alerts = response.data.alerts?.alert; // Extract alerts from the response
    if (!alerts || alerts.length === 0) {
      return null; // No alerts available
    }

    // Return relevant details of each alert
    return alerts.map(alert => ({
      headline: alert.headline,
      severity: alert.severity,
      event: alert.event,
      description: alert.desc,
      instruction: alert.instruction,
      areas: alert.areas,
      effective: alert.effective,
      expires: alert.expires
    }));
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    return null; // Return null if error occurs while fetching alerts
  }
};