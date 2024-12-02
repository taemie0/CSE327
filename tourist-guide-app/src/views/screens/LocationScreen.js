// LocationScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { getLocation } from './locationUtils';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useTailwind } from 'tailwind-rn';

/**
 * LocationScreen component allows the user to either use their GPS location or manually enter an address.
 * It fetches the current location using GPS or enables the user to search for a location through Google Places.
 *
 * @component
 * @example
 * <LocationScreen />
 *
 * @returns {React.Element} The rendered LocationScreen component.
 */
const LocationScreen = () => {
  const [location, setLocation] = useState(null); // Stores the GPS location data
  const [manualLocation, setManualLocation] = useState(''); // Stores the manually entered location
  const [usingGPS, setUsingGPS] = useState(true); // Tracks whether GPS or manual entry is being used
  const tailwind = useTailwind();

  useEffect(() => {
    /**
     * Fetches the current GPS location when the component is mounted or when usingGPS is toggled to true.
     *
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when the location is fetched.
     */
    if (usingGPS) {
      const fetchLocation = async () => {
        const loc = await getLocation();
        setLocation(loc); // Set the fetched location to state
      };
      fetchLocation();
    }
  }, [usingGPS]);

  /**
   * Handles the change in location entered manually by the user.
   *
   * @param {Object} data - The data returned from the Google Places API when the user selects a location.
   * @param {string} data.description - The description of the selected location.
   */
  const handleLocationChange = (data) => {
    setManualLocation(data.description); // Sets the selected location description
    setLocation(null); // Clears any GPS location when switching to manual input
  };

  /**
   * Handles the submission of the manually entered location.
   *
   * @function
   * @returns {void}
   * @throws {Error} If the manual location is empty, an alert is shown to the user.
   */
  const handleLocationSubmit = () => {
    if (!manualLocation) {
      Alert.alert('Error', 'Please enter a location manually or use GPS');
    } else {
      setUsingGPS(false); // Switch to manual location submission mode
    }
  };

  /**
   * Switches the mode back to using GPS, clearing any manually entered location.
   *
   * @function
   * @returns {void}
   */
  const handleGPSSwitch = () => {
    setUsingGPS(true);
    setManualLocation('');
    setLocation(null);
  };

  return (
    <View style={tailwind('flex-1 justify-center items-center p-4')}>
      <Text style={tailwind('text-lg font-bold')}>Enter Location</Text>

      {usingGPS ? (
        <View style={tailwind('mt-4')}>
          <Button title="Use GPS" onPress={handleGPSSwitch} />
          {location && (
            <Text style={tailwind('mt-2')}>
              GPS Location: {location.coords.latitude}, {location.coords.longitude}
            </Text>
          )}
        </View>
      ) : (
        <View style={tailwind('mt-4 w-full')}>
          <GooglePlacesAutocomplete
            placeholder="Enter location"
            onPress={handleLocationChange}
            query={{
              key: 'YOUR_GOOGLE_API_KEY', // Use your Google Places API key here
              language: 'en',
            }}
            onFail={error => console.error(error)}
            debounce={200}
            styles={{
              textInput: tailwind('border p-2 rounded'),
            }}
          />
          <Button title="Confirm Location" onPress={handleLocationSubmit} />
        </View>
      )}
    </View>
  );
};

export default LocationScreen;
