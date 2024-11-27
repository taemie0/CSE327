import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

// Dummy reviews data
const reviews = [
  { id: '1', rating: 4, comment: 'Great place to visit, really enjoyed the scenery!', user: 'John Doe' },
  { id: '2', rating: 5, comment: 'Amazing experience! Highly recommend.', user: 'Jane Smith' },
  { id: '3', rating: 3, comment: 'It was okay, but could have been cleaner.', user: 'Alex Johnson' },
  { id: '4', rating: 5, comment: 'A beautiful spot, perfect for family outings.', user: 'Maria Lee' },
];

// Component to display a single review card
const ReviewCard = ({ review }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      {/* <Image
        source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder image
        style={styles.userImage}
      /> */}
      <Text style={styles.userName}>{review.user}</Text>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.rating}>Rating: {review.rating} / 5</Text>
      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  </View>
);

// Main component to display reviews for a place
const ViewReviews = ({ place }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place} Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewCard review={item} />}
      />
    </View>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContent: {
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  comment: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ViewReviews;
