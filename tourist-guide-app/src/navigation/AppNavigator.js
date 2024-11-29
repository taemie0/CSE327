import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogBox, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


// Screens
import HomeScreen from '../views/screens/WeatherScreen';
// import LocationScreen from "../views/screens/LocationScreen";
// import HomeScreen from "../views/screens/HomeScreen";


// Create a stack navigator
const Stack = createNativeStackNavigator();


// Ignore specific warnings
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);


// AppNavigator component
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default AppNavigator;





