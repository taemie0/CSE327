import { View, Text, TouchableOpacity, Platform, Linking, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import PlaceDetailItem from './PlaceDetailItem';
import GoogleMapView from '../home/GoogleMapView';
import { Ionicons } from '@expo/vector-icons';

const PlaceDetails = () => {
  const param = useRoute().params;
  const [place, setPlace] = useState([]);

  useEffect(() => {
    setPlace(param.place);
  }, []);

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
