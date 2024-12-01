import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';

/**
 * A custom React hook to request permissions and retrieve the Expo push notification token.
 *
 * @returns {string|null} - The Expo push token if permissions are granted, or `null` if not available.
 *
 * @example
 * import usePushNotification from './hooks/usePushNotification';
 *
 * const App = () => {
 *   const expoPushToken = usePushNotification();
 *
 *   useEffect(() => {
 *     if (expoPushToken) {
 *       console.log('Expo Push Token:', expoPushToken);
 *     }
 *   }, [expoPushToken]);
 *
 *   return <div>Push Notification Example</div>;
 * };
 *
 * export default App;
 */
const usePushNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    const getPushNotificationToken = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        const token = await Notifications.getExpoPushTokenAsync();
        setExpoPushToken(token.data);
        console.log('Token data', token.data);
      } else {
        console.log('Permission not granted for push notifications');
      }
    };

    getPushNotificationToken();
  }, []);

  return expoPushToken;
};

export default usePushNotification;
