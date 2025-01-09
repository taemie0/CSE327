import { View, Text } from 'react-native';  // No need for 'div', use 'View' in React Native
import { useEffect, useState, React, useContext } from 'react';
import { ScrollView } from 'react-native';
import GoogleMapView from '../Components/home/GoogleMapView';
import CategoryList from '../Components/home/CategoryList';
import { UserLocationContext } from '../context/userLocationContext';
import PlaceList from '../Components/home/PlaceList';
import { fetchNearbyPlaces } from '../../controllers/nearByPlacesController';

/**
 * Home component that displays a map with nearby places based on the user's current location.
 * It includes a map view, a category filter, and a list of places (restaurants, cafes, etc.)
 * It fetches nearby places depending on the selected category.
 * 
 * @component
 * @returns {JSX.Element} The Home screen, including a Google Map, CategoryList, and PlaceList.
 */
export default function Home() {
  const [type, setType] = useState('tourist_attraction'); // The current type of places to search for
  const [placeList, setPlaceList] = useState([]); // List of places to display
  const { location, setLocation } = useContext(UserLocationContext); // Context for user's location

  // Effect to fetch nearby places once the location is available
  useEffect(() => {
    if (location && location.coords) {
      GetNearBySearchPlace('restaurant');  // Default search for restaurants when location is available
    }
  }, [location]);  // Trigger when the location changes

  /**
   * Fetches nearby places based on the selected category and the user's current location.
   * It updates the `type` state and fetches places from the controller.
   * 
   * @param {string} value - The selected category (e.g., 'Cafes', 'Restaurants', 'Hotels', etc.)
   */
  const GetNearBySearchPlace = (value) => {
    let placeType = 'tourist_attraction'; // Default type if no category is selected
    if (value === 'Cafes') placeType = 'cafe';
    if (value === 'Restaurants') placeType = 'restaurant';
    if (value === 'Hotels') placeType = 'lodging';
    if (value === 'Attractions') placeType = 'tourist_attraction';

    setType(placeType); // Update the current place type

    if (location) {
      // Fetch nearby places using the location coordinates and the selected place type
      fetchNearbyPlaces(location.coords.latitude, location.coords.longitude, placeType, setPlaceList);
    }
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      {/* Google Map with nearby places */}
      <GoogleMapView placeList={placeList} />
      
      {/* Category filter list */}
      <CategoryList setSelectedCategory={(value) => GetNearBySearchPlace(value)} />
      
      {/* Render the list of places if available */}
      {placeList ? <PlaceList placeList={placeList} /> : null}
    </ScrollView>
  );
}
