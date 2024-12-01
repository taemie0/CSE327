import axios from 'axios';

/**
 * Sends a push notification using the Expo push notification service.
 *
 * @param {string} pushToken - The push token for the recipient device.
 * @param {string} message - The message to be sent in the push notification body.
 * @returns {Promise<Object>} The response data from the Expo API if successful.
 * @throws {Error} Throws an error if the request to the Expo push service fails.
 */
export const sendPushNotification = async (pushToken, message) => {
  const notificationData = {
    to: pushToken,
    sound: 'default',
    title: 'Weather Alert',
    body: message,
  };

  try {
    const response = await axios.post('https://exp.host/--/api/v2/push/send', notificationData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
};
