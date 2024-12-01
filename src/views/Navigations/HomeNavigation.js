import { View, Text } from 'react-native'
import React from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import PlaceDetail from '../Components/placeDetail/PlaceDetails';
import Home from '../screens/Home';

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