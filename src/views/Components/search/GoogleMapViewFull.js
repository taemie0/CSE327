import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserLocationContext } from '../../context/userLocationContext';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions } from 'react-native';
import PlaceMarker from '../home/PlaceMarker';


/**
 * GoogleMapViewFull component renders a map view centered around the user's location,
 * and displays markers for nearby places (from the `placeList`).
 * It uses the `UserLocationContext` to get the user's current location and updates the map region.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Array} props.placeList - List of places to be displayed as markers on the map.
 * @param {Object} props.placeList[] - A place object containing information such as name and coordinates.
 * 
 * @returns {JSX.Element} A MapView centered around the user's location with markers for nearby places.
 */
export default function GoogleMapViewFull({ placeList }) {
  const [mapRegion, setMapRegion] = useState(null);  // Initialize as null

  const { location, setLocation } = useContext(UserLocationContext);

  console.log(location);

  useEffect(() => {
    if (location && location.coords) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);  // Only updates if location changes
  
  return (
    <View>
      {mapRegion ? (  // Ensure that mapRegion is set before rendering MapView
        <MapView
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.89,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={mapRegion}
        >
          <Marker 
            title="You" 
            coordinate={mapRegion}  // Center marker for user location
          />
          {placeList.slice(0, 5).map((item, index) => (  // Only render first 5 places
            <PlaceMarker item={item} key={index} />
          ))}
        </MapView>
      ) : (
        <Text>Loading map...</Text>  // Show loading text if mapRegion is not available
      )}
    </View>
  );
}
