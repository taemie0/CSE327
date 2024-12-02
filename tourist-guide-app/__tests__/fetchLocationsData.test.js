import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchLocationsData } from '../src/models/weatherModel';
import { weatherApiKey } from '../src/utils/index.js';

describe('fetchLocationsData', () => {
  let mock;

  // Set up the Axios mock adapter before all tests
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  // Reset the mock adapter after each test to ensure clean state
  afterEach(() => {
    mock.reset();
  });

  // Restore Axios to its original state after all tests
  afterAll(() => {
    mock.restore();
  });

  it('should return location data when a valid city name is provided', async () => {
    console.log('Test Case: Valid city name');

    const params = { cityName: 'Paris' };
    const mockResponse = [
      { id: 1, name: 'Paris', region: 'Île-de-France', country: 'France' },
    ];

    mock.onGet(
      `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${params.cityName}`
    ).reply(200, mockResponse);

    const result = await fetchLocationsData(params);
    console.log('Result:', result);
    expect(result).toEqual(mockResponse);
  });

  it('should return null for a non-existent city', async () => {
    console.log('Test Case: Non-existent city name');

    const params = { cityName: 'NonExistentCity' };
    mock.onGet(
      `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${params.cityName}`
    ).reply(404);

    const result = await fetchLocationsData(params);
    console.log('Result:', result);
    expect(result).toBeNull();
  });

  it('should handle a missing API key gracefully', async () => {
    console.log('Test Case: Missing API key');

    const params = { cityName: 'Paris' };
    mock.onGet(
      `https://api.weatherapi.com/v1/search.json?key=&q=${params.cityName}`
    ).reply(403, { error: 'API key is missing' });

    const result = await fetchLocationsData(params);
    console.log('Result:', result);
    expect(result).toBeNull();
  });

  it('should handle rate limiting errors', async () => {
    console.log('Test Case: API rate limit exceeded');

    const params = { cityName: 'Paris' };
    mock.onGet(
      `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${params.cityName}`
    ).reply(429, { error: 'Rate limit exceeded' });

    const result = await fetchLocationsData(params);
    console.log('Result:', result);
    expect(result).toBeNull();
  });

  it('should handle server-side errors gracefully', async () => {
    console.log('Test Case: Internal server error');

    const params = { cityName: 'Paris' };
    mock.onGet(
      `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${params.cityName}`
    ).reply(500);

    const result = await fetchLocationsData(params);
    console.log('Result:', result);
    expect(result).toBeNull();
  });

  it('should handle empty city name input', async () => {
    console.log('Test Case: Empty city name input');

    const params = { cityName: '' };
    mock.onGet(
      `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${params.cityName}`
    ).reply(400, { error: 'Bad Request' });

    const result = await fetchLocationsData(params);
    console.log('Result:', result);
    expect(result).toBeNull();
  });

  it('should return null for network timeouts', async () => {
    console.log('Test Case: Network timeout');

    const params = { cityName: 'Paris' };
    mock.onGet(
      `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${params.cityName}`
    ).timeout();

    const result = await fetchLocationsData(params);
    console.log('Result:', result);
    expect(result).toBeNull();
  });

  it('should handle a valid city name with no results returned', async () => {
    console.log('Test Case: Valid city name with no results');

    const params = { cityName: 'Nowhereville' };
    mock.onGet(
      `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${params.cityName}`
    ).reply(200, []);

    const result = await fetchLocationsData(params);
    console.log('Result:', result);
    expect(result).toEqual([]); // Verify it returns an empty array
  });
});
