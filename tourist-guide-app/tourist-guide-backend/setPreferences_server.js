const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// --- VIEW ---
// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); 
app.use(cors()); //for frontend-backend communication

// --- CONTROLLER ---
// --- Connect to MongoDB ---
const mongoURI = "mongodb://localhost:500/weather_alerts"; 
/**
 * Connects to MongoDB using mongoose.
 * Logs success or error message.
 */
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// --- MODEL ---
/**
 * Schema definition for user alert preferences.
 * @typedef {Object} AlertPreference
 * @property {string} email - User's email address.
 * @property {string} location - User's location.
 * @property {string} preferences - User's alert preferences.
 * @property {Date} createdAt - Date of creation (default: current time).
 */
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

// Create the AlertPreference model
const AlertPreference = mongoose.model(
  "AlertPreference",
  AlertPreferenceSchema
);

// --- API ENDPOINTS ---

/**
 * Saves user alert preferences to MongoDB.
 * @param {Object} req - The request object containing user preferences.
 * @param {Object} res - The response object to return a status and message.
 * @returns {void}
 */
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

/**
 * Fetches all saved user alert preferences.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object with a list of preferences.
 * @returns {void}
 */
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

// --- SERVER SETUP ---
/**
 * Starts the Express server on the specified port.
 * Logs the server's URL when it is running.
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
