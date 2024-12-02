import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo, AntDesign } from "@expo/vector-icons"; // Import the filter icon from Entypo
import { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";

/**
 * SearchBar component provides a search bar with Google Places autocomplete functionality.
 * Users can type in a location, and the component will update the search results with place details.
 * A clear button is also available, although it currently logs a message on press.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Function} props.setSearchText - Function to set the selected location's latitude and longitude.
 *
 * @returns {JSX.Element} A search bar with Google Places autocomplete and a clear button.
 */
export default function SearchBar({ setSearchText }) {
  const [searchInput, setSearchInput] = useState();

  return (
    <SafeAreaView className="px-4 py-3 shadow-lg rounded-lg flex-row items-center mt-6">
      {/* Search Input Container */}
      <View className="flex-row items-center bg-gray-100 rounded-full w-[90%] py-3 px-4">
        {/* Search Icon */}
        <Entypo
          name="magnifying-glass"
          size={20}
          color="#6B7280"
          className="mr-2"
        />

        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          fetchDetails={true} // you need this to fetch the details object onPress
          placeholder="Search"
          query={{
            key: "AIzaSyCVcp7SogP99WTUNxw3aaHBV86qge96fAU",
            language: "en", // language of the results
          }}
          onPress={(data, details = null) => {
            const location = details?.geometry?.location;
            setSearchText(location); // Pass the object directly
          }}
          onFail={(error) => console.error(error)}
        />
      </View>

      <TouchableOpacity
        className="pl-2"
        onPress={() => console.log("Clear search")}
      >
        <AntDesign
          name="bars"
          size={30}
          color="#4C1D3D"
          className="font-bold"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
