import axios from 'axios';
import { fetchWeatherData, fetchLocationsData, fetchAlertsData } from '../src/models/weatherModel.js';

jest.mock('axios');

describe('Weather API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clears any mocked calls between tests
  });

  // Test case 1: Fetch weather data successfully
  it('should fetch weather data successfully', async () => {
    const mockResponse = { data: { forecast: 'mockForecast' } };
    axios.request.mockResolvedValue(mockResponse); // Mocking the axios request

    const params = { cityName: 'Dhaka', days: 3 };
    const result = await fetchWeatherData(params);

    // Assert that axios was called exactly once
    expect(axios.request).toHaveBeenCalledTimes(1);
    // Assert that the URL contains the cityName (Dhaka)
    expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
      url: expect.stringContaining('Dhaka'),
    }));
    // Assert that the returned data matches the mock response
    expect(result).toEqual(mockResponse.data);
  });

  // Test case 2: Fetch location data successfully
  it('should fetch location data successfully', async () => {
    const mockResponse = { data: [{ name: 'Dhaka' }] };
    axios.request.mockResolvedValue(mockResponse); // Mocking the axios request

    const params = { cityName: 'Dhaka' };
    const result = await fetchLocationsData(params);

    // Assert that axios was called exactly once
    expect(axios.request).toHaveBeenCalledTimes(1);
    // Assert that the URL contains the cityName (Dhaka)
    expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
      url: expect.stringContaining('Dhaka'),
    }));
    // Assert that the returned data matches the mock response
    expect(result).toEqual(mockResponse.data);
  });

  // Test case 3: Fetch weather alerts successfully
  it('should fetch weather alerts successfully', async () => {
    const mockResponse = { data: { alerts: 'mockAlerts' } };
    axios.request.mockResolvedValue(mockResponse); // Mocking the axios request

    const params = { cityName: 'Dhaka' };
    const result = await fetchAlertsData(params);

    // Assert that axios was called exactly once
    expect(axios.request).toHaveBeenCalledTimes(1);
    // Assert that the URL contains the cityName (Dhaka)
    expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
      url: expect.stringContaining('Dhaka'),
    }));
    // Assert that the returned data matches the mock response
    expect(result).toEqual(mockResponse.data);
  });

  // Test case 4: Handle API failure gracefully
  it('should handle API call failure gracefully', async () => {
    axios.request.mockRejectedValue(new Error('API call failed')); // Mocking rejection

    const params = { cityName: 'Dhaka' };
    const result = await fetchWeatherData(params);

    // Assert that axios was called exactly once
    expect(axios.request).toHaveBeenCalledTimes(1);
    // Assert that the result is null on failure
    expect(result).toBeNull(); // Should return null on error
  });
});
