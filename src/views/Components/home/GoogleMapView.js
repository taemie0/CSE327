import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocationContext } from '../../context/userLocationContext';
import PlaceMarker from './PlaceMarker';

export default function GoogleMapView({ placeList }) {
  const { location, setLocation } = useContext(UserLocationContext);
  const [mapRegion, setMapRegion] = useState(null);

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
