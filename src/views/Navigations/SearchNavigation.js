import { View, Text } from 'react-native'
import React from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import PlaceDetail from '../Components/placeDetail/PlaceDetails';
import Search from '../screens/Search';

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