import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocationContext } from '../../context/userLocationContext';
import PlaceMarker from './PlaceMarker';

/**
 * GoogleMapView component displays a map with the user's current location and nearby places.
 * It renders a MapView with markers for the top nearby places based on the `placeList` prop.
 * @component
 * @param {Object} props - The component's props.
 * @param {Array} props.placeList - A list of nearby places to be displayed on the map.
 * @returns {JSX.Element} The rendered GoogleMapView component.
 */

export default function GoogleMapView({ placeList }) {
  const { location, setLocation } = useContext(UserLocationContext);
  const [mapRegion, setMapRegion] = useState(null);

    /**
   * This effect updates the map region whenever the user's location changes.
   * @function
   * @param {Object} location - The user's current location.
   * @param {Object} location.coords - The coordinates of the user's location.
   * @param {number} location.coords.latitude - The latitude of the user's location.
   * @param {number} location.coords.longitude - The longitude of the user's location.
   */

  useEffect(() => {
    if (location && location.coords) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);  // This effect runs when `location` changes.

  return (
    <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#333', textAlign: 'center' }}>
        Top Nearby Places
      </Text>
      <View style={{ borderRadius: 20, overflow: 'hidden' }}>
        {mapRegion ? (
          <MapView
            style={{
              width: Dimensions.get('screen').width * 0.93,
              height: Dimensions.get('screen').height * 0.23,
            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={mapRegion}  // Only render the region if `mapRegion` is set.
          >
            <Marker title="You" coordinate={mapRegion} />
            {placeList.slice(0, 4).map((item, index) => (
              <PlaceMarker item={item} key={index} />
            ))}
          </MapView>
        ) : (
          // You can add a loader here until the location is fetched.
          <Text>Loading map...</Text>
        )}
      </View>
    </View>
  );
}
