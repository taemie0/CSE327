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
