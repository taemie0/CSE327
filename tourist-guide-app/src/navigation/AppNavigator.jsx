import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, Text, View } from 'react-native';

// Screens
import WeatherScreen from '../views/screens/WeatherScreen';
import HomeScreen from "../views/screens/HomeScreen";

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Ignore specific warnings
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

// AppNavigator component
export default function AppNavigator () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Weather"
          options={{
            headerShown: false,
          }}
          component={WeatherScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// export default AppNavigator;
