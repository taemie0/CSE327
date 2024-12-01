import { View, Text } from 'react-native'
import React from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import PlaceDetail from '../Components/placeDetail/PlaceDetails';
import Home from '../screens/Home';

/**
 * HomeNavigation component is responsible for setting up the navigation stack for the home screen
 * and place detail screen. It includes a modal transition for the place detail screen on Android devices.
 * 
 * @component
 * @returns {JSX.Element} The StackNavigator containing the Home and PlaceDetail screens.
 */
export default function HomeNavigation() {
    const isAndroid=true;
    const Stack=createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
        gestureEnabled:true,
      
        ...(isAndroid&&TransitionPresets.ModalPresentationIOS)

    }}>
        <Stack.Screen name='home-screen'
       options={{headerShown:false}}
        component={Home} />
        <Stack.Screen name="place-detail" 
          options={{title:""}}
        component={PlaceDetail} screenOptions={{
            presentation:'modal',
           
        }}/>
    </Stack.Navigator>
  )
}