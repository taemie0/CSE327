import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Import screens
import Login from './login';
import Signup from './signup';
import ViewReviews from './viewReview';

const Stack = createStackNavigator(); // Create the Stack Navigator


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Hello I am Tonmoy Biswas</Text> */}
      {/* for login */}
      {/* <Login></Login> */}
      {/* for register */}
      {/* <Signup></Signup> */}
      {/* for view reviews */}
      {/* <ViewReviews place="Park" /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});