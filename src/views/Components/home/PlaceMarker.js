import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'

/**
 * PlaceMarker component renders a marker on the map for each place, displaying the place's name and its coordinates.
 * The marker is clickable and shows the place name when tapped.
 * 
 * @component
 * @param {Object} props - The component's props.
 * @param {Object} props.item - A place object containing geographical and other details.
 * @param {string} props.item.name - The name of the place.
 * @param {Object} props.item.geometry - Geographical data for the place.
 * @param {Object} props.item.geometry.location - Coordinates of the place.
 * @param {number} props.item.geometry.location.lat - Latitude of the place.
 * @param {number} props.item.geometry.location.lng - Longitude of the place.
 * 
 * @returns {JSX.Element} A Marker component rendered at the place's coordinates, displaying the place's name as the title.
 */
export default function PlaceMarker({item}) {
  return (
    <Marker 
    title={item.name} 
    coordinate={
        {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0421,
          }
    }
     >
        </Marker>
  )
}