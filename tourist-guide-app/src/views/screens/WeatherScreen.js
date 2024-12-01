/**
 * WeatherScreen Component
 *
 * This component renders the main home screen for a weather forecast application. It allows users to search for cities,
 * view current weather conditions, and check the weekly weather forecast.
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
import { weatherImages } from '../../utils';
import WeatherDayCard from '../components/WeatherDayCard';
import CurrentWeatherForecast from '../components/CurrentWeatherForecast';

import * as Progress from 'react-native-progress';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid';

import { getWeatherForecast, getLocations, getAlerts } from '../../controllers/weatherController';
import { storeData, getData } from '../../models/asyncStorage';

/**
 * The main functional component for the HomeScreen.
 * @function WeatherScreen
 * @returns {JS.Element} Rendered component.
 */
export default function WeatherScreen() {
  /**
   * State hooks for managing component state.
   */
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  /**
   * Handles the selection of a location from the search results.
   * @param {Object} loc - Selected location object containing name and country.
   */
  const handleLocation = (loc) => {
    // console.log('Location', loc);
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    getWeatherForecast({ cityName: loc.name, days: '7' }).then((data) => {
      // console.log("got forecast", data);
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
    });
  };

  /**
   * Handles the search input and fetches matching locations.
   * @param {string} value - The search input value.
   */
  const handleSearch = (value) => {
    console.log('Search', value);
    if (value.length > 0) {
      // Call the controller function to fetch locations
      getLocations({ cityName: value })
        .then((data) => {
          // console.log('got location', data);
          setLocations(data);
        })
        .catch((error) => {
          console.error('Error in fetchLocations:', error);
        });
    }
  };

  useEffect(() => {
    // Fetch the weather forecast data
    fetchMyWeatherData();
  }, []);

  /**
   * Fetches weather data for the user's saved or default city.
   */
  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = myCity || 'Lagos';
    getWeatherForecast({ cityName, days: '7' }).then((data) => {
      // console.log('got forecast', data);
      setWeather(data);
      setLoading(false);
    });
  };

  /**
   * Debounced version of the handleSearch function to improve performance.
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
        source={require('../../assets/images/bg.png')}
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
