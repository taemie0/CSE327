/**
 * Sends a push notification to a specified device using Expo's push notification service.
 *
 * @param {string} expoPushToken - The Expo push token of the target device.
 * @param {Object} alert - An object containing the alert details.
 * @param {string} alert.headline - The title of the alert.
 * @param {string} alert.event - The event associated with the alert.
 * @param {string} alert.description - A brief description of the alert.
 * @param {string} alert.effective - An identifier for the alert's effective time or unique ID.
 *
 * @returns {Promise<void>} - A promise that resolves when the notification is sent.
 *
 * @throws {Error} - Logs errors to the console if the push notification fails to send.
 *
 * @example
 * const expoPushToken = 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]';
 * const alert = {
 *   headline: 'Severe Weather Alert',
 *   event: 'Thunderstorm Warning',
 *   description: 'Heavy thunderstorms expected in your area.',
 *   effective: '2024-12-01T10:00:00Z'
 * };
 *
 * sendPushNotification(expoPushToken, alert)
 *   .then(() => console.log('Notification sent'))
 *   .catch(error => console.error('Failed to send notification:', error));
 */
export const sendPushNotification = async (expoPushToken, alert) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: alert.headline,
    body: `${alert.event}: ${alert.description}`,
    data: { alertId: alert.effective }, // Additional data
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const responseData = await response.json();
    if (responseData.error) {
      console.error('Error sending push notification:', responseData.error);
    } else {
      console.log('Push notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};
