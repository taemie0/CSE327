const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON data
app.use(cors()); // Enable CORS for frontend-backend communication

// --- Connect to MongoDB ---
const mongoURI = "mongodb://localhost:27017/weather_alerts"; // Replace with your MongoDB URI
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// --- Define MongoDB Schema and Model ---
const AlertPreferenceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  preferences: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AlertPreference = mongoose.model(
  "AlertPreference",
  AlertPreferenceSchema
);

// --- API Endpoint to Save Alert Preferences ---
app.post("/savePreferences", async (req, res) => {
  const { email, location, preferences } = req.body;

  // Validate input
  if (!email || !location || !preferences) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Create a new document in MongoDB
    const newPreference = new AlertPreference({ email, location, preferences });
    const savedPreference = await newPreference.save();

    res.status(201).json({
      message: "Preferences saved successfully",
      data: savedPreference,
    });
  } catch (error) {
    console.error("Error saving preferences:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving preferences" });
  }
});

// --- API Endpoint to Fetch All Alert Preferences ---
app.get("/getPreferences", async (req, res) => {
  try {
    const preferences = await AlertPreference.find();
    res.status(200).json(preferences);
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching preferences" });
  }
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
