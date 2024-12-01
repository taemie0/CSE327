import { View, Text } from 'react-native'
import React from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import PlaceDetail from '../Components/placeDetail/PlaceDetails';
import Search from '../screens/Search';

/**
 * SearchNavigation component sets up the navigation stack for the Search screen and the PlaceDetail screen.
 * It includes a modal transition for the PlaceDetail screen on Android devices.
 * 
 * @component
 * @returns {JSX.Element} The StackNavigator containing the Search and PlaceDetail screens.
 */
export default function SearchNavigation() {
    const isAndroid=true;
    const Stack=createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
        gestureEnabled:true,
      
        ...(isAndroid&&TransitionPresets.ModalPresentationIOS)

    }}>
        <Stack.Screen name='Search-screen'
       options={{headerShown:false}}
        component={Search} />
        <Stack.Screen name="place-detail" 
          options={{title:""}}
        component={PlaceDetail} screenOptions={{
            presentation:'modal',
           
        }}/>
    </Stack.Navigator>
  )
}