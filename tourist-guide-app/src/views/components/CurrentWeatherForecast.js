import React from 'react';
import { View, Text, Image } from 'react-native';
import { weatherImages } from '../../utils/weatherIcon';

/**
 * Displays the current weather forecast.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.location - Location object.
 * @param {Object} props.current - Current weather data.
 * @param {Object} props.weather - Weather forecast data.
 *
 * @returns {JS.Element} A JS element representing the current weather forecast.
 */
export default function CurrentWeatherForecast({ location, current, weather }) {
  return (
    <View className="mx-4 flex justify-around flex-1 mb-4">
      {/* Location */}

      <View className="flex-row justify-center items-center mb-2">
        <Text className="text-white text-center text-2xl font-bold">
          {location?.name}
          <Text className="text-lg font-semibold text-gray-300">{' ' + location?.country}</Text>
        </Text>
      </View>

      {/* Weather Image */}
      <View className="flex-row justify-center mb-4">
        <Image
          source={weatherImages[current?.condition?.text] || weatherImages['other']}
          className="w-52 h-52"
        />
      </View>

      {/* Temperature and Condition */}
      <View className="space-y-2 mb-4">
        <Text className="text-center font-bold text-white text-6xl">{current?.temp_c}&#176;C</Text>

        <Text className="text-white font-semibold text-base text-center">
          {'Feels Like: ' + current?.feelslike_c}&#176;C
        </Text>

        <Text className="text-center text-white text-xl tracking-widest">
          {current?.condition?.text}
        </Text>
      </View>

      {/* Additional Info */}
      <View className="flex-row justify-between mx-4">
        {/* Wind */}
        <View className="flex-row space-x-2 items-center">
          <Image source={require('../../assets/icons/wind.png')} className="h-6 w-6" />
          <Text className="text-white font-semibold text-base">{' ' + current?.wind_kph} km/h</Text>
        </View>

        {/* Humidity */}
        <View className="flex-row space-x-2 items-center">
          <Image source={require('../../assets/icons/drop.png')} className="h-6 w-6" />
          <Text className="text-white font-semibold text-base">{' ' + current?.humidity}%</Text>
        </View>

        {/* Sunrise */}
        <View className="flex-row space-x-2 items-center">
          <Image source={require('../../assets/icons/sun.png')} className="h-6 w-6" />
          <Text className="text-white font-semibold text-base">
            {' ' + weather?.forecast?.forecastday[0]?.astro?.sunrise}
          </Text>
        </View>
      </View>
    </View>
  );
}
