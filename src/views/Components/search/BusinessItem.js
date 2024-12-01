import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

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
