import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherAlertNotifier from '../src/controllers/weatherAlertController.js';
import { getWeatherAlerts } from '../src/models/weatherModel';

import { sendPushNotification } from '../src/utils/pushNotificationUtils';
import usePushNotification from '../src/hooks/usePushNotification';

// Mock external modules
jest.mock('../src/models/weatherModel', () => ({
  getWeatherAlerts: jest.fn(),
}));

jest.mock('../src/utils/pushNotificationUtils', () => ({
  sendPushNotification: jest.fn(),
}));

jest.mock('../src/hooks/usePushNotification', () => jest.fn());

// Mock data for testing
const mockAlerts = [
  { id: 1, message: 'Severe thunderstorm warning in your area.' },
  { id: 2, message: 'Tornado watch issued for the region.' },
];

describe('WeatherAlertNotifier', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    usePushNotification.mockReturnValue('mockExpoPushToken'); // Simulate a mock push token
  });

  it('should call getWeatherAlerts and send notifications when mounted', async () => {
    // Mock the return value of getWeatherAlerts
    getWeatherAlerts.mockResolvedValue(mockAlerts);

    render(<WeatherAlertNotifier cityName="New York" />);

    // Wait for the side effects to be processed
    await waitFor(() => {
      expect(getWeatherAlerts).toHaveBeenCalledWith('New York');
      expect(sendPushNotification).toHaveBeenCalledTimes(mockAlerts.length);
      mockAlerts.forEach((alert) => {
        expect(sendPushNotification).toHaveBeenCalledWith('mockExpoPushToken', alert);
      });
    });
  });

  it('should log a message when there are no weather alerts', async () => {
    getWeatherAlerts.mockResolvedValue([]);

    console.log = jest.fn(); // Mock console.log

    render(<WeatherAlertNotifier cityName="New York" />);

    await waitFor(() => {
      expect(getWeatherAlerts).toHaveBeenCalledWith('New York');
      expect(console.log).toHaveBeenCalledWith('No weather alerts found for', 'New York');
    });
  });

  it('should not call getWeatherAlerts if cityName is not provided', () => {
    render(<WeatherAlertNotifier cityName={null} />);

    expect(getWeatherAlerts).not.toHaveBeenCalled();
  });

  it('should not send notifications if the expoPushToken is not available', async () => {
    usePushNotification.mockReturnValue(null); // Simulate no push token

    render(<WeatherAlertNotifier cityName="New York" />);

    await waitFor(() => {
      expect(getWeatherAlerts).not.toHaveBeenCalled();
      expect(sendPushNotification).not.toHaveBeenCalled();
    });
  });
});
