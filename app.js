const express = require("express");
const mongoose = require("mongoose");
const carController = require("./controllers/car.controller.js");
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const uri =
  "mongodb+srv://megcwilde:zvAL6FgrfYuVHWAg@cluster0.luoxfy5.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useMongoClient: true,
  dbName: "Cluster0",
});

mongoose.connection.on("error", function () {
  console.log("Could not connect to the database. Exiting now..");
  process.exit();
});

mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// Middleware to parse JSON
app.use(express.json());

// Routes
app.post("/api/cars", carController.createCar);
app.get("/api/cars", carController.findAllCars);
app.put("/api/cars/:id", carController.updateCarById);
app.put("/api/cars", carController.updateCarsByMake);
app.delete("/api/cars/:id", carController.deleteCarById);
app.delete("/api/cars", carController.deleteCarsByMake);
app.get("/api/older-cars", carController.listOlderCars);

// Serve the React app
app.use(express.static("client/build"));

// Serve React app for any other route
app.get("*", (req, res) => {
  res.sendFile("client/build/index.html", { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
