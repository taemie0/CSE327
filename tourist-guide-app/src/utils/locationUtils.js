// locationUtils.js
import * as Location from 'expo-location';

export const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access location was denied');
    return;
  }
  const location = await Location.getCurrentPositionAsync({});
  return location;
};
