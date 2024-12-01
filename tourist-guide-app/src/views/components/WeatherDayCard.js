import React from 'react';
import { View, Text, Image } from 'react-native';
import { weatherImages } from '../../utils/weatherIcon';
import { theme } from '../theme/theme';

/**
 * WeatherDayCard Component
 *
 * This component represents a single day's weather information in a weather forecast. 
 * It displays the day's name, average temperature, and an associated weather condition icon.
 *
 * @component
 * @example
 * return (
 *   <WeatherDayCard 
 *     dayName="Monday" 
 *     avgTemp={22} 
 *     conditionText="Sunny" 
 *   />
 * )
 *
 * @param {Object} props - The component's props.
 * @param {string} props.dayName - The name of the day (e.g., "Monday").
 * @param {number} props.avgTemp - The average temperature for the day in Celsius.
 * @param {string} props.conditionText - The weather condition description (e.g., "Sunny").
 * 
 * @returns {JS.Element} A JS element representing a weather day card with an icon, day name, and temperature.
 */
const WeatherDayCard = ({ dayName, avgTemp, conditionText }) => {
  return (
    <View
      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
      style={{
        backgroundColor: theme.bgWhite(0.15),  
      }}
    >
      <Image
        source={weatherImages[conditionText] || weatherImages['other']}
        className="h-11 w-11"
      />
      <Text className="text-white text-center text-xs">{dayName}</Text>
      <Text className="text-white text-lg font-semibold text-center">
        {avgTemp}&#176;C
      </Text>
    </View>
  );
};

export default WeatherDayCard;
