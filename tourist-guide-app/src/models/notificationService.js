import axios from 'axios';

// Function to send push notification using Expo push service
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
