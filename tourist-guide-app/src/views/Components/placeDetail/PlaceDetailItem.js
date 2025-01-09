import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import GoogleMapView from '../home/GoogleMapView';
import Share from '../../services/Share';


/**
 * PlaceDetailItem component displays detailed information about a place including its name, rating, image, address, and more.
 * It also provides options for sharing the place or getting directions.
 * 
 * @component
 * @param {Object} props - The component's props.
 * @param {Object} props.place - The place object containing details like name, rating, photos, vicinity, and opening hours.
 * @param {string} props.place.name - The name of the place.
 * @param {number} props.place.rating - The rating of the place (from 1 to 5).
 * @param {Array} props.place.photos - An array of photo objects for the place.
 * @param {Object} props.place.geometry - The geographical data for the place.
 * @param {string} props.place.vicinity - The vicinity address of the place.
 * @param {boolean} props.place.opening_hours.open_now - Indicates if the place is open.
 * @param {function} props.onDirectionClick - Function to be called when the 'Direction' button is clicked.
 * @returns {JSX.Element} The rendered PlaceDetailItem component.
 */

const PlaceDetailItem = ({ place, onDirectionClick }) => {
  return (
    <View className="p-4">
      <Text className="text-3xl font-semibold">
        {place.name}
      </Text>
      
      <View className="flex-row items-center gap-2 mt-2">
        <AntDesign name="star" size={20} color="#F4B400" />
        <Text>{place.rating}</Text>
      </View>

      {place?.photos && (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=AIzaSyCVcp7SogP99WTUNxw3aaHBV86qge96fAU",
          }}
          className="w-full h-40 rounded-lg mt-4"
        />
      )}

      <Text className="text-sm mt-4 text-gray-500" numberOfLines={2}>
        {place.vicinity ? place.vicinity : place.formatted_address}
      </Text>

      {place?.opening_hours && (
        <Text className="mt-2">
          {place?.opening_hours?.open_now ? "(Open)" : "(Closed)"}
        </Text>
      )}

      <View className="mt-4 flex-row gap-4">
        <TouchableOpacity
          onPress={() => onDirectionClick()}
          className="flex-row items-center gap-2 bg-gray-300 w-28 py-2 rounded-full justify-center"
        >
          <Ionicons name="navigate-circle-outline" size={24} color="black" />
          <Text className="text-lg">Direction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Share.SharePlace(place)}
          className="flex-row items-center gap-2 bg-gray-300 w-24 py-2 rounded-full justify-center"
        >
          <Ionicons name="md-share-outline" size={24} color="black" />
          <Text className="text-lg">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaceDetailItem;
