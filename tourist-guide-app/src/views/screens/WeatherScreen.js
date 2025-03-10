/**
 * WeatherScreen Component
 *
 * This component renders the main home screen for a weather forecast application. It allows users to search for cities,
 * view current weather conditions, and check the weekly weather forecast.
 * It uses the OpenWeatherMap API to fetch weather data for selected cities.
 * 
 * @component
 * @example
 * return (
 *   <WeatherScreen />
 * )
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme/theme';
import { debounce } from 'lodash';
import { weatherImages } from '../../utils/weatherIcon';
import WeatherDayCard from '../components/WeatherDayCard';
import CurrentWeatherForecast from '../components/CurrentWeatherForecast';

import * as Progress from 'react-native-progress';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid';

import { getWeatherForecast, getLocations, getAlerts } from '../../controllers/weatherController';
import { storeData, getData } from '../../models/asyncStorage';

/**
 * WeatherScreen component renders the weather data for the user, including the current weather,
 * the search functionality for cities, and the weekly forecast.
 * 
 * @function WeatherScreen
 * @returns {JS.Element} Rendered component
 */
export default function WeatherScreen() {
  /**
   * State hooks for managing component state.
   */
  const [showSearch, toggleSearch] = useState(false);  // State to toggle search input visibility
  const [locations, setLocations] = useState([]);     // State to store list of matching locations from search
  const [weather, setWeather] = useState({});          // State to store weather data
  const [loading, setLoading] = useState(true);        // State to manage loading state

  /**
   * Handles the selection of a location from the search results.
   * It fetches the weather forecast for the selected city.
   *
   * @param {Object} loc - The selected location object containing name and country.
   * @param {string} loc.name - The name of the city.
   * @param {string} loc.country - The country the city is located in.
   */
  const handleLocation = (loc) => {
    setLocations([]);   // Clear previous search results
    toggleSearch(false); // Hide search input
    setLoading(true);    // Set loading to true while fetching data
    getWeatherForecast({ cityName: loc.name, days: '7' }).then((data) => {
      setWeather(data);  // Set weather data for the selected city
      setLoading(false); // Set loading to false after data is fetched
      storeData('city', loc.name); // Store the selected city for future use
    });
  };

  /**
   * Handles the search input and fetches matching locations.
   * This function fetches the locations as the user types into the search input field.
   *
   * @param {string} value - The search input value (city name).
   */
  const handleSearch = (value) => {
    if (value.length > 0) {
      // Call the controller function to fetch locations matching the search query
      getLocations({ cityName: value })
        .then((data) => {
          setLocations(data); // Update the state with the matching locations
        })
        .catch((error) => {
          console.error('Error in fetchLocations:', error); // Handle any errors during the fetch
        });
    }
  };

  /**
   * Fetches the weather data for the saved or default city (if no city is saved).
   * This is called when the component mounts.
   */
  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  /**
   * Fetches weather data for the user's saved city or a default city.
   * If no city is saved, it defaults to 'Lagos'.
   * 
   * @async
   */
  const fetchMyWeatherData = async () => {
    let myCity = await getData('city'); // Retrieve saved city from AsyncStorage
    let cityName = myCity || 'Lagos'; // Use 'Lagos' as default if no city is saved
    getWeatherForecast({ cityName, days: '7' }).then((data) => {
      setWeather(data); // Update state with weather data
      setLoading(false); // Set loading to false
    });
  };

  /**
   * Debounced version of the handleSearch function to improve performance.
   * It waits for the user to stop typing for 1.2 seconds before triggering the search.
   * 
   * @function handleTextDebounce
   */
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View className="flex-1 relative">
      {/* Status Bar */}
      <StatusBar style="light" />

      {/* Background Image */}
      <Image
        blurRadius={70}
        source={require('../../assets/images/bg11.png')}
        className="absolute w-full h-full"
        resizeMode="cover"
      />
      {loading ? (
        <View className="flex flex-1 justify-center items-center">
          <Progress.CircleSnail size={140} thickness={10} indeterminate={true} color="white" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          {/* Search Section */}
          <View style={{ height: '7%' }} className="mx-4 relative z-50">
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{
                backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
              }}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor="lightgray"
                  className="pl-6 h-10 flex-1 text-base text-white"
                  style={{ borderRadius: 30, paddingLeft: 12 }}
                />
              ) : null}

              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                style={{ backgroundColor: theme.bgWhite(0.3) }}
                className="rounded-full p-3 m-1"
              >
                <MagnifyingGlassIcon size="25" color="white" />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View className="absolute top-16 w-full bg-gray-300 rounded-3xl shadow-3xl p-4">
                {/* List of locations */}
                {locations.map((loc, index) => {
                  let showBorder = index + 1 !== locations.length;
                  let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(loc)}
                      key={index}
                      className={`flex-row items-center p-3 border-0 px-4 mb-1 ${borderClass}`}
                    >
                      <MapPinIcon size="20" color="gray" />
                      <Text className="text-black text-lg ml-2">
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          {/* Current Weather Forecast */}
          <CurrentWeatherForecast location={location} current={current} weather={weather} />

          {/* Weekly Forecast */}
          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2 mb-2">
              <CalendarDaysIcon size="22" color="white" />
              <Text className="text-white text-base"> Weekly Forecast</Text>
            </View>

            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
                let date = new Date(item.date);
                let options = { weekday: 'long' };
                let dayName = date.toLocaleDateString('en-US', options).split(',')[0];

                return (
                  <WeatherDayCard
                    key={index}
                    dayName={dayName}
                    avgTemp={item?.day?.avgtemp_c}
                    conditionText={item?.day?.condition?.text}
                  />
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
