import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import GoogleMapViewFull from '../Components/search/GoogleMapViewFull';
import SearchBar from '../Components/search/SearchBar';
import { UserLocationContext } from '../context/userLocationContext';
import GlobalApi from '../services/GlobalApi';
import BusinessList from '../Components/search/BusinessList';
import { getLocationFromName } from '../../controllers/inputPlaceLocationController';
import { fetchNearbyPlaces } from '../../controllers/nearByPlacesController';

export default function Search() {
  const [placeList, setPlaceList] = useState([]);
  const { location } = useContext(UserLocationContext); // Using the initial user location

  // Initial fetch of place list based on user's current location
  useEffect(() => {
    if (location && location.coords) {
      GetNearBySearchPlace("");
    }
  }, [location]); 


  const GetNearBySearchPlace = async (value) => {
    // If value is a location object (latitude and longitude)
    if (value && value.lat && value.lng) {
      const { lat: latitude, lng: longitude } = value;  
      try {
        // Fetch nearby places using latitude and longitude
        fetchNearbyPlaces(latitude, longitude, 'tourist_attractiont', setPlaceList);  // Replace 'restaurant' with your placeType if needed
      } catch (error) {
        console.error('Error fetching place:', error);
      }
  
    } else if (location && location.coords) { // If no value is passed, use the user's current location
      // If location is available, fetch nearby places based on user's current location
      fetchNearbyPlaces(location.coords.latitude, location.coords.longitude, 'tourist_attraction', setPlaceList);
    } else {
      console.log("Invalid or empty location received.");
    }
  };
  

  return (
    <View>
      <View style={{ position: 'absolute', zIndex: 20 }}>
        {/* Pass the handleSearch function to SearchBar */}
        <SearchBar setSearchText={(value)=>GetNearBySearchPlace(value)} />
      </View>

      <GoogleMapViewFull placeList={placeList} />
      
      <View style={{ position: 'absolute', zIndex: 20, bottom: 0 }}>
        <BusinessList placeList={placeList} />
      </View>
    </View>
  );
}
