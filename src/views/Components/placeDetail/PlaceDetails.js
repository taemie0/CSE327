import { View, Text, TouchableOpacity, Platform, Linking, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import PlaceDetailItem from './PlaceDetailItem';
import GoogleMapView from '../home/GoogleMapView';
import { Ionicons } from '@expo/vector-icons';


/**
 * A component that displays details of a place and allows the user to view its location on a map.
 * It fetches place data passed via route params and provides an option to open the location in Google Maps.
 *
 * @component
 * @example
 * // Usage
 * <PlaceDetails />
 */

const PlaceDetails = () => {
  const param = useRoute().params;
  const [place, setPlace] = useState([]);

    /**
   * Effect hook that sets the place data when the component mounts.
   */

  useEffect(() => {
    setPlace(param.place);
  }, []);
  
    /**
   * Handles the action of opening the location in Google Maps.
   * Depending on the platform (iOS or Android), it generates a URL to open the map with the place's coordinates.
   *
   * @function onDirectionClick
   * @returns {void}
   */
  const onDirectionClick = () => {
    const url = Platform.select({
      ios: "maps:" + place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
      android: "geo:" + place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
    });

    Linking.openURL(url);
  };

  return (
    <ScrollView className="p-5 bg-white flex-1">
      <PlaceDetailItem
        place={place}
        onDirectionClick={() => onDirectionClick()}
      />

      <GoogleMapView placeList={[place]} />

      <TouchableOpacity
        className="bg-blue-500 p-4 mt-2 flex-row justify-center items-center rounded-full"
        onPress={() => onDirectionClick()}
      >
        <Ionicons name="navigate-circle-outline" size={30} color="white" />
        <Text className="text-white text-center ml-2">Get Direction on Google Map</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PlaceDetails;
