import { View,Text } from 'react-native';  // No need for 'div', use 'View' in React Native
import { useEffect,useState,React,useContext } from 'react';
import { ScrollView } from 'react-native'
import GoogleMapView from '../Components/home/GoogleMapView';
import CategoryList from '../Components/home/CategoryList';
import { UserLocationContext } from '../context/userLocationContext';
import PlaceList from '../Components/home/PlaceList'
import { fetchNearbyPlaces } from '../../controllers/nearByPlacesController';

export default function Home() {
  const [type, setType] = useState('tourist_attraction');
  const [placeList, setPlaceList] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (location && location.coords) {
      GetNearBySearchPlace('restaurant');
    }
  }, [location]);  // Ensure location change triggers this effect
  

  const GetNearBySearchPlace = (value) => {
    let placeType = 'tourist_attraction'; // Default type
    if (value === 'Cafes') placeType = 'cafe';
    if (value === 'Restaurants') placeType = 'restaurant';
    if (value === 'Hotels') placeType = 'lodging';
    if (value === 'Attractions') placeType = 'tourist_attraction';

    setType(placeType);

    if (location) {
      fetchNearbyPlaces(location.coords.latitude, location.coords.longitude, placeType, setPlaceList);
    }
  };
  return (
    <ScrollView style={{padding:20,backgroundColor:'#fff',flex:1}}>
        <GoogleMapView placeList={placeList} />
        <CategoryList setSelectedCategory={(value)=>GetNearBySearchPlace(value)}/>
       {placeList? <PlaceList placeList={placeList} />:null}
    </ScrollView>
  )
}