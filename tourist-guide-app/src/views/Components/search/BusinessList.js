import { View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import BusinessItem from './BusinessItem';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // Get screen width for dynamic styling


/**
 * BusinessList component displays a horizontally scrollable list of businesses (places).
 * Each business is represented by a `BusinessItem` component, and clicking on an item navigates to the place's details.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Array} props.placeList - List of places/businesses to be displayed in the list.
 * @param {Object} props.placeList[] - A place object containing information like name, address, and rating.
 * 
 * @returns {JSX.Element} A scrollable list of businesses with background gradient styling.
 */
export default function BusinessList({ placeList }) {
  const navigation = useNavigation();

  return (
    <View className="w-full  h-60 ">
      {/* Background Linear Gradient */}
      <LinearGradient
        colors={['#FF5733', '#FFFFFF']} // Gradient colors for a warm tone
        style={{ padding: 10, borderRadius: 10, marginBottom: 2 }} // Gradient container with padding
      >
        {/* Title for the list */}

        {/* FlatList displaying business items */}
        <FlatList
          data={placeList}
          horizontal={true}
          renderItem={({ item, index }) =>
            index <= 6 && (
              <TouchableOpacity
                onPress={() => navigation.navigate('place-detail', { place: item })}
                style={{
                  marginRight: 15, // Space between items
                  width: width * 0.7, // Limit the width of each item to a fraction of screen width
                }}
              >
                <BusinessItem place={item} />
              </TouchableOpacity>
            )
          }
          showsHorizontalScrollIndicator={false} // Hides the scroll indicator
        />
      </LinearGradient>
    </View>
  );
}
