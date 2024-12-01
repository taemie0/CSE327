// services/PlaceModel.js
import GlobalApi from '../views/services/GlobalApi';

export const getNearbyPlaces = (latitude, longitude, type) => {
  return GlobalApi.nearByPlace(latitude, longitude, type)
    .then(response => response.data.results)
    .catch(error => {
      console.error("Error fetching places: ", error);
      return [];
    });
};
