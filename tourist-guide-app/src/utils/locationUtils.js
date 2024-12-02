
import * as Location from 'expo-location';

/**
 * Requests location permissions and retrieves the current position of the user.
 *
 * This function requests permission to access the device's location and, if granted,
 * fetches the current location of the user. If permission is denied, an alert is shown.
 *
 * @async
 * @function
 * @returns {Promise<Object|null>} A promise that resolves to the location object containing
 * the user's coordinates (latitude, longitude), or null if permission is denied.
 * @throws {Error} If the location request fails or permissions are not granted.
 *
 * @example
 * const location = await getLocation();
 * if (location) {
 *   console.log(location.coords.latitude, location.coords.longitude);
 * } else {
 *   console.log('Unable to fetch location');
 * }
 */
export const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access location was denied');
    return;
  }
  const location = await Location.getCurrentPositionAsync({});
  return location;
};

