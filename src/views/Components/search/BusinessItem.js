import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'


/**
 * BusinessItem component renders a card displaying a business/place with its photo, name, vicinity, and rating.
 * If the place has a photo, it displays it; otherwise, a default image is shown.
 * The component also shows the place's name, address, and rating with a star icon.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Object} props.place - A place object containing information about a business.
 * @param {string} props.place.name - The name of the place.
 * @param {string} props.place.vicinity - The vicinity or address of the place.
 * @param {string} props.place.formatted_address - A formatted address of the place if `vicinity` is unavailable.
 * @param {number} props.place.rating - The rating of the place (out of 5).
 * @param {Array} props.place.photos - Array of photo objects from Google Places API, containing `photo_reference`.
 * 
 * @returns {JSX.Element} A card component displaying the place's photo, name, address, and rating.
 */
export default function BusinessItem({ place }) {
  return (
    <View className="w-35 bg-white rounded-lg p-2.5 m-1.5 shadow-sm">
      {place?.photos ? (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=AIzaSyCVcp7SogP99WTUNxw3aaHBV86qge96fAU",
          }}
          className="w-30 h-20 rounded-md"
        />
      ) : (
        <Image
          source={require('../../../assets/icon.png')}
          className="w-30 h-20 rounded-md"
        />
      )}
      <Text
        numberOfLines={2}
        className="font-raleway-bold text-lg mt-1.5"
      >
        {place.name}
      </Text>
      <Text
        numberOfLines={2}
        className="font-raleway text-sm mt-1.5 text-gray-600"
      >
        {place.vicinity ? place.vicinity : place.formatted_address}
      </Text>
      <View className="flex-row items-center gap-1 mt-1.5 mb-1">
        <AntDesign name="star" size={20} color="#FFD700" /> {/* Dummy yellow */}
        <Text>{place.rating}</Text>
      </View>
    </View>
  )
}
