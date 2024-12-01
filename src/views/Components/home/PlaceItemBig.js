import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import HorizontalLine from "./HorizontalLine";

export default function PlaceItemBig({ place }) {
  // Fallback image URL
  const placeholderImage = require("../../../assets/icon.png");

  return (
    <View className="mt-5">
      {/* Image */}
      {place?.photos && place.photos[0]?.photo_reference ? (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=AIzaSyCVcp7SogP99WTUNxw3aaHBV86qge96fAU",
          }}
          className="w-full h-32 rounded-xl"
          accessibilityLabel={`Image of ${place.name || "place"}`}
        />
      ) : (
        <Image
          source={placeholderImage}
          className="w-full h-32 rounded-xl"
          accessibilityLabel="Placeholder image for the place"
        />
      )}

      {/* Place Name */}
      <Text
        numberOfLines={2}
        className="text-lg font-bold mb-1"
        accessibilityLabel={`Place Name: ${place.name || "Unnamed Place"}`}
      >
        {place.name || "No Name Available"}
      </Text>

      {/* Vicinity */}
      <Text
        className="text-base text-gray-400 mb-2"
        numberOfLines={2}
        accessibilityLabel={`Vicinity: ${place.vicinity || "No vicinity available"}`}
      >
        {place.vicinity || "No vicinity available"}
      </Text>

      {/* Rating Section */}
      <View className="flex-row items-center gap-1">
        <AntDesign name="star" size={20} color="#F4B400" /> {/* Google Yellow Gold */}
        <Text className="text-gray-700">
          {place.rating ? place.rating : "No rating available"}
        </Text>
      </View>

      {/* Horizontal Line */}
      <HorizontalLine />
    </View>
  );
}
