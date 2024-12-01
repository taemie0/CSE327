import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import PlaceItem from './PlaceItem';
import PlaceItemBig from './PlaceItemBig';
import { useNavigation } from '@react-navigation/native';

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
