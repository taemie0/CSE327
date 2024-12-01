import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// ---- MODEL ----

/**
 * Fetches review data from the backend API for a specific place.
 * @param {string} place - The name of the place to fetch reviews for.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of review data.
 * @throws {Error} - If there is an error in fetching the reviews.
 */
const fetchReviewsData = async (place) => {
  try {
    // Replace 'localhost' with your IP address if on a physical device
    const response = await fetch(`http://localhost:5000/reviews/${place}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error fetching reviews");
    }

    return data;
  } catch (error) {
    throw new Error("Error fetching reviews");
  }
};

// ---- CONTROLLER ----

/**
 * Custom hook to manage the state of the reviews and errors.
 * Fetches reviews when the place changes.
 * @param {string} place - The name of the place to fetch reviews for.
 * @returns {Object} - An object containing the reviews data and any error message.
 */
const useReviewsController = (place) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviewsData(place); // Call Model
        setReviews(data); // Update the state with fetched reviews
      } catch (err) {
        setError(err.message); // Handle errors from the Model
      }
    };

    loadReviews(); // Trigger the data fetching on component mount
  }, [place]);

  return { reviews, error }; // Return the state to the View
};

// ---- VIEW ----

/**
 * View component that displays the reviews for a specific place.
 * @param {Object} props - The component props.
 * @param {string} props.place - The name of the place to display reviews for.
 * @returns {JSX.Element} - A React component rendering the reviews or an error message.
 */
const ViewReviews = ({ place }) => {
  const { reviews, error } = useReviewsController(place); // Use Controller to fetch data

  // If there's an error, display it
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // If data is fetched successfully, display the reviews
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place} Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.userName}>{item.user}</Text>
            <Text style={styles.rating}>Rating: {item.rating} / 10</Text>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
      />
    </View>
  );
};

// ---- STYLES ----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "red", // Red background
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff", // White title for contrast
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  rating: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  comment: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  errorText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});

export default ViewReviews;
