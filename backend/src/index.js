require("dotenv").config({ path: "src/.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Routes for authentication
app.use("/api/auth", authRoutes);

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Basic route to indicate server running
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Start the server and listen on specified port
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
