import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from 'react-native';
// Import screens
import Login from "./login";
import Signup from "./signup";
import ViewReviews from "./viewReview";
import Dashboard from "./dashboard";
import AlertPreferences from "./setAlertPreferences";
import SetAlertPreferences from "./setAlertPreferences";

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
      {/* <ViewReviews place="Mountain" /> */}
      {/* for setPreferences */}
      {/* <SetAlertPreferences></SetAlertPreferences> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
