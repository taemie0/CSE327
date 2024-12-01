import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import GoogleMapViewFull from '../Components/search/GoogleMapViewFull';
import SearchBar from '../Components/search/SearchBar';
import { UserLocationContext } from '../context/userLocationContext';
import GlobalApi from '../services/GlobalApi';
import BusinessList from '../Components/search/BusinessList';
import { getLocationFromName } from '../../controllers/inputPlaceLocationController';
import { fetchNearbyPlaces } from '../../controllers/nearByPlacesController';

/**
 * Search component that handles the logic for searching places based on the user's current location
 * or a given location. It includes a map view, a search bar, and a list of businesses.
 * 
 * @component
 * @returns {JSX.Element} The Search screen containing a map, search bar, and business list.
 */
export default function Search() {
  const [placeList, setPlaceList] = useState([]);  // Holds the list of places fetched from the API
  const { location } = useContext(UserLocationContext); // Fetches user's current location from context

  /**
   * useEffect hook that triggers fetching nearby places whenever the user's location changes.
   */
  useEffect(() => {
    if (location && location.coords) {
      GetNearBySearchPlace("");  // Fetch places using the current location
    }
  }, [location]);  // Triggered when the location changes

  /**
   * Fetches nearby places based on either the user's current location or a specific location.
   * 
   * @param {Object|string} value - A location object with latitude and longitude, or an empty string to use the user's location.
   */
  const GetNearBySearchPlace = async (value) => {
    if (value && value.lat && value.lng) {
      // If value is a location object, fetch places using the provided latitude and longitude
      const { lat: latitude, lng: longitude } = value;  
      try {
        // Fetch nearby places based on the coordinates and place type
        fetchNearbyPlaces(latitude, longitude, 'tourist_attraction', setPlaceList); // Corrected place type
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    } else if (location && location.coords) {
      // If no location value is passed, use the user's current location
      fetchNearbyPlaces(location.coords.latitude, location.coords.longitude, 'tourist_attraction', setPlaceList);
    } else {
      console.log("Invalid or empty location received.");
    }
  };

  return (
    <View>
      <View style={{ position: 'absolute', zIndex: 20 }}>
        {/* Search bar for querying places */}
        <SearchBar setSearchText={(value) => GetNearBySearchPlace(value)} />
      </View>

      {/* Map view displaying the nearby places */}
      <GoogleMapViewFull placeList={placeList} />
      
      <View style={{ position: 'absolute', zIndex: 20, bottom: 0 }}>
        {/* Business list displaying nearby places */}
        <BusinessList placeList={placeList} />
      </View>
    </View>
  );
}
