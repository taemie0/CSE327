import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogBox, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


// Screens
import MapLocation from '../views/screens/MapScreen';
// import LocationScreen from "../views/screens/LocationScreen";



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
          name="Get Route"
          options={{
            headerShown: false,
          }}
          component={MapScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default AppNavigator;





