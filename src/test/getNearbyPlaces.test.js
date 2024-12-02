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

  it('should return an empty array when there is an error', async () => {
    // Mock axios to throw an error
    axios.get.mockRejectedValue(new Error('API error'));

    const latitude = 23.8148167;
    const longitude = 90.42849;
    const type = 'tourist_attraction';

    // Await the result of getNearbyPlaces
    const places = await getNearbyPlaces(latitude, longitude, type);

    // Check if axios.get was actually called
    console.log('axios.get calls:', axios.get.mock.calls); // Log axios calls for debugging
    expect(places).toEqual([]);  // Expect an empty array in case of error
  });
});
