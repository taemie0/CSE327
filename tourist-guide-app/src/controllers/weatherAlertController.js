import { getWeatherAlerts } from '../models/weatherModel';
import { sendPushNotification } from '../utils/pushNotificationUtils'; // We will define this next
import usePushNotification from '../hooks/usePushNotification';
import { useEffect } from 'react';

const WeatherAlertNotifier = ({ cityName }) => {
  const expoPushToken = usePushNotification();

  useEffect(() => {
    if (!cityName) return;  // Don't fetch alerts if cityName is not available
    if (!expoPushToken) {
      console.log('No expo push token available.');
      return;
    }

    console.log('Expo push token:', expoPushToken);  // Log expoPushToken for debugging

    const checkWeatherAlerts = async () => {
      console.log('Checking weather alerts for:', cityName);  // Log cityName
      const alerts = await getWeatherAlerts(cityName);

      if (alerts && alerts.length > 0) {
        alerts.forEach((alert) => {
          console.log('Sending alert notification:', alert);  // Log alert to ensure it's being fetched correctly
          sendPushNotification(expoPushToken, alert); // Send push notification
        });
      } else {
        console.log('No weather alerts found for', cityName);  // Log if no alerts are found
      }
    };

    // Check for weather alerts periodically (e.g., every 10 minutes)
    const intervalId = setInterval(checkWeatherAlerts, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [cityName, expoPushToken]);

  return null; // This component does not need to render anything
};


export default WeatherAlertNotifier;
