import { getWeatherAlerts } from '../models/weatherModel';
import { useEffect, useState } from 'react';
import { sendPushNotification } from '../utils/pushNotificationUtils'; // To send push notifications
import { mockWeatherAlerts } from '../models/mock/mockWeatherAlerts';
import usePushNotification from '../hooks/usePushNotification'; // To get expo push token

/**
 * `WeatherAlertNotifier` is a React component that checks for weather alerts for a given city
 * and sends push notifications when alerts are found.
 *
 * It requires an `expoPushToken` (obtained from a custom hook) to send notifications.
 * The component checks for weather alerts on mount and periodically every 10 minutes.
 * If a valid push token is available, it sends the alerts to the user.
 *
 * @component
 * @example
 * // Usage example
 * <WeatherAlertNotifier cityName="New York" />
 *
 * @param {Object} props - The props passed to the component.
 * @param {string} props.cityName - The name of the city to fetch weather alerts for.
 */

const WeatherAlertNotifier = ({ cityName }) => {
  const expoPushToken = usePushNotification(); // Get the push token
  const [isTokenAvailable, setIsTokenAvailable] = useState(false); // State to track token availability

  useEffect(() => {
    /**
     * Effect to update token availability status based on the expoPushToken.
     */
    if (expoPushToken) {
      setIsTokenAvailable(true);
    } else {
      setIsTokenAvailable(false);
    }
  }, [expoPushToken]); // Effect will run when expoPushToken changes

  useEffect(() => {
    /**
     * Effect to fetch and send weather alerts if cityName and expoPushToken are available.
     */
    if (!cityName) return; // Don't fetch alerts if cityName is not available
    if (!isTokenAvailable) {
      console.log('No expo push token available.');
      return;
    }

    console.log('Expo push token:', expoPushToken); // Log expoPushToken for debugging
   
    /**
     * Effect to fetch and send weather alerts if cityName and expoPushToken are available.
     */
    const checkWeatherAlerts = async () => {
      console.log('Checking weather alerts for:', cityName); // Log cityName
      try {
        // const alerts = await getWeatherAlerts(cityName); // Uncomment this for real API
        const alerts = mockWeatherAlerts; // Use mock data for testing

        if (alerts && alerts.length > 0) {
          alerts.forEach((alert) => {
            console.log('Sending alert notification:', alert); // Log alert to ensure it's being fetched correctly
            sendPushNotification(expoPushToken, alert); // Send push notification using util
          });
        } else {
          console.log('No weather alerts found for', cityName); // Log if no alerts are found
        }
      } catch (error) {
        console.error('Error fetching weather alerts:', error);
      }
    };

    // Check for weather alerts once on component mount
    checkWeatherAlerts();

    // Check for weather alerts every 10 minutes (600,000 ms)
    const intervalId = setInterval(checkWeatherAlerts, 10 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [cityName, isTokenAvailable, expoPushToken]); // Dependency array: re-run when these change

  return null; // This component does not render anything
};

export default WeatherAlertNotifier;
