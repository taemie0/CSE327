import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import WeatherAlertNotifier from './src/controllers/weatherAlertController';
import AppNavigator from './src/navigation/AppNavigator';
import './global.css';

/**
 * The main entry point of the React Native application.
 *
 * This component initializes notification handling, sets the status bar style,
 * and renders the app's navigational structure along with the weather alert notifier.
 *
 * @returns {JS.Element} The root component of the application.
 *
 * @example
 * import App from './App';
 * import { registerRootComponent } from 'expo';
 *
 * registerRootComponent(App);
 */
export default function App() {
  const [cityName, setCityName] = useState('Test City');

  // Set notification handler when app starts
  useEffect(() => {
    /**
     * Configures the notification handler when the app starts.
     */
    Notifications.setNotificationHandler({
      handleNotification: async (notification) => {
        return {
          shouldShowAlert: true, // Show alert when notification is received
          shouldPlaySound: true, // Play default sound
          shouldSetBadge: true, // Update app badge count
          vibrate: [0, 500, 1000], // Custom vibration pattern [pause, vibrate, pause, vibrate]
        };
      },
    });

    /**
     * Configures the status bar style for the application.
     */
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
