import React from 'react';
import { View, Text } from 'react-native';

const DirectionsList = ({ steps }) => {
  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 18 }}>Step-by-Step Directions:</Text>
      {steps.map((step, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text>{step.html_instructions.replace(/<[^>]+>/g, '')}</Text>
        </View>
      ))}
    </View>
  );
};

export default DirectionsList;
