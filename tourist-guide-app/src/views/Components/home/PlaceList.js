import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import PlaceItem from './PlaceItem';
import PlaceItemBig from './PlaceItemBig';
import { useNavigation } from '@react-navigation/native';


/**
 * PlaceList component renders a list of places. It dynamically chooses between rendering a small or large place item
 * based on the index of the item. On item click, it navigates to a place detail screen.
 * @component
 * @param {Object} props - The component's props.
 * @param {Array} props.placeList - An array of places to be displayed.
 * @param {Object} props.placeList[] - A single place object.
 * @param {string} props.placeList[].name - The name of the place.
 * @param {string} props.placeList[].vicinity - The vicinity of the place.
 * @param {number} props.placeList[].rating - The rating of the place.
 * @param {Array} props.placeList[].photos - An array of photos related to the place.
 * @returns {JSX.Element} The rendered PlaceList component.
 */

export default function PlaceList({ placeList }) {
  const navigator = useNavigation();

  const onPlaceClick = (item) => {
    navigator.navigate('place-detail', { place: item });
  };

  return (
    <View className="px-4">
      <Text className="text-lg font-bold mt-2">
        Found {placeList.length} Places
      </Text>

      <FlatList
        data={placeList}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => onPlaceClick(item)}>
            {index % 10 === 0 ? (
              <PlaceItemBig place={item} />
            ) : (
              <PlaceItem place={item} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
