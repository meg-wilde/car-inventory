const Car = require("../models/models.js");

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    //Save the new car to the database
    const savedCar = await newCar.save();
    res.json(savedCar);
  } catch (error) {
    //handle errors and send error response
    res.status(400).json({ message: error.message });
  }
};

// Find all cars
exports.findAllCars = async (req, res) => {
  try {
    //retrieve all cars from the database
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    //handle errors and send error response
    res.status(500).json({ message: error.message });
  }
};

// Update car by ID
exports.updateCarById = async (req, res) => {
  try {
    // Find a car by its ID and update it
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedCar);
  } catch (error) {
    //handle errors and send error response
    res.status(400).json({ message: error.message });
  }
};

// Update multiple cars by make
exports.updateCarsByMake = async (req, res) => {
  const { make, updateData } = req.body;
  try {
    // Update multiple cars based on the make
    const updatedCars = await Car.updateMany(
      { make: make },
      { $set: updateData },
      { new: true }
    );
    res.json(updatedCars);
  } catch (error) {
    // Handle errors and send error response
    res.status(400).json({ message: error.message });
  }
};

// Delete car by ID
exports.deleteCarById = async (req, res) => {
  try {
    // Find and delete a car by its ID
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    res.json(deletedCar);
  } catch (error) {
    // Handle errors and send error response
    res.status(400).json({ message: error.message });
  }
};

// Delete cars by make
exports.deleteCarsByMake = async (req, res) => {
  const { make } = req.body;
  try {
    // Delete multiple cars based on the make
    const deletedCars = await Car.deleteMany({ make: make });
    res.json(deletedCars);
  } catch (error) {
    // Handle errors and send error response
    res.status(400).json({ message: error.message });
  }
};

// List cars older than 5 years
exports.listOlderCars = async (req, res) => {
  const fiveYearsAgo = new Date().getFullYear() - 5;
  try {
    // Find cars older than 5 years in the database

    const olderCars = await Car.find({
      model: { $lt: fiveYearsAgo },
    });
    res.json(olderCars);
  } catch (error) {
    // Handle errors and send error response
    res.status(500).json({ message: error.message });
  }
};
