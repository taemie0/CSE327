// services/PlaceModel.test.js
import { getNearbyPlaces } from '../models/placeModel';
import { MockResponseForNearByPlaces } from './mockResponce';
import axios from 'axios';

jest.mock('axios'); // Mocking axios globally

describe('getNearbyPlaces', () => {
  it('should return an array of places when API call is successful', async () => {
    // Mock the axios.get method to return the mock response
    axios.get.mockResolvedValue({
      data: {
        results: MockResponseForNearByPlaces,
      },
    });

    const latitude = 23.8148167;
    const longitude = 90.42849;
    const type = 'tourist_attraction';

    // Await the result of getNearbyPlaces
    const places = await getNearbyPlaces(latitude, longitude, type);

    // Assert the result matches the mock response
    expect(places).toEqual(MockResponseForNearByPlaces);
  });

  it('should return an empty array when there is an API error', async () => {
    // Mock axios to throw an error
    axios.get.mockRejectedValue(new Error('API error'));

    const latitude = 23.8148167;
    const longitude = 90.42849;
    const type = 'tourist_attraction';

    // Await the result of getNearbyPlaces
    const places = await getNearbyPlaces(latitude, longitude, type);

    // Check if axios.get was actually called
    // console.log('axios.get calls:', axios.get.mock.calls); // Log axios calls for debugging
    expect(places).toEqual([]);  // Expect an empty array in case of error
  });

  it('should return an empty array on network error', async () => {
    // Mock axios to simulate a network error (e.g., no internet connection)
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const latitude = 23.8148167;
    const longitude = 90.42849;
    const type = 'tourist_attraction';

    // Await the result of getNearbyPlaces
    const places = await getNearbyPlaces(latitude, longitude, type);

    // Assert the result is an empty array
    expect(places).toEqual([]);
  });

  it('should return an empty array when the response structure is invalid', async () => {
    // Mock axios to return a response with invalid structure
    axios.get.mockResolvedValueOnce({
      data: {},  // No results array
    });

    const latitude = 23.8148167;
    const longitude = 90.42849;
    const type = 'tourist_attraction';

    // Await the result of getNearbyPlaces
    const places = await getNearbyPlaces(latitude, longitude, type);

    // Assert the result is an empty array due to invalid response structure
    expect(places).toEqual([]);
  });

  it('should return an empty array on request timeout', async () => {
    // Mock axios to simulate a timeout error
    axios.get.mockRejectedValueOnce(new Error('timeout of 5000ms exceeded'));

    const latitude = 23.8148167;
    const longitude = 90.42849;
    const type = 'tourist_attraction';

    // Await the result of getNearbyPlaces
    const places = await getNearbyPlaces(latitude, longitude, type);

    // Assert the result is an empty array
    expect(places).toEqual([]);
  });
});
