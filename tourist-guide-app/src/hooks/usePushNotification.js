import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';

const usePushNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    const getPushNotificationToken = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        const token = await Notifications.getExpoPushTokenAsync();
        setExpoPushToken(token.data);
        console.log('Token data',token.data);
      }
    };

    getPushNotificationToken();
  }, []);

  return expoPushToken;
};

export default usePushNotification;
