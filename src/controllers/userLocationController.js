// src/controllers/userLocationController.js
import { getCurrentLocation } from '../models/userLocationModel';  // Import the Model

export async function fetchUserLocation() {
  const location = await getCurrentLocation();  // Get location from Model
  if (location) {
    return location; // Update the state in the View (via Context)
  } else {
    console.log("Unable to fetch location.");
  }
}
