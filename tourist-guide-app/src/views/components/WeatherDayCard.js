import React from 'react';
import { View, Text, Image } from 'react-native';
import { weatherImages } from '../../utils';
import { theme } from '../theme/theme';

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
