import { View } from 'react-native';
import React from 'react';

/**
 * HorizontalLine component renders a horizontal line with a specific style.
 * @component
 * @returns {JSX.Element} The rendered HorizontalLine component.
 */
export default function HorizontalLine() {
  return (
    <View className="mt-2">
      <View className="border-t border-[#A0A0A0] border-opacity-30"></View>
    </View>
  );
}
