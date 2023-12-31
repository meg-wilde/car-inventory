const express = require("express");
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes.js");
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const uri =
  "mongodb+srv://megcwilde:zvAL6FgrfYuVHWAg@cluster0.luoxfy5.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Cluster0",
});

mongoose.connection.on("error", function (error) {
  // Log an error message if the database connection fails
  console.log("Could not connect to the database. Exiting now..", error);
  process.exit();
});

mongoose.connection.once("open", function () {
  // Log a success message when the database connection is established
  console.log("Successfully connected to the database");
});

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api", carRoutes);

// Serve the React app's index.html for any other route
app.get("*", (req, res) => {
  res.sendFile("client/build/index.html", { root: __dirname });
});

// Serve static files from the client/build directory
app.use(express.static("client/build"));

// Log the port where the server is running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
