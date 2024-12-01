// controllers/HomeController.js
import { getNearbyPlaces } from "../models/placeModel";

export const fetchNearbyPlaces = (latitude, longitude, type, setPlaceList) => {
  getNearbyPlaces(latitude, longitude, type)
    .then((places) => {
      setPlaceList(places);  // Update state with fetched data
    })
    .catch(() => {
      setPlaceList([]);  // Handle errors, or show fallback data
    });
};
