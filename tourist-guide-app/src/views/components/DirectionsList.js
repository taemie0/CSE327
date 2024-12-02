import React from 'react';
import { View, Text } from 'react-native';

/**
 * DirectionsList component renders a list of steps as text for a navigation route.
 *
 * @component
 * @example
 * const steps = [
 *   { html_instructions: '<b>Turn left</b> at the next intersection.' },
 *   { html_instructions: 'Continue straight for 2 miles.' },
 * ];
 * <DirectionsList steps={steps} />
 *
 * @param {Object[]} steps - The list of navigation steps.
 * @param {string} steps[].html_instructions - The instruction text for the step, which may include HTML tags.
 * @returns {React.Element} The rendered DirectionsList component.
 */
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

