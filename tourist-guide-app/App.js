import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import WeatherAlertNotifier from './src/controllers/weatherAlertController';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [cityName, setCityName] = useState('Test City');

  // Set notification handler when app starts
  useEffect(() => {
    // Set the notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // Set the status bar style
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('#000000');
  }, []);

  return (
    <>
      <WeatherAlertNotifier cityName={cityName} />
      <AppNavigator />
    </>
  );
}
