const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// --- VIEW ---
//initialize the express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// passing some dummy data (ArrayList)
const reviewsData = {
  'Beach': [
    { rating: 9, comment: 'Great place to visit', user: 'Tonmoy' },
    { rating: 6, comment: 'Amazing experience!', user: 'Turjo' },
  ],
  'Mountain': [
    { rating: 7, comment: 'It was awesome', user: 'Tonmoy' },
    { rating: 10, comment: 'A beautiful spot', user: 'Jawad' },
  ],
  'Park': [
    { rating: 8, comment: 'A peaceful place for a walk', user: 'Meha' },
    { rating: 5, comment: 'Too crowded', user: 'Ramiza' },
  ]
};

// --- CONTROLLER ---
// MongoDB Setup (commented out for now)
/*
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/touristGuide', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Review Schema (MongoDB model)
const reviewSchema = new mongoose.Schema({
  place: { type: String, required: true },
  user: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
});

// Create the model
const Review = mongoose.model('Review', reviewSchema);
*/

// --- API ROUTES ---

// GET Reviews for a specific place
/**
 * Retrieves reviews for a specific place.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.get('/reviews/:place', (req, res) => {
  const place = req.params.place;
  
  // Retrieve reviews for a specific place from the in-memory data
  const reviews = reviewsData[place];
  
  if (!reviews) {
    return res.status(404).json({ message: 'No reviews available for this place.' });
  }
  
  // Send reviews as a response
  res.json(reviews);
});

// POST a new review (for future database integration)
/**
 * Adds a new review for a specific place.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.post('/reviews', (req, res) => {
  const { place, user, rating, comment } = req.body;
  
  // Add the review to the in-memory data (this will be replaced by DB logic later)
  if (!reviewsData[place]) {
    reviewsData[place] = [];
  }
  reviewsData[place].push({ place, user, rating, comment });
  
  res.status(201).json({ message: 'Review added successfully', review: { place, user, rating, comment } });
});

// Server setup
const PORT = 5000;
/**
 * Starts the server and listens on the specified port.
 * Logs a message when the server is running.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
