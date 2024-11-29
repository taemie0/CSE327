import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const ViewReviews = ({ place }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Replace 'localhost' with your IP address if on a physical device
        const response = await fetch(
          `http://localhost:5000/reviews/${place}`
        );
        const data = await response.json();

        if (response.ok) {
          setReviews(data);
        } else {
          setError(data.message || "Error fetching reviews");
        }
      } catch (err) {
        setError("Error fetching reviews");
      }
    };

    fetchReviews();
  }, [place]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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
