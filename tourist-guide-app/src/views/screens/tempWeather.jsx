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
import { debounce, set } from 'lodash';
import { weatherImages } from '../../utils';

import * as Progress from 'react-native-progress';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid';

import { getWeatherForecast, getLocations, getAlerts } from '../../controllers/weatherController';
import { storeData, getData } from '../../models/asyncStorage';

/**
 * HomeScreen component that displays the weather information, search bar, and 7-day forecast.
 * This component fetches weather data and allows the user to search for locations.
 * 
 * @component
 * @example
 * return <HomeScreen />;
 * 
 * @returns {JSX.Element} The rendered HomeScreen component.
 */
export default function HomeScreen() {
  /**
   * Toggles the visibility of the search bar.
   * @type {boolean}
   */
  const [showSearch, toggleSearch] = useState(false);

  /**
   * Stores the list of locations based on user search input.
   * @type {Array<Object>}
   */
  const [locations, setLocations] = useState([]);

  /**
   * Stores the current weather data and forecast.
   * @type {Object}
   */
  const [weather, setWeather] = useState({});

  /**
   * State to track loading state of weather data fetching.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(true);

  /**
   * Handles selecting a location and fetches its weather forecast.
   * 
   * @param {Object} loc - The location object.
   * @param {string} loc.name - The name of the location.
   * @param {string} loc.country - The country of the location.
   */
  const handleLocation = (loc) => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    getWeatherForecast({ cityName: loc.name, days: '7' }).then((data) => {
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
    });
  };

  /**
   * Handles search input and fetches location data based on the entered city name.
   * 
   * @param {string} value - The city name to search for.
   */
  const handleSearch = (value) => {
    if (value.length > 0) {
      getLocations({ cityName: value })
        .then((data) => {
          setLocations(data);
        })
        .catch((error) => {
          console.error('Error in fetchLocations:', error);
        });
    }
  };

  /**
   * Fetches the weather data for the default or previously stored city.
   * The default city is 'Lagos' if no city is stored.
   */
  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  /**
   * Fetches weather data for a specific city.
   * 
   * @async
   * @function
   */
  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = myCity || 'Lagos';
    getWeatherForecast({ cityName, days: '7' }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  /**
   * Debounced version of the handleSearch function to limit the number of API calls.
   * 
   * @type {function}
   */
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
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
                  style={{
                    borderRadius: 30,
                    paddingLeft: 12,
                  }}
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

          {/* Forecast Section */}
          <View className="mx-4 flex justify-around flex-1 mb-2">
            <Text className="text-white text-center text-2xl font-bold">
              {location?.name}
              <Text className="text-lg font-semibold text-gray-300">{' ' + location?.country}</Text>
            </Text>

            <View className="flex-row justify-center">
              <Image
                source={weatherImages[current?.condition?.text] || weatherImages['other']}
                className="w-52 h-52"
              />
            </View>

            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-center text-white text-xl tracking-widest">
                {current?.condition?.text}
              </Text>
            </View>

            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image source={require('../../assets/icons/wind.png')} className="h-6 w-6" />
                <Text className="text-white font-semibold text-base">
                  {' ' + current?.wind_kph}km
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image source={require('../../assets/icons/drop.png')} className="h-6 w-6" />
                <Text className="text-white font-semibold text-base">
                  {' ' + current?.humidity}%
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image source={require('../../assets/icons/sun.png')} className="h-6 w-6" />
                <Text className="text-white font-semibold text-base">
                  {' ' + weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>

          {/* Forecast for Next 7 Days */}
          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <CalendarDaysIcon size="22" color="white" />
              <Text className="text-white text-base"> Daily forecast</Text>
            </View>

            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
                let date = new Date(item.date);
                let options = { weekday: 'long' };
                let dayName = date.toLocaleDateString('en-US', options);
                dayName = dayName.split(',')[0];

                return (
                  <View
                    key={index}
                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{ backgroundColor: theme.bgWhite(0.15) }}
                  >
                    <Image
                      source={weatherImages[item?.day.condition?.text] || weatherImages['other']}
                      className="h-11 w-11"
                    />
                    <Text className="text-white">{dayName}</Text>
                    <Text className="text-white text-xl font-semibold">
                      {' '}
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
